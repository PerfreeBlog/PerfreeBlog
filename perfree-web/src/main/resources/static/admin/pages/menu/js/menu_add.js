let form, element, layer,$;
layui.use(['layer', 'form', 'element', 'jquery'], function () {
    form = layui.form;
    element = layui.element;
    layer = layui.layer;
    $ = layui.jquery;
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
                    parent.parent.toast.success({message: '添加成功',position: 'topCenter'});
                    const index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                } else {
                    parent.parent.toast.error({message: data.msg,position: 'topCenter'});
                }
            },
            error: function (data) {
                parent.parent.toast.error({message: "添加失败",position: 'topCenter'});
            }
        });
        return false;
    });

    // 取消
    $(".p-cancel-btn").click(function () {
        const index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    });
});

