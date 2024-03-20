let form, element, layer, toast;
let uuid = "";
layui.use(['layer', 'form', 'element', 'toast'], function () {
    form = layui.form;
    element = layui.element;
    layer = layui.layer;
    toast = layui.toast;
    // 表单验证
    form.verify({});
    // 表单提交
    form.on('submit(addForm)', function (data) {
        data.field.uuid = uuid;
        request.post("/api/login", JSON.stringify(data.field)).then(res => {
            if (res.code === 200) {
                toast.success({message: "登录成功", position: 'topCenter'});
                setTimeout(function () {
                    window.location.href = "/admin";
                }, 500);
            } else {
                $("#captcha").click();
                toast.error({message: res.msg, position: 'topCenter'});
            }
        })
        return false;
    });
});

document.onkeydown = function (event) {
    var e = event || window.event;
    if (e && e.keyCode === 13) {
        $(".p-login-btn").click();
    }
};

function refreshCaptcha() {
    request.get("/api/captchaImage").then(res => {
        if (res.code === 200) {
            uuid = res.data.uuid;
            $("#captcha").attr("src", "data:image/gif;base64," + res.data.img);
        } else {
            toast.error({message: res.msg, position: 'topCenter'});
        }
    });
}

refreshCaptcha();