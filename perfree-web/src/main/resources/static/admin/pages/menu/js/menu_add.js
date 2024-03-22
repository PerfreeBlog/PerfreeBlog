let form, element, layer,$;
layui.use(['layer', 'form', 'element', 'jquery'], function () {
    form = layui.form;
    element = layui.element;
    layer = layui.layer;
    $ = layui.jquery;
    loadSiteList();
    // 表单验证
    form.verify({});

    form.on('select(type)', function (data) {
        if (data.value === "1") {
            $("#siteIdBox").hide();
            form.val("addForm", {
                siteId: null
            })
        }else {
            $("#siteIdBox").show();
        }
    });
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

/**
 * 加载站点列表
 */
function loadSiteList() {
    request.get("/api/site/list").then(res => {
        let html = '<option value="">请选择</option>';
        res.data.forEach(item => {
            html += ' <option value="' + item.id + '">' + item.name + '</option>';
        });
        $("#siteId").html(html);
        form.render('select');
    });
}
