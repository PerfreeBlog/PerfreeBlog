layui.extend({
    formX: '/static/themes/npx/static/lib/formX'
}).use(['layer', 'form', 'formX'], function () {
    const $ = layui.jquery;
    const layer = layui.layer;
    const form = layui.form;
    $('.login-wrapper').removeClass('layui-hide');

    /* 表单提交 */
    form.on('submit(restPasswordSubmit)', function (obj) {
        const loadIndex = layer.load(2);
        $.ajax({
            type: "POST",
            url: "/doRestPasswordStep2",
            contentType: "application/json",
            data: JSON.stringify(obj.field),
            success: function (data) {
                layer.close(loadIndex);
                if (data.code === 200) {
                    layer.msg('密码修改成功,将自动前往登录页', {icon: 1, time: 1500}, function () {
                        window.location.href = "/login";
                    });
                } else {
                    layer.msg(data.msg, {icon: 2, anim: 6});
                }
            },
            error: function (data) {
                layer.msg("操作失败", {icon: 2});
                layer.close(loadIndex);
            }
        });
        return false;
    });

    /* 获取验证码 */
    const captchaUrl = '/captcha';
    $('#btnGetCode').click(function () {
        const $btn = $(this);
        const $inputEmail = $('input[name="email"]');
        const $inputAccount = $('input[name="account"]');
        let email = $inputEmail.val();
        if (!email) {
            layer.tips('请输入邮箱账号', $inputEmail, {tips: [1, '#ff4c4c']});
            return;
        }
        const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!emailReg.test(email)) {
            layer.tips('邮箱格式不正确', $inputEmail, {tips: [1, '#ff4c4c']});
            return;
        }
        let account = $inputAccount.val();
        if (!account) {
            layer.tips('请输入登录账号', $inputAccount, {tips: [1, '#ff4c4c']});
            return;
        }
        const layIndex = layer.open({
            type: 1,
            title: false,
            shade: .2,
            content: [
                '<div class="layer-get-code" style="width: 380px;">',
                '   <p>验证码将发送到您的邮箱，输入下方图形验证码点击按钮即可发送：</p>',
                '   <div class="lay-code-group">',
                '      <input placeholder="请输入图形验证码" class="layui-input"/>',
                '      <img class="login-captcha layui-border" />',
                '   </div>',
                '   <div><button class="layui-btn layui-btn-fluid">立即发送</button></div>',
                '</div>'
            ].join(''),
            success: function () {
                // 图形验证码
                $('.layer-get-code>.lay-code-group>img').click(function () {
                    this.src = captchaUrl + '?d=' + Math.random();
                }).trigger('click');
                // 立即发送
                $('.layer-get-code .layui-btn-fluid').click(function () {
                    const $input = $('.layer-get-code>.lay-code-group>input');
                    let code = $input.val();
                    if (!code) {
                        layer.tips('请输入图形验证码', $input, {tips: [3, '#ff4c4c']});
                        return;
                    }
                    layer.close(layIndex);
                    layui.formX.startTimer($btn, 30, function (time) {
                        return time + 's 后可再发送';
                    });
                    const loadIndex = layer.msg('请求中...', {icon: 16, shade: 0.01, time: false});
                    $.post('/api/doSendRestPassMail', {
                        account: account,
                        email: email
                    }, function (res) {
                        layer.close(loadIndex);
                        if (res.code == 200) {
                            layer.msg(res.msg, {icon: 1});
                            layer.close(layIndex);
                        } else {
                            layer.msg(res.msg, {icon: 2});
                        }
                    }, 'json');
                });
            }, end: function () {
                layer.closeAll('tips');
            }
        })
    });

});