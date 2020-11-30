<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>面板</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
        <meta name="renderer" content="webkit"/>
        <meta name="force-rendering" content="webkit"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <link rel="stylesheet" href="/public/libs/layui-v2.5.6/layui/css/layui.css">
        <link href="/public/libs/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
        <link href="/admin/static/css/main.css" rel="stylesheet"/>
        <link href="/admin/pages/theme/css/theme.css" rel="stylesheet"/>
    </head>
    <body class="layui-layout-body">
        <div class="p-container">
            <div class="p-theme-addPanel">
                <a id="addTheme">安装新主题</a> - <a>主题开发指南</a>
            </div>
            <div class="p-theme-container layui-row">
                <#list themeList as theme>
                    <div class="layui-col-xs12 layui-col-sm6 layui-col-md3 p-theme-Abox">
                        <div class="p-theme-box">
                            <img src="${theme.screenshots}">
                            <div class="p-theme-info">
                                <span class="theme-name">${theme.name}</span>
                                 <#if theme.isActive != 1>
                                    <button type="button" class="layui-btn layui-btn-danger removeThemeBtn" data-path="${theme.path}">卸载</button>
                                    <button type="button" class="layui-btn layui-btn-normal switchThemeBtn" data-path="${theme.path}">启用</button>
                                 <#else>
                                    <button type="button" class="layui-btn layui-btn-primary">已启用</button>
                                </#if>
                            </div>
                        </div>
                    </div>
                </#list>
            </div>
        </div>
        <script src="/public/libs/jquery/jquery-3.5.1.min.js"></script>
        <script src="/public/libs/layui-v2.5.6/layui/layui.all.js"></script>
        <script>
            let layer,upload;
            layui.use(['upload','layer'], function(){
                layer = layui.layer;
                upload = layui.upload;
            });
            $(".p-theme-container").on("click",".switchThemeBtn",function () {
                const path = $(this).attr("data-path");
                $.ajax({
                    type: "POST",
                    url: "/admin/theme/switch",
                    contentType:"application/json",
                    data: JSON.stringify({path: path}),
                    success:function(d){
                        if (d.code === 200){
                            parent.layer.msg("切换主题成功", {icon: 1});
                            location.reload();
                        } else {
                            layer.msg("切换主题失败", {icon: 2});
                        }
                    },
                    error: function (data) {
                        layer.msg("切换主题失败", {icon: 2});
                    }
                });
            });

            $(".p-theme-container").on("click",".removeThemeBtn",function () {
                const path = $(this).attr("data-path");
                $.ajax({
                    type: "POST",
                    url: "/admin/theme/del",
                    contentType:"application/json",
                    data: JSON.stringify({path: path}),
                    success:function(d){
                        if (d.code === 200){
                            parent.layer.msg("卸载主题成功", {icon: 1});
                            location.reload();
                        } else {
                            layer.msg("卸载主题失败", {icon: 2});
                        }
                    },
                    error: function (data) {
                        layer.msg("卸载主题失败", {icon: 2});
                    }
                });
            });

            upload.render({
                elem: '#addTheme',
                url: '/admin/theme/addTheme',
                accept: "file",
                acceptMime: "application/zip",
                exts: "zip",
                done: function(res){
                    if (res.code === 200) {
                        parent.layer.msg("主题安装成功", {icon: 1});
                        location.reload();
                    } else {
                        layer.msg(res.msg, {icon: 2});
                    }
                },
                error: function(){
                    layer.msg("主题安装失败", {icon: 2});
                }
            });
        </script>
    </body>
</html>