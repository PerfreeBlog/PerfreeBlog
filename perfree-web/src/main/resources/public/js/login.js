$(".p-login-btn").on('click', function () {
    let account = $("input[name=account]").val();
    let password = $("input[name=password]").val();
    if (account === undefined || account === '' || account.length < 1){
        message('error', "请输入账号");
        return;
    }
    if (password === undefined || password === '' || password.length < 1){
        message('error', "请输入密码");
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
                message('error', result.msg);
            }
        },
        error : function() {
            message('error', "网络错误,请稍候重试");
        }
    });
});

// 回车事件
$(document).keyup(function(event){
    if(event.keyCode === 13){
        $(".p-login-btn").trigger("click");
    }
});

/**
 * 信息弹窗
 * @param icon
 * @param content
 */
function message(icon, content) {
    $modal({
        type: 'message', //弹框类型  'alert' or  'confirm' or 'message'  message提示(开启之前如果之前含有弹框则清除)
        icon: icon, // 提示图标显示 'info' or 'success' or 'warning' or 'error'  or 'question'
        timeout: 2000, // 单位 ms  显示多少毫秒后关闭弹框 （ confirm 下无效 | 不传默认为 2000ms | 最短显示时间为500ms）
        content: content, // 提示文字
        center: false,// 是否绝对居中 默认为false  设置true后   top无效
        top: 20, //距离顶部距离 单位px
        transition: 300, //过渡动画 默认 200   单位ms
        closable: true, // 是否显示可关闭按钮  默认为 false
    })
}