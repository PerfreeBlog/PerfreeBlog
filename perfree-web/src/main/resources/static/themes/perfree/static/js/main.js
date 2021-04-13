$(document).ready(function () {
    initLayui();
    initEvent();
    initTagsColor();
    initHitokoto();

    $(".m-user-info").mouseover(function(){
        $(".m-right-user-info").css("background-image","url('/themes/perfree/static/images/feather.gif')");
    });
    $(".m-user-info").mouseleave(function(){
        $(".m-right-user-info").css("background-image", 'none');
    })
});

/**
 * 初始化事件监听
 */
function initEvent() {
    onWindowScroll()
    // 监听滚动条
    $("body").scroll(function(e){onWindowScroll()});

    // 监听返回顶部点击事件
    $('#backtop-box').on('click',function() {
        $('body,html').animate({scrollTop: 0 },300);
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
        $("#backtop-box").addClass("backtop-box-open");
        $("#backtop-box > img").addClass("img-animation");
    } else {
        $("#backtop-box").removeClass("backtop-box-open");
        $("#backtop-box > img").removeClass("img-animation");
    }
    if (scroll > rightSideHeight) {
        $('.m-right-tags-box').addClass('hide');
        $('.right-side-container').addClass('right-side-container-scroll');
    } else {
        $('.m-right-tags-box').removeClass('hide');
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

