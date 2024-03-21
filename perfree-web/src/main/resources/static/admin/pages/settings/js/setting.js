let layer,form,element,toast;
var ws = null;
let currSiteId;
layui.use(['layer','form','element','toast'], function() {
    layer = layui.layer;
    form = layui.form;
    element = layui.element;
    toast = layui.toast;
    initSiteList();
    initEvent();

    form.on('submit(optionForm2)', function(data){
        save(data);
        return false;
    });
    form.on('submit(siteForm)', function(data){
        save(data);
        return false;
    });
    form.on('submit(globalForm)', function(data){
        save(data);
        return false;
    });
    element.on('tab(siteSettingTab)', function() {

    });

    element.on('tab(settingTab)', function(){
        if (this.getAttribute('lay-id') === "6") {
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

/**
 * 初始化事件
 */
function initEvent() {
    $("#siteList").on("click","li",function () {
        currSiteId = $(this).attr("data-id");
        if (currSiteId === "-1") {
            initGlobalSetting();
        } else {
            initSiteSetting();
        }
        $("#siteList li").removeClass("active");
        $(this).addClass("active");
    });
}

function initGlobalSetting() {
    let keys = Object.keys(form.val('globalForm'));
    request.post("/api/option/getOptions", JSON.stringify({keys, siteId: currSiteId})).then(res => {
        if (res.code === 200) {
            $("#globalSetting").show();
            $("#siteSetting").hide();
            form.render();
            res.data.forEach(item => {
                form.val("globalForm", {
                    [item.key]: item.value
                });
            })
        }
    })
}

function initSiteSetting() {
    let keys = Object.keys(form.val('siteForm'));
    request.post("/api/option/getOptions", JSON.stringify({keys, siteId: currSiteId})).then(res => {
        if (res.code === 200) {
            $("#globalSetting").hide();
            $("#siteSetting").show();
            form.render();
            res.data.forEach(item => {
                form.val("siteForm", {
                    [item.key]: item.value
                });
            })
        }
    })
}

/**
 * 初始化站点列表
 */
function initSiteList() {
    request.get("/api/site/list").then(res => {
        if (res.code === 200) {
            let html = "";
            for (let i = 0; i < res.data.length; i++) {
                let site = res.data[i];
                html += `<li data-id="${site.id}">${site.name}</li>`;
            }
            $("#siteList").append(html);
            $($("#siteList li")[0]).addClass("active");
        }
    });
}



function save(data) {
    let options = [];
    for (let key of Object.keys(data.field)) {
        let option = {
            key: key,
            value: data.field[key]
        };
        options.push(option);
    }
    request.post("/api/setting/saveOrUpdateSetting", JSON.stringify({options, siteId: currSiteId})).then(res => {
        if (res.code === 200){
            parent.toast.success({message: "保存成功",position: 'topCenter'});
        } else {
            parent.toast.error({message: res.msg,position: 'topCenter'});
        }
    })
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