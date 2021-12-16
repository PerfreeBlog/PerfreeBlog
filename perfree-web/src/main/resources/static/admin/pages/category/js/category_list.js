let table, treeTable, layPage, form;
let pageIndex = 1, pageSize = 20;
layui.config({
    base: '/static/public/libs/layuiComponents/'
}).extend({
    treeTable: 'treetable-lay/treeTable'
})
layui.use(['table', 'treeTable', 'laypage', 'form'], function () {
    table = layui.table;
    treeTable = layui.treeTable;
    layPage = layui.laypage;
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
        add();
    });
}


/**
 * 查询表格数据
 */
function queryTable() {
    treeTable.render({
        elem: '#tableBox',
        url: '/admin/category/list',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        contentType: 'application/json',
        title: '分类列表',
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
            childName: 'children'
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
            {field: 'name', minWidth: 160,title: '分类名'},
            {field: 'desc', minWidth: 260,title: '描述'},
            {field: 'count', minWidth: 80,align: 'center', title: '文章数量'},
            {field: 'metaKeywords', minWidth: 160,title: 'SEO关键字'},
            {field: 'metaDescription', minWidth: 160,title: 'SEO描述内容'},
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
            {
                field: 'createTime',
                title: '创建时间',
                minWidth: 160,
                templet: "<span>{{d.createTime ==null?'':layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"
            },
            {
                field: 'updateTime',
                title: '更新时间',
                minWidth: 160,
                templet: "<span>{{d.updateTime ==null?'':layui.util.toDateString(d.updateTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"
            },
            {
                field: 'id', title: '操作', width: 160,
                templet: function (d) {
                    let html = "<div>"
                    html += "<a class='layui-btn layui-btn-primary layui-btn-xs' onclick='add(\"" + d.id + "\")'>添加</a> " +
                        "<a class='layui-btn layui-btn-normal layui-btn-xs' onclick='editData(\"" + d.id + "\")'>编辑</a> " +
                        "<a class='layui-btn layui-btn-danger layui-btn-xs' onclick='deleteData(\"" + d.id + "\")'>删除</a>" +
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
        title: "编辑分类",
        type: 2,
        area: common.layerArea($("html")[0].clientWidth, 500, 400),
        shadeClose: true,
        anim: 1,
        content: '/admin/category/editPage/' + id
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
            url: "/admin/category/del",
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
 * 添加
 */
function add(pid = -1) {
    let title = "添加一级分类";
    if (pid !== -1) {
        title = "添加子分类";
    }
    layer.open({
        title: title,
        type: 2,
        area: common.layerArea($("html")[0].clientWidth, 500, 400),
        shadeClose: true,
        anim: 1,
        content: '/admin/category/addPage/' + pid
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
        url: "/admin/category/changeStatus",
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