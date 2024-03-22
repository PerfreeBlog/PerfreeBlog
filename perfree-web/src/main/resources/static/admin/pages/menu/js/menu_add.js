let form, element;
layui.use(['form', 'element'], function () {
    form = layui.form;
    element = layui.element;
    loadSiteList();
    let pid = new URL(window.location.href).searchParams.get('pid');
    if (pid !== "-1") {
        $("#siteIdBox").hide();
    }
    // 表单验证
    form.verify({});

    form.on('select(type)', function (data) {
        if (data.value === "1") {
            $("#siteIdBox").hide();
            form.val("addForm", {
                siteId: null
            })
        }else {
            if (pid === "-1") {
                $("#siteIdBox").show();
            }
        }
    });
    // 表单提交
    form.on('submit(addForm)', function (data) {
        if (pid !== "-1") {
            data.field.pid = pid;
        }
        if (data.field.type === "0" && !data.field.siteId && pid === "-1") {
            common.toast.error({message: "请选择所属站点!",position: 'topCenter'});
            return false;
        }
        request.post("/api/menu/add", JSON.stringify(data.field)).then(res => {
            if (res.code === 200) {
                common.activePage.queryTable();
                common.toast.success({message: '添加成功',position: 'topCenter'});
                const index = common.layer.getFrameIndex(window.name);
                common.layer.close(index);
            } else {
                common.toast.error({message: res.msg,position: 'topCenter'});
            }
        });
        return false;
    });

    // 取消
    $(".p-cancel-btn").click(function () {
        const index = common.layer.getFrameIndex(window.name);
        common.layer.close(index);
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
