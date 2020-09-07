<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>面板</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
    <meta name="renderer" content="webkit"/>
    <meta name="force-rendering" content="webkit"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link href="/public/libs/mdui/css/mdui.min.css" rel="stylesheet"/>
    <link href="/public/libs/dialog/dialog.css" rel="stylesheet"/>
    <link href="/public/libs/table/table.css" rel="stylesheet"/>
    <link href="/admin/static/css/tag_list.css" rel="stylesheet"/>
</head>
<body class="mdui-theme-primary-indigo">
    <div class="p-container">
        <div class="form-panel mdui-row">
            <div class="input-box mdui-col-xs-12 mdui-col-sm-4 mdui-col-md-3 mdui-col-lg-2">
                <label class="p-input-label">标签名: </label>
                <input class="p-input" id="name"/>
            </div>
            <button class="mdui-btn mdui-color-theme table-btn p-search" onclick="initPage()">搜索</button>
            <button class="mdui-btn mdui-color-theme table-btn">新增</button>
            <button class="mdui-btn mdui-color-theme table-btn">删除</button>
        </div>
        <div class="mdui-table-fluid mdui-shadow-0">
            <table class="mdui-table mdui-table-selectable">
                <thead>
                    <tr>
                        <th>标签名</th>
                        <th class="mdui-table-col-numeric">文章数量</th>
                        <th class="mdui-table-col-numeric">创建人</th>
                        <th class="mdui-table-col-numeric">创建时间</th>
                        <th class="mdui-table-col-numeric">更新时间</th>
                        <th class="mdui-table-col-numeric">操作</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                </tbody>
            </table>
        </div>
        <div id="pager-box">
        </div>
    </div>

    <#noparse>
        <script type="text/x-jquery-tmpl" id="tableTpl">
            {{each data}}
                <tr>
                    <td>${name}</td>
                    <td>${count}</td>
                    <td>Perfree</td>
                    <td>${common.formatDate(createTime, "yyyy-MM-dd HH:mm:ss")}</td>
                    <td>${common.formatDate(updateTime, "yyyy-MM-dd HH:mm:ss")}</td>
                    <td><a class="mdui-text-color-pink-a200">删除</a></td>
                </tr>
            {{/each}}
        </script>
    </#noparse>

    <script src="/public/libs/mdui/js/mdui.min.js"></script>
    <script src="/public/libs/jquery/jquery-3.5.1.min.js"></script>
    <script src="/public/js/common.js"></script>
    <script src="/public/libs/dialog/dialog.js"></script>
    <script src="/public/libs/jquery-tmpl/jquery.tmpl.min.js"></script>
    <script src="/public/libs/table/table.js"></script>
    <script>
        initPage();
        function initPage () {
            initTable({
                url: '/admin/tag/list',
                pageIndex: 1,
                pageSize: 10,
                data: {name: $("#name").val()},
                tableBodyElement: '#tableBody',
                tableTplL: '#tableTpl',
                pagerElement: '#pager-box',
            });
        }
    </script>
</body>
</html>