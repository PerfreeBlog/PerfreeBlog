var form, xmSelect,categorySelect,tagSelect,loadIndex,toast, layer;
layui.use(['layer', 'form', 'xmSelect','toast'], function () {
    layer = layui.layer;
    form = layui.form;
    xmSelect = layui.xmSelect;
    toast = layui.toast;
    initEditor(localStorage.getItem("editor"), "");
    initEvent();
    initTag();
    initCategory();
});

/**
 * 初始化页面事件
 */
function initEvent() {
    // 表单验证
    form.verify({});
    // 表单提交
    form.on('submit(draftForm)', function (data) {
        data.field.status = 1;
        submitArticle(data.field);
        return false;
    });
    form.on('submit(publishForm)', function (data) {
        data.field.status = 0;
        submitArticle(data.field);
        return false;
    });

    window.addEventListener("keydown", function(e) {
        if((e.key==='s'||e.key==='S')&&(navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)){
            e.preventDefault();
            $("#publishBtn").click();
        }
    }, false);

    $("#switch-panel-btn").click(function () {
       $("#p-container-right").css({"display":"none"});
       $("#p-container-left").removeClass("layui-col-md8");
       $("#p-container-left").addClass("layui-col-md12");
       if (markdownEditor){
           markdownEditor.resize("100%", "100%");
       }
       $("#open-right-panel-btn").show();
    });
    $("#open-right-panel-btn").click(function () {
        $("#p-container-right").css({"display":"block"});
        $("#p-container-left").addClass("layui-col-md8");
        $("#p-container-left").removeClass("layui-col-md12");
        if (markdownEditor){
            markdownEditor.resize("100%", "100%");
        }
        $("#open-right-panel-btn").hide();
    });

}

/**
 * 提交文章
 * @param data
 */
function submitArticle(data) {
    if ($("#editorMode").val() === "markdown") {
        data.content = markdownEditor.getMarkdown();
    } else {
        data.content = richEditor.txt.html();
    }
    data.contentModel = $("#editorMode").val();
    if (categorySelect.getValue().length > 0) {
        data.categoryId = categorySelect.getValue()[0].value;
    }
    let tagArr = [];
    tagSelect.getValue().forEach(res => {
        const tag = {tagId: res.id, name: res.name};
        tagArr.push(tag)
    });
    data.articleTags = tagArr;
    data.isComment = data.isComment === 'on' ? 1 : 0
    data.isTop = data.isTop === 'on' ? 1 : 0
    $.ajax({
        type: "POST",
        url: "/admin/article/add",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (d) {
            if (d.code === 200) {
                parent.toast.success({message: "文章发表成功",position: 'topCenter'});
                parent.layui.admin.toPage('/admin/article', '', '', true);
                location.reload();
            } else {
                parent.toast.error({message: d.msg,position: 'topCenter'});
            }
        },
        error: function (data) {
            parent.toast.error({message: "文章发表失败",position: 'topCenter'});
        }
    });
}

/**
 * 初始化标签选择框
 */
function initTag() {
    $.get("/admin/tag/allList", function (res) {
        if (res.code === 200) {
            let tagArr = [];
            res.data.forEach(r => {
                const param = {name: r.name, value: r.id, id: r.id};
                tagArr.push(param);
            })
            tagSelect = xmSelect.render({
                el: '#tag',
                tips: '请选择标签',
                theme: {
                    color: localStorage.getItem("theme-color-color"),
                },
                searchTips: '搜索标签或输入标签名新增',
                filterable: true,
                create: function (val, arr) {
                    //返回一个创建成功的对象, val是搜索的数据, arr是搜索后的当前页面数据
                    return {
                        name: val,
                        value: val
                    }
                },
                data: tagArr,
                on: function (data) {
                    if (data.isAdd && data.change[0].id === null || data.isAdd && data.change[0].id === undefined) {
                        $.ajax({
                            type: "POST",
                            url: "/admin/tag/add",
                            contentType: "application/json",
                            data: JSON.stringify({name: data.change[0].value}),
                            success: function (d) {
                                if (d.code === 200) {
                                    const currentProfileIndex = (data.arr || []).findIndex((profile) => profile.value === d.data.name);
                                    data.arr[currentProfileIndex].id = d.data.id;
                                } else {
                                    parent.toast.error({message: "新建标签失败",position: 'topCenter'});
                                }
                            },
                            error: function (data) {
                                parent.toast.error({message: "新建标签失败",position: 'topCenter'});
                            }
                        });
                    }
                }
            });
        } else {
            parent.toast.error({message: res.msg,position: 'topCenter'});
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

/**
 * 动态修改PageUrl
 */
function updatePageUrl(){
    let slug = $("#slug").val();
    if (slug !== null && slug !== undefined &&　slug　!== '') {
        $("#pageUrl").html(slug);
    } else {
        $("#pageUrl").html('[ID]');
    }
}