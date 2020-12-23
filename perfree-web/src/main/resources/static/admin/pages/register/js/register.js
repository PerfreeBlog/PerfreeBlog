let form, element, layer;
$("#captcha").attr("src", '/captcha?d='+Math.random());
layui.use(['layer', 'form', 'element'], function () {
    form = layui.form;
    element = layui.element;
    layer = layui.layer;
    layer.config({
        offset: '30%'
    });
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
                    layer.alert('注册成功,点击确定前往登录', {icon: 1, title:'提示',closeBtn: false}, function(index){
                        window.location.href="/login";
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
});
