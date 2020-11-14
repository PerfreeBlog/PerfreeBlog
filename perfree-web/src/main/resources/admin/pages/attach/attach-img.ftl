<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>附件-选择图片</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
    <meta name="renderer" content="webkit"/>
    <meta name="force-rendering" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="stylesheet" href="/public/libs/layui-v2.5.6/layui/css/layui.css">
    <link href="/admin/static/css/main.css" rel="stylesheet"/>
    <link href="/admin/pages/attach/css/article-img.css" rel="stylesheet"/>
</head>
<body class="layui-layout-body" >
<div class="p-search-panel" >
    <form class="layui-form">
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label" style="padding-left: 0;">图片名:</label>
                <div class="layui-input-inline">
                    <input type="text" name="tagName" placeholder="请输入文件名" id="tagName" onkeydown="if(event.keyCode===13){event.keyCode=0;event.returnValue=false;}" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-inline">
                <button id="queryBtn" class="layui-btn" type="button">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    搜索
                </button>
            </div>

            <div class="layui-inline">
                <button id="addBtn" class="layui-btn" type="button">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    上传图片
                </button>
            </div>
        </div>
    </form>
</div>
<div class="p-table-box">
    <div class="img-list-box">
        <div class="img-box">
            <img lay-src="https://secure.gravatar.com/avatar/635e66d06c6c1ed34903fc3afca02dfa?s=65&r=G&d=">
            <span>好图.jpg</span>
        </div>

        <div class="img-box">
            <img lay-src="https://secure.gravatar.com/avatar/635e66d06c6c1ed34903fc3afca02dfa?s=65&r=G&d=">
            <span>好图好图好图好图好图好图好图好图好图好图好图.jpg</span>
        </div>

        <div class="img-box">
            <img lay-src="https://secure.gravatar.com/avatar/635e66d06c6c1ed34903fc3afca02dfa?s=65&r=G&d=">
            <span>好图.jpg</span>
        </div>

        <div class="img-box">
            <img lay-src="https://secure.gravatar.com/avatar/635e66d06c6c1ed34903fc3afca02dfa?s=65&r=G&d=">
            <span>好图.jpg</span>
        </div>

        <div class="img-box">
            <img lay-src="https://secure.gravatar.com/avatar/635e66d06c6c1ed34903fc3afca02dfa?s=65&r=G&d=">
            <span>好图.jpg</span>
        </div>

        <div class="img-box">
            <img lay-src="https://secure.gravatar.com/avatar/635e66d06c6c1ed34903fc3afca02dfa?s=65&r=G&d=">
            <span>好图.jpg</span>
        </div>
    </div>
    <div id="tabBoxPage"></div>
</div>
<script src="/public/libs/jquery/jquery-3.5.1.min.js"></script>
<script src="/public/libs/layui-v2.5.6/layui/layui.all.js"></script>
<script>
    let table,form,layer,layPage,flow;
    layui.use(['table','form','layer','laypage','flow'], function(){
        table = layui.table;
        form = layui.form;
        layer = layui.layer;
        layPage = layui.laypage;
        flow = layui.flow;
        flow.lazyimg();
        layPage.render({
            elem: 'tabBoxPage',
            count: 50 //数据总数，从服务端得到
        });

    });
</script>
</body>
</html>