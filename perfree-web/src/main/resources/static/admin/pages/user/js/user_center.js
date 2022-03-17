let form, element, layer, upload, flow;
initPage();

function initPage() {
    layui.use(['layer', 'form', 'element','upload', 'flow'], function () {
        form = layui.form;
        element = layui.element;
        layer = layui.layer;
        upload = layui.upload;
        flow = layui.flow;
        flow.lazyimg();
        formEvent();
        initEvent();
        initUpload();
    });

}

/**
 * 初始化表单操作
 */
function formEvent() {
    // 表单验证
    form.verify({});
    // 表单提交
    form.on('submit(editForm)', function (data) {
        $.ajax({
            type: "POST",
            url: "/admin/user/update",
            contentType: "application/json",
            data: JSON.stringify(data.field),
            success: function (data) {
                if (data.code === 200) {
                    layer.msg("修改成功", {icon: 1});
                } else {
                    layer.msg(data.msg, {icon: 2});
                }
            },
            error: function (data) {
                layer.msg("修改失败", {icon: 2});
            }
        });
        return false;
    });


    form.on('submit(passwordForm)', function (data) {
        $.ajax({
            type: "POST",
            url: "/admin/user/updatePassword",
            contentType: "application/json",
            data: JSON.stringify(data.field),
            success: function (data) {
                if (data.code === 200) {
                    layer.msg("修改成功", {icon: 1});
                } else {
                    layer.msg(data.msg, {icon: 2});
                }
            },
            error: function (data) {
                layer.msg("修改失败", {icon: 2});
            }
        });
        return false;
    });
}

/**
 * 初始化页面事件
 */
function initEvent() {
    // 取消
    $(".p-cancel-btn").click(function () {
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
 * 初始化上传
 */
function initUpload() {
    upload.render({
        elem: '#upload',
        url: '/admin/user/uploadImg',
        accept: 'images',
        done: function (res, index, upload) {
            if (res.code === 200) {
                $("#upload").hide();
                $("#uploadSuccessPanel").show();
                $("#uploadSuccessPanel > img").attr("src", res.data);
                $("#avatar").val(res.data);
            }
        }
    });
}