let form, element, layer, upload, flow,$,toast;
initPage();

function initPage() {
    layui.use(['layer', 'form', 'element','upload', 'flow','jquery','toast'], function () {
        form = layui.form;
        element = layui.element;
        layer = layui.layer;
        upload = layui.upload;
        flow = layui.flow;
        $ = layui.jquery;
        toast = layui.toast;
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
                    parent.toast.success({message: "修改成功",position: 'topCenter'});
                } else {
                    parent.toast.error({message: data.msg,position: 'topCenter'});
                }
            },
            error: function (data) {
                parent.toast.error({message: "修改失败",position: 'topCenter'});
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
                    parent.toast.success({message: "修改成功",position: 'topCenter'});
                } else {
                    parent.toast.error({message: data.msg,position: 'topCenter'});
                }
            },
            error: function (data) {
                parent.toast.error({message: "修改失败",position: 'topCenter'});
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