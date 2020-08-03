/**Echarts画图函数封装---折线图 */
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


//1.0 折线统计图(1-n条)
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
const lineChart = function (chartId,chartName,legendData,xAxisData,seriesSmooth,seriesData,lineColor=[]) {
    let series = []
    for (var i=0;i<legendData.length;i++) {
        series.push({
            name: legendData[i],
            type: 'line',
            smooth: seriesSmooth,
            data: seriesData[i]
        })
    }

    let option = {
        color: lineColor,
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
            trigger: 'axis'
        },
        legend: {
            data: legendData
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData
        },
        yAxis: {
            type: 'value'
        },
        series: series

    }

    drawLine(chartId,option)
}

//2.0 堆积面积图(1-n条)
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
const stackedAreaChart = function (chartId,chartName,legendData,xAxisData,seriesSmooth,seriesData,lineColor=[]) {
    let series = []
    for (var i=0;i<legendData.length;i++) {
        series.push({
            name: legendData[i],
            type: 'line',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            stack: '总量',
            smooth: seriesSmooth,
            data: seriesData[i]
        })
    }

    let option = {
        color: lineColor,
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
            bottom: '10%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData
        },
        yAxis: {
            type: 'value'
        },
        series: series

    }
    
    drawLine(chartId,option)
}

//3.0 大比例面积图(1条)
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
const largeScaleAreaChart = function (chartId,chartName,legendData,xAxisData,seriesData,lineColor=[]) {
    // let series = []
    // for (var i=0;i<legendData.length;i++) {
    //     series.push({
    //         name: legendData[i],
    //         type: 'line',
    //         label: {
    //             normal: {
    //                 show: true,
    //                 position: 'top'
    //             }
    //         },
    //         areaStyle: {},
    //         stack: '总量',
    //         smooth: seriesSmooth,
    //         data: seriesData[i]
    //     })
    // }

    let option = {
        color: lineColor,
        
        // title: {
        //     left: 'center',
        //     text: chartName,
        // },
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        legend: {
            data: legendData
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '11%',
            containLabel: true
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        //移动条
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
        }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: [
            {
                name:legendData[0],
                type:'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgb(250, 70, 131)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(250, 158, 68)'
                    }, {
                        offset: 1,
                        color: 'rgb(250, 70, 131)'
                    }])
                },
                data: seriesData
            }
        ]

    }
    
    drawLine(chartId,option)
}

//4.0 可拖动关系图(1~n条)
/**
 * 参数列表：
 * chartId:统计图id（String）
 * chartName:统计图标题（String）
 * legendData:图例（Array）
 * xAxisboundaryGap: X轴坐标线位置 (Boolen)
 * xAxisData:X轴参数（Array）
 * seriesType: 柱状和折线 (String) 'line' 'bar'
 * seriesSmooth:曲线或折线（Boolen）
 * seriesData:数据（Array）
 * 
 */
