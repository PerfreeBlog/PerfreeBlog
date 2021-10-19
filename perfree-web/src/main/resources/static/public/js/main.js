let selectImgId = "",type = 1,EditorCm, EditorIcon, EditorCursor, EditorSelection,editor;
initSelectImg();
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

/**
 * 选择图片
 * @param path
 */
function selectImg(path) {
    if (type === 1){
        $("#" + selectImgId).children("input").val(path);
        $("#" + selectImgId).children(".p-upload-show").children(".p-show-img").attr("src", path);
        $("#" + selectImgId).children(".p-upload").hide();
        $("#" + selectImgId).children(".p-upload-show").show();
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
 * @param activeType 1:正常图片选择,2编辑器图片选择
 * @param id
 * @param markdownEditor
 * @param cm
 * @param icon
 * @param cursor
 * @param selection
 */
function openSelectImPanel(activeType,id,markdownEditor,cm, icon, cursor, selection) {
    type = activeType;
    if (type === 1) {
        selectImgId = id;
    } else {
        EditorCm = cm;
        EditorCursor = cursor;
        EditorIcon = icon;
        EditorSelection = selection;
        editor = markdownEditor;
    }
    layer.open({
        title: "选择图片",
        type: 2,
        offset: '10%',
        area:  ['700px', '510px'],
        shadeClose: true,
        anim: 1,
        move: true,
        content: '/admin/attach/img'
    });
}

/**
 * 打开选择附件面板
 * @param markdownEditor
 * @param cm
 * @param icon
 * @param cursor
 * @param selection
 */
function openSelectAttachPanel(markdownEditor,cm, icon, cursor, selection) {
    EditorCm = cm;
    EditorCursor = cursor;
    EditorIcon = icon;
    EditorSelection = selection;
    editor = markdownEditor;
    layer.open({
        title: "选择附件",
        type: 2,
        offset: '10%',
        area:  ['700px', '510px'],
        shadeClose: true,
        anim: 1,
        move: true,
        content: '/admin/attach/attach'
    });
}

/**
 * 打开选择视频面板
 * @param markdownEditor
 * @param cm
 * @param icon
 * @param cursor
 * @param selection
 */
function openSelectVideoPanel(markdownEditor,cm, icon, cursor, selection) {
    EditorCm = cm;
    EditorCursor = cursor;
    EditorIcon = icon;
    EditorSelection = selection;
    editor = markdownEditor;
    layer.open({
        title: "选择视频",
        type: 2,
        offset: '10%',
        area:  ['700px', '510px'],
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
    const str = '<video src="'+path+'" controls="controls" width="100%"></video>\n';
    EditorCm.replaceSelection(str);
    if(EditorSelection === "") {
        EditorCm.setCursor(EditorCursor.line + 1, EditorCursor.ch + str.length);
    }
    editor.focus();
}

/**
 * 选择附件
 * @param path
 */
function selectAttach(name,path) {
    const str = '['+name+']('+path+' "'+name+'")\n';
    EditorCm.replaceSelection(str);
    if(EditorSelection === "") {
        EditorCm.setCursor(EditorCursor.line + 1, EditorCursor.ch + str.length);
    }
    editor.focus();
}