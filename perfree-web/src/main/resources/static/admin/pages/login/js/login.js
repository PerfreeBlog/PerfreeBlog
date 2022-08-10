let form, element, layer, toast;
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
            url: "/doLogin",
            contentType: "application/json",
            data: JSON.stringify(data.field),
            success: function (data) {
                if (data.code === 200) {
                    toast.success({message: "登录成功",position: 'topCenter'});
                    setTimeout(function () {
                        window.location.href="/";
                    }, 500);
                } else {
                    $("#captcha").click();
                    toast.error({message: data.msg,position: 'topCenter'});
                }
            },
            error: function (data) {
                toast.error({message: "登录失败",position: 'topCenter'});
            }
        });
        return false;
    });
});

document.onkeydown = function (event) {
    var e = event || window.event;
    if (e && e.keyCode === 13) {
        $(".p-login-btn").click();
    }
};