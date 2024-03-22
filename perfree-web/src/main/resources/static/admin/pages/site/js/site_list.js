let table, form;
layui.use(['table', 'form'], function () {
    table = layui.table;
    form = layui.form;
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

    // 添加
    $("#addBtn").click(function () {
        common.layer.open({
            title: "添加站点",
            type: 2,
            area: common.layerArea($("html")[0].clientWidth, 500, 400),
            shadeClose: true,
            anim: 1,
            content: '/admin/site/addPage'
        });
    });

    // 批量删除
    $("#batchDeleteBtn").click(function () {
        const checkStatus = table.checkStatus('tableBox'), data = checkStatus.data;
        if (data.length <= 0) {
            common.toast.warning({message: "至少选择一条数据",position: 'topCenter'});
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
        url: '/api/site/page',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        contentType: 'application/json',
        title: '用户列表',
        totalRow: false,
        where: {
            name: $("#name").val(),
            flag: $("#flag").val(),
        },
        limit: 30,
        cols: [[
            {type: 'checkbox'},
            {field: 'id', title: 'ID', width: 80,  sort: true},
            {field: 'name', minWidth: 80,title: '站点名称'},
            {field: 'flag', minWidth: 150,title: '站点标识'},
            {field: 'description', minWidth: 200,title: '站点描述'},
            {
                field: 'status', minWidth: 100,title: '状态',
                templet: function (d) {
                    let html;
                    if (d.status === 0) {
                        html = "<input type='checkbox' name='status' lay-filter='status' lay-skin='switch' value='" + d.id + "' lay-text='正常|禁用' checked>";
                    } else {
                        html = "<input type='checkbox' name='status' lay-filter='status' value='" + d.id + "' lay-skin='switch' lay-text='正常|禁用'>";
                    }
                    return html;
                }
            },
            {
                field: 'createTime',
                title: '创建时间',
                sort: true,
                minWidth: 160,
                templet: "<span>{{d.createTime == null? '' :layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"
            },
            {
                field: 'updateTime',
                title: '更新时间',
                sort: true,
                minWidth: 160,
                templet: "<span>{{d.updateTime == null ? '' :layui.util.toDateString(d.updateTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"
            },
            {
                field: 'id', title: '操作', width: 180,
                templet: "<div>" +
                    "<a class='pear-btn pear-btn-xs pear-btn-primary' onclick='editData(\"{{d.id}}\")'>编辑</a> " +
                    "<a class='pear-btn pear-btn-xs pear-btn-danger' style='margin-left: 5px' onclick='deleteData(\"{{d.id}}\")'>删除</a>" +
                    "</div>"
            },
        ]],
        page: true,
        response: {statusCode: 200},
        parseData: function (res) {
            return {
                "code": res.code,
                "msg": res.msg,
                "count": res.data.total,
                "data": res.data.list
            };
        },
        request: {
            pageName: 'pageNo',
            limitName: 'pageSize'
        }
    });
    form.on('switch(status)', function (data) {
        const id = this.value;
        const status = this.checked ? 0 : 1;
        changeStatus(id, status);
    });
}

/**
 * 编辑
 * @param id
 */
function editData(id) {
    common.layer.open({
        title: "编辑站点",
        type: 2,
        area: common.layerArea($("html")[0].clientWidth, 500, 400),
        shadeClose: true,
        anim: 1,
        content: '/admin/site/editPage?id=' + id
    });
}

/**
 *
 * @param ids
 */
function deleteData(ids) {
    common.layer.confirm('确定要删除吗?', {icon: 3, title: '提示'}, function (index) {
        request.delete("/api/site/batchDel?ids=" + ids).then(res => {
            if (res.code === 200) {
                queryTable();
                common.toast.success({message: "删除成功",position: 'topCenter'});
            } else {
                common.toast.error({message: data.msg,position: 'topCenter'});
            }
        })
        common.layer.close(index);
    });
}

/**
 * 改变状态
 * @param id id
 * @param status
 */
function changeStatus(id, status) {
    request.put("/api/site/updateStatus", JSON.stringify({id: id, status: status})).then(res => {
        if (res.code === 200) {
            queryTable();
            common.toast.success({message: "修改成功",position: 'topCenter'});
        } else {
            common.toast.error({message: data.msg,position: 'topCenter'});
        }
    })
}