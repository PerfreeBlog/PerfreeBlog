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
            request.get("/api/setting/checkUpdate").then(res => {
                layer.close(loadIndex);
                if (res.code === 200) {
                    if (res.data) {
                        $("#updateTitle").text(res.data.name);
                        $("#updateVersion").text(res.data.tagName);
                        $("#updateContent").html(res.data.body.replaceAll("\r\n","<br>"));
                        $("#updateSize").text(res.data.sizeString);
                    } else {
                        $(".update-content").html("暂无更新");
                    }

                } else{
                    console.log("检查更新出错");
                    $(".update-content").html("检查更新出错,请重试");
                }
                $(".update-content").show();
            });
        }
    });
});

function save(data) {
    let options = [];
    for (let key of Object.keys(data.field)) {
        let option = {
            key: key,
            value: data.field[key]
        };
        options.push(option);
    }
    $.ajax({
        type: "POST",
        url: "/api/setting/saveOrUpdateSetting",
        contentType:"application/json",
        data: JSON.stringify({options}),
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