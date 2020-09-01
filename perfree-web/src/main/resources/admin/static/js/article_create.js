let currEditorType = 'markdown';
let markdownEditor;
let richTextEditor;

initEditor();
initEvent();


function initEditor() {
    initMarkdownEditor();
}

function initEvent() {
    $(".editor-switch-btn").on('click', function () {
        $("#editor").remove();
        $("#editorBox").append('<div id="editor"></div>');
        if (currEditorType === 'markdown') {
            $("#currEditor").text("富文本");
            $(".editor-switch-btn").text("切换MarkDown编辑器");
            initWangEditor();
        } else {
            $("#currEditor").text("MarkDown");
            $(".editor-switch-btn").text("切换富文本编辑器");
            initMarkdownEditor();
        }
    });
}

function initMarkdownEditor() {
    currEditorType = 'markdown';
    markdownEditor = editormd("editor", {
        placeholder : '文章内容',
        width : "100%",
        height : '600',
        syncScrolling : "single",
        taskList : true,
        path : "/public/libs/editormd/lib/", //注意2：你的路径
        saveHTMLToTextarea : true,
        tocm : true, // Using [TOCM]
        tex : true, // 开启科学公式TeX语言支持，默认关闭
        watch : false,
        flowChart : true, // 开启流程图支持，默认关闭
        imageUpload : true,
        imageFormats : [ "jpg", "jpeg", "gif", "png", "bmp", "webp" ],
        imageUploadURL : "${proPath }/base/blog/upFile", //注意你后端的上传图片服务地址
        toolbarIcons : function() {
            return [
                "undo", "redo", "|",
                "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
                "h1", "h2", "h3", "h4", "h5", "h6", "|",
                "list-ul", "list-ol", "hr", "|",
                "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "|",
                "goto-line", "watch", "preview", "fullscreen", "clear", "search"
            ]
        },
    });
}

function initWangEditor() {
    currEditorType = 'richText';
    let E = window.wangEditor;
    richTextEditor = new E('#editor');
    richTextEditor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ];
    richTextEditor.create();
    $(".editorImage").on('click', function (e) {
        alert(1)
        e.preventDefault();
        return false;
    });
}