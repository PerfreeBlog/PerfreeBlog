let util, layer,table;
layui.use(['util', 'layer','table'], function () {
    util = layui.util;
    layer = layui.layer;
    table = layui.table;

    var myChart = echarts.init(document.getElementById('main1'));
    var myChart2 = echarts.init(document.getElementById('main2'));

    $.get("/plugin/access/getAccessCountByWeek", function (res) {
        var option = {
            title: {
                text: '最近7天访问量'
            },
            xAxis: {
                type: 'category',
                data: res.data.x
            },
            yAxis: {
                type: 'value'
            },
            tooltip: {
                show: true
            },
            series: [
                {
                    name: '访问量',
                    data: res.data.y,
                    type: 'bar'
                }
            ],
            color: ["#1E9FFF"]
        };
        myChart.setOption(option);
    });

    $.get("/plugin/access/getAccessCountBySysGroup", function (res) {
        var option = {
            title: {
                text: '访问设备类型统计',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: '访问设备类型统计',
                    type: 'pie',
                    radius: '50%',
                    data: res.data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ],
            color: ["#1E9FFF","#ee6666","#91cc75","#73c0de","#3ba272","#fc8452","#9a60b4"],
        };
        myChart2.setOption(option)
    });

    window.addEventListener("resize", function () {
        myChart.resize();
        myChart2.resize();
    });


    table.render({
        elem: '#tableBox',
        url: '/plugin/access/list',
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        contentType: 'application/json',
        title: '访问记录列表',
        totalRow: false,
        limit: 10,
        cols: [[
            {field: 'id', title: 'ID', width: 80, sort: true},
            {field: 'ip',   minWidth: 160,title: 'ip地址'},
            {field: 'systemInfo',   minWidth: 160,title: '设备信息'},
            {field: 'systemType',   minWidth: 160,title: '设备类型'},
            {field: 'browserName',   minWidth: 160,title: '浏览器'},
            {field: 'browserVersion',   minWidth: 160,title: '浏览器版本'},
            {field: 'browserGroup',   minWidth: 160,title: '浏览器类型'},
            {
                field: 'date',
                title: '访问时间',
                sort: true,
                minWidth: 160,
                templet: "<span>{{d.date ==null?'':layui.util.toDateString(d.date, 'yyyy-MM-dd HH:mm:ss')}}</span>"
            }
        ]],
        page: true,
        response: {statusCode: 200},
        parseData: function (res) {
            return {
                "code": res.code,
                "msg": res.msg,
                "count": res.total,
                "data": res.data
            };
        },
        request: {
            pageName: 'pageIndex',
            limitName: 'pageSize'
        }
    });
});
