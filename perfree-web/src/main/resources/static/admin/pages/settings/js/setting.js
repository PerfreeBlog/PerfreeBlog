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
                startWebsocket();
            });
        }
    });



    $(".update-content").on('click', '#update', function () {
        layer.confirm('是否确认更新?', {title: '提示'}, function (index) {
            layer.close(index);
            $("#update").hide();
            startUpdate();
        });
    });

    function startUpdate() {
        $(".update-console").show();
        $.get("/update",function(data){});
    }

    function startWebsocket() {
        if (ws != null) {
            ws.close();
        }
        var flag = false;
        var tipFlag = false;
        var url = 'ws://'+window.location.host+'/websocket';
        if ('https:' === document.location.protocol) {
            url = 'wss://'+window.location.host+'/websocket';
        }

        ws = new ReconnectingWebSocket(url);
        ws.onopen = function (e) {
            if (!flag) {
                $("#update").show();
            }
            flag = true;
            console.log("Connection open ...");
            const msg = {type: 1};
            ws.send(JSON.stringify(msg));
        };
        ws.onmessage = function (e) {
            let dataJson = JSON.parse(e.data);
            let classStr = "";
            if(dataJson.data === 2) {
                classStr = "updateError";
            }
            $(".update-console").append("<p class='"+classStr+"'>"+dataJson.message +"</p>");
            if ($(".update-console").children().length > 100) {
                $(".update-console").children().first().remove();
            }
            $(".update-console").scrollTop($(".update-console")[0].scrollHeight);
        };
        ws.onclose = function (e) {
        };
        ws.onerror =function (e) {
            if (!flag && !tipFlag) {
                tipFlag = true;
                layer.confirm('检测到您的Nginx或其他容器配置未开启websocket支持,请参考官方文档->文档->常见问题6进行开启', {title: '提示'}, function (index) {
                    layer.close(index);
                });
            }
        };
    }
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