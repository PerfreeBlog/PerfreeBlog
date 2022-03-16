let table;
layui.use('table', function () {
    table = layui.table;
    initPage();
});

/**
 * 页面初始化事件
 */
function initPage() {
    queryTable();

    layer.config({
        offset: '20%'
    });

    // 查询
    $("#queryBtn").click(function () {
        queryTable();
    });

    // 添加
    $("#addBtn").click(function () {
        layer.open({
            title: "上传附件",
            type: 2,
            area: common.layerArea($("html")[0].clientWidth, 500, 400),
            shadeClose: true,
            anim: 1,
            content: '/admin/attach/uploadPage'
        });
    });

    // 批量删除
    $("#batchDeleteBtn").click(function () {
        const checkStatus = table.checkStatus('tableBox'), data = checkStatus.data;
        if (data.length <= 0) {
            layer.msg("至少选择一条数据", {icon: 2});
        } else {
            let ids = "";
            data.forEach(res => {
                ids += res.id + ",";
            });
            ids = ids.substring(0, ids.length - 1);
            deleteData(ids)
        }
    });
}


/**
 * 查询表格数据
 */
function queryTable() {
    table.render({
        elem: '#tableBox',
        url: '/admin/attach/list',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        contentType: 'application/json',
        title: '附件列表',
        totalRow: false,
        where: {
            form: {
                name: $("#name").val(),
                type: $("#type").val()
            }
        },
        limit: 30,
        cols: [[
            {type: 'checkbox'},
            {field: 'name',  minWidth: 180,title: '文件名'},
            {field: 'desc',  minWidth: 160,title: '描述'},
            {field: 'path',  minWidth: 200,title: '访问路径',
                templet: '<div><a class="articleHref" href="{{d.path}}" target="_blank">{{d.path}}</a></div>'
            },
            {field: 'flag',  minWidth: 50,title: '标识'},
            {
                field: 'type',  minWidth: 50,title: '类型', templet: function (d) {
                    let html;
                    switch (d.type) {
                        case 'img':
                            html = '<i class="layui-icon layui-icon-picture"></i>   图片';
                            break;
                        case 'video':
                            html = '<i class="layui-icon layui-icon-video"></i>   视频';
                            break;
                        case 'audio':
                            html = '<i class="layui-icon layui-icon-headset"></i>   音频';
                            break;
                        default:
                            html = '<i class="layui-icon layui-icon-survey"></i>   其他';
                            break;
                    }
                    return html;
                }
            },
            {field: 'saveType',  minWidth: 100,title: '存储方式'},
            {
                field: 'createTime',
                title: '创建时间',
                sort: true,
                minWidth: 160,
                templet: "<span>{{d.createTime==null?'':layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"
            },
            {
                field: 'id', title: '操作', width: 200,
                templet: "<div>" +
                    "<a class='layui-btn layui-btn-normal layui-btn-xs' onclick='previewFile(\"{{d.type}}\",\"{{d.url}}\",\"{{d.name}}\")'>预览</a> " +
                    "<a class='layui-btn layui-btn-normal layui-btn-xs' onclick='downloadFile(\"{{d.id}}\")'>下载</a> " +
                    "<a class='layui-btn layui-btn-normal layui-btn-xs' onclick='editData(\"{{d.id}}\")'>编辑</a> " +
                    "<a class='layui-btn layui-btn-danger layui-btn-xs' onclick='deleteData(\"{{d.id}}\")'>删除</a>" +
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
 * 编辑
 * @param id
 */
function editData(id) {
    layer.open({
        title: "编辑附件信息",
        type: 2,
        area: common.layerArea($("html")[0].clientWidth, 500, 400),
        shadeClose: true,
        anim: 1,
        content: '/admin/attach/editPage/' + id
    });
}

/**
 *
 * @param ids
 */
function deleteData(ids) {
    layer.confirm('确定要删除吗?', {icon: 3, title: '提示'}, function (index) {
        $.ajax({
            type: "POST",
            url: "/admin/attach/del",
            contentType: "application/json",
            data: ids,
            success: function (data) {
                if (data.code === 200) {
                    queryTable();
                    layer.msg(data.msg, {icon: 1});
                } else {
                    layer.msg(data.msg, {icon: 2});
                }
            },
            error: function (data) {
                layer.msg("删除失败", {icon: 2});
            }
        });
        layer.close(index);
    });
}

/**
 * 文件预览
 * @param type
 * @param path
 * @param name
 */
function previewFile(type, path, name) {
    if (type === 'img') {
        layer.photos({
            photos: {
                "title": "文件预览",
                "id": 1,
                "start": 0,
                "data": [
                    {
                        "alt": name,
                        "pid": 1,
                        "src": path,
                        "thumb": path
                    }
                ],
            }
            , anim: 5,
            offset: "40px"
        });
    } else if (type === 'video') {
        layer.open({
            title: name,
            offset: '5%',
            type: 1,
            shadeClose: true,
            anim: 1,
            resize: true,
            maxmin: true,
            area: ['90%', '90%'],
            content: '<video src="' + path + '" autoplay controls style="height: calc(100% - 3px);width: 100%;outline: none">\n' +
                '  你的浏览器不支持video\n' +
                '</video>'
        });
    } else if (type === 'audio') {
        layer.open({
            title: name,
            offset: '20%',
            shadeClose: true,
            anim: 1,
            resize: true,
            maxmin: true,
            type: 1,
            area: ['400px', "100px"],
            content: '<audio src="' + path + '" autoplay controls style="background: #f1f3f4;height: calc(100% - 3px);width: 100%;outline: none">\n' +
                '  你的浏览器不支持video\n' +
                '</audio>'
        });
    } else {
        layer.msg("暂时不支持该类型文件的预览~", {icon: 2});
    }
}

/**
 * 下载文件
 * @param id
 */
function downloadFile(id) {
    let form = $("<form>");
    form.attr("style", "display:none");
    form.attr("target", "");
    form.attr("method", "get");//提交方式为post
    form.attr("action", "/admin/attach/download/" + id);//定义action

    $("body").append(form);
    form.submit();
}