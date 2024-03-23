let form, element;
layui.use([ 'form', 'element'], function () {
    form = layui.form;
    element = layui.element;
    loadSiteList();
    let id = new URL(window.location.href).searchParams.get('id');
    getMenu(id);
    // 表单验证
    form.verify({});
    form.on('select(type)', function (data) {
        if (data.value === "1") {
            $("#siteIdBox").hide();
            form.val("addForm", {
                siteId: null
            })
        }else {
            if ($("#pid").val() === "-1") {
                $("#siteIdBox").show();
            }
        }
    });
    // 表单提交
    form.on('submit(editForm)', function (data) {
        request.put("/api/menu/update", JSON.stringify(data.field)).then(res => {
            if (res.code === 200) {
                common.activePage.queryTable();
                common.toast.success({message: '更新成功',position: 'topCenter'});
                const index = common.layer.getFrameIndex(window.name);
                common.layer.close(index);
            } else {
                common.toast.error({message: data.msg,position: 'topCenter'});
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

/**
 * 加载菜单数据
 * @param id
 */
function getMenu(id) {
    request.get("/api/menu/get?id=" + id).then(res => {
       if (res.code === 200) {
           form.val('editForm', res.data);

           if (res.data.pid !== "-1") {
               $("#siteIdBox").hide();
           }
       } else {
           common.toast.error({message: "加载菜单数据失败!",position: 'topCenter'});
       }
    });
}
