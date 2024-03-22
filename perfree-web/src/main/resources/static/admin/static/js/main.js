let selectImgId = "",type = 1,EditorCm, EditorIcon, EditorCursor, EditorSelection,editor,attachId="";
initSelectImg();
initSelectVideo();
initSelectAttach();
/**
 * 初始化图片选择
 */
function initSelectImg() {
    $(".p-upload-box").append('<div class="p-upload" title="点击选择图片">\n' +
        '                                        <span><i class="layui-icon layui-icon-upload"></i></span>\n' +
        '                                    </div>\n' +
        '                                    <div class="p-upload-show">\n' +
        '                                        <img class="p-show-img" src="">\n' +
        '                                        <div class="p-delete-img">\n' +
        '                                            <i class="layui-icon layui-icon-delete p-delete-img-btn"></i>\n' +
        '                                        </div>\n' +
        '                                    </div>');

    // 文件选择点击事件
    $(".p-upload-box").on("click",".p-upload",function () {
        const id = $(this).parent(".p-upload-box").attr('id');
        openSelectImPanel(1,id, null,null,null,null);
    });

    $(".p-upload-input-box").on("click",function () {
        const id = $(this).attr('id');
        openSelectImPanel(0,id, null,null,null,null);
    });


    $(".p-upload-box").on('mouseenter', '.p-upload-show', function() {
        $(this).children(".p-delete-img").show();
    });

    $('.p-upload-box').on('mouseleave', '.p-upload-show', function() {
        $(this).children(".p-delete-img").hide();
    });

    $(".p-upload-box").on("click",".p-delete-img-btn",function () {
        $(this).parent(".p-delete-img").parent(".p-upload-show").parent(".p-upload-box").children("input").val("");
        $(this).parent(".p-delete-img").parent(".p-upload-show").children(".p-show-img").attr("src", "");
        $(this).parent(".p-delete-img").parent(".p-upload-show").parent(".p-upload-box").children(".p-upload").show();
        $(this).parent(".p-delete-img").parent(".p-upload-show").parent(".p-upload-box").children(".p-upload-show").hide();
    });

    $(".p-upload-box").each(function () {
        if ($(this).children("input").val() !== undefined && $(this).children("input").val() !== '') {
            $(this).children("input").val($(this).children("input").val());
            $(this).children(".p-upload-show").children(".p-show-img").attr("src", $(this).children("input").val());
            $(this).children(".p-upload").hide();
            $(this).children(".p-upload-show").show();
        }
    });
}

function initSelectVideo() {
    $(".p-upload-video-input-box").on("click",function () {
        const id = $(this).attr('id');
        openSelectVideoPanel(4, null,null, null, null, null, id)
    });
}

function initSelectAttach() {
    $(".p-upload-attach-input-box").on("click",function () {
        const id = $(this).attr('id');
        openSelectAttachPanel(4,null,null, null, null, null, id);
    });
}

/**
 * 选择图片
 * @param path
 * @param name
 */
function selectImg(path, name) {
    if (type === 0) {
        $("input[name='"+selectImgId+"']").val(path);
    } else if (type === 1){
        $("#" + selectImgId).children("input").val(path);
        $("#" + selectImgId).children(".p-upload-show").children(".p-show-img").attr("src", path);
        $("#" + selectImgId).children(".p-upload").hide();
        $("#" + selectImgId).children(".p-upload-show").show();
    } else if(type === 3) {
        editor.cmd.do('insertHTML', '<img src="'+path+'" style="max-width:100%;"><br>');
    } else {
        EditorCm.replaceSelection("![]("+path+")");
        if(EditorSelection === "") {
            EditorCm.setCursor(EditorCursor.line, EditorCursor.ch + 2);
        }
        editor.focus();
    }
}

/**
 * 打开选择图片面板
 * @param activeType 0:input方式图片选择,1:正常图片选择,2编辑器图片选择,3富文本
 * @param id
 * @param currEditor
 * @param cm
 * @param icon
 * @param cursor
 * @param selection
 */
