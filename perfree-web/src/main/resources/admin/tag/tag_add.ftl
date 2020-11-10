<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>标签</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
    <meta name="renderer" content="webkit"/>
    <meta name="force-rendering" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="stylesheet" href="/public/libs/layui-v2.5.6/layui/css/layui.css">
    <link href="/public/libs/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
    <link href="/admin/static/css/main.css" rel="stylesheet"/>
</head>
<body class="layui-layout-body">
<div class="p-container p-add-panel">
    <form class="layui-form" lay-filter="addForm">
        <div class="layui-form-item">
            <label class="layui-form-label">标签名:</label>
            <div class="layui-input-block">
                <input type="text" name="name" required  lay-verify="required" placeholder="请输入标签名" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="add-btn-box">
            <button type="submit" lay-submit lay-filter="addForm" class="layui-btn layui-btn-normal p-submit-btn">确定</button>
            <button type="button" class="layui-btn layui-btn-primary p-cancel-btn">取消</button>
        </div>
    </form>
</div>

<script src="/public/libs/jquery/jquery-3.5.1.min.js"></script>
<script src="/public/libs/layui-v2.5.6/layui/layui.all.js"></script>
<script>
    let form,element,layer;
    layui.use(['layer', 'form', 'element'], function(){
        form = layui.form;
        element = layui.element;
        layer = layui.layer;
        form.verify({});

        form.on('submit(addForm)', function(data){
            console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
            console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
            console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
            //window.parent.location.reload(); //刷新父页面
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    });

    // // 确定
    // $(".p-submit-btn").click(function (){
    //     console.log(form.val("addForm"));
    // });

    // 取消
    $(".p-cancel-btn").click(function (){
        const index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    });
</script>
</body>
</html>