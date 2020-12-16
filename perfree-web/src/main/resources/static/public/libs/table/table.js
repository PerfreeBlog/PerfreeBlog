/**
 * 初始化table
 * @param url 加载数据url
 * @param param 参数
 * @param tableBodyId tableBodyId
 * @param tableTpl tableTpl
 * @param pagerId pagerId
 */
let pageParam;
function initTable(param) {
    pageParam = param;
    $(param.tableBodyElement).html("<div class='loading-box'><div class='mdui-spinner'></div></div>");
    const data = {pageIndex: param.pageIndex, pageSize: param.pageSize, form: param.data};
    $.ajax({
        url: param.url,
        dataType: "json",
        type: "post",
        contentType: 'application/json',
        async: false,
        data: JSON.stringify(data),
        success: function (result) {
            if (result.code === 200) {
                $(param.tableBodyElement).html("");
                $(param.tableTplL).tmpl(result).appendTo(param.tableBodyElement);
                mdui.updateTables();
                handlePage(result.total, param.pageIndex, param.pageSize, param.pagerElement);
                bindEvent();
            } else {
                pMessage('error', '表格数据加载失败');
            }
        },
    })
}

/**
 * 处理分页
 * @param total 数据总量
 * @param pageIndex 当前页
 * @param pageSize 每页大小
 * @param pagerElement 分页容器
 */
function handlePage(total, pageIndex , pageSize, pagerElement) {
    let pageTotal = parseInt((total / pageSize).toString());
    const rest = total % pageSize;
    if(rest > 0 ) {pageTotal++;}
    let pageHtml = '<ul>'
    if (pageTotal > 1 && pageIndex !== 1) {
        pageHtml += '<li class="pager-btn p-pager-pre-btn"><</li>';
    } else {
        pageHtml += '<li class="pager-btn pager-disable"><</li>';;
    }
    let start = 1, end;
    if (pageIndex > 5) {
        if ((pageTotal - pageIndex) > 5) {
            start = pageIndex - 4;
        } else {
            const startTemp = pageIndex - (10 -  (pageTotal - pageIndex) - 1);
            start = startTemp > 0 ? startTemp : 1;
        }
    }
    if (pageTotal > 10 && (pageTotal - pageIndex) > 5) {
        if (pageIndex >= 5) {
            end = pageIndex + 5;
        } else {
            end = 10;
        }
    } else {
        end = pageTotal;
    }
    for (start; start <= end; start++) {
        if (start === pageIndex) {
            pageHtml += '<li class="pager-btn pager-select">'+start+'</li>';
        } else {
            pageHtml += '<li class="pager-btn p-pager-btn">'+start+'</li>';
        }
    }
    if (pageIndex !== pageTotal) {
        pageHtml += '<li class="pager-btn p-pager-next-btn">></li>';
    } else {
        pageHtml += '<li class="pager-btn pager-disable">></li>';;
    }
    $(pagerElement).html(pageHtml);
}

/**
 * 绑定点击事件
 */
function bindEvent() {
    $(".p-pager-btn").on('click', function () {
        pageParam.pageIndex = $(this).text();
        initTable(pageParam);
    });

    $(".p-pager-next-btn").on('click', function () {
        pageParam.pageIndex = ++pageParam.pageIndex;
        initTable(pageParam);
    });

    $(".p-pager-pre-btn").on('click', function () {
        pageParam.pageIndex = --pageParam.pageIndex;
        initTable(pageParam);
    });
}