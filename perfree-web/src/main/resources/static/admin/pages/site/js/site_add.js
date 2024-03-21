let form, element, layer,$;
initPage();

function initPage() {
    layui.use(['layer', 'form', 'element', 'jquery'], function () {
        form = layui.form;
        element = layui.element;
        layer = layui.layer;
        $ = layui.jquery;
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
        console.log(data.field);
        request.post("/api/site/add", JSON.stringify(data.field)).then(res => {
            if (res.code === 200) {
                parent.queryTable();
                parent.parent.toast.success({message: '添加成功',position: 'topCenter'});
                const index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
            } else {
                parent.parent.toast.error({message: res.msg,position: 'topCenter'});
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
        const index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    });
}
