let form, layer,colorpicker;
layui.use(['layer', 'form', 'colorpicker'], function () {
    form = layui.form;
    layer = layui.layer;
    colorpicker = layui.colorpicker;
    colorpicker.render({
        elem: '#color-picker'
        ,color: '#1c97f5'
        ,done: function(color){
            $('#color-input').val(color);
        }
    });
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

    $(".p-cancel-btn").click(function () {
        const index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    });
});
