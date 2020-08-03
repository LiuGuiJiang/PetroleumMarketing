/**Echarts画图函数封装---梯形图 */
import {EleResize} from './esresize.js'
import echarts from 'echarts'

//0.0引入多图表自适应函数方法，使用自定义主题。
function drawLine(dom, option) { //封装一个画图函数
    let myChart=echarts.init(document.getElementById(dom),'mazarine')
    let resizeDiv=document.getElementById(dom)
    myChart.setOption(option)
    let listener=function(){
        myChart.resize()
    }
    EleResize.on(resizeDiv, listener)
}

//1.0 基本柱状图
/**
 * 参数列表：
 * chartId:统计图id（String）
 * chartName:统计图标题（String）
 * legendData:图例（Array）
 * xAxisData:X轴参数（Array）
 * seriesSmooth:曲线或折线（Boolen）
 * seriesData:数据（Array）
 * 
 */
const barChart = function (chartId,chartName,legendData,xAxisData,seriesData,barColor=[]) {
    let series = []
    for (var i=0;i<legendData.length;i++) {
        series.push({
            name:legendData[i],
            type:'bar',
            data:seriesData[i],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },)
    }

    let option = {
        color: barColor,
        title : {
            text: chartName,
            x: 'center',
            y: 'bottom',
            textStyle: {
                fontSize: 13
            }
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data: legendData
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '7%',
            containLabel: true
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : xAxisData
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : series
    };

    drawLine(chartId,option)
    
}

//2.0 堆叠柱状图(1-n条)
/**
 * 参数列表：
 * chartId:统计图id（String）
 * chartName:统计图标题（String）
 * legendData:图例（Array）
 * xAxisData:X轴参数（Array）
 * seriesData:数据（Array）
 * 
 */
const stackedBarChart = function (chartId,chartName,legendData,xAxisData,seriesData,barColor=[]) {
    let series = []
    for (var i=0;i<legendData.length;i++) {
        series.push({
            name: legendData[i],
            type: 'bar',
            label: {
                // normal: {
                //     show: true,
                //     position: 'top'
                // }
            },
            areaStyle: {},
            stack: '总量',
            // markPoint : { //此处图标显示位置有问题
            //     data : [
            //         {type : 'max', name: '最大值'},
            //         {type : 'min', name: '最小值'}
            //     ],
                
            // },
            data: seriesData[i]
        })
    }

    let option = {
        color:barColor,
        title: {
            text: chartName,
            top: 'bottom',
            left:'center',
            textStyle:{
                fontSize: 13,
                fontFamily: '微软雅黑'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#333300'
                }
            }
        },
        legend: {
            data: legendData
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '7%',
            containLabel: true
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        xAxis: {
            type: 'category',
            data: xAxisData
        },
        yAxis: {
            type: 'value'
        },
        series: series

    }
    
    drawLine(chartId,option)
}

//3.0时间轴柱状图
const timerShaft = function (chartId) {

}

//4.0 动画延迟柱状图
/**
 * 参数列表：
 * chartId:统计图id（String）
 * chartName:统计图标题（String）
 * legendData:图例（Array）
 * xAxisData:X轴参数（Array）
 * seriesData:数据（Array）
 * 
 */
const animationDelay = function (chartId,chartName,legendData,xAxisData,seriesData,barColor=[]) {   
    let series = []
    for (var i=0;i<legendData.length;i++) {
        series.push({
            name: legendData[i],
            type: 'bar',
            data: seriesData[i],
            animationDelay: function (idx) {
                return idx * 10;
            }
        })

    }

    let option = {
        color: barColor,
        title: {
            text: chartName,
            x: 'center',
            y: 'bottom',
            textStyle: {
                fontSize: 13,
                fontFamily: '微软雅黑'
            }
        },
        legend: {
            data: legendData,
            align: 'left'
        },
        toolbox: {
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                dataView: {},
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '7%',
            containLabel: true
        },
        xAxis: {
            data: xAxisData,
            silent: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {
        },
        series: series,
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };

    drawLine(chartId,option)
}

//5.0 混合放大值柱状图
/**
 * 参数列表：
 * chartId:统计图id（String）
 * chartName:统计图标题（String）无
 * legendData:图例（Array）
 * xAxisData:X轴参数（Array）
 * seriesType: 'line' 'bar'
 * seriesData:数据（Array）
 * 
 */
const mixZoomOnValue = function (chartId,chartName,legendData,xAxisData,seriesType,seriesData,barColor=[]) {
    let series = []
    for (var i=0;i<legendData.length;i++){
        series.push({
            name: legendData[i],
            type: seriesType,
            data: seriesData[i]
        })
    }

    let option = {
        color:barColor,
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true,
                    backgroundColor: '#333300'
                }
            }
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        legend: {
            data:legendData,
            itemGap: 5
        },
        grid: {
            top: '12%',
            left: '1%',
            right: '10%',
            bottom: '11%',
            containLabel: true
        },
        xAxis: [
            {
                type : 'category',
                data : xAxisData
            }
        ],
        yAxis: [
            {
                type : 'value',
                axisLabel: {
                    formatter: function (a) {
                        a = +a;
                        return isFinite(a)
                            ? echarts.format.addCommas(+a / 1000)
                            : '';
                    }
                }
            }
        ],
        dataZoom: [
            {
                show: true,
                start: 80,
                end: 100
            },
            {
                type: 'inside',
                start: 80,
                end: 100
            },
            {
                show: true,
                yAxisIndex: 0,
                filterMode: 'empty',
                width: 30,
                height: '80%',
                showDataShadow: false,
                left: '93%'
            }
        ],
        series : series
    };

    drawLine(chartId,option)
}

