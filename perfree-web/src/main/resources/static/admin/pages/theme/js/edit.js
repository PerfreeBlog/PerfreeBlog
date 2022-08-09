var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: 'text/html',
    theme: 'dracula',
    lineNumbers: true,
    styleActiveLine: true,
    matchTags: {bothTags: true},
    extraKeys: {"Alt-/": "autocomplete"},	// 高亮当前行
});
var zTreeObj, layer, form, upload, currTreeNode,toast;

layui.use(['util','form', 'layer','upload','toast'], function(){
    layer = layui.layer;
    util = layui.util;
    form = layui.form;
    upload = layui.upload;
    toast = layui.toast;

    var settings = {
        data: {
            key:{
                name:"title" //节点显示的值
            },
            simpleData:{
                enable:true,
                idKey:"id",
                pIdKey:"pid",
                rootPId:"-1"
            }
        },
        callback:{
            onClick: clickNode,
            beforeRename: beforeRename,
            onRightClick: rightClick
        }
    };

    // 加载文件列表
    $.ajax({
        type: "POST",
        url: "/admin/theme/getFileListByTheme",
        data:  {path: $("#path").val()},
        success: function (d) {
            d.data.forEach(function (value) {
                if (value.obj.fileType === "dir") {
                    value.iconSkin = "dir";
                }
            })
            if (d.code === 200) {
                zTreeObj = $.fn.zTree.init($("#treeDemo"), settings, d.data);
            } else {
                parent.toast.error({message: "加载文件列表失败",position: 'topCenter'});
            }
        },
        error: function () {
            parent.toast.error({message: "加载文件列表失败",position: 'topCenter'});
        }
    });

    let loadIndex;
    // 渲染上传文件
    upload.render({
        elem: '#m_uploadFile',
        url: '/admin/theme/uploadFile',
        auto: true,
        accept: 'file',
        data: {
            id: function () {
                if (currTreeNode !== null) {
                    return currTreeNode.obj.id;
                }
                return "-1";
            },
            path: function () {
                if (currTreeNode !== null) {
                    return currTreeNode.obj.path;
                }
              return $("#path").val();
            }
        },
        choose: function (obj) {},
        error: function () {
            parent.toast.error({message: "上传失败",position: 'topCenter'});
        },
        before: function (obj) {
            loadIndex = layer.load("正在上传");
        },
        done: function (res) {
            layer.close(loadIndex);
            if (res.code === 200) {
                parent.toast.success({message: "上传成功",position: 'topCenter'});
                if ( res.data.fileType === "dir") {
                    res.data.iconSkin = "dir";
                }
                zTreeObj.addNodes(currTreeNode, res.data);
                zTreeObj.refresh();
            } else {
                parent.toast.error({message: res.msg,position: 'topCenter'});
            }
        }
    });
});

// 点击节点事件
function clickNode(event, treeId,treeNode) {
    if (["jpg","png","gif","ico"].indexOf(treeNode.obj.fileType) >= 0) {
        layer.photos({
            photos: {
                "title": treeNode.title,
                "id": 1,
                "start": 0,
                "data": [
                    {
                        "alt": treeNode.title,
                        "pid": 1,
                        "src": "/static/themes/"+treeNode.obj.path,
                        "thumb": "/static/themes/"+treeNode.obj.path
                    }
                ],
            },
            anim: 5,
            offset: "40px"
        })
    } else if (treeNode.obj.fileType !== "dir") {
        loadFileContent(treeNode);
    }
}

/// 右键
function rightClick(event, treeId, treeNode){
    currTreeNode = treeNode;
    zTreeObj.selectNode(treeNode);
    let x = event.clientX+document.body.scrollLeft,
        y = event.clientY+document.body.scrollTop;
    if(treeNode === null ){
        $("#m_add").show();
        $("#m_addDir").show();
        $("#m_uploadFile").show();
        $("#m_rename").hide();
        $("#m_del").hide();
    }  else if (treeNode.obj.path === $("#path").val() + "/index.html" ||
        treeNode.obj.path === $("#path").val() + "/theme.properties" ) {
        $("#m_add").hide();
        $("#m_addDir").hide();
        $("#m_uploadFile").hide();
        $("#m_rename").hide();
        $("#m_del").hide();
        parent.toast.error({message: "主题必要文件,不允许重命名及删除操作",position: 'topCenter'});
    } else if (treeNode.obj.fileType !== "dir") {
        $("#m_add").hide();
        $("#m_addDir").hide();
        $("#m_uploadFile").hide();
        $("#m_rename").show();
        $("#m_del").show();
    } else {
        $("#m_add").show();
        $("#m_addDir").show();
        $("#m_uploadFile").show();
        $("#m_rename").show();
        $("#m_del").show();
    }
    $("#rMenu").css({"top":y+"px", "left":x+"px", "visibility":"visible"});
    $("body").bind("mousedown", onBodyMouseDown);
}

function onBodyMouseDown(event){
    if (!(event.target.id === "rMenu" || $(event.target).parents("#rMenu").length>0)) {
        $("#rMenu").css({"visibility" : "hidden"});
    }
}

// 新建文件
$("#rMenu").on("click","#m_add",function () {
    $("#rMenu").css({"visibility" : "hidden"});
    createFileOrDir("file");
});

// 新建文件夹
$("#rMenu").on("click","#m_addDir",function () {
    $("#rMenu").css({"visibility" : "hidden"});
    createFileOrDir("dir");
});

// 上传文件
$("#rMenu").on("click","#m_uploadFile",function () {
    $("#rMenu").css({"visibility" : "hidden"});
});

// 重命名
$("#rMenu").on("click","#m_rename",function () {
    $("#rMenu").css({"visibility" : "hidden"});
    zTreeObj.editName(currTreeNode);
});

