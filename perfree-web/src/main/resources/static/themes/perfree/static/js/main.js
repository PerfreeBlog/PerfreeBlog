$(document).ready(function () {
    initLayui();
    initEvent();
    initTagsColor();
    initHitokoto();
});

/**
 * 初始化事件监听
 */
function initEvent() {
    onWindowScroll()
    // 监听滚动条

    window.addEventListener('scroll', function(e){
        onWindowScroll()
    })
    // 监听返回顶部点击事件
    $('.backUp').on('click',function() {
        $('body,html').animate({scrollTop: 0 },300);
    });

    if (localStorage.getItem("dark")) {
        $('body').addClass("dark");
    }

    $('.night').on('click',function() {
        let attr = $('body').attr('class');
        if (attr.indexOf('dark') >= 0) {
            $('body').removeClass('dark');
            $('body').addClass('light');
            localStorage.removeItem("dark");
        } else {
            $('body').removeClass('light');
            $('body').addClass('dark');
            localStorage.setItem("dark", "true");
        }
    });
}

/**
 * layui
 */
function initLayui() {
    layui.config({
        version: true,
        base: '/static/public/libs/layuiComponents/'
    }).use('element', function(){
        const element = layui.element;
    });
}

/**
 * 彩色标签
 */
function initTagsColor() {
    $('.m-right-tag').each(function(){
        $(this).css("background-color",common.getRandomColor());
    });
}

/**
 * 滚动条事件,控制是否显示返回顶部
 * @param e
 */
function onWindowScroll(){
    let scroll = $("body").scrollTop();
    const rightSideHeight = document.getElementById('m-content-right').offsetHeight + 50;
    if (scroll > 10) {
        $(".backUp").removeClass("hide-back-up");
    } else {
        $(".backUp").addClass('hide-back-up');
    }
    if (scroll > rightSideHeight) {
        $('.m-right-article-box').addClass('hide');
        $('.m-right-search-box').addClass('hide');
        $('.right-side-container').addClass('right-side-container-scroll');
    } else {
        $('.m-right-article-box').removeClass('hide');
        $('.m-right-search-box').removeClass('hide');
        $('.right-side-container').removeClass('right-side-container-scroll');
    }
}

/**
 * 初始化一言
 */
function initHitokoto() {
    getHitokoto();
    setTimeout(() => {
        getHitokoto();
    }, 10000);
}

/**
 * 加载一言
 */
function getHitokoto() {
    $.get("https://v1.hitokoto.cn?max_length=20", function(result){
        $("#hitokoto").text(result.hitokoto + " -- " + result.from);
    });
}

