let form, element, layer;
layui.use(['layer', 'form', 'element'], function () {
    form = layui.form;
    element = layui.element;
    layer = layui.layer;
    loadMenuList();
    // 表单验证
    form.verify({});
    // 表单提交
    form.on('submit(addForm)', function (data) {
        $.ajax({
            type: "POST",
            url: "/admin/menu/add",
            contentType: "application/json",
            data: JSON.stringify(data.field),
            success: function (data) {
                if (data.code === 200) {
                    parent.queryTable();
                    parent.layer.msg("添加成功", {icon: 1});
                    const index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                } else {
                    layer.msg(data.msg, {icon: 2});
                }
            },
            error: function (data) {
                layer.msg("添加失败", {icon: 2});
            }
        });
        return false;
    });
});

// 取消
$(".p-cancel-btn").click(function () {
    const index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
});

/**
 * 加载页面列表
 */
function loadMenuList() {
    $.get('/admin/page/getPageList', function (data) {
        let html = '<option value="">请选择</option>';
        data.data.forEach(res => {
            html += ' <option value="' + res.id + '">' + res.id + '-' + res.title + '</option>';
        });
        $("#articleId").html(html);
        form.render('select');
    });
}