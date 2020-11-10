let table;
layui.use('table', function(){
    table = layui.table;
});
initPage();

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
        alert(1);
    });
}


/**
 * 查询表格数据
 */
function queryTable() {
    table.render({
        elem: '#tableBox',
        url:'/admin/tag/list',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        contentType: 'application/json',
        title: '标签列表',
        totalRow: false,
        where: {
            form: {
                name: $("#tagName").val()
            }
        },
        limit: 30,
        cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field:'id', title:'ID', width:80, fixed: 'left',sort: true},
            {field:'name', title:'标签名'},
            {field:'count', title:'文章数量'},
            {field:'user', title:'用户名', templet: "<span>{{d.user.userName}}</span>"},
            {field:'createTime', title:'创建时间', sort: true, templet: "<span>{{layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</span>" },
            {field:'updateTime', title:'更新时间', sort: true, templet: "<span>{{layui.util.toDateString(d.updateTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"}
        ]],
        page: true,
        response: {statusCode: 200},
        parseData: function(res){
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