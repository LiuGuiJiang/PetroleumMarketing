/**Echarts画图函数封装---饼图 */
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

//1.0 定制馅饼
/**
 * chartId: 饼图ID
 * chartName: 饼图名称 （String）
 * seriesName: 公共参数名称 （String）
 * seriesData: 饼图数据（Array）
 * 
 */

const customizedPie = function (chartId,chartName,seriesName,seriesData) {
    let option = {
        //backgroundColor: '#2c343c',
        title: {
            text: chartName,
            left: 'center',
            top: 10,
            textStyle: {
                fontSize: 13
            }
        },
    
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 1000,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name: seriesName,
                type:'pie',
                radius : '78%',
                center: ['50%', '50%'],
                data:seriesData.sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255,0.9)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.9)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.9)'
                    }
                },
    
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
    drawLine(chartId,option)
}

//2.0甜甜圈图
/**
 * chartId: 饼图ID
 * chartName: 饼图名称 （String）
 * seriesName: 公共参数名称 （String）
 * legendData: 图例（Array）
 * seriesData: 饼图数据（Array）
 * 
 */

 const doughnutChart = function (chartId,chartName,seriesName,legendData,seriesData) {
    let option = {
        title: {
            text: chartName,
            x: 'center',
            y: 'bottom',
            textStyle: {
                fontSize: 13
            }
        },
    
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:legendData
        },
       series: [
            {
                name:seriesName,
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                // label: { //数据在中间对应显示
                //     normal: {
                //         show: false,
                //         position: 'center'
                //     },
                //     emphasis: {
                //         show: false,
                //         textStyle: {
                //             fontSize: '30',
                //             fontWeight: 'bold'
                //         }
                //     }
                // },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: seriesData
            }
        ]
    };
    drawLine(chartId,option)
 }

 //3.0 定制甜甜圈图(面积模式)
/**
 * chartId: 饼图ID
 * chartName: 饼图名称 （String）
 * seriesName: 公共参数名称 （String）
 * seriesData: 饼图数据（Array）
 * 
 */

const customizedDoughnut = function (chartId,chartName,seriesName,seriesData) {
    let option = {
        title : {
            text: chartName,
            x:'center',
            y:'bottom',
            textStyle: {
                fontSize: 13
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:seriesName,
                type:'pie',
                radius : [20,130],
                center : ['50%', '50%'],
                roseType : 'area',
                data:seriesData
            }
        ]
    };
    drawLine(chartId,option)
 }

 //3.1 定制甜甜圈图(半径模式)
/**
 * chartId: 饼图ID
 * chartName: 饼图名称 （String）
 * seriesName: 公共参数名称 （String）
 * seriesData: 饼图数据（Array）
 * 
 */

const radiusModelPie = function (chartId,chartName,legendData,seriesName,seriesData) {
    let option = {
        title : {
            text: chartName,
            x:'center',
            textStyle: {
                fontSize: 13
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data:legendData
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:seriesName,
                type:'pie',
                radius : [40, 170],
                center : ['50%', '50%'],
                roseType : 'radius',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:seriesData
            }
        ]
    };
    
    drawLine(chartId,option)
 }

 //4.0基本饼图
/**
 * chartId: 饼图ID
 * chartName: 饼图名称 （String）
 * seriesName: 公共参数名称 （String）
 * legendData: 图例（Array）
 * seriesData: 饼图数据（Array）
 * 
 */
const pieChart = function (chartId,chartName,seriesName,legendData,seriesData){
    let option = {
        title : {
            text: chartName,
            x:'center',
            y: 'bottom',
            textStyle: {
                fontSize: 13
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'right',
            data: legendData
        },
        series : [
            {
                name: seriesName,
                type: 'pie',
                radius : '80%',
                center: ['50%', '50%'],
                data:seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    drawLine(chartId,option)    
}

export default {
    customizedPie,
    doughnutChart,
    customizedDoughnut,
    radiusModelPie,
    pieChart
}














