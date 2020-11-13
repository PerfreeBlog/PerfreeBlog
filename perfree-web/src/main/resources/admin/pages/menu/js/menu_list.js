let table,treeTable,layPage;
layui.config({
    base: '/public/libs/layuiComponents/'
}).extend({
    treeTable:'treetable-lay/treeTable'
})
layui.use(['table','treeTable','laypage'], function(){
    table = layui.table;
    treeTable = layui.treeTable;
    layPage = layui.laypage;
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
            title: "添加一级菜单",
            type: 2,
            offset: '20%',
            area:  ['400px', '420px'],
            shadeClose: true,
            anim: 1,
            move: false,
            content: '/admin/menu/addPage'
        });
    });

    // 批量删除
    $("#batchDeleteBtn").click(function () {
        const checkStatus = table.checkStatus('tableBox'),data = checkStatus.data;
        if (data.length <= 0) {
            layer.msg("至少选择一条数据", {icon: 2});
        } else {
            let ids = "";
            data.forEach(res => {
                ids += res.id + ",";
            });
            ids = ids.substring(0, ids.length-1);
            deleteData(ids)
        }
    });
}


/**
 * 查询表格数据
 */
let pageIndex = 1, pageSize = 20;
function queryTable() {
    treeTable.render({
        elem: '#tableBox',
        url:'/admin/menu/list',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        contentType: 'application/json',
        title: '菜单列表',
        totalRow: false,
        where: {
            pageSize: pageSize,
            pageIndex: pageIndex,
            form:{
                name: $("#name").val()
            }
        },
        tree: {
            iconIndex: 2,
            isPidData: false,
            idName: 'id',
            childName: 'childMenu'
        },
        parseData: function(res){
            layPage.render({
                elem: 'tablePage',
                limit: pageSize,
                count: res.total,
                curr: res.pageIndex,
                layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
                jump: function(obj, first){
                    pageIndex = obj.curr;
                    pageSize = obj.limit;
                    //首次不执行
                    if(!first){
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
            {type: 'checkbox', fixed: 'left'},
            {field:'id', title:'ID', width:80},
            {field:'name', title:'菜单名'},
            {field:'url', title:'菜单链接'},
            {field:'icon', align:'center',title:'图标', templet: "<div><i class='fa {{d.icon}}' aria-hidden='true'></i></div>"},
            {field:'target', title:'打开方式', templet: "<div>{{d.target === 0 ? '本页' : '新窗口'}}</div>"},
            {field:'status', title:'状态', templet: function (d) {
                    let html;
                    if (d.status === 0) {
                        html = "<input type='checkbox' name='status' lay-filter='status' lay-skin='switch' value='" + d.id + "' lay-text='正常|禁用' checked>";
                    } else {
                        html = "<input type='checkbox' name='status' lay-filter='status' value='" + d.id + "' lay-skin='switch' lay-text='正常|禁用'>";
                    }
                    return html;
                }
            },
            {field:'seq', title:'排序'},
            {field:'createTime', title:'创建时间', templet: "<span>{{layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</span>" },
            {field:'updateTime', title:'更新时间',  templet: "<span>{{layui.util.toDateString(d.updateTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"},
            {field:'id', title:'操作', width: 180,
                templet: function (d) {
                    let html = "<div>"
                    if (d.pid === -1 || d.pid === '-1'){
                        html += "<a class='layui-btn layui-btn-primary layui-btn-xs' onclick='editData(\"{{d.id}}\")'>添加</a> ";
                    }
                    html +=  "<a class='layui-btn layui-btn-normal layui-btn-xs' onclick='editData(\"{{d.id}}\")'>编辑</a> " +
                        "<a class='layui-btn layui-btn-danger layui-btn-xs' onclick='deleteData(\"{{d.id}}\")'>删除</a>" +
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
}

/**
 * 编辑
 * @param id
 */
function editData(id) {
    layer.open({
        title: "编辑标签",
        type: 2,
        offset: '20%',
        area:  ['400px', '140px'],
        shadeClose: true,
        anim: 1,
        move: false,
        content: '/admin/tag/editPage/' + id
    });
}

/**
 *
 * @param ids
 */
function deleteData(ids) {
    layer.confirm('确定要删除吗?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            type: "POST",
            url: "/admin/tag/del",
            contentType:"application/json",
            data: ids,
            success:function(data){
                if (data.code === 200){
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