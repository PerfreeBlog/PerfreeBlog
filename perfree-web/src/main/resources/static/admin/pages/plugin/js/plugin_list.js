let table,upload;
layui.use('table', function () {
    table = layui.table;
    upload = layui.upload;
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

    let loadIndex;
    upload.render({
        elem: '#addBtn',
        url: '/admin/plugin/addPlugin',
        accept: "file",
        exts: "jar",
        before: function (obj) {
            loadIndex = layer.load("正在上传");
        },
        done: function (res) {
            layer.close(loadIndex);
            if (res.code === 200) {
                queryTable();
                parent.layer.msg("插件安装成功", {icon: 1});
                setTimeout(function (){
                    localStorage.setItem("plugin", "success");
                    parent.location.reload();
                }, 500)
            } else {
                layer.msg(res.msg, {icon: 2});
            }
        },
        error: function () {
            layer.close(loadIndex);
            layer.msg("插件安装失败", {icon: 2});
        }
    });
}


/**
 * 查询表格数据
 */
function queryTable() {
    table.render({
        elem: '#tableBox',
        url: '/admin/plugin/list',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        contentType: 'application/json',
        title: '插件列表',
        totalRow: false,
        where: {
            form: {
                name: $("#pluginName").val()
            }
        },
        limit: 30,
        cols: [[
            {field: 'id', title: 'ID', width: 80, sort: true},
            {field: 'name', title: '插件名',  minWidth: 180},
            {field: 'version', title: '版本',  minWidth: 100},
            {field: 'desc', title: '描述',minWidth: 260},
            {field: 'author', title: '作者',  minWidth: 100},
            {field: 'path', title: '路径',  minWidth: 220},
            {
                field: 'createTime',
                title: '创建时间',
                sort: true,
                templet: "<span>{{d.createTime ==null?'':layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</span>",
                minWidth: 160
            },
            {
                field: 'updateTime',
                title: '更新时间',
                sort: true,
                templet: "<span>{{d.updateTime == null?'':layui.util.toDateString(d.updateTime, 'yyyy-MM-dd HH:mm:ss')}}</span>",
                minWidth: 160
            },
            {
                field: 'id', title: '操作', width: 120,
                templet: function (d) {
                    let html = "<div>";
                    if (d.status === 0) {
                        html += "<a class='layui-btn layui-btn-xs' onclick='startPlugin(\""+d.id+"\")'>启用</a>";
                    } else {
                        html += "<a class='layui-btn layui-btn-xs' onclick='stopPlugin(\""+d.id+"\")'>禁用</a>";
                    }
                    html +=  "<a class='layui-btn layui-btn-danger layui-btn-xs' onclick='deleteData(\""+d.id+"\")'>卸载</a></div>";
                    return html;
                }
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
 *
 * @param ids
 */
function deleteData(ids) {
    layer.confirm('确定要卸载吗?', {icon: 3, title: '提示'}, function (index) {
        $.ajax({
            type: "POST",
            url: "/admin/plugin/del",
            contentType: "application/json",
            data: ids,
            success: function (data) {
                if (data.code === 200) {
                    queryTable();
                    layer.msg("插件卸载成功", {icon: 1});
                    setTimeout(function (){
                        localStorage.setItem("plugin", "success");
                        parent.location.reload();
                    }, 500)
                } else {
                    layer.msg(data.msg, {icon: 2});
                }
            },
            error: function (data) {
                layer.msg("卸载失败", {icon: 2});
            }
        });
        layer.close(index);
    });
}

function startPlugin(id){
    $.ajax({
        type: "POST",
        url: "/admin/plugin/startPlugin",
        contentType: "application/json",
        data: id,
        success: function (data) {
            if (data.code === 200) {
                queryTable();
                layer.msg("插件启用成功", {icon: 1});
                setTimeout(function (){
                    localStorage.setItem("plugin", "success");
                    parent.location.reload();
                }, 500)
            } else {
                layer.msg(data.msg, {icon: 2});
            }
        },
        error: function (data) {
            layer.msg("插件启用失败", {icon: 2});
        }
    });
}

function stopPlugin(id){
    $.ajax({
        type: "POST",
        url: "/admin/plugin/stopPlugin",
        contentType: "application/json",
        data: id,
        success: function (data) {
            if (data.code === 200) {
                queryTable();
                layer.msg("插件禁用成功", {icon: 1});
                setTimeout(function (){
                    localStorage.setItem("plugin", "success");
                    parent.location.reload();
                }, 500)
            } else {
                layer.msg(data.msg, {icon: 2});
            }
        },
        error: function (data) {
            layer.msg("插件禁用失败", {icon: 2});
        }
    });
}