iframeAuto();
initMenu();
initEvent();
/**
 * 自适应iframe
 */
function iframeAuto() {
    $(window).on('resize', function () {
        let $content = $('.p-iframe');
        $content.height($(this).height() - 122);
        $content.find('p-container').each(function () {
            $(this).height($content.height());
        });
    }).resize();
}

/**
 * 初始化菜单事件
 */
function initMenu() {
    $(".p-menu-item").on('click', function (e) {
        $('.p-menu-item').removeClass('mdui-list-item-active');
        $(this).addClass('mdui-list-item-active');
        $("#iframe").attr("src", $(this).data("url"));
    })
}

function initEvent() {
    // 刷新按钮事件
    $("#refresh").on("click", function () {
        document.getElementById('iframe').contentWindow.location.reload(true);
    });
}