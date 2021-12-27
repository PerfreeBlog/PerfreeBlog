layui.use(['layer', 'form'], function () {
    const $ = layui.jquery;
    const layer = layui.layer;
    const form = layui.form;
    $('.login-wrapper').removeClass('layui-hide');


    form.on('submit(npxLoginSubmit)', function (obj) {
        const loadIndex = layer.load(2);
        $.ajax({
            type: "POST",
            url: obj.field && obj.field.rememberMe ? "/doLogin?rememberMe=true" : "/doLogin",
            contentType: "application/json",
            data: JSON.stringify(obj.field),
            success: function (res) {
                layer.close(loadIndex);
                if (res.code === 200) {
                    layer.msg('登录成功', {icon: 1, time: 1500}, function () {
                        window.location.href = "/";
                    });
                } else {
                    layer.msg(res.msg, {icon: 2, anim: 6});
                }
            },
            error: function (res) {
                layer.msg("登录失败", {icon: 2});
                layer.close(loadIndex);
            }
        });
        return false;
    });


    const captchaUrl = '/captcha';
    $('img.login-captcha').click(function () {
        this.src = captchaUrl + '?d=' + Math.random();
    }).trigger('click');

});