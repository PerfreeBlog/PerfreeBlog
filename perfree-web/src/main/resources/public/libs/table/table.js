/**
 * 初始化table
 * @param url 加载数据url
 * @param param 参数
 * @param tableBodyId tableBodyId
 * @param tableTpl tableTpl
 * @param pagerId pagerId
 */
function initTable(param) {
    $.post(param.url, {pageIndex: param.pageIndex, pageSize: param.pageSize, form: param.data}, function(result){
        if (result.code === 200) {
            console.log(result)
            $(param.tableTplL).tmpl(result).appendTo(param.tableBodyElement);
            mdui.updateTables();
            handlePage(result.total, param.pageIndex, param.pageSize, param.pagerElement);
        } else {
            pMessage('error', '表格数据加载失败');
        }
    });
}

/**
 * 处理分页
 * @param total 数据总量
 * @param pageIndex 当前页
 * @param pageSize 每页大小
 * @param pagerElement 分页容器
 */
function handlePage(total, pageIndex, pageSize, pagerElement) {
    // let pageTotal = total / pageSize
    $(pagerElement).html(' <ul>\n' +
        '                <li class="pager-btn">首页</li>\n' +
        '                <li class="pager-btn">上一页</li>\n' +
        '                <li class="pager-btn">1</li>\n' +
        '                <li class="pager-btn">2</li>\n' +
        '                <li class="pager-btn">下一页</li>\n' +
        '                <li class="pager-btn">尾页</li>\n' +
        '            </ul>');
}