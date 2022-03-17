var element, layer, laytpl;
$(function () {
    layui.use(['element', 'layer', 'laytpl'], function () {
        element = layui.element;
        layer = layui.layer;
        laytpl = layui.laytpl;
        let flow = layui.flow;
        flow.lazyimg();
        initEvent();
        setIframeHeight();

        const plugin = localStorage.getItem("plugin");
        if (plugin !== null && plugin !== undefined && plugin !== ""){
            localStorage.removeItem("plugin");
            toPage("/admin/plugin");
        }
    });

});

/**
 * 页面初始化加载页面事件
 */
// 侧边菜单是否打开
let isOpen = true;
// 侧边菜单项的tip index
let index = null;
// 是否全屏
let isFull = false;

function initEvent() {

    // 开关侧边栏事件
    $(".f-switch-side-btn").click(function () {
        switchSide();
    });
    $(".p-side-shadow").click(function () {
        switchSide();
    });


    // 刷新iframe
    $(".f-refresh-btn").click(function () {
        const iframe = $('.f-tab-content>.layui-show>iframe');
        $(iframe).attr('src', $(iframe).attr('src'));
        setIframeHeight();
    });

    // 控制全屏/退出全屏
    $(".f-screen-full-btn").click(function () {
        if (!isFull) {
            fullScreen();
        } else {
            exitScreen();
        }
    });
}


/**
 * 开关侧边栏
 */
function switchSide() {
    if (isOpen) {
        $(".f-layout").removeClass("f-show-side")
        isOpen = false;
    } else {
        $(".f-layout").addClass("f-show-side")
        isOpen = true;
        layer.closeAll();
    }
}

/**
 * 全屏
 */
function fullScreen() {
    isFull = true;
    $(".f-screen-full-btn-icon").hide();
    $(".f-exit-full-btn-icon").show();
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
    if (rfs) {
        rfs.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
        //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}

/**
 * 退出全屏
 */
function exitScreen() {
    isFull = false;
    $(".f-screen-full-btn-icon").show();
    $(".f-exit-full-btn-icon").hide();
    var el = document;
    var cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen;
    if (cfs) {
        cfs.call(el);
    } else if (typeof window.ActiveXObject !== "undefined") {
        //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}

/**
 * 设置iframe高度
 */
function setIframeHeight() {
    $(window).on('resize', function () {
        let $content = $('.f-tab-content');
        $content.height($(this).height() - 91);
        $content.find('.f-iframe').each(function () {
            $(this).height($content.height() - 3);
        });
    }).resize();
}

/**
 * 打开tab
 * @param  icon
 * @param  menuName
 * @param  url
 * @param tabId
 */
function openTab(icon, menuName, url, tabId) {
    var eachcount = 0;
    var flag = false;
    $(".content-tab-title").find('li').each(function () {
        eachcount++;
        var layId = $(this).attr("lay-id");
        if (tabId === layId) {
            flag = true;
        }
        if (eachcount >= $(".content-tab-title").find('li').length) {
            $("#frame-loading").show();
            if (flag) {
                element.tabChange('tabNav', tabId);
                const iframe = $('.f-tab-content>.layui-show>iframe');
                $(iframe).attr('src', url);
                setIframeHeight();
                return;
            } else {
                //添加tab
                element.tabAdd('tabNav', {
                    title: "<span class='tab-icon-circle'></span>&nbsp;" + menuName,
                    content: "<iframe onload='frameOnload()' src='" + url + "' scrolling='auto' width='100%' height='100%' frameborder='0' allowfullscreen='true' webkitallowfullscreen='true' mozallowfullscreen='true' class='f-ifram'></iframe>", //支持传入html
                    id: tabId
                });
                //切换至新添加tab
                element.tabChange('tabNav', tabId);
                setIframeHeight();
            }
        }
    });
}

function frameOnload(){
    $("#frame-loading").hide();
}

function clickMenu(e) {
    const id = $(e).attr("id");
    const icon = $(e).attr("data-icon");
    const name = $(e).attr("data-name");
    const url = $(e).attr("data-url");
    openTab(icon, name, url, id)
}

/**
 * 前往xxx页
 */
function toPage(url) {
    $(".p-menu-item").each(function () {
        if ($(this).attr("data-url") === url) {
            $(this).click();
        }
    });
}

/**
 * 获取菜单的id
 */
function getMenuMsg(url) {
    let menu = {id: '', icon: '', name: ''};
    $(".p-menu-item").each(function () {
        if ($(this).attr("data-url") === url) {
            menu.id = $(this).attr("id");
            menu.icon = $(this).attr("data-icon");
            menu.name = $(this).attr("data-name");
        }
    });
    return menu;
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
                layer.msg(data.msg, {icon: 2});
            }
        },
        error: function (data) {
            layer.msg("退出登录失败", {icon: 2});
        }
    });
}

/**
 * 个人中心
 */
function userCenter() {
    openTab('', '个人中心', '/admin/user/userCenter', "-2");
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