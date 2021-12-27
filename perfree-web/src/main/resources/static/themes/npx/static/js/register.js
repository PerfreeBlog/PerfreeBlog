layui.use(['layer', 'form'], function () {
    const $ = layui.jquery;
    const layer = layui.layer;
    const form = layui.form;
    $('.login-wrapper').removeClass('layui-hide');

    form.on('submit(npxRegisterSubmit)', function (obj) {
        $.ajax({
            type: "POST",
            url: "/doRegister",
            contentType: "application/json",
            data: JSON.stringify(obj.field),
            success: function (data) {
                if (data.code === 200) {
                    layer.alert('注册成功,点击确定前往登录', {icon: 1, title: '提示', closeBtn: false}, function (index) {
                        window.location.href = "/login";
                        layer.close(index);
                    });
                } else {
                    layer.msg(data.msg, {icon: 2});
                }
            },
            error: function (data) {
                layer.msg("注册失败", {icon: 2});
            }
        });
        return false;
    });

    const captchaUrl = '/captcha';
    $('img.login-captcha').click(function () {
        this.src = captchaUrl + '?d=' + Math.random();
    }).trigger('click');
});