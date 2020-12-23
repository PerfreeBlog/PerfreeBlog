let form, element, layer;
$("#captcha").attr("src", '/captcha?d='+Math.random());
layui.use(['layer', 'form', 'element'], function () {
    form = layui.form;
    element = layui.element;
    layer = layui.layer;
    layer.config({
        offset: '10%'
    });
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
                    window.location.href="/";
                } else {
                    layer.msg(data.msg, {icon: 2});
                }
            },
            error: function (data) {
                layer.msg("登录失败", {icon: 2});
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