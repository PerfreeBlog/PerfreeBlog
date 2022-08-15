var $,admin,popup,toast;
layui.use(['admin','jquery','popup','toast'], function() {
    $ = layui.jquery;
    admin = layui.admin;
    popup = layui.popup;
    toast = layui.toast;
    admin.setConfigType("yml");
    admin.setConfigPath("/static/admin/static/config/pear.config.yml");

    admin.render();

    // 登出逻辑
    admin.logout(function(){
        window.location.href = "/logout";
        return true;
    })

    $(".journalBtn").click(function () {
       admin.toPage( '/admin/journal/addPage', 'journalAddPage', '发表动态');
    });

    // 消息点击回调
    // admin.message(function(id, title, context, form) {});
})



/**
 * 打开tab
 * @param  icon
 * @param  menuName
 * @param  url
 * @param tabId
 */
function openTab(icon, menuName, url, tabId) {
    admin.toPage(url,tabId, menuName);
}

/**
 * 前往xxx页
 */
function toPage(url) {
    admin.toPage(url,'', '');
}

/**
 * 退出登录
 */
function logout() {
    $.ajax({
        type: "POST",
        url: "/logout",
        contentType: "application/json",
        success: function (data) {
            if (data.code === 200) {
                window.location.href = "/";
            } else {
                toast.error({message: data.msg,position: 'topCenter'});
            }
        },
        error: function (data) {
            toast.error({message: "退出登录失败",position: 'topCenter'});
        }
    });
}

/**
 * 检查更新
 */
function checkUpdate() {
    $.get("/checkUpdate",function(data){
        if (data.code === 200) {
            layer.confirm('检测到系统有更新,请前往网站设置 -> 系统更新进行查看', {title: '提示'}, function (index) {
                layer.close(index);
            });
        } else if (data.code === 500) {
            console.log("检查更新出错");
        }
    });
}