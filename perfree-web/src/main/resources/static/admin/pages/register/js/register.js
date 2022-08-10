let form, element, layer,toast;
$("#captcha").attr("src", '/captcha?d='+Math.random());
layui.use(['layer', 'form', 'element', 'toast'], function () {
    form = layui.form;
    element = layui.element;
    layer = layui.layer;
    toast = layui.toast;
    // 表单验证
    form.verify({});
    // 表单提交
    form.on('submit(addForm)', function (data) {
        $.ajax({
            type: "POST",
            url: "/doRegister",
            contentType: "application/json",
            data: JSON.stringify(data.field),
            success: function (data) {
                if (data.code === 200) {
                    toast.success({message: "注册成功,将自动跳转至登录页~",position: 'topCenter'});
                    setTimeout(function () {
                       window.location.href="/login";
                    }, 1000);
                } else {
                    toast.error({message: data.msg,position: 'topCenter'});
                }
            },
            error: function (data) {
                toast.error({message: "注册失败",position: 'topCenter'});
            }
        });
        return false;
    });
});
