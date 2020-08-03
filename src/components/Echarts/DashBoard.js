/**
 * 仪表盘
 */
import {EleResize} from './esresize'
import echarts from 'echarts'
// 引入多表自适应
function  drawLine(dom, option) { //封装一个画图函数
    let myChart=echarts.init(document.getElementById(dom))
    //this的指向，当前页面引入无需this
    let resizeDiv=document.getElementById(dom)
    myChart.setOption(option)
    //console.log(EleResize)
    let listener=function(){
        //console.log('resize')
        myChart.resize()
    }
    EleResize.on(resizeDiv, listener)
}
const dashBoard=function (chartId,data,max,splitNumber){
    var option = {
    tooltip : {
        formatter: "{a} <br/>{c} {b}"
    },
    toolbox: {
        show: true,
        feature: {
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series : [       
        {
            name: '转速',
            type: 'gauge',
            center: ['50%', '50%'],    // 默认全局居中positiom
            radius: '90%',
            min:0,
            max:max[0],
            startAngle:180,
            endAngle:0,
            splitNumber:splitNumber[0],
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 10      //边框的宽度
                }
            },
            axisTick: {            // 坐标轴小标记
                length:12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length:12,         // 整数刻度的长度
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                width:5,
                length:80,         //指针长度
            },
            title: {
                offsetCenter: [0, '70%'], // x, y，单位px                       
            },
            detail: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder'
            },
            data:[{value:data[0], name: 'x1000 r/min'}],
            axisLabel:{
                textStyle:{
                    color:'wheat'
                }
            }
        },               
    ]
};    
    drawLine(chartId, option)
}

export default{
    dashBoard
}
