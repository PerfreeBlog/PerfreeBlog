<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>Perfree</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
        <meta name="renderer" content="webkit"/>
        <meta name="force-rendering" content="webkit"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <link rel="stylesheet" href="/public/libs/layui-v2.5.6/layui/css/layui.css">
        <link href="/public/libs/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
        <link href="/admin/static/css/style.css" rel="stylesheet"/>
    </head>
    <body class="layui-layout-body">
        <div class="layui-layout layui-layout-admin">
            <!-- 顶栏start -->
            <#include "layout/header.ftl">
            <!-- 顶栏end -->
            <!-- 左侧边栏start -->
            <#include "layout/sider.ftl">
            <!-- 左侧边栏end -->

            <!-- 内容start -->
            <div class="layui-body">
                <!-- 内容主体区域 -->
                <div class="f-iframe-box">
                    <iframe src="/admin/dashboard" frameborder="0" scrolling="no" id="iframe" onload="setIframeHeight(this)" width="100%"></iframe>
                </div>
            </div>
            <!-- 内容ned -->
        </div>

        <div id="theme-list">
            <ul class="theme-list">
            </ul>
        </div>
        <script id="themeTpl" type="text/html">
            {{#  layui.each(d, function(index, item){ }}
            <li class="theme" id="{{ item.id }}">
                <div class="theme-leftLogo" style="background: {{ item.leftLogo }}" bg="{{ item.leftLogo }}" color="{{ item.logoColor }}" borderColor="{{ item.logoBoderColor }}"></div>
                <div class="theme-leftSide" style="background: {{ item.leftSide }}" bg="{{ item.leftSide }}" color="{{ item.sideColor }}"></div>
                <div class="theme-header" style="background: {{ item.header }}" bg="{{ item.header }}" color="{{ item.headerColor }}"></div>
            </li>
            {{#  }); }}
        </script>
        <script src="/public/libs/jquery/jquery-3.5.1.min.js"></script>
        <script src="/public/libs/layui-v2.5.6/layui/layui.all.js"></script>
        <script src="/admin/static/js/main.js"></script>
    </body>
</html>