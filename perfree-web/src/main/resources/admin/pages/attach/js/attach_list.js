let table;
layui.use('table', function(){
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
            offset: '20%',
            area:  ['400px', '440px'],
            shadeClose: true,
            anim: 1,
            move: false,
            content: '/admin/attach/uploadPage'
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
function queryTable() {
    table.render({
        elem: '#tableBox',
        url:'/admin/attach/list',
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
            {type: 'checkbox', fixed: 'left'},
            {field:'id', title:'ID', width:80, fixed: 'left',sort: true},
            {field:'name', title:'文件名'},
            {field:'desc', title:'描述'},
            {field:'path', title:'路径'},
            {field:'flag', title:'标识'},
            {field:'type', title:'类型', templet: function (d) {
                    let html;
                    switch (d.type){
                        case 'img':
                            html = "图片";
                            break;
                        case 'video':
                            html = "视频";
                            break;
                        default:
                            html = '其他';
                            break;
                    }
                    return html;
                }
            },
            {field:'createTime', title:'创建时间', sort: true, templet: "<span>{{layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</span>" },
            {field:'updateTime', title:'更新时间', sort: true, templet: "<span>{{layui.util.toDateString(d.updateTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"},
            {field:'id', title:'操作', width:200, fixed: 'right',
                templet: "<div>" +
                            "<a class='layui-btn layui-btn-normal layui-btn-xs' onclick='previewFile(\"{{d.type}}\",\"{{d.path}}\",\"{{d.name}}\")'>预览</a> " +
                            "<a class='layui-btn layui-btn-normal layui-btn-xs' onclick='editData(\"{{d.id}}\")'>下载</a> " +
                            "<a class='layui-btn layui-btn-normal layui-btn-xs' onclick='editData(\"{{d.id}}\")'>编辑</a> " +
                            "<a class='layui-btn layui-btn-danger layui-btn-xs' onclick='deleteData(\"{{d.id}}\")'>删除</a>" +
                        "</div>"
            },
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

/**
 * 文件预览
 * @param type
 * @param path
 * @param name
 */
function previewFile(type,path,name) {
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
                ]
            }
            ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
        });
    } else if (type === 'video') {
        layer.open({
            content: 'test'
        });
    } else {
        layer.msg("暂时不支持该类型文件的预览~", {icon: 2});
    }
}