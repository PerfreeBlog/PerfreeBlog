$(".p-login-btn").on('click', function () {
    let account = $("input[name=account]").val();
    let password = $("input[name=password]").val();
    if (account === undefined || account === '' || account.length < 1){
        pMessage('error','请输入账号');
        return;
    }
    if (password === undefined || password === '' || password.length < 1){
        pMessage('error','请输入密码');
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
                pMessage('error',result.msg);
            }
        },
        error : function() {
            pMessage('error', "网络错误,请稍候重试");
        }
    });
});

// 回车事件
$(document).keyup(function(event){
    if(event.keyCode === 13){
        $(".p-login-btn").trigger("click");
    }
});