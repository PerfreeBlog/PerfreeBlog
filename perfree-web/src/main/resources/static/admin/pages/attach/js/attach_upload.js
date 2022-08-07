let form, element, layer, upload;
layui.use(['layer', 'form', 'element','upload'], function () {
    form = layui.form;
    element = layui.element;
    layer = layui.layer;
    upload = layui.upload;
    // 表单验证
    form.verify({});
    upload.render({
        elem: '#upload',
        url: '/admin/attach/upload',
        accept: 'file',
        multiple: true,
        choose: function (obj) {
            obj.preview(function (index, file, result) {
                $("#upload-list").append(`
                    <div class="upload-process">
                        <div class="upload-process-name">${file.name}</div>
                        <div class="layui-progress" lay-showpercent="true" lay-filter="uploadProcess${index}">
                          <div class="layui-progress-bar layui-bg-blue" lay-percent="0%"></div>
                        </div>
                    </div>
                `);
                element.init();
            });

        },
        progress: function(n, elem, e, index){
            element.progress('uploadProcess'+index, n + '%');
            element.init();
        },
        done: function(res){
            layer.msg('上传成功');
        }
    });
});