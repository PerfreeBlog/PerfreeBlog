let form, element, layer;
layui.use(['layer', 'form', 'element'], function () {
    form = layui.form;
    element = layui.element;
    layer = layui.layer;
    // 表单验证
    form.verify({});
    // 表单提交
    form.on('submit(addForm)', function (data) {
        $.ajax({
            type: "POST",
            url: "/admin/attach/update",
            contentType: "application/json",
            data: JSON.stringify(data.field),
            success: function (data) {
                if (data.code === 200) {
                    parent.queryTable();
                    parent.layer.msg("更新成功", {icon: 1});
                    const index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                } else {
                    layer.msg(data.msg, {icon: 2});
                }
            },
            error: function (data) {
                layer.msg("更新失败", {icon: 2});
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
 * 下载文件
 * @param id
 */
function downloadFile(id) {
    let form = $("<form>");
    form.attr("style", "display:none");
    form.attr("target", "");
    form.attr("method", "get");//提交方式为post
    form.attr("action", "/admin/attach/download/" + id);//定义action

    $("body").append(form);
    form.submit();
}

/**
 *
 * @param ids
 */
function deleteData(ids) {
    layer.confirm('确定要删除吗?', {icon: 3, title: '提示'}, function (index) {
        $.ajax({
            type: "POST",
            url: "/admin/attach/del",
            contentType: "application/json",
            data: ids,
            success: function (data) {
                if (data.code === 200) {
                    parent.queryTable();
                    parent.layer.msg("删除成功", {icon: 1});
                    const index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                } else {
                    layer.msg(data.msg, {icon: 2});
                }
            },
            error: function (data) {
                layer.msg("删除失败", {icon: 2});
            }
        });
        layer.close(index);
    });
}