//6.0正负条形图
/**
 * 参数列表：
 * chartId:统计图id（String）
 * chartName:统计图标题（String）无
 * legendData:图例（Array）
 * xAxisData:X轴参数（Array）
 * seriesType: 'line' 'bar'
 * seriesData:数据（Array）
 * 
 */
const plusAndMinusBars = function (chartId,chartName,legendData,yAxisData,seriesType,seriesData,barColor=[]) {
    let series = []
    for (var i=0;i<legendData.length;i++) {
        series.push({
            name:legendData[i],
            type:seriesType,
            label: {
                normal: {
                    show: true
                }
            },
            data:seriesData[i]
        },)
    }
    let option = {
        color:barColor,
        title: {
            text: chartName,
            x: 'center',
            y: 'bottom',
            textStyle: {
                fontSize: 13,
                fontFamily: '微软雅黑'
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:legendData
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '25',
            containLabel: true
        },
        xAxis : [
            {
                type : 'value'
            }
        ],
        yAxis : [
            {
                type : 'category',
                axisTick : {show: false},
                data : yAxisData
            }
        ],
        series :series
    };
    drawLine(chartId,option)
}
//7.0 垂直阶梯柱状图
/**
 * 参数列表：
 * chartId:统计图id（String）
 * chartName:统计图标题（String）无
 * xAxisData:X轴参数（Array
 * AssistData: 辅助数据 （Array）
 * grossData:总量数据（Array）
 * seriesName: 项名称
 * barColor: 柱子颜色 （Array）
 * 
 */
const ladderbar  = function (chartId,chartName,xAxisData,AssistData,grossData,seriesName,barColor=[]) {
    
    let option = {
        color: barColor,
        title: {
            text: chartName,
            x: 'center',
            y: 'bottom',
            textStyle: {
                fontSize:12
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
                var tar = params[1];
                return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
            }
        },
        grid: {
            top: 30,
            left: '3%',
            right: '4%',
            bottom: '50',
            containLabel: true
        },
        xAxis: {
            position:'top',
            type : 'category',
            splitLine: {show:false},
            data : xAxisData,
            axisLine:{
                onZero:false
            }
        },
        yAxis: {
            type : 'value',
            inverse:true,
        },
        series: [
            {
                name: '辅助',
                type: 'bar',
                stack:  '总量',
                itemStyle: {
                    normal: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    },
                    emphasis: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    }
                },
                data: AssistData
            },
            {
                name: seriesName,
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'bottom'
                    }
                },
                data: grossData
            }
        ]
    };
    drawLine(chartId, option)
}

//8.0 水平阶梯柱状图
/**
 * 参数列表：
 * chartId:统计图id（String）
 * chartName:统计图标题（String）无
 * xAxisData:X轴参数（Array）
 * AssistData: 辅助数据 （Array）
 * grossData:总量数据（Array）
 * seriesName: 项名称
 * barColor: 柱子颜色 （Array）
 * 
 */
const levelLadderbar  = function (chartId,chartName,yAxisData,AssistData,grossData,seriesName,barColor=[]) {
    
    let option = {
        color:barColor,
        title: {
            text: chartName,
            textStyle: {
                fontSize: 13
            }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
                var tar = params[1];
                return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
            }
        },
        grid: {
            top: 10,
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            position:'top',
            type : 'value',
            boundaryGap: [0, 0.01],
            splitLine: {show:false},
            
        },
        yAxis: {
            type: 'category',
            data : yAxisData,
            inverse:true,
        },
        series: [
            {
                name: '辅助',
                type: 'bar',
                stack:  '总量',
                barWidth : 3,//柱图宽度
                itemStyle: {
                    normal: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    },
                    emphasis: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    }
                },
                data: AssistData
            },
            {
                name: seriesName,
                type: 'bar',
                stack: '总量',
                barWidth : 3,//柱图宽度
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        color: '#FFF'
                    }
                },
                data:grossData
            }
        ]
    };
    
    drawLine(chartId, option)
}

export default {
    barChart,
    stackedBarChart,
    timerShaft,
    animationDelay,
    mixZoomOnValue,
    plusAndMinusBars,
    ladderbar,
    levelLadderbar
}