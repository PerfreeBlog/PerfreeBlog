let element, layer, upload, $;
layui.use(['layer', 'element','upload','jquery'], function () {
    element = layui.element;
    layer = layui.layer;
    upload = layui.upload;
    $ = layui.jquery;
    // 表单验证
    upload.render({
        elem: '#upload',
        url: '/admin/attach/upload',
        accept: 'file',
        multiple: true,
        choose: function (obj) {
            obj.preview(function (index, file, result) {
                $("#upload-list").append(`
                    <div class="upload-process" id="uploadProcess${index}">
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
        done: function(res, index, upload){
            parent.parent.toast.success({message: '上传成功',position: 'topCenter'});
            setTimeout(function () {
                $("#uploadProcess"+index+" .layui-progress-text").text("上传完成");
            }, 1000)
        } ,
        error: function(index, upload){
            setTimeout(function () {
                $("#uploadProcess"+index+" .layui-progress-text").text("上传失败");
            }, 1000)
            parent.parent.toast.error({message: '上传失败',position: 'topCenter'});
        }
    });
});