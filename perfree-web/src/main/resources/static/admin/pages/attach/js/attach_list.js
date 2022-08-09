var table, form, layer, layPage, flow, laytpl, element,$, toast;
let pageIndex = 1, pageSize = 18;
layui.use(['table', 'form', 'layer', 'laypage', 'flow', 'laytpl', 'element','jquery','toast'], function () {
    table = layui.table;
    form = layui.form;
    layer = layui.layer;
    layPage = layui.laypage;
    flow = layui.flow;
    laytpl = layui.laytpl;
    element = layui.element;
    $ = layui.jquery;
    toast= layui.toast;
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
        layer.open({
            title: "上传附件",
            type: 2,
            area: common.layerArea($("html")[0].clientWidth, 500, 400),
            shadeClose: true,
            anim: 1,
            content: '/admin/attach/uploadPage',
            cancel: function(){
                queryTable();
            },
            end: function(){
                queryTable();
            }
        });
    });

    // 批量删除
    $("#batchDeleteBtn").click(function () {
        let ids = "";
        $('input[type="checkbox"]:checked').each(function() {
            ids += $(this).attr('id') + ",";
        });
        if (ids.length <= 0) {
            parent.toast.warning({message: "至少选择一条数据",position: 'topCenter'});
            return;
        }
        ids = ids.substring(0, ids.length - 1);
        deleteData(ids);
    });
}


/**
 * 查询表格数据
 */
function queryTable() {
    let loadIndex = layer.load();
    $.ajax({
        type: "POST",
        url: "/admin/attach/list",
        contentType: "application/json",
        data: JSON.stringify({
            pageSize,
            pageIndex,
            form: {
                name: $("#name").val(),
                type: $("#type").val()
            }
        }),
        success: function (data) {
            if (data.code === 200) {
                laytpl($("#tableTpl").html()).render(data.data, function (html) {
                    $("#tableBox").html(html);
                });
                layPage.render({
                    elem: 'tabBoxPage',
                    limit: pageSize,
                    count: data.total,
                    curr: data.pageIndex,
                    layout: ['count', 'prev', 'page', 'next'],
                    jump: function (obj, first) {
                        pageIndex = obj.curr;
                        pageSize = obj.limit;
                        if (!first) {queryTable();}
                    }
                });
                flow.lazyimg({elem: '.p-attach-card img', scrollElem: '.pear-container'});
            } else {
                parent.toast.error({message: data.msg,position: 'topCenter'});
            }
            layer.close(loadIndex);
        },
        error: function (data) {
            layer.close(loadIndex);
            parent.toast.error({message: "加载列表失败",position: 'topCenter'});
        }
    })
}

/**
 * 编辑
 * @param id
 */
function editData(id) {
    layer.open({
        title: "编辑附件信息",
        type: 2,
        scrollbar: true,
        offset:$(window).height()*0.05,
        area: common.layerArea($("html")[0].clientWidth, 800, 500),
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