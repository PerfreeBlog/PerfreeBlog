let layer,form,element,toast;
var ws = null;
layui.use(['layer','form','element','toast'], function() {
    layer = layui.layer;
    form = layui.form;
    element = layui.element;
    toast = layui.toast;
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
                parent.toast.success({message: "保存成功",position: 'topCenter'});
            } else {
                parent.toast.error({message: d.msg,position: 'topCenter'});
            }
        },
        error: function (data) {
            parent.toast.error({message: "保存失败",position: 'topCenter'});
        }
    });
}

function sendTestMail(){
    layer.prompt({title: '请输入收件人邮箱', formType: 3}, function(mail, index){
        layer.close(index);
        $.post("/admin/setting/testMail",{mail: mail},function(data,status){
            if (data.code === 200) {
                parent.toast.success({message: "发送成功",position: 'topCenter'});
            } else {
                parent.toast.error({message: data.msg,position: 'topCenter'});
            }
        });
    });
    return false;
}