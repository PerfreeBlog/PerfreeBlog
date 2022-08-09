let form, layer,$;
layui.use(['layer', 'form', 'jquery'], function () {
    form = layui.form;
    layer = layui.layer;
    $ = layui.jquery;
    form.verify({});
    form.on('submit(addForm)', function (data) {
        $.ajax({
            type: "POST",
            url: "/admin/tag/add",
            contentType: "application/json",
            data: JSON.stringify(data.field),
            success: function (data) {
                if (data.code === 200) {
                    parent.queryTable();
                    parent.toast.success({message: '添加成功',position: 'topCenter'});
                    const index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                } else {
                    parent.toast.error({message: data.msg,position: 'topCenter'});
                }
            },
            error: function (data) {
                parent.toast.error({message: "添加失败",position: 'topCenter'});
            }
        });
        return false;
    });

    $(".p-cancel-btn").click(function () {
        const index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    });
});
