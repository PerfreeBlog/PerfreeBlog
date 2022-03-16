layui.use(['layer','form','element'], function() {
    let layer = layui.layer;
    let form = layui.form;
    let element = layui.element;
    form.on('select(saveType)', function (data) {
        $("#endpoint").hide();
        $("#accessKey").hide();
        $("#secret").hide();
        $("#bucket").hide();
        $("#region").hide();
        $("#domain").hide();
        $("#endpointInput").val("");
        $("#accessKeyInput").val("");
        $("#secretInput").val("");
        $("#bucketInput").val("");
        $("#regionInput").val("");
        $("#domainInput").val("");
        switch (data.value) {
            case 'local':
                break;
            case 'aliOss':
                $("#endpoint").show();
                $("#accessKey").show();
                $("#secret").show();
                $("#bucket").show();
                $("#domain").show();
                break;
            case 'tencentCos':
                $("#accessKey").show();
                $("#secret").show();
                $("#bucket").show();
                $("#region").show();
                $("#domain").show();
                break;
            case 'qiNiuOss':
                $("#accessKey").show();
                $("#secret").show();
                $("#bucket").show();
                $("#domain").show();
                break;
        }
    });
});