function openSelectImPanel(activeType,id,currEditor,cm, icon, cursor, selection) {
    type = activeType;
    if (type === 1 || type === 0) {
        selectImgId = id;
    } else if(type === 3) {
        editor = currEditor;
    }else {
        EditorCm = cm;
        EditorCursor = cursor;
        EditorIcon = icon;
        EditorSelection = selection;
        editor = currEditor;
    }
    layer.open({
        title: "选择图片",
        type: 2,
        offset: '10%',
        area: layerArea($("html")[0].clientWidth, 700, 500),
        shadeClose: true,
        anim: 1,
        move: true,
        content: '/admin/attach/img'
    });
}

/**
 * 打开选择附件面板
 * @param activeType
 * @param currEditor
 * @param cm
 * @param icon
 * @param cursor
 * @param selection
 * @param id
 */
function openSelectAttachPanel(activeType,currEditor,cm, icon, cursor, selection, id = null) {
    changeMode(activeType, currEditor,cm, icon, cursor, selection, id);
    layer.open({
        title: "选择附件",
        type: 2,
        offset: '10%',
        area:  layerArea($("html")[0].clientWidth, 700, 500),
        shadeClose: true,
        anim: 1,
        move: true,
        content: '/admin/attach/attach'
    });
}

/**
 * 打开选择视频面板
 * @param activeType
 * @param currEditor
 * @param cm
 * @param icon
 * @param cursor
 * @param selection
 * @param id
 */
function openSelectVideoPanel(activeType, currEditor,cm, icon, cursor, selection, id = null) {
    changeMode(activeType, currEditor,cm, icon, cursor, selection,id);
    layer.open({
        title: "选择视频",
        type: 2,
        offset: '10%',
        area: layerArea($("html")[0].clientWidth, 700, 500),
        shadeClose: true,
        anim: 1,
        move: true,
        content: '/admin/attach/video'
    });
}

/**
 * 选择视频
 * @param path
 */
function selectVideo(path) {
    if (type === 1) {
        const str = '<video src="'+path+'" controls="controls" width="100%"></video>\n';
        EditorCm.replaceSelection(str);
        if(EditorSelection === "") {
            EditorCm.setCursor(EditorCursor.line + 1, EditorCursor.ch + str.length);
        }
        editor.focus();
    } else if (type === 3) {
        editor.cmd.do('insertHTML', '<video src="'+path+'" controls="controls" style="max-width: 100%"></video>');
    } else if (type === 4) {
        $("input[name='"+attachId+"']").val(path);
    }
}

/**
 * 选择附件
 * @param name
 * @param path
 */
function selectAttach(name,path) {
    if (type === 1) {
        const str = '['+name+']('+path+' "'+name+'")\n';
        EditorCm.replaceSelection(str);
        if(EditorSelection === "") {
            EditorCm.setCursor(EditorCursor.line + 1, EditorCursor.ch + str.length);
        }
        editor.focus();
    } else if (type === 3) {
        editor.cmd.do('insertHTML', '<a href="'+path+name+'">'+name+'</a>');
    } else if (type === 4) {
        $("input[name='"+attachId+"']").val(path);
    }
}


function changeMode(activeType, currEditor,cm, icon, cursor, selection,id) {
    type = activeType;
    if (activeType === 1) {
        EditorCm = cm;
        EditorCursor = cursor;
        EditorIcon = icon;
        EditorSelection = selection;
        editor = currEditor;
    } else if(type === 3){
        editor = currEditor;
    } else if(type === 4) {
        attachId = id;
    }
}

function layerArea(clientWidth, width, height) {
    if (height !== 'auto') {
        height += 'px';
    }
    var a = clientWidth - width;
    if(a > 10) {
        return [width + 'px', height]
    } else{
        return ['100%', height]
    }
}