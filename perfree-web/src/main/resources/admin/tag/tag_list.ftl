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
    <link href="/admin/static/css/tag_list.css" rel="stylesheet"/>
</head>
<body>
    <div class="p-container">
        <div class="form-panel mdui-row">
            <div class="input-box mdui-col-xs-12 mdui-col-sm-4 mdui-col-md-3 mdui-col-lg-2">
                <label class="p-input-label">标签名: </label>
                <input class="p-input" />
            </div>
            <div class="input-box mdui-col-xs-12 mdui-col-sm-4 mdui-col-md-3 mdui-col-lg-2">
                <label class="p-input-label">标签名: </label>
                <input class="p-input" />
            </div>
            <div class="input-box mdui-col-xs-12 mdui-col-sm-4 mdui-col-md-3 mdui-col-lg-2">
                <label class="p-input-label">标签名: </label>
                <input class="p-input" />
            </div>
            <div class="input-box mdui-col-xs-12 mdui-col-sm-4 mdui-col-md-3 mdui-col-lg-2">
                <label class="p-input-label">标签名: </label>
                <input class="p-input" />
            </div>
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
                <tbody>
                    <tr class="mdui-table-row-selected">
                        <td>java</td>
                        <td>99</td>
                        <td>Perfree</td>
                        <td>2020-06-06 06:06:06</td>
                        <td>2020-06-06 06:06:06</td>
                        <td><a class="mdui-text-color-pink">删除</a></td>
                    </tr>
                    <tr>
                        <td>java</td>
                        <td>99</td>
                        <td>Perfree</td>
                        <td>2020-06-06 06:06:06</td>
                        <td>2020-06-06 06:06:06</td>
                        <td><a class="mdui-text-color-pink-a200">删除</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="pager-box">
            123456
        </div>
    </div>
    <script src="/public/libs/mdui/js/mdui.min.js"></script>
    <script src="/public/libs/jquery/jquery-3.5.1.min.js"></script>
    <script src="/public/libs/jquery-tmpl/jquery.tmpl.min.js"></script>
</body>
</html>