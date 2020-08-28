iframeAuto();

function iframeAuto() {
    $(window).on('resize', function () {
        var $content = $('.p-iframe');
        $content.height($(this).height() - 50);
        $content.find('iframe').each(function () {
            $(this).height($content.height());
        });
    }).resize();
}