const relationLineChart = function (chartId,chartName,legendData,xAxisboundaryGap,xAxisData,seriesType,seriesSmooth,seriesData,lineColor=[]) {
    let series = []
    for (var i=0;i<legendData.length;i++) {
        series.push({
            name: legendData[i],
            type:seriesType,
            symbolSize: 8, //圆圈大小
            smooth: seriesSmooth,
            hoverAnimation: true,
            data: seriesData[i]
        })
    }

    let option = {
        color:lineColor,
        title: {
            text: chartName,
            x: 'center',
            y: 'bottom'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        legend: {
            data:legendData
        },
        toolbox: {
            feature : {
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        dataZoom: [
            {
                type: 'inside',
                show: true,
                realtime: true,
                start: 0,
                end: 100,
            },{
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }
            
        ],
        grid: [{
            left: '3%',
            right: '4%',
            bottom: 50,
            containLabel: true
        }],
        xAxis : [
            {
                type : 'category',
                boundaryGap : xAxisboundaryGap, //X轴坐标线位置
                axisLine: {onZero: true},
                data: xAxisData
            }
        ],
        yAxis : [
            {
                type : 'value',
            }
        ],
        series : series

    }
    
    drawLine(chartId,option)
}

//5.0 布线(1~n条)
/**
 * 参数列表：
 * chartId:统计图id（String）
 * chartName:统计图标题（String）
 * legendData:图例（Array）
 * xAxisData:X轴参数（Array）
 * seriesStep: 布线位置
 * seriesData:数据（Array）
 * 
 */
const stepLine = function (chartId,chartName,legendData,xAxisData,seriesStep,seriesData,lineColor=[]) {
    let series = []
    for (var i=0;i<legendData.length;i++) {
        series.push({
            name: legendData[i],
            type:'line',
            step: seriesStep[i],
            data: seriesData[i]
        })
    }

    let option = {
        color: lineColor,
        title: {
            text: chartName,
            y: 'bottom',
            x: 'center',
            textStyle: {
                fontSize: 13
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:legendData
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
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
    };
    
    drawLine(chartId,option)
}

//6.0 分项数据集
/**
 * 参数列表：
 * chartId:统计图id（String）
 * chartName:统计图标题（String）
 * datasetSource：数据集（二维Array）
 * seriesSmooth:曲线或折线（Boolen）
 * seriesType: 柱状图或者折线图
 * 
 */
const shareDataset = function (chartId,chartName,datasetSource,seriesSmooth,seriesType,lineColor=[]){
    let series = []

    for(var i=0;i<datasetSource.length;i++) {
        if(i == datasetSource.length-1) {
            series.push({
                type: 'pie',
                id: 'pie',
                radius: '30%',
                center: ['50%', '25%'],
                label: {
                    formatter: '{b}: {@2012} ({d}%)'
                },
                encode: {
                    itemName: datasetSource[0][0],
                    value: datasetSource[0][1],
                    tooltip: datasetSource[0][1]
                }
            })
        }else{
            series.push({type: seriesType, smooth: seriesSmooth, seriesLayoutBy: 'row'})
        }
        
    }


    let myChart =echarts.init( document.getElementById(chartId),'mazarine')
    let option = {
        color: lineColor,
        title: {
            text: chartName,
            y: 'bottom',
            x: 'center',
            textStyle: {
                fontSize: 13
            }
        },
        legend: {},
        tooltip: {
            trigger: 'axis',
            showContent: false
        },
        dataset: {
            source: datasetSource
        },
        xAxis: {type: 'category'},
        yAxis: {gridIndex: 0},
        grid: {top: '55%',left: '3%',right: '4%',bottom: '6%',containLabel: true},
        series: series
    };
    myChart.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension
                    }
                }
            });
        }
    });

    drawLine(chartId,option)
}

//7.0 深度折线图

const reseauLine  = function (chartId,chartName,legendData,xAxisData,seriesSmooth,seriesData,lineColor=[]) {
    let series = []
    for (var i=0;i<legendData.length;i++) {
        series.push({
            name: legendData[i],
            type: 'line',
            smooth: seriesSmooth,
            data: seriesData[i]
        })
    }

    let option = {
        color:lineColor,
        title: {
            text: chartName,
            textStyle:{
                fontSize: 13,
                fontFamily: '微软雅黑'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legendData,
            y: 'bottom'
        },
        grid: {
            left: '3%',
            right: '4%',
            top: '6%',
            bottom:30,
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            position: 'top',
            type: 'category',
            splitLine: {show:true},
            boundaryGap: false,
            data: xAxisData
        },
        yAxis: {
            type: 'value',
            inverse:true,
        },
        series: series

    }

    drawLine(chartId,option)
}




export default {
    lineChart,
    stackedAreaChart,
    largeScaleAreaChart,
    relationLineChart,
    stepLine,
    shareDataset,
    reseauLine
}
