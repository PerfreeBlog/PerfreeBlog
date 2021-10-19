let table, form, layer, layPage, flow, upload, laytpl;
let pageIndex = 1, pageSize = 8;
layui.use(['table', 'form', 'layer', 'laypage', 'flow', 'upload', 'laytpl'], function () {
    table = layui.table;
    form = layui.form;
    layer = layui.layer;
    layPage = layui.laypage;
    flow = layui.flow;
    upload = layui.upload;
    laytpl = layui.laytpl;
    queryTable();
    initUpload();

    // 查询
    $("#queryBtn").click(function () {
        queryTable();
    });
});

/**
 * 初始化页面数据
 */
function queryTable() {
    table.render({
        elem: '#tabBoxPage',
        url: '/admin/attach/list',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        contentType: 'application/json',
        title: '附件列表',
        totalRow: false,
        where: {
            form: {
                name: $("#name").val(),
                type: "other"
            }
        },
        limit: 30,
        cols: [[
            {field: 'name', title: '文件名'},
            {field: 'desc', title: '描述'},
            {field: 'flag', title: '标识',width: 100},
            {
                field: 'id', title: '操作', width: 80, fixed: 'right',
                templet: "<div>" +
                    "<a class='layui-btn layui-btn-normal layui-btn-xs' onclick='selectFile(\"{{d.url}}\",\"{{d.name}}\")'>选择</a> " +
                    "</div>"
            },
        ]],
        page: true,
        response: {statusCode: 200},
        parseData: function (res) {
            return {
                "code": res.code,
                "msg": res.msg,
                "count": res.total,
                "data": res.data
            };
        },
        request: {
            pageName: 'pageIndex',
            limitName: 'pageSize'
        }
    });
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
        ,choose: function (obj) {
            loadIndex = layer.load();
        }
        , done: function (res) {
            layer.close(loadIndex);
            if (res.code === 200) {
                parent.layer.close(parent.layer.getFrameIndex(window.name));
                parent.selectAttach(res.data.name,res.data.url);
            } else {
                layer.msg(res.msg, {icon: 2});
            }
        }
        , error: function () {
            layer.close(loadIndex);
            layer.msg("上传失败", {icon: 2});
        }
    });
}

function selectFile(url, name){
    parent.selectAttach(name, url);
    parent.layer.close(parent.layer.getFrameIndex(window.name));
}