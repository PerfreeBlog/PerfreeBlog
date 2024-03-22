let form, element;
initPage();

function initPage() {
    layui.use(['form', 'element'], function () {
        form = layui.form;
        element = layui.element;
        formEvent();
        initEvent();
    });

}

/**
 * 初始化表单操作
 */
function formEvent() {
    form.render();
    // 表单验证
    form.verify({});
    // 表单提交
    form.on('submit(addForm)', function (data) {
        request.post("/api/site/add", JSON.stringify(data.field)).then(res => {
            if (res.code === 200) {
                common.activePage.queryTable();
                common.toast.success({message: '添加成功',position: 'topCenter'});
                const index = common.layer.getFrameIndex(window.name);
                common.layer.close(index);
            } else {
                common.toast.error({message: res.msg,position: 'topCenter'});
            }
        })
        return false;
    });
}

/**
 * 初始化页面事件
 */
function initEvent() {
    // 取消
    $(".p-cancel-btn").click(function () {
        const index = common.layer.getFrameIndex(window.name);
        common.layer.close(index);
    });
}
