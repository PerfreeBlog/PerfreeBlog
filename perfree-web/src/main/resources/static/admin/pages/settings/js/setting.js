let form,element;
var ws = null;
let currSiteId;
layui.use(['form','element'], function() {
    form = layui.form;
    element = layui.element;
    initGlobalSetting();
    initSiteList();
    initEvent();

    form.on('submit(optionForm2)', function(data){
        save(form.val("optionForm2"));
        return false;
    });
    form.on('submit(siteForm)', function(data){
        save( form.val("siteForm"));
        return false;
    });
    form.on('submit(globalForm)', function(data){
        save(form.val("globalForm"));
        return false;
    });

    element.on('tab(settingTab)', function(){
        if (this.getAttribute('lay-id') === "6") {
            let loadIndex = common.layer.load("正在检查更新...");
            request.get("/api/setting/checkUpdate").then(res => {
                common.layer.close(loadIndex);
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
    let loadIndex = common.layer.load("加载中...");
    let keys = Object.keys(form.val('globalForm'));
    request.post("/api/option/getOptions", JSON.stringify({keys, siteId: currSiteId})).then(res => {
        if (res.code === 200) {
            $("#globalSetting").show();
            $("#siteSetting").hide();
            form.render();
            res.data.forEach(item => {
                if (item.key === "WEB_OPEN_API" && !item.value) {
                    item.value = "1";
                }
                if (item.key === "WEB_AUTO_GEN_SUMMARY" && !item.value) {
                    item.value = "1";
                }
                if (item.key === "WEB_RSS_GEN_MODE" && !item.value) {
                    item.value = "1";
                }
                if (item.key === "WEB_IS_REGISTER" && !item.value) {
                    item.value = "1";
                }
                if (item.key === "WEB_REGISTER_DEFAULT_ROLE" && !item.value) {
                    item.value = "user";
                }
                if (item.key === "WEB_OPEN_CAPTCHA" && !item.value) {
                    item.value = "1";
                }
                form.val("globalForm", {
                    [item.key]: item.value
                });
            })
            common.layer.close(loadIndex);
        }
    })
}

function initSiteSetting() {
    let loadIndex = common.layer.load("加载中...");
    let keys = Object.keys(form.val('siteForm'));
    request.post("/api/option/getOptions", JSON.stringify({keys, siteId: currSiteId})).then(res => {
        if (res.code === 200) {
            $("#globalSetting").hide();
            $("#siteSetting").show();
            form.render();
            res.data.forEach(item => {
                if (item.key === "WEB_COMMENT_IS_REVIEW" && !item.value) {
                    item.value = "0";
                }
                if (item.key === "WEB_COMMENT_IS_STINT" && !item.value) {
                    item.value = "0";
                }
                if (item.key === "COMMENT_IS_SEND_MAIL" && !item.value) {
                    item.value = "0";
                }
                if (item.key === "WEB_IS_AUTO_PUSH_BAIDU" && !item.value) {
                    item.value = "0";
                }
                form.val("siteForm", {
                    [item.key]: item.value
                });
            })
            common.layer.close(loadIndex);
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
    for (let key of Object.keys(data)) {
        let option = {
            key: key,
            value: data[key]
        };
        options.push(option);
    }
    request.post("/api/setting/saveOrUpdateSetting", JSON.stringify({options, siteId: currSiteId})).then(res => {
        if (res.code === 200){
            common.toast.success({message: "保存成功",position: 'topCenter'});
        } else {
            common.toast.error({message: res.msg,position: 'topCenter'});
        }
    })
}

function sendTestMail(){
    common.layer.prompt({title: '请输入收件人邮箱', formType: 3}, function(mail, index){
        common.layer.close(index);
        $.post("/admin/setting/testMail",{mail: mail},function(data,status){
            if (data.code === 200) {
                common.toast.success({message: "发送成功",position: 'topCenter'});
            } else {
                common.toast.error({message: data.msg,position: 'topCenter'});
            }
        });
    });
    return false;
}