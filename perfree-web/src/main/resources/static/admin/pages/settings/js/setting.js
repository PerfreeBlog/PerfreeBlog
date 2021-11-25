let layer,form,element;
var ws = null;
layui.use(['layer','form','element'], function() {
    layer = layui.layer;
    form = layui.form;
    element = layui.element;
    form.on('submit(optionForm2)', function(data){
        save(data);
        return false;
    });
    form.on('submit(optionForm)', function(data){
        save(data);
        return false;
    });

    element.on('tab(settingTab)', function(){
        if (this.getAttribute('lay-id') === "3") {
            let loadIndex = layer.load("正在检查更新...");
            $.get("/checkUpdate",function(data){
                layer.close(loadIndex);
                if (data.code === 200) {
                    $("#updateTitle").text(data.data.name);
                    $("#updateVersion").text(data.data.tagName);
                    $("#updateContent").html(data.data.body.replaceAll("\r\n","<br>"));
                    $("#updateSize").text(data.data.sizeString);
                } else if (data.code === 500) {
                    console.log("检查更新出错");
                    $(".update-content").html("检查更新出错,请重试");
                } else {
                    $(".update-content").html("暂无更新");
                }
                $(".update-content").show();
            });
        }
    });
});

function save(data) {
    $.ajax({
        type: "POST",
        url: "/admin/setting/save",
        contentType:"application/json",
        data: JSON.stringify(data.field),
        success:function(d){
            if (d.code === 200){
                parent.layer.msg("保存成功", {icon: 1})
            } else {
                layer.msg(d.msg, {icon: 2});
            }
        },
        error: function (data) {
            layer.msg("保存失败", {icon: 2});
        }
    });
}