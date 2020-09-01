// 当前编辑器类型
let currEditorType = 'markdown';
// markdown编辑器
let markdownEditor;
// 富文本编辑器
let richTextEditor;
init();
/**
 * 页面初始化
 */
function init() {
    initEditor();
    initEvent();
}

/**
 * 初始化编辑器
 */
function initEditor() {
    initMarkdownEditor();
}

/**
 * 初始化页面事件
 */
function initEvent() {
    $(".editor-switch-btn").on('click', function () {
        pConfirm('提示', '确定要更换编辑器吗?更换后编辑器内容将清空!', null, function () {
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
        })
    });
}

/**
 * 初始化markdown编辑器
 */
function initMarkdownEditor() {
    currEditorType = 'markdown';
    markdownEditor = editormd("editor", {
        placeholder : '文章内容',
        width : "100%",
        height : '600',
        syncScrolling : "single",
        path : "/public/libs/editormd/lib/", //注意2：你的路径
        saveHTMLToTextarea : false,
        tex : true, // 开启科学公式TeX语言支持，默认关闭
        watch : false,
        imageUpload : false,
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

/**
 * 初始化富文本编辑器
 */
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