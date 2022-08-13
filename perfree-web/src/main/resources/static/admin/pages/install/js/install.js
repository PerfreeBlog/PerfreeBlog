var form,step,toast;
layui.use(['form', 'step','element', 'toast'], function() {
    form = layui.form;
    step = layui.step;
    toast = layui.toast;

    step.render({
        elem: '#stepForm',
        filter: 'stepForm',
        width: '100%',
        stepWidth: '660px',
        height: '550px',
        stepItems: [{
            title: '安装说明'
        }, {
            title: '数据库配置'
        }, {
            title: '账户配置'
        }]
    });

    form.on('select(type)', function(data){
        if (data.value === "mysql") {
            $("#mysql-message").show();
        } else {
            $("#mysql-message").hide();
        }
    });

    form.on('submit(formStep)', function(data) {
        step.next('#stepForm');
        return false;
    });

    form.on('submit(formStep2)', function(data) {
        install(1, data);
        return false;
    });

    form.on('submit(formStep3)', function(data) {
        addAdmin(data);
        return false;
    });

    $('.pre').click(function() {
        step.pre('#stepForm');
        return false;
    });
})

/**
 * 安装
 * @param type 1: 正常,2:覆盖数据库
 * @param formData formData
 */
function install(type,formData) {
    let loadIndex = layer.load("正在配置中...");
    formData.field.installType = type;
    $.ajax({
        type: "POST",
        url: "/install/addDatabase",
        contentType: "application/json",
        data: JSON.stringify(formData.field),
        success: function (data) {
            layer.close(loadIndex);
            if (data.code === 200) {
                step.next('#stepForm');
            } else if (data.code === -1) {
                layer.confirm('检测到数据库已存在,是否跳过数据库初始化?重新初始化数据库将造成已存在的数据丢失', {
                    icon: 3,
                    title:'提示',
                    btn:['跳过','重新安装'],
                    closeBtn: 0
                }, function(index){
                    layer.close(index);
                    install(2, formData);
                }, function(){
                    install(3, formData);
                });
            } else if(data.code === -2){
                window.location.href = "/login";
            } else {
                toast.error({message: data.msg,position: 'topCenter'});
            }
        },
        error: function (data) {
            layer.close(loadIndex);
            toast.error({message: "数据库配置失败,您可前往交流群咨询或查看系统日志文件",position: 'topCenter'});
        }
    });
}

function addAdmin(data) {
    let loadIndex = layer.load("正在配置中...");
    $.ajax({
        type: "POST",
        url: "/install/addAdminUser",
        contentType: "application/json",
        data: JSON.stringify(data.field),
        success: function (res) {
            layer.close(loadIndex);
            if (res.code === 200) {
                toast.success({message: "安装完成,即将前往登录页~",position: 'topCenter'});
                setTimeout(function () {
                    window.location.href = "/login";
                },1000);
            } else {
                toast.error({message: res.msg,position: 'topCenter'});
            }
        },
        error: function (res) {
            layer.close(loadIndex);
            toast.error({message: "管理员账户配置失败,您可前往交流群咨询或查看系统日志文件",position: 'topCenter'});
        }
    });
}