// 删除
$("#rMenu").on("click","#m_del",function () {
    $("#rMenu").css({"visibility" : "hidden"});
    $.ajax({
        type: "POST",
        url: "/admin/theme/deleteFile",
        data:  {path:  currTreeNode.obj.path},
        success: function (d) {
            if (d.code === 200) {
                zTreeObj.removeNode(currTreeNode);
                zTreeObj.refresh();
                parent.toast.success({message: "删除成功",position: 'topCenter'});
            } else {
                parent.toast.error({message: "删除失败",position: 'topCenter'});
            }
        },
        error: function () {
            parent.toast.error({message: "删除失败",position: 'topCenter'});
        }
    });
});

/**
 * 创建文件或者文件夹
 * @param type
 */
function createFileOrDir(type) {
    layer.prompt({title: '请输入文件名称', formType: 3,  offset: "40px"}, function(name, index){
        layer.close(index);
        var param;
        if (currTreeNode === null) {
            param = {fileName: name, theme: $("#path").val(),filePath: "",type: type, path: $("#path").val()};
        } else {
            param = {fileName: name, theme: $("#path").val(), filePath: currTreeNode.obj.filePath,type: type, path: currTreeNode.obj.path};
        }
        $.ajax({
            type: "POST",
            url: "/admin/theme/createFileOrDir",
            data:  param,
            success: function (d) {
                if (d.code === 200) {
                    var newNode;
                    if (currTreeNode === null) {
                        newNode = { id: new Date().getTime(), pid: "-1", title: name, obj: d.data};
                        if (d.data.fileType === "dir") {
                            newNode.iconSkin = "dir";
                        }
                        newNode = zTreeObj.addNodes(null, newNode);
                    } else {
                        newNode = { id: new Date().getTime(), pid: zTreeObj.getSelectedNodes()[0].id, title: name, obj: d.data};
                        newNode.checked = zTreeObj.getSelectedNodes()[0].checked;
                        if (d.data.fileType === "dir") {
                            newNode.iconSkin = "dir";
                        }
                        newNode = zTreeObj.addNodes(zTreeObj.getSelectedNodes()[0], newNode);
                    }
                    zTreeObj.selectNode(newNode[0]);
                } else {
                    parent.toast.error({message: "文件创建失败",position: 'topCenter'});
                }
            },
            error: function () {
                parent.toast.error({message: "文件创建失败",position: 'topCenter'});
            }
        });
    });
}

/**
 * 重命名
 * @param treeId
 * @param treeNode
 * @param newName
 * @param isCancel
 */
function beforeRename(treeId, treeNode,newName, isCancel){
    $.ajax({
        type: "POST",
        url: "/admin/theme/reNameFile",
        data:  {filePath: treeNode.obj.filePath, newName: newName, id: treeNode.id, theme: $("#path").val(),path: treeNode.obj.path},
        success: function (d) {
            if (d.code === 200) {
                currTreeNode.title = d.data.rename.title;
                currTreeNode.obj.fileName = d.data.rename.obj.fileName;
                currTreeNode.obj.filePath = d.data.rename.obj.filePath;
                currTreeNode.obj.fileType = d.data.rename.obj.fileType;
                currTreeNode.obj.path = d.data.rename.obj.path;
                if (currTreeNode && currTreeNode.children.length>0) {
                    zTreeObj.removeChildNodes(currTreeNode);
                    d.data.children.forEach(function (value) {
                        if (value.obj.fileType === "dir") {
                            value.iconSkin = "dir";
                        }
                    })
                    zTreeObj.addNodes(currTreeNode, d.data.children);
                }
                zTreeObj.refresh();
            } else {
                parent.toast.error({message: "重命名失败",position: 'topCenter'});
            }
        },
        error: function () {
            parent.toast.error({message: "重命名失败",position: 'topCenter'});
        }
    });
}

/**
 * 加载文件内容至编辑器
 * @param treeNode
 */
function loadFileContent(treeNode) {
    let loadIndex = layer.load();
    $.ajax({
        type: "POST",
        url: "/admin/theme/getFileContent",
        data: {path: treeNode.obj.path},
        success: function (d) {
            layer.close(loadIndex);
            if (d.code === 200) {
                editor.setValue(d.data);
                $("#currEditFile").text(treeNode.obj.path);
                $("#currEditFilePath").val(treeNode.obj.path);
                switch (treeNode.obj.fileType) {
                    case 'html':
                        editor.setOption("mode","text/html");
                        break;
                    case 'css':
                        editor.setOption("mode","css");
                        break;
                    case 'js':
                        editor.setOption("mode","javascript");
                        break;
                }
            } else {
                parent.toast.error({message: "加载文件失败",position: 'topCenter'});
            }
        },
        error: function () {
            layer.close(loadIndex);
            parent.toast.error({message: "加载文件失败",position: 'topCenter'});
        }
    });
}

$(".p-container").on("click",".saveFileBtn",function () {
    save();
});

window.addEventListener("keydown", function(e) {
    if((e.key==='s'||e.key==='S')&&(navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)){
        e.preventDefault();
        save();
    }
}, false);

function save() {
    let loadIndex = layer.load();
    $.ajax({
        type: "POST",
        url: "/admin/theme/saveFileContent",
        data: {path: $("#currEditFilePath").val(), content: editor.getValue()},
        success: function (d) {
            layer.close(loadIndex);
            if (d.code === 200) {
                parent.toast.success({message: "文件保存成功",position: 'topCenter'});
            } else {
                parent.toast.error({message: "文件保存失败",position: 'topCenter'});
            }
        },
        error: function () {
            layer.close(loadIndex);
            parent.toast.error({message: "文件保存失败",position: 'topCenter'});
        }
    });
}