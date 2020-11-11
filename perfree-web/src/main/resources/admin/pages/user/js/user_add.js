let form,element,layer,upload;
initPage();
function initPage() {
    layui.use(['layer', 'form', 'element'], function(){
        form = layui.form;
        element = layui.element;
        layer = layui.layer;
        upload = layui.upload;
    });

    formEvent();
    initEvent();
    loadRoleList();
    initUpload();
}

/**
 * 初始化表单操作
 */
function formEvent() {
    // 表单验证
    form.verify({});
    // 表单提交
    form.on('submit(addForm)', function(data){
        console.log(data.field);
        return false;
        /*$.ajax({
            type: "POST",
            url: "/admin/tag/add",
            contentType:"application/json",
            data: JSON.stringify(data.field),
            success:function(data){
                if (data.code === 200){
                    parent.queryTable();
                    parent.layer.msg("添加成功", {icon: 1});
                    const index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                } else {
                    layer.msg(data.msg, {icon: 2});
                }
            },
            error: function (data) {
                layer.msg("添加失败", {icon: 2});
            }
        });
        return false;*/
    });
}

/**
 * 初始化页面事件
 */
function initEvent() {
    // 取消
    $(".p-cancel-btn").click(function (){
        const index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    });

    // 上传图片hover
    $("#uploadSuccessPanel").hover(function () {
        $(".delete-img-box").addClass("delete-img-box-show");
    }, function () {
        $(".delete-img-box").removeClass("delete-img-box-show");
    });

    // 删除图片
    $("#deleteImg").click(function () {
        $("#upload").show();
        $("#uploadSuccessPanel").hide();
        $("#uploadSuccessPanel > img").attr("src", "");
        $("#avatar").val("");
    });
}

/**
 * 加载角色列表
 */
function loadRoleList() {
    $.get('/admin/role/getRoleList', function (data) {
        let html = '<option value="">请选择</option>';
        data.data.forEach(res => {
            html += ' <option value="' + res.id + '">' + res.name + '</option>';
        });
        $("#roleId").html(html);
        form.render('select');
    });
}


/**
 * 初始化上传
 */
function initUpload() {
    upload.render({
        elem: '#upload',
        url: '/admin/user/uploadImg',
        accept: 'images',
        done: function(res, index, upload){
           if (res.code === 200) {
               $("#upload").hide();
               $("#uploadSuccessPanel").show();
               $("#uploadSuccessPanel > img").attr("src", res.data);
               $("#avatar").val(res.data);
           }
        }
    });
}