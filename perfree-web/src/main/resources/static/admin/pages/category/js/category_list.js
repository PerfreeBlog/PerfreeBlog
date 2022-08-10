var table, treeTable, layPage, form,$,toast, xmSelect,categorySelect;
let pageIndex = 1, pageSize = 10;
let formType = 'add';
layui.use(['table', 'treeTable', 'laypage', 'form', 'jquery','toast', 'xmSelect'], function () {
    table = layui.table;
    treeTable = layui.treeTable;
    layPage = layui.laypage;
    xmSelect = layui.xmSelect;
    form = layui.form;
    $ = layui.jquery;
    toast = layui.toast;
    initPage();
    initCategory();
    $("#restBtn").on("click",function () {
        if (formType === 'add') {
            categorySelect.setValue([]);
            $(".addForm")[0].reset();
            form.render();
        } else {
            toAddFunc();
        }
    });

    form.verify({});
    // 表单提交
    form.on('submit(addForm)', function (data) {
        data.field.pid = "-1";
        if (categorySelect.getValue().length > 0) {
            data.field.pid = categorySelect.getValue()[0].value;
        }
        if (formType === 'add') {
            addSubmit(data);
        } else {
            updateSubmit(data);
        }
        return false;
    });
});

function updateSubmit(data) {
    $.ajax({
        type: "POST",
        url: "/admin/category/update",
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
        url: "/admin/category/add",
        contentType: "application/json",
        data: JSON.stringify(data.field),
        success: function (res) {
            if (res.code === 200) {
                queryTable();
                initCategory();
                parent.toast.success({message: '添加成功',position: 'topCenter'});
                $(".addForm")[0].reset();
                categorySelect.setValue([]);
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

function toAddFunc() {
    $(".addForm")[0].reset();
    categorySelect.setValue([]);
    form.render();
    formType = 'add';
    $("#restBtn").text("重置");
    $("#form-title").text("添加分类");
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
                name: $("#categoryName").val()
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
            {field: 'id', title: 'ID', width: 60},
            {field: 'name', minWidth: 180,title: '分类名'},
            {field: 'desc', minWidth: 180,title: '描述'},
            {field: 'slug', minWidth: 160,title: '访问别名'},
            {field: 'count', minWidth: 100,align: 'center', title: '文章数量'},
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
                field: 'id', title: '操作', width: 220,
                templet: function (d) {
                    let html = "<div>"
                    html += "<a class='pear-btn pear-btn-xs pear-btn-primary' onclick='addChild(\"" + d.id + "\")'>添加子分类</a> " +
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
    $.get("/admin/category/getById?categoryId="+id,function(data,status){
        if (data.code === 200) {
            $("input[name='id']").val(data.data.id);
            $("input[name='name']").val(data.data.name);
            $("textarea[name='desc']").val(data.data.desc);
            $("select[name='status']").val(data.data.status + "");
            $("input[name='metaKeywords']").val(data.data.metaKeywords);
            $("input[name='slug']").val(data.data.slug);
            $("input[name='thumbnail']").val(data.data.thumbnail);
            $("textarea[name='metaDescription']").val(data.data.metaDescription);
            categorySelect.setValue([data.data.pid]);
            form.render("select");
            $("#form-title").text("修改分类");
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
            url: "/admin/category/del",
            contentType: "application/json",
            data: ids,
            success: function (data) {
                if (data.code === 200) {
                    queryTable();
                    initCategory();
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
function addChild(pid) {
    toAddFunc();
    categorySelect.setValue([pid]);
    $("input[name='name']").focus();
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

/**
 * 初始化分类选择框
 */
function initCategory() {
    $.get("/admin/category/allList", function (res) {
        if (res.code === 200) {
            categorySelect = xmSelect.render({
                el: '#pid',
                theme: {
                    color: localStorage.getItem("theme-color-color"),
                },
                model: {label: {type: 'text'}},
                radio: true,
                tips: '默认顶级分类',
                filterable: true,
                searchTips: '输入分类名搜索',
                clickClose: true,
                tree: {
                    show: true,
                    strict: false,
                    expandedKeys: [-1],
                },
                height: 'auto',
                data() {
                    return res.data
                }
            });
        } else {
            parent.toast.error({message: res.msg,position: 'topCenter'});
        }
    });
}