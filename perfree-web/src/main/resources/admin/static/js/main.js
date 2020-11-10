var element,layer,laytpl;
$(function(){
    layui.use(['element','layer','laytpl'], function(){
        element = layui.element;
        layer = layui.layer;
        laytpl = layui.laytpl;
    });
    initEvent();
    initTheme();
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
    // iframe自适应
    window.onload = function () {
        setIframeHeight(document.getElementById('iframe'));
    }

    // 开关侧边栏事件
    $(".f-switch-side-btn").click(function() {
        switchSide();
    });

    // 点击菜单事件
    $(".f-nav-item,.f-child-side").click(function(){
        if ($(this).find(".layui-nav-child").length > 0 && !isOpen) {
            switchSide();
        } else {
            if ($(this).children("a").attr("url") === undefined) {return;}
            $("#iframe").attr("src", $(this).children("a").attr("url"));
        }
    });

    // 刷新iframe
    $(".f-refresh-btn").click(function(){
        $('#iframe').attr('src', $('#iframe').attr('src'));
    });

    /**
     * 更换主题
     */
    $("#theme-list").on('click','.theme',function(){
        changeTheme(this);
    });

    // 侧边栏hover
    $(".f-nav-item").hover(function(e) {
        if (!isOpen) {
            index = layer.tips($(this).find(".f-nav-content").text(), this,{
                tips: [2, '#1d1f26'],
                time: 0
            });
        }
    }, function(e) {
        layer.close(index);
    });

    // 控制全屏/退出全屏
    $(".f-screen-full-btn").click(function() {
        if (!isFull) {
            fullScreen();
        } else {
            exitScreen();
        }
    });

    // 更换主题
    $(".f-theme-btn").click(function() {
        layer.open({
            type: 1,
            content: $("#theme-list"),
            closeBtn: 0,
            skin: 'f-theme-panel',
            title: "更换主题",
            offset: 'rt',
            anim: -1,
            move: false,
            isOutAnim: false,
            area: ['240px', '100%'],
            btn: [],
            shadeClose: true
        });
    });

}

/**
 * 初始化主题列表
 */
function initTheme() {
    $.getJSON("/admin/static/json/theme.json", function (data) {
        laytpl($("#themeTpl").html()).render(data, function(html){
            $(".theme-list").html(html);
        });
    })
}


/**
 * 开关侧边栏
 */
function switchSide() {
    if (isOpen) {
        $(".layui-header").animate({left: "50px"}, 150);
        $(".header-right").animate({right: "50px"}, 150);
        $(".layui-side").animate({width: "50px"}, 150);
        $(".f-child-side").css("display","none");
        $(".f-nav-content").hide();
        $(".layui-nav>.f-nav-item>a").animate({padding: "0, 0"}, 150);
        $(".layui-body").animate({left: "50px"}, 150);
        $(".f-logo-text").hide();
        $(".f-logo-img").show();
        $(".f-switch-btn-on").hide();
        $(".f-switch-btn-off").show();
        $(".f-nav-item").animate({width: "50px"}, 150);
        $(".layui-nav-more").hide();
        $(".layui-nav-tree>.f-nav-item>a").css("text-align","center");
        isOpen = false;
    } else {
        $(".layui-header").animate({left: "200px"}, 150);
        $(".header-right").animate({right: "200px"}, 150);
        $(".layui-side").animate({width: "200px"}, 150);
        $(".f-child-side").css("display","block");
        $(".f-nav-content").show();
        $(".layui-nav>.layui-nav-item>a").animate({padding: "0, 20px"}, 150);
        $(".layui-body").animate({left: "200px"}, 150);
        $(".f-logo-text").show();
        $(".f-logo-img").hide();
        $(".f-switch-btn-on").show();
        $(".f-switch-btn-off").hide();
        $(".f-nav-item").animate({width: "200px"}, 150);
        $(".layui-nav-more").show();
        $(".layui-nav-tree>.f-nav-item>a").css("text-align","left");
        isOpen = true;
        layer.closeAll();
    }
}

/**
 * 全屏
 */
function fullScreen(){
    isFull = true;
    $(".f-screen-full-btn-icon").hide();
    $(".f-exit-full-btn-icon").show();
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
    if (rfs) {
        rfs.call(el);
    }else if (typeof window.ActiveXObject !== "undefined") {
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
function exitScreen(){
    isFull = false;
    $(".f-screen-full-btn-icon").show();
    $(".f-exit-full-btn-icon").hide();
    var el = document;
    var cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen;
    if (cfs) {
        cfs.call(el);
    }else if (typeof window.ActiveXObject !== "undefined") {
        //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
    }
}

/**
 * 设置iframe高度
 * @param {iframeID} iframe
 */
function setIframeHeight(iframe) {
    if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        }
    }
}

/**
 * 更换主题
 * @param {dom} e
 */
function changeTheme(e){
    const letLogoBg = $(e).find(".theme-leftLogo").attr("bg");
    const letLogoColor = $(e).find(".theme-leftLogo").attr("color");
    const letLogoBoderColor = $(e).find(".theme-leftLogo").attr("borderColor");

    const leftSideBg = $(e).find(".theme-leftSide").attr("bg");
    const leftSideColor = $(e).find(".theme-leftSide").attr("color");

    const headerBg = $(e).find(".theme-header").attr("bg");
    const headerColor = $(e).find(".theme-header").attr("color");

    $(".f-side").css("background", leftSideBg);
    $(".f-side-nav").css("background", leftSideBg);
    $(".layui-nav-tree .layui-nav-child .f-child-side a").css("color", leftSideColor);
    $(".layui-nav .f-nav-item a").css("color", leftSideColor);
    $(".f-logo-text,.f-logo-img").css({background: letLogoBg, color: letLogoColor,"border-color": letLogoBoderColor});
    $(".f-header").css("background", headerBg);
    $(".f-nav .layui-nav-item a").css("color", headerColor);
    $(".f-nav .layui-nav-item .layui-nav-child a").css("color", "#000000");
}