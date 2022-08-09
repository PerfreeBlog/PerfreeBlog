var table, treeTable, layPage, form,$,toast;
let pageIndex = 1, pageSize = 20;
layui.use(['table', 'treeTable', 'laypage', 'form', 'jquery','toast'], function () {
    table = layui.table;
    treeTable = layui.treeTable;
    layPage = layui.laypage;
    form = layui.form;
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

    // 添加
    $("#addBtn").click(function () {
        add();
    });
}


/**
 * 查询表格数据
 */
function queryTable() {
    treeTable.render({
        elem: '#tableBox',
        url: '/admin/menu/list',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        contentType: 'application/json',
        title: '菜单列表',
        totalRow: false,
        where: {
            pageSize: pageSize,
            pageIndex: pageIndex,
            form: {
                name: $("#name").val()
            }
        },
        tree: {
            iconIndex: 1,
            isPidData: false,
            idName: 'id',
            childName: 'childMenu'
        },
        parseData: function (res) {
            layPage.render({
                elem: 'tablePage',
                limit: pageSize,
                count: res.total,
                curr: res.pageIndex,
                layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
                jump: function (obj, first) {
                    pageIndex = obj.curr;
                    pageSize = obj.limit;
                    //首次不执行
                    if (!first) {
                        queryTable();
                    }
                }
            });
            $("#tablePage").hide();
            return {
                "code": res.code === 200 ? 0 : 1,
                "msg": res.msg,
                "count": res.total,
                "data": res.data
            };
        },
        cols: [[
            {field: 'id', title: 'ID', width: 80},
            {field: 'name', minWidth: 160,title: '菜单名'},
            {field: 'url', minWidth: 200,title: '菜单链接'},
            {
                field: 'icon',
                align: 'center',
                title: '图标',
                minWidth: 80,
                templet: "<div><i class='fa {{d.icon}}' aria-hidden='true'></i></div>"
            },
            {field: 'target', minWidth: 120,title: '打开方式', templet: "<div>{{d.target === 0 ? '本页' : '新窗口'}}</div>"},
            {
                field: 'status', minWidth: 100,title: '状态', templet: function (d) {
                    let html;
                    if (d.status === 0) {
                        html = "<input type='checkbox' name='status' lay-filter='status' lay-skin='switch' value='" + d.id + "' lay-text='正常|禁用' checked>";
                    } else {
                        html = "<input type='checkbox' name='status' lay-filter='status' value='" + d.id + "' lay-skin='switch' lay-text='正常|禁用'>";
                    }
                    return html;
                }
            },
            {field: 'seq', minWidth: 70,title: '排序'},
            {
                field: 'createTime',
                title: '创建时间',
                minWidth: 150,
                templet: "<span>{{d.createTime ==null?'':layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"
            },
            {
                field: 'updateTime',
                title: '更新时间',
                minWidth: 150,
                templet: "<span>{{d.updateTime == null?'':layui.util.toDateString(d.updateTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"
            },
            {
                field: 'id', title: '操作', width: 220,
                templet: function (d) {
                    let html = "<div>"
                    html += "<a class='pear-btn pear-btn-xs pear-btn-primary' onclick='add(\"" + d.id + "\")'>添加子菜单</a> " +
                        "<a class='pear-btn pear-btn-xs pear-btn-primary' onclick='editData(\"" + d.id + "\")'>编辑</a> " +
                        "<a class='pear-btn pear-btn-xs pear-btn-danger' onclick='deleteData(\"" + d.id + "\")'>删除</a>" +
                        "</div>";
                    return html;
                }
            },
        ]],
        page: true,
        response: {statusCode: 200},
        done: function () {
            $("#tablePage").show();
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
    layer.open({
        title: "编辑菜单",
        type: 2,
        area: common.layerArea($("html")[0].clientWidth, 500, 400),
        shadeClose: true,
        anim: 1,
        content: '/admin/menu/editPage/' + id
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
            url: "/admin/menu/del",
            contentType: "application/json",
            data: ids,
            success: function (data) {
                if (data.code === 200) {
                    queryTable();
                    parent.toast.success({message: "删除成功",position: 'topCenter'});
                } else {
                    parent.toast.error({message: data.msg,position: 'topCenter'});
                }
            },
            error: function (data) {
                parent.toast.error({message: "删除失败",position: 'topCenter'});
            }
        });
        layer.close(index);
    });
}

/**
 * 添加
 */
function add(pid = -1) {
    let title = "添加一级菜单";
    if (pid !== -1) {
        title = "添加子菜单";
    }
    layer.open({
        title: title,
        type: 2,
        area: common.layerArea($("html")[0].clientWidth, 500, 400),
        shadeClose: true,
        anim: 1,
        content: '/admin/menu/addPage/' + pid
    });
}

/**
 * 改变状态
 * @param id id
 * @param status status
 */
function changeStatus(id, status) {
    $.ajax({
        type: "POST",
        url: "/admin/menu/changeStatus",
        contentType: "application/json",
        data: JSON.stringify({id: id, status: status}),
        success: function (data) {
            if (data.code === 200) {
                queryTable();
                parent.toast.success({message: "修改成功",position: 'topCenter'});
            } else {
                parent.toast.error({message: data.msg,position: 'topCenter'});
            }
        },
        error: function (data) {
            parent.toast.error({message: "修改状态失败",position: 'topCenter'});
        }
    });
}