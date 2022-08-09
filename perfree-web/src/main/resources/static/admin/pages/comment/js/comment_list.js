let table, $,toast;
layui.use(['table', 'jquery','toast'], function () {
    table = layui.table;
    $ = layui.jquery;
    toast = layui.toast;
    initPage();
});

/**
 * 页面初始化事件
 */
function initPage() {
    queryTable();

    // 查询
    $("#queryBtn").click(function () {
        queryTable();
    });

    // 批量删除
    $("#batchDeleteBtn").click(function () {
        const checkStatus = table.checkStatus('tableBox'), data = checkStatus.data;
        if (data.length <= 0) {
            toast.warning({message: "至少选择一条数据",position: 'topCenter'});
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
        url: '/admin/comment/list',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        contentType: 'application/json',
        title: '评论列表',
        totalRow: false,
        where: {
            form: {
                content: $("#content").val()
            }
        },
        limit: 30,
        cols: [[
            {type: 'checkbox'},
            {field: 'id', title: 'ID', width: 80, sort: true},
            {
                field: 'userName', minWidth: 100, title: '评论人', templet: "<div>{{d.userName}}</div>"
            },
            {
                field: 'email', minWidth: 180, title: '邮箱', templet: "<div>{{d.email}}</div>"
            },
            {field: 'content', title: '评论内容', minWidth: 240},
            {field: 'article', title: '所属文章', minWidth: 240, templet: "<div><a href='{{d.article.url}}' target='_blank'>{{d.article.title}}</a></div>"},
            {field: 'status', minWidth: 60, title: '状态', templet: "<div>{{d.status === 1? '待审核': '正常'}}</div>"},
            {
                field: 'createTime',
                width: 220,
                title: '评论时间',
                sort: true,
                minWidth: 160,
                templet: "<span>{{d.createTime == null ?'':layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"
            },
            {
                field: 'id', title: '操作', width: 120,
                templet: function (d) {
                    let html = "<div>";
                    if (d.status === 1) {
                        html += "<a class='pear-btn pear-btn-xs pear-btn-primary' onclick='changeStatus(\"" + d.id + "\",\"0\")'>审核</a>";
                    }
                    html += "<a class='pear-btn pear-btn-xs pear-btn-danger' onclick='deleteData(\"" + d.id + "\")'>删除</a>" +
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
}

/**
 *
 * @param ids
 */
function deleteData(ids) {
    layer.confirm('确定要删除吗?', {icon: 3, title: '提示'}, function (index) {
        $.ajax({
            type: "POST",
            url: "/admin/comment/del",
            contentType: "application/json",
            data: ids,
            success: function (data) {
                if (data.code === 200) {
                    queryTable();
                    toast.success({message: "删除成功",position: 'topCenter'});
                } else {
                    toast.error({message: data.msg,position: 'topCenter'});
                }
            },
            error: function (data) {
                toast.error({message: "删除失败",position: 'topCenter'});
            }
        });
        layer.close(index);
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
        url: "/admin/comment/changeStatus",
        contentType: "application/json",
        data: JSON.stringify({id: id, status: status}),
        success: function (data) {
            if (data.code === 200) {
                queryTable();
                toast.success({message: "操作成功",position: 'topCenter'});
            } else {
                toast.error({message: data.msg,position: 'topCenter'});
            }
        },
        error: function (data) {
            toast.error({message: "操作失败",position: 'topCenter'});
        }
    });
}