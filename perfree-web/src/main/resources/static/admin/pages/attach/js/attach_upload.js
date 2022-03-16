let form, element, layer, upload;
layui.use(['layer', 'form', 'element','upload'], function () {
    form = layui.form;
    element = layui.element;
    layer = layui.layer;
    upload = layui.upload;
    // 表单验证
    form.verify({});
    let loadIndex;
    upload.render({
        elem: '#file',
        url: '/admin/attach/upload',
        auto: false,
        bindAction: '#add',
        accept: 'file',
        choose: function (obj) {
            loadIndex = layer.load();
            let files = obj.pushFile();
            obj.preview(function (index, file, result) {
                $("#file").val(file.name);
                layer.close(loadIndex);
            });
        },
        error: function () {
            layer.msg("上传失败", {icon: 2});
        },
        before: function (obj) {
            this.data.desc = $("#desc").val();
            this.data.flag = $("#flag").val();
            loadIndex = layer.load("正在上传");
        },
        done: function (res) {
            layer.close(loadIndex);
            if (res.code === 200) {
                parent.queryTable();
                parent.layer.msg("上传成功", {icon: 1});
                const index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
            } else {
                layer.msg(res.msg, {icon: 2});
            }

        }
    });
});

// 取消
$(".p-cancel-btn").click(function () {
    const index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
});