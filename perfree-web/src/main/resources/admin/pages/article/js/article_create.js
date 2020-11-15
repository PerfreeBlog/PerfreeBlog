let layer,form,xmSelect;
// 当前编辑器类型
let currEditorType = 'markdown';
// markdown编辑器
let markdownEditor;
// 富文本编辑器
let richTextEditor;
layui.config({
    base: '/public/libs/layuiComponents/'
}).extend({
    xmSelect:'xm-select/xm-select'
})
layui.use(['layer','form','xmSelect'], function(){
    layer = layui.layer;
    form = layui.form;
    xmSelect = layui.xmSelect;
    layer.config({
        offset: '20%'
    });
    init();
});

/**
 * 页面初始化
 */
function init() {
    initEditor();
    initEvent();
    initTag();
    initCategory();
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
        layer.confirm('确定要更换编辑器吗?更换后编辑器内容将清空!', {icon: 3, title:'提示'}, function(index){
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
            layer.close(index);
        });
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

/**
 * 初始化标签选择框
 */
function initTag() {
    xmSelect.render({
        el: '#tag',
        tips: '请选择标签',
        theme: {
            color: '#5FB878',
        },
        searchTips: '搜索标签或输入标签名新增',
        filterable: true,
        create: function(val, arr){
            //返回一个创建成功的对象, val是搜索的数据, arr是搜索后的当前页面数据
            return {
                name: '创建-' + val,
                value: val
            }
        },
        data: [
            {name: '张三', value: 1},
            {name: '李四', value: 2},
            {name: '王五', value: 3},
        ]
    });
}

/**
 * 初始化分类选择框
 */
function initCategory() {
    xmSelect.render({
        el: '#category',
        theme: {
            color: '#5FB878',
        },
        model: { label: { type: 'text' } },
        radio: true,
        tips: '请选择分类',
        filterable: true,
        searchTips: '输入分类名搜索',
        clickClose: true,
        tree: {
            show: true,
            strict: false,
            expandedKeys: [ -1 ],
        },
        height: 'auto',
        data(){
            return [
                {name: '销售员', value: -1, children: [
                        {name: '张三', value: 100},
                        {name: '李四1', value: 2},
                    ]},
                {name: '奖品', value: -2, children: [
                        {name: '奖品3', value: -3, children: [
                                {name: '苹果3', value: 14},
                                {name: '香蕉3', value: 15},
                                {name: '葡萄3', value: 16},
                            ]},
                        {name: '苹果2', value: 4},
                        {name: '香蕉2', value: 5},
                        {name: '葡萄2', value: 6},
                    ]},
            ]
        }
    })
}


function selectImg() {
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