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
 * @param name
 */
function selectImg(path, name) {
    if (type === 1){
        $("#" + selectImgId).children("input").val(path);
        $("#" + selectImgId).children(".p-upload-show").children(".p-show-img").attr("src", path);
        $("#" + selectImgId).children(".p-upload").hide();
        $("#" + selectImgId).children(".p-upload-show").show();
    } else if(type === 3) {
        const viewFragment = editor.data.processor.toView('<img src="'+path+'" alt="'+name+'"><br>');
        const modelFragment = editor.data.toModel(viewFragment);
        editor.model.insertContent(modelFragment, editor.model.document.selection);
        editor.focus();
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
 * @param activeType 1:正常图片选择,2编辑器图片选择,3富文本
 * @param id
 * @param currEditor
 * @param cm
 * @param icon
 * @param cursor
 * @param selection
 */
function openSelectImPanel(activeType,id,currEditor,cm, icon, cursor, selection) {
    type = activeType;
    if (type === 1) {
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
        area:  ['700px', '510px'],
        shadeClose: true,
        anim: 1,
        move: true,
        content: '/admin/attach/img'
    });
}

/**
 * 打开选择附件面板
 * @param activeType 1:正常图片选择,2编辑器图片选择,3富文本
 * @param currEditor
 * @param cm
 * @param icon
 * @param cursor
 * @param selection
 */
function openSelectAttachPanel(activeType,currEditor,cm, icon, cursor, selection) {
    changeMode(activeType, currEditor,cm, icon, cursor, selection);
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
 * @param activeType 1:正常图片选择,2编辑器图片选择,3富文本
 * @param currEditor
 * @param cm
 * @param icon
 * @param cursor
 * @param selection
 */
function openSelectVideoPanel(activeType, currEditor,cm, icon, cursor, selection) {
    changeMode(activeType, currEditor,cm, icon, cursor, selection);
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
    if (type === 1) {
        const str = '<video src="'+path+'" controls="controls" width="100%"></video>\n';
        EditorCm.replaceSelection(str);
        if(EditorSelection === "") {
            EditorCm.setCursor(EditorCursor.line + 1, EditorCursor.ch + str.length);
        }
        editor.focus();
    } else if (type === 3) {
        const viewFragment = editor.data.processor.toView('<video src="'+path+'" controls="controls" width="100%"></video>');
        const modelFragment = editor.data.toModel(viewFragment);
        editor.model.insertContent(modelFragment, editor.model.document.selection);
        editor.focus();
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
        const viewFragment = editor.data.processor.toView('<a href="'+path+name+'">'+name+'</a>');
        const modelFragment = editor.data.toModel(viewFragment);
        editor.model.insertContent(modelFragment, editor.model.document.selection);
        editor.focus();
    }
}


function changeMode(activeType, currEditor,cm, icon, cursor, selection) {
    type = activeType;
    if (activeType === 1) {
        EditorCm = cm;
        EditorCursor = cursor;
        EditorIcon = icon;
        EditorSelection = selection;
        editor = currEditor;
    } else if(type === 3){
        editor = currEditor;
    }
}