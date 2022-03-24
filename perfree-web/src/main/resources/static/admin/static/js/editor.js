var layer,markdownEditor,richEditor;
const E = window.wangEditor;

/**
 * 初始化编辑器
 */
function initEditor(editorMode, content){
    layui.use(['layer', 'form', 'xmSelect'], function () {
        layer = layui.layer;
        if (editorMode === "html") {
            initRichEditor(content);
            $("#editorMode").val("html");
            $(".switchEditor").text("切换为Markdown编辑器");
        } else {
            initMarkdownEditor(content);
            $("#editorMode").val("markdown");
            $(".switchEditor").text("切换为富文本编辑器");
        }
    });
}


/**
 * 切换编辑器
 */
function switchEditor(){
    layer.confirm('如果当前编辑器有内容则会自动清空,确定要切换编辑器吗?', {icon: 3, title: '提示'}, function (index) {
        layer.close(index);
        let i = layer.load();
        if ($("#editorMode").val() === "markdown") {
            if (markdownEditor) {
                markdownEditor.editor.remove();
            }
            initRichEditor("");
            $("#editorMode").val("html");
            localStorage.setItem("editor", "html");
            $(".switchEditor").text("切换为Markdown编辑器");
        } else {
            $("#editorMode").val("markdown");
            if (richEditor) {
                richEditor.destroy();
            }
            initMarkdownEditor("");
            localStorage.setItem("editor", "markdown");
            $(".switchEditor").text("切换为富文本编辑器");
        }
        layer.close(i);
    });
}

/**
 * 初始化富文本编辑器
 */
function initRichEditor(content){
    $("#editorBox").html("<div id='editor'></div>");
    richEditor = new E('#editor');
    richEditor.config.height = 650;
    richEditor.config.zIndex = 500;
    richEditor.config.placeholder = '请输入文章内容';
    richEditor.config.showFullScreen = true;
    richEditor.highlight = hljs;
    richEditor.config.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        'todo',
        'justify',
        'quote',
        'emoticon',
        'table',
        'code',
        'splitLine',
        'undo',
        'redo',
        'image',
    ];
    const customVideoMenuKey = 'customVideoMenuKey';
    richEditor.menus.extend('customVideoMenuKey', CustomVideoMenu);
    richEditor.config.menus = richEditor.config.menus.concat(customVideoMenuKey);

    const customAttachMenuKey = 'customAttachMenuKey';
    richEditor.menus.extend('customAttachMenuKey', CustomAttachMenu);
    richEditor.config.menus = richEditor.config.menus.concat(customAttachMenuKey);
    richEditor.config.uploadImgFromMedia = function () {
        openSelectImPanel(3, null,richEditor,null, null, null, null)
    }
    richEditor.config.pasteFilterStyle = false;
    richEditor.create();
    if (confirmEnding(content,"</pre>")){
        content += "<p><br></p>";
    }
    richEditor.txt.html(content);
    initPasteDragImg("editor",richEditor, 1);
}


/**
 * 初始化markdown编辑器
 */
function initMarkdownEditor(content) {
    $("#editorBox").html("<div id='editor'></div>");
    markdownEditor = editormd("editor", {
        htmlDecode : true,
        placeholder: '请输入文章内容',
        width: "100%",
        height: '680',
        name: "mdContent",
        syncScrolling: "single",
        path: "/static/public/libs/editormd/lib/", //注意2：你的路径
        saveHTMLToTextarea: false,
        tex: true, // 开启科学公式TeX语言支持，默认关闭
        watch: false,
        imageUpload: true,
        imageUploadURL : "/admin/attach/upload",
        markdown: content,
        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        toolbarIcons: function () {
            return [
                "undo", "|",
                "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
                "h1", "h2", "h3", "h4", "h5", "h6", "|",
                "list-ul", "list-ol", "hr", "|","customImg","customVideo", "customAttach","|",
                "link", "reference-link",  "code", "preformatted-text", "code-block", "table", "datetime", "|",
                "goto-line", "watch", "preview", "clear", "search","customPageScreen","customFullscreen"
            ]
        },
        toolbarIconsClass: {
            customImg: "fa-picture-o",
            customVideo: "fa-video-camera",
            customAttach: "fa-file-archive-o",
            customFullscreen: "fa-arrows-alt",
            customPageScreen: "fa-window-maximize"
        },
        toolbarHandlers: {
            customImg: function (cm, icon, cursor, selection) {
                openSelectImPanel(2, null, markdownEditor, cm, icon, cursor, selection);
            },
            customVideo: function (cm, icon, cursor, selection) {
                openSelectVideoPanel(1, markdownEditor, cm, icon, cursor, selection);
            },
            customAttach: function (cm, icon, cursor, selection) {
                openSelectAttachPanel(1, markdownEditor, cm, icon, cursor, selection);
            },
            customFullscreen: function () {
                editorFullscreen(1);
            },
            customPageScreen: function () {
                editorPageScreen();
            }
        },
        lang: {
            toolbar: {
                customImg: "插入图片",
                customVideo: "插入视频",
                customAttach: "插入附件",
                customFullscreen: "全屏",
                customPageScreen: "网页全屏"
            }
        },
        onload : function() {
            initPasteDragImg(this.id,this, 0);
        }
    });
}

