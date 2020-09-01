let heightDiffer = 122;
iframeAuto();
initMenu();
initEvent();
/**
 * 自适应iframe
 */
function iframeAuto() {
    $(window).on('resize', resizeIframe).resize();
}

function resizeIframe() {
    let $content = $('.p-iframe');
    $content.height($(this).height() - heightDiffer);
    $content.find('p-container').each(function () {
        $(this).height($content.height());
    });
}
/**
 * 初始化菜单事件
 */
function initMenu() {
    $(".p-menu-item").on('click', function (e) {
        $('.p-menu-item').removeClass('mdui-list-item-active');
        $(this).addClass('mdui-list-item-active');
        $("#iframe").attr("src", $(this).data("url"));
        $("#p-iframe-title").text($(this).data("text"));
    });
    $(".p-menu-item")[0].click();
}

function initEvent() {
    // 刷新按钮事件
    $("#refresh").on("click", function () {
        document.getElementById('iframe').contentWindow.location.reload(true);
    });

    // 关闭标题栏
    $(".hide-title").on('click', function () {
        $(".p-iframe-title").addClass('hideTitlePanel');
        heightDiffer = heightDiffer - 55;
        resizeIframe();
    });
}