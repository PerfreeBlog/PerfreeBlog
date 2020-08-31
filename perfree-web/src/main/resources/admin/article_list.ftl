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
    <link href="/admin/static/css/article_list.css" rel="stylesheet"/>
</head>
<body>
<div class="p-container">
    <div class="mdui-table-fluid mdui-shadow-0">
        <table class="mdui-table mdui-table-selectable">
            <thead>
            <tr>
                <th>Dessert (100g serving)</th>
                <th class="mdui-table-col-numeric" mdui-tooltip="{content: 'The total amount of food energy in the given serving size.'}">Calories</th>
                <th class="mdui-table-col-numeric">Fat (g)</th>
                <th class="mdui-table-col-numeric">Carbs (g)</th>
                <th class="mdui-table-col-numeric">Protein (g)</th>
                <th class="mdui-table-col-numeric">Sodium (mg)</th>
                <th class="mdui-table-col-numeric" mdui-tooltip="{content: 'The amount of calcium as a percentage of the recommended daily amount.'}">Calclum (%)</th>
                <th class="mdui-table-col-numeric">Lron (%)</th>
            </tr>
            </thead>
            <tbody>
            <tr class="mdui-table-row-selected">
                <td>Frozen yogurt</td>
                <td>159</td>
                <td>6.0</td>
                <td>24</td>
                <td>4.0</td>
                <td>87</td>
                <td>14%</td>
                <td>1%</td>
            </tr>
            <tr>
                <td>Ice cream sandwich</td>
                <td>237</td>
                <td>9.0</td>
                <td>37</td>
                <td>4.3</td>
                <td>129</td>
                <td>8%</td>
                <td>1%</td>
            </tr>
            <tr>
                <td>Eclair</td>
                <td>262</td>
                <td>16.0</td>
                <td>24</td>
                <td>6.0</td>
                <td>337</td>
                <td>6%</td>
                <td>7%</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<script src="/public/libs/mdui/js/mdui.min.js"></script>
</body>
</html>