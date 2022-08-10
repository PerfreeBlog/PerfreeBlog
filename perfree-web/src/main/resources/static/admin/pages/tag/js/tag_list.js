var form,table, toast,colorpicker;
let formType = 'add';
layui.use(['table', 'toast','form', 'colorpicker'], function () {
    table = layui.table;
    toast = layui.toast;
    form = layui.form;
    colorpicker = layui.colorpicker;
    colorpicker.render({
        elem: '#color-picker'
        ,color: localStorage.getItem("theme-color-color")
        ,done: function(color){
            $('#color-input').val(color);
        }
    });
    initPage();

    $("#restBtn").on("click",function () {
        if (formType === 'add') {
            $(".addForm")[0].reset();
            form.render();
        } else {
            toAddFunc();
        }
    });

    form.verify({});
    form.on('submit(addForm)', function (data) {
        if (formType === 'add') {
            addSubmit(data);
        } else {
            updateSubmit(data);
        }
        return false;
    });
});

function toAddFunc() {
    $(".addForm")[0].reset();
    form.render();
    formType = 'add';
    $("#restBtn").text("重置");
    $("#form-title").text("添加标签");
}

function updateSubmit(data) {
    $.ajax({
        type: "POST",
        url: "/admin/tag/update",
        contentType: "application/json",
        data: JSON.stringify(data.field),
        success: function (res) {
            if (res.code === 200) {
                queryTable();
                parent.toast.success({message: '更新成功',position: 'topCenter'});
                toAddFunc();
            } else {
                parent.toast.error({message: res.msg,position: 'topCenter'});
            }
        },
        error: function (res) {
            parent.toast.error({message: "更新失败",position: 'topCenter'});
        }
    });
}

function addSubmit(data) {
    $.ajax({
        type: "POST",
        url: "/admin/tag/add",
        contentType: "application/json",
        data: JSON.stringify(data.field),
        success: function (res) {
            if (res.code === 200) {
                queryTable();
                parent.toast.success({message: '添加成功',position: 'topCenter'});
                $(".addForm")[0].reset();
                form.render();
            } else {
                parent.toast.error({message: res.msg,position: 'topCenter'});
            }
        },
        error: function (res) {
            parent.toast.error({message: "添加失败",position: 'topCenter'});
        }
    });
}

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
            parent.toast.warning({message: "至少选择一条数据",position: 'topCenter'});
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
        url: '/admin/tag/list',
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
        limit: 10,
        cols: [[
            {type: 'checkbox'},
            {field: 'id', title: 'ID', width: 80, sort: true},
            {field: 'name', minWidth: 160,title: '标签名'},
            {field: 'slug', minWidth: 160,title: '访问别名'},
            {
                field: 'color',
                title: '颜色',
                minWidth: 80,
                templet: "<div><span style='background: {{d.color}};display: inline-block;width: 25px;height: 25px'></span></div>"
            },
            {
                field: 'thumbnail',
                title: '封面图',
                minWidth: 100,
                templet: "<div><img src='{{d.thumbnail}}' height='100%'></div>"
            },
            {field: 'user', minWidth: 100,title: '创建人', templet: "<span>{{d.user.userName}}</span>"},
            {
                field: 'id', title: '操作', width: 120,
                templet: "<div>" +
                    "<a class='pear-btn pear-btn-xs pear-btn-primary' onclick='editData(\"{{d.id}}\")'>编辑</a> " +
                    "<a class='pear-btn pear-btn-xs pear-btn-danger' onclick='deleteData(\"{{d.id}}\")'>删除</a>" +
                    "</div>"
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
 * 编辑
 * @param id
 */
function editData(id) {
    $.get("/admin/tag/getById?tagId="+id,function(data,status){
        if (data.code === 200) {
            $("input[name='id']").val(data.data.id);
            $("input[name='name']").val(data.data.name);
            $("input[name='slug']").val(data.data.slug);
            $("input[name='color']").val(data.data.color);
            $("input[name='thumbnail']").val(data.data.thumbnail);
            $("#form-title").text("修改标签");
            $("#restBtn").text("返回添加");
            formType = 'edit';
        } else {
            parent.toast.error({message: data.msg,position: 'topCenter'});
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
            url: "/admin/tag/del",
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