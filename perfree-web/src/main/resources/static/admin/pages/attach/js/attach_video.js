let table, form, layer, layPage, flow, upload, laytpl,$,toast;
let pageIndex = 1, pageSize = 8;
layui.use(['table', 'form', 'layer', 'laypage', 'flow', 'upload', 'laytpl','jquery', 'toast'], function () {
    table = layui.table;
    form = layui.form;
    layer = layui.layer;
    layPage = layui.laypage;
    flow = layui.flow;
    upload = layui.upload;
    laytpl = layui.laytpl;
    $ = layui.jquery;
    toast = layui.toast;
    queryTable();
    initUpload();

    // 查询
    $("#queryBtn").click(function () {
        queryTable();
    });

    $("#tableBox").on("click", ".img-box", function () {
        parent.selectVideo($(this).children("video").attr("src"));
        parent.layer.close(parent.layer.getFrameIndex(window.name));
    });
});

/**
 * 初始化页面数据
 */
function queryTable() {
    $.ajax({
        type: "POST",
        url: "/admin/attach/list",
        contentType: "application/json",
        data: JSON.stringify({
            pageSize,
            pageIndex,
            form: {
                name: $("#name").val(),
                type: "video"
            }
        }),
        success: function (data) {
            if (data.code === 200) {
                laytpl($("#tableTpl").html()).render(data.data, function (html) {
                    $("#tableBox").html(html);
                });
                layPage.render({
                    elem: 'tabBoxPage',
                    limit: pageSize,
                    count: data.total,
                    curr: data.pageIndex,
                    layout: ['count', 'prev', 'page', 'next'],
                    jump: function (obj, first) {
                        pageIndex = obj.curr;
                        pageSize = obj.limit;
                        //首次不执行
                        if (!first) {
                            queryTable();
                        }
                    }
                });

                flow.lazyimg();
            } else {
                parent.toast.error({message: data.msg,position: 'topCenter'});
            }
        },
        error: function (data) {
            parent.toast.error({message: "加载列表失败",position: 'topCenter'});
        }
    })
}

/**
 * 初始化上传
 */
function initUpload() {
    let loadIndex;
    upload.render({
        elem: '#uploadBtn'
        , url: '/admin/attach/upload'
        , accept: 'file'
        , acceptMime: 'video/*'
        , exts: 'avi|mov|rmvb|rm|mp4|flv|3gp|mpg|mlv|mpe|mpeg|vob'
        ,choose: function (obj) {
            loadIndex = layer.load();
        }
        , done: function (res) {
            layer.close(loadIndex);
            if (res.code === 200) {
                parent.layer.close(parent.layer.getFrameIndex(window.name));
                parent.selectVideo(res.data.url);
            } else {
                parent.toast.error({message: data.msg,position: 'topCenter'});
            }
        }
        , error: function () {
            layer.close(loadIndex);
            parent.toast.error({message: "上传失败",position: 'topCenter'});
        }
    });
}