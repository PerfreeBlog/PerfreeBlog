const colors = ["rgb(103, 204, 134)","rgb(52, 152, 219)","rgb(251, 155, 95)","rgb(244, 126, 96)","rgb(225, 91, 100)","rgb(132, 155, 135)","rgb(143, 197, 4)"];

new WOW().init();
onWindowScroll();

window.addEventListener('scroll', function(e){
    onWindowScroll()
})

$('.d-category-item > span').each(function(){
    $(this).css("background-color", colors[RandomNum(0,6)]);
});

$('.d-link').each(function(){
    $(this).css("background-color", colors[RandomNum(0,6)]);
});

$('.d-tag-item').each(function(){
    $(this).css("background-color", colors[RandomNum(0,6)]);
});

$('.d-back-top-btn').on('click',function() {
    $('body,html').animate({scrollTop: 0 },300);
});

if (localStorage.getItem("dark")) {
    $('body').addClass("d-night");
}

let mobile = false;
$('.mobile-side-switch-btn').on('click',function() {
    if (mobile) {
        $(".d-mobile-side").removeClass("show-mobile");
        $(".d-mask").hide();
    } else {
        $(".d-mobile-side").addClass("show-mobile");
        $(".d-mask").show();
    }
    mobile = !mobile;
});

$('.d-mask').on('click',function() {
    $(".d-mobile-side").removeClass("show-mobile");
    $(".d-mask").hide();
    mobile = false;
});

$('.d-web-color-switch-btn').on('click',function() {
    let attr = $('body').attr('class');
    if (attr && attr.indexOf('d-night') >= 0) {
        $('body').removeClass('d-night');
        localStorage.removeItem("dark");
    } else {
        $('body').addClass('d-night');
        localStorage.setItem("dark", "true");
    }
});

let search = false;
$('.d-search-icon').on('click',function() {
    if (!search) {
        $('.d-search-box form input').addClass("show-search");
    } else {
        $('.d-search-box form input').removeClass("show-search");
    }
    search = !search;
});



function onWindowScroll(){
    let scroll = $("html").scrollTop();
    if (scroll > 50) {
        $(".d-back-top-btn").addClass('show-back-up');
    } else {
        $(".d-back-top-btn").removeClass("show-back-up");
    }
}

function RandomNum(Min,Max){
    let Range = Max - Min;
    let Rand = Math.random();
    return Min + Math.round(Rand * Range);
}
