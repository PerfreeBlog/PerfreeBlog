var form, categorySelect,tagSelect,loadIndex,toast, layer;
layui.use(['layer', 'form','toast'], function () {
    layer = layui.layer;
    form = layui.form;
    toast = layui.toast;
    initEditor("markdown", $("#mdContent").val());
    initEvent();
});

/**
 * 初始化页面事件
 */
function initEvent() {
    // 表单验证
    form.verify({});
    // 表单提交
    form.on('submit(publishForm)', function (data) {
        data.field.status = 0;
        submitArticle(data.field);
        return false;
    });

    window.addEventListener("keydown", function(e) {
        if((e.key==='s'||e.key==='S')&&(navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)){
            e.preventDefault();
            $("#publishBtn").click();
        }
    }, false);
}

/**
 * 提交文章
 * @param data
 */
function submitArticle(data) {
    data.content = markdownEditor.getMarkdown();
    if (!data.content || data.content === '') {
        parent.toast.error({message: "内容不允许为空",position: 'topCenter'});
        return;
    }
    $.ajax({
        type: "POST",
        url: "/admin/journal/update",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (d) {
            if (d.code === 200) {
                parent.toast.success({message: "修改成功",position: 'topCenter'});
                parent.layui.admin.toPage('/admin/journal', '', '', true);
                parent.layui.admin.closeTab('journalUpdatePage');
            } else {
                parent.toast.error({message: d.msg,position: 'topCenter'});
            }
        },
        error: function (data) {
            parent.toast.error({message: "修改失败",position: 'topCenter'});
        }
    });
}
