<template>
  <div id="ol-mc-china-map" style="width:100%;height:100%;"></div>
</template>

<script>
import { drawLine } from '@/utils/drawLine.js'
import echarts from 'echarts'
import JSON from './chongqing.json'

export default {
  data () {
    return {
        youTianInfos: require('./youtian.json').data
    }
  },
  mounted () {
    setTimeout(() => {
      echarts.registerMap('重庆', JSON);
      this.drawMap()
    }, 200);
  },
  methods: {
    // 绘制地图
    drawMap () {
    //   let data = [
    //     {name: '北碚油库', value: 37},
    //     {name: '广安海晶油库', value: 54},
    //     {name: '四川储备物资管理局一五七处', value: 30},
    //     {name: '重庆东银天润油库', value: 10}
    //   ]

    //   let geoCoordMap = {
    //     '北碚油库':[106.473679, 29.849821],
    //     '广安海晶油库':[106.916214, 30.515518],
    //     '四川储备物资管理局一五七处':[106.311674, 29.271891],
    //     '重庆东银天润油库':[107.036756, 29.811418]
    //   }

      let convertData = function (data) {
        var res = []
        // for (var i = 0; i < data.length; i++) {
        //   var geoCoord = geoCoordMap[data[i].name]
        //   if (geoCoord) {
        //     res.push({
        //       name: data[i].name,
        //       value: geoCoord
        //     })
        //   }
        // }
        for (var i = 0; i < data.length; i++) {
            res.push({
                ...data[i],
                value: [data[i].lng, data[i].lat]
            })
        }
        return res
      }

      // console.log(convertData(data))
      let option = {
        title: {
          text: '',
          left: 'center',
          textStyle: {
            color: '#8e9cc6'
          }
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(255,255,255,1)',
            formatter: params => {
                console.log(params.data)
                return `<div style="width:400px;">
                <h3>${params.data.fullName}</h3>
                <hr/>
                <h6 style="width:400px;white-space:pre-wrap;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${params.data.xiangQing}</h6>
                </div>`
            },
            textStyle: {
                color: '#000'
            }
        },
        legend: {
            orient: 'vertical',
            // top: '9%',
            // left: '5%',
            // icon: 'circle',
            data: ['重庆市县区'],
            // selectedMode: 'single',
            // selected: {},
            // itemWidth: 12,
            // itemHeight: 12,
            // itemGap: 30,
            // inactiveColor: '#b6d7ff',
            textStyle: {
                color: '#fff'
            }
        },
        // visualMap: {
        //     min: 0,
        //     max: 500,
        //     show: false,
        //     splitNumber: 5,
        //     inRange: {
        //         color: ['#FACD91', '#74DFB2', '#81D3F8', '#768FDE', '#e9969f'].reverse()
        //     },
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        geo: {
            map: '重庆',
            label: {
                normal: {
                    show: true,
                    color: 'transparent'
                },
                emphasis: {
                    show: true,
                    color: '#000'
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#145EFF',
                    borderColor: '#03173C',
                    borderWidth: 1,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0
                },
                emphasis: {
                    areaColor: '#feb6aa' // hover效果
                }
            },
            // left: '5%',
            // right: '5%',
            // top: '5%',
            // bottom: '5%'
        },
        series: [{
          name: '重庆市县区',
          type: 'effectScatter',
        //   map: 'Map',
        //   zoom: 1.1,
          coordinateSystem: 'geo',
          data: convertData(this.youTianInfos),
          symbolSize: 10,
          label: {
            normal: {
                // width: 100,
                whiteSpace: 'pre-wrap',
                padding: 5,
                color: '#000',
                textAlign: 'left',
                backgroundColor: 'rgba(250,241,169,0.9)',
                borderRadius: 4,
                formatter: params => {
                    // console.log(params.data)
                    return params.data.name + "\n\n面积：" + params.data.zhanDiMianJi + "\n储量：" + params.data.zongChuLiang
                },
                rich: {},
                position: 'left',
                show: true
            },
            emphasis: {
              show: true
            }
          },
          zoom: 1.2,
          itemStyle: {
            normal: {
              color: 'yellow',
              shadowBlur: 4,
              shadowColor: 'yellow'
            }
          },
          zlevel: 1
        }]
      }
      drawLine('ol-mc-china-map', option)
    }
  }
}
</script>

<style>
#ol-mc-china-map {
    /* background-color: #F5F5F5; */
}
</style>