function editorFullscreen(type) {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    } else {
        console.info("当前浏览器不支持部分全屏！");
    }

    $("#editorBox").addClass("fullscreen");

    if (type === 1) {
        markdownEditor.resize("100%", "100%");
    }
    if (type === 2) {
        $(".ck-editor__main").css({height: "100%"});
        richEditor.sourceElement.nextElementSibling.setAttribute( 'id', 'ck-editor__full' );
    }

    window.onresize = function () {
        if (isFullscreen() === false && type === 1) {
            $("#editorBox").removeClass("fullscreen");
            markdownEditor.resize("100%", "680");
        }
        if (isFullscreen() === false && type === 2) {
            $(".ck-editor__main").css({height: "620px"});
            $("#editorBox").removeClass("fullscreen");
            richEditor.sourceElement.nextElementSibling.removeAttribute( 'id');
        }
    }
}

function isFullscreen() {
    return document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement || false;
}

/**
 * markdown编辑器复制粘贴图片
 * @param eleId
 * @param Editor
 * @param type
 */
function initPasteDragImg(eleId, Editor, type){
    let doc = document.getElementById(eleId)
    doc.addEventListener('paste', function (event) {
        let items = (event.clipboardData || window.clipboardData).items;
        let file = null;
        if (items && items.length) {
            // 搜索剪切板items
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    file = items[i].getAsFile();
                    break;
                }
            }
        } else {
            console.log("当前浏览器不支持");
            return;
        }
        if (!file) {
            console.log("粘贴内容非图片");
            return;
        }
        uploadImg(file,Editor, type);
    });
    let dashboard = document.getElementById(eleId)
    dashboard.addEventListener("dragover", function (e) {
        e.preventDefault()
        e.stopPropagation()
    })
    dashboard.addEventListener("dragenter", function (e) {
        e.preventDefault()
        e.stopPropagation()
    })
    dashboard.addEventListener("drop", function (e) {
        e.preventDefault()
        e.stopPropagation()
        let files = this.files || e.dataTransfer.files;
        uploadImg(files[0],Editor,type);
    })
}

/**
 * 编辑器上传图片
 * @param file
 * @param Editor
 * @param type 0:markdown,1:富文本
 */
function uploadImg(file,Editor, type){
    let i = layer.load();
    let formData = new FormData();
    let fileName=new Date().getTime()+"."+file.name.split(".").pop();
    formData.append('file', file, fileName);
    $.ajax({
        url: '/admin/attach/upload',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function (data) {
            layer.close(i);
            if(data.code === 200){
                if (type === 0) {
                    Editor.insertValue("![]("+data.data.url+")");
                }
                if (type === 1) {
                    Editor.cmd.do('insertHTML', '<img src="'+data.data.url+'" style="max-width:100%;"><br>');
                }
            }else{
                console.log(data);
                alert("上传失败");
            }
        }
    });
}


class CustomVideoMenu extends E.BtnMenu {
    constructor(editor) {
        const $elem = E.$(
            `<div class="w-e-menu" data-title="插入视频">
                <i class="fa fa-video-camera" aria-hidden="true"></i>
            </div>`
        )
        super($elem, editor)
    }
    clickHandler() {
        openSelectVideoPanel(3, richEditor,null, null, null, null)
    }
    tryChangeActive() {
    }
}
class CustomAttachMenu extends E.BtnMenu {
    constructor(editor) {
        const $elem = E.$(
            `<div class="w-e-menu" data-title="插入附件">
                 <i class="fa fa-file-archive-o" aria-hidden="true"></i>
            </div>`
        )
        super($elem, editor)
    }
    clickHandler() {
        openSelectAttachPanel(3,richEditor,null, null, null, null)
    }
    tryChangeActive() {
    }
}

function confirmEnding(str, target) {
    let start = str.length-target.length;
    let arr = str.substr(start,target.length);
    return arr === target;
}

let isPageScreen = false;
function editorPageScreen(){
    if (isPageScreen) {
        $("#editorBox").removeClass("pageScreen");
    } else {
        $("#editorBox").addClass("pageScreen");
    }
    markdownEditor.resize("100%", "100%");
    isPageScreen = !isPageScreen;
}