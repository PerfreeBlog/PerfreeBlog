var table, form,toast,categorySelect, xmSelect;
let roleCode = $("#roleCode").val();
layui.use(['table', 'layer', 'form','toast', 'xmSelect'], function () {
    table = layui.table;
    form = layui.form;
    toast = layui.toast;
    xmSelect = layui.xmSelect;
    initCategory();
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
        parent.layui.admin.toPage( '/admin/article/addPage', '', '');
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
    let category = '';
    if (categorySelect && categorySelect.getValue() && categorySelect.getValue().length > 0) {
        category = categorySelect.getValue()[0].value;
    }
    table.render({
        elem: '#tableBox',
        url: '/admin/article/list',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        contentType: 'application/json',
        title: '文章列表',
        totalRow: false,
        where: {
            form: {
                title: $("#title").val(),
                type: "article",
                categoryId: category
            }
        },
        limit: 10,
        cols: [[
            {type: 'checkbox'},
            {field: 'id', title: 'ID', width: 60},
            {
                field: 'title',
                title: '文章标题',
                minWidth: 250,
                templet: '<div><a class="articleHref" href="{{d.url}}" target="_blank">{{d.title}}</a></div>'
            },
            {field: 'category', title: '分类',  minWidth: 160,templet: "<span>{{d.category === null ? '' : d.category.name}}</span>"},
            {
                field: 'status', minWidth: 100, title: '状态', templet: function (d) {
                    let html = '<span>';
                    if (d.status === 0) {
                        html += "已发布";
                    }
                    if (d.status === 1) {
                        html += "草稿";
                    }
                    if (d.status === 2) {
                        html += "待审核";
                    }
                    html += '</div>';
                    return html;
                }
            },
            {field: 'viewCount', title: '阅读', width: 80},
            {field: 'greatCount', title: '点赞', width: 80},
            {field: 'commentCount', title: '评论', width: 80},
            {
                field: 'isTop', minWidth: 100, title: '是否置顶', templet: function (d) {
                    let html;
                    if (roleCode === "contribute") {
                        if (d.isTop === 1) {
                            html = "置顶";
                        } else {
                            html = "不置顶";
                        }
                        return html;
                    }
                    if (d.isTop === 1) {
                        html = "<input type='checkbox' name='isTop' lay-filter='isTop' lay-skin='switch' value='" + d.id + "' lay-text='置顶|不置顶' checked>";
                    } else {
                        html = "<input type='checkbox' name='isTop' lay-filter='isTop' value='" + d.id + "' lay-skin='switch' lay-text='置顶|不置顶'>";
                    }
                    return html;
                }
            },
            {
                field: 'isComment', minWidth: 80, title: '允许评论', templet: function (d) {
                    let html;
                    if (roleCode === "contribute") {
                        if (d.isComment === 1) {
                            html = "允许";
                        } else {
                            html = "不允许";
                        }
                        return html;
                    }
                    if (d.isComment === 1) {
                        html = "<input type='checkbox' name='isComment' lay-filter='isComment' lay-skin='switch' value='" + d.id + "' lay-text='允许|不允许' checked>";
                    } else {
                        html = "<input type='checkbox' name='isComment' lay-filter='isComment' value='" + d.id + "' lay-skin='switch' lay-text='允许|不允许'>";
                    }
                    return html;
                }
            },
            {field: 'user', minWidth: 80, title: '创建人', templet: "<span>{{d.user.userName}}</span>"},
            {
                field: 'createTime',
                title: '创建时间',
                sort: true,
                minWidth: 150,
                templet: "<span>{{d.createTime==null?'':layui.util.toDateString(d.createTime, 'yyyy-MM-dd HH:mm:ss')}}</span>"
            },
            {
                field: 'id', title: '操作', width: 180,
                templet: function (d) {
                    let html = "<div>";
                    if (roleCode !== "contribute") {
                        if (d.status === 1 || d.status === 2) {
                            html += "<a class='pear-btn pear-btn-xs pear-btn-primary' onclick='changeStatus(\"" + d.id + "\",\"0\")'>发布</a>";
                        }
                        if (d.status === 0) {
                            html += "<a class='pear-btn pear-btn-xs' onclick='changeStatus(\"" + d.id + "\",\"1\")'>草稿</a>";
                        }
                    }
                    html += "<a class='pear-btn pear-btn-xs pear-btn-primary' style='margin-left: 5px' onclick='editData(\"" + d.id + "\")'>编辑</a> " +
                        "<a class='pear-btn pear-btn-xs pear-btn-danger' style='margin-left: 5px' onclick='deleteData(\"" + d.id + "\")'>删除</a>" +
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

    form.on('switch(isTop)', function (data) {
        const id = this.value;
        const status = this.checked ? 1 : 0;
        changeTopStatus(id, status);
    });

    form.on('switch(isComment)', function (data) {
        const id = this.value;
        const status = this.checked ? 1 : 0;
        changeCommentStatus(id, status);
    });
}

/**
 * 编辑
 * @param id
 */
function editData(id) {
    parent.layui.admin.jump('updateArticle', "编辑文章", '/admin/article/updatePage/' + id);
}

/**
 *
 * @param ids
 */
function deleteData(ids) {
    layer.confirm('确定要删除吗?', {icon: 3, title: '提示'}, function (index) {
        $.ajax({
            type: "POST",
            url: "/admin/article/del",
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
 * 更改置顶状态
 */
function changeTopStatus(id, status) {
    $.ajax({
        type: "POST",
        url: "/admin/article/changeTopStatus",
        contentType: "application/json",
        data: JSON.stringify({id: id, isTop: status}),
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
 * 更改是否可以评论
 */
function changeCommentStatus(id, status) {
    $.ajax({
        type: "POST",
        url: "/admin/article/changeCommentStatus",
        contentType: "application/json",
        data: JSON.stringify({id: id, isComment: status}),
        success: function (data) {
            if (data.code === 200) {
                queryTable();
                parent.toast.success({message: "修改成功",position: 'topCenter'});
            } else {
                parent.toast.error({message: data.msg,position: 'topCenter'});
            }
        },
        error: function (data) {
            parent.toast.error({message: "修改失败",position: 'topCenter'});
        }
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
        url: "/admin/article/changeStatus",
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
                el: '#category',
                theme: {
                    color: localStorage.getItem("theme-color-color"),
                },
                model: {label: {type: 'text'}},
                radio: true,
                tips: '请选择分类',
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
