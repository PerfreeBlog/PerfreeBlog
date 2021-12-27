let NPX = {

    hideOpen: function () {
        $("#side-nav-open").hide();
        $("#side-nav-close").show();
    }

    , hideClose: function () {
        $("#side-nav-open").show();
        $("#side-nav-close").hide();
    }

    , searchDialog: function () {
        const width = layui.device().ios || layui.device().android ? (document.body.clientWidth * 0.8) : 500;
        layer.open({
            type: 1
            , id: 'search-dialog'
            , title: false
            , zIndex: 198910140
            , closeBtn: false
            , shadeClose: true
            , maxWidth: 100000
            , offset: '40%'
            , skin: 'fly-layer-search'
            , content: ['<form action="/index" method="get">'
                , '<input class="' + (!layui.device().ios && !layui.device().android ? "layui-icon" : "")
                + '" autocomplete="off" placeholder="' + (!layui.device().ios && !layui.device().android ? "&#xe615; " : " ") + '搜一搜你想要的内容" type="text" name="s" style="width: ' + width + 'px;" contenteditable="true">'
                , '<input type="hidden" name="search" value="1">'
                , '</form>'].join('')
        });
    }
}