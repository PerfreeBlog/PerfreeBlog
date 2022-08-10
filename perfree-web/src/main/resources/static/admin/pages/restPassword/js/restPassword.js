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
    form.on('submit(restPasswordForm)', function (data) {
        $.ajax({
            type: "POST",
            url: "/doRestPassword",
            contentType: "application/json",
            data: JSON.stringify(data.field),
            success: function (data) {
                if (data.code === 200) {
                    toast.success({message: "验证码已发送至邮箱,请注意查收",position: 'topCenter'});
                    setTimeout( function (){
                        window.location.href="/restPasswordStep2";
                    }, 1000);
                } else {
                    toast.error({message: data.msg,position: 'topCenter'});
                }
            },
            error: function (data) {
                toast.error({message: "操作失败",position: 'topCenter'});
            }
        });
        return false;
    });


    form.on('submit(restPasswordForm2)', function (data) {
        $.ajax({
            type: "POST",
            url: "/doRestPasswordStep2",
            contentType: "application/json",
            data: JSON.stringify(data.field),
            success: function (data) {
                if (data.code === 200) {
                    toast.success({message: "密码修改成功,将自动前往登录页",position: 'topCenter'});
                    setTimeout( function (){
                        window.location.href="/login";
                    }, 1000);
                } else {
                    toast.error({message: data.msg,position: 'topCenter'});
                }
            },
            error: function (data) {
                toast.error({message: "操作失败",position: 'topCenter'});
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