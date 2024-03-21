let form, element, layer, $;
initPage();

function initPage() {
    let id = new URL(window.location.href).searchParams.get('id');
    layui.use(['layer', 'form', 'element', 'jquery'], function () {
        form = layui.form;
        element = layui.element;
        layer = layui.layer;
        $ = layui.jquery;
        getSite(id);
        formEvent();
        initEvent();
    });
}

/**
 * 获取站点信息
 * @param id
 */
function getSite(id) {
    request.get("/api/site/get?id=" + id).then(res => {
        if (res.code === 200) {
            form.val('editForm', {
                "id": res.data.id,
                "name": res.data.name,
                "flag": res.data.flag,
                "description": res.data.description
            });
        }
    });
}

/**
 * 初始化表单操作
 */
function formEvent() {
    // 表单验证
    form.verify({});
    // 表单提交
    form.on('submit(editForm)', function (data) {
        request.post("/api/site/update", JSON.stringify(data.field)).then(res => {
            if (res.code === 200) {
                parent.queryTable();
                parent.parent.toast.success({message: '更新成功',position: 'topCenter'});
                const index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
            } else {
                parent.parent.toast.error({message: res.msg,position: 'topCenter'});
            }
        });
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

