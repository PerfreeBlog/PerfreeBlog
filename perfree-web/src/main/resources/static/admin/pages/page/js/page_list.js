let table, form;
layui.use(['table', 'layer', 'form'], function () {
    table = layui.table;
    form = layui.form;
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
        parent.openTab('', '添加页面', '/admin/page/addPage', "-3");
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
        url: '/admin/article/list',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        contentType: 'application/json',
        title: '文章列表',
        totalRow: false,
        where: {
            form: {
                title: $("#title").val(),
                type: "page"
            }
        },
        limit: 30,
        cols: [[
            {type: 'checkbox'},
            {field: 'id', title: 'ID', width: 60},
            {
                field: 'title',
                title: '标题',
                minWidth: 260,
                templet: '<div><a class="articleHref" href="{{d.url}}" target="_blank">{{d.title}}</a></div>'
            },
            {field: 'category', title: '分类',  minWidth: 160,templet: "<span>{{d.category === null ? '' : d.category.name}}</span>"},
            {
                field: 'status',  minWidth: 100, title: '状态', templet: function (d) {
                    let html = '<span>';
                    if (d.status === 0) {
                        html += "已发布";
                    }
                    if (d.status === 1) {
                        html += "草稿";
                    }
                    html += '</div>';
                    return html;
                }
            },
            {
                field: 'isComment',  minWidth: 100, title: '允许评论', templet: function (d) {
                    let html;
                    if (d.isComment === 1) {
                        html = "<input type='checkbox' name='isComment' lay-filter='isComment' lay-skin='switch' value='" + d.id + "' lay-text='允许|不允许' checked>";
                    } else {
                        html = "<input type='checkbox' name='isComment' lay-filter='isComment' value='" + d.id + "' lay-skin='switch' lay-text='允许|不允许'>";
                    }
                    return html;
                }
            },
            {field: 'user',  minWidth: 80, title: '创建人', templet: "<span>{{d.user.userName}}</span>"},
            {
                field: 'createTime',
                title: '创建时间',
                sort: true,
                minWidth: 160,
                templet: "<span>{{d.createTime==null?'':layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"
            },
            {
                field: 'updateTime',
                title: '更新时间',
                sort: true,
                minWidth: 160,
                templet: "<span>{{d.updateTime ==null?'':layui.util.toDateString(d.updateTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"
            },
            {
                field: 'id', title: '操作', width: 140,
                templet: function (d) {
                    let html = "<div>";
                    if (d.status === 1) {
                        html += "<a class='layui-btn layui-btn-normal layui-btn-xs' onclick='changeStatus(\"" + d.id + "\",\"0\")'>发布</a>";
                    }
                    if (d.status === 0) {
                        html += "<a class='layui-btn layui-btn-normal layui-btn-xs' onclick='changeStatus(\"" + d.id + "\",\"1\")'>草稿</a>";
                    }
                    html += "<a class='layui-btn layui-btn-normal layui-btn-xs' onclick='editData(\"" + d.id + "\")'>编辑</a> " +
                        "<a class='layui-btn layui-btn-danger layui-btn-xs' onclick='deleteData(\"" + d.id + "\")'>删除</a>" +
                        "</div>";
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

    form.on('switch(isComment)', function (data) {
        const id = this.value;
        const status = this.checked ? 1 : 0;
        changeCommentStatus(id, status);
    });
}

/**
 * 编辑
 * @param id
 */
function editData(id) {
    parent.openTab('', '编辑页面', '/admin/page/updatePage/' + id, "-4");
}

/**
 *
 * @param ids
 */
function deleteData(ids) {
    layer.confirm('确定要删除吗?', {icon: 3, title: '提示'}, function (index) {
        $.ajax({
            type: "POST",
            url: "/admin/page/del",
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
 * 更改是否可以评论
 */
function changeCommentStatus(id, status) {
    $.ajax({
        type: "POST",
        url: "/admin/article/changeCommentStatus",
        contentType: "application/json",
        data: JSON.stringify({id: id, isComment: status}),
        success: function (data) {
            if (data.code === 200) {
                queryTable();
                layer.msg(data.msg, {icon: 1});
            } else {
                layer.msg(data.msg, {icon: 2});
            }
        },
        error: function (data) {
            layer.msg("修改状态失败", {icon: 2});
        }
    });
}

/**
 * 更改状态
 * @param id
 * @param status
 */
function changeStatus(id, status) {
    $.ajax({
        type: "POST",
        url: "/admin/article/changeStatus",
        contentType: "application/json",
        data: JSON.stringify({id: id, status: status}),
        success: function (data) {
            if (data.code === 200) {
                queryTable();
                layer.msg(data.msg, {icon: 1});
            } else {
                layer.msg(data.msg, {icon: 2});
            }
        },
        error: function (data) {
            layer.msg("修改状态失败", {icon: 2});
        }
    });
}