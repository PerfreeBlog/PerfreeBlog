var element, layer;
layui.use(['element', 'layer'], function () {
    element = layui.element;
    layer = layui.layer;
    layer.config({
        offset: '10%'
    });
});

$(".p-login-btn").on('click', function () {
    let account = $("input[name=account]").val();
    let password = $("input[name=password]").val();
    if (account === undefined || account === '' || account.length < 1){
        layer.msg("请输入账号", {icon: 2});
        return;
    }
    if (password === undefined || password === '' || password.length < 1){
        layer.msg("请输入密码", {icon: 2});
        return;
    }
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/doLogin" ,
        data: $('#loginForm').serialize(),
        success: function (result) {
            if (result.code === 200) {
                location.href='/';
            } else {
                layer.msg(result.msg, {icon: 2});
            }
        },
        error : function() {
            layer.msg("网络错误,请稍候重试", {icon: 2});
        }
    });
});

// 回车事件
$(document).keyup(function(event){
    if(event.keyCode === 13){
        $(".p-login-btn").trigger("click");
    }
});