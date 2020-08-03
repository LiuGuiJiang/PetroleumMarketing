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
      echarts.registerMap('chongqing', JSON);
      this.drawMap()
    }, 200);
  },
  methods: {
    // 绘制地图
    drawMap () {
      const COORDS_LINE = {
          '北碚':[
            [106.473679, 29.849821],
            [103.800, 30.500]
          ],
          '广安海晶':[
            [106.916214, 30.515518],
            [103.800, 31.500]
          ],
          '一五七处':[
            [106.311674, 29.271891],
            [103.800, 29.500]
          ],
          '东银天润':[
            [107.036756, 29.811418],
            [111.800, 30.500]
          ],
          '加油站':[
            [107.036756, 29.271891],
            [111.800, 29.500]
          ]
      }

      let data = this.youTianInfos

      let option = {
        series: [
            {
                type: 'lines',
                z: 3,
                coordinateSystem: 'geo',
                symbol: 'circle',
                symbolSize: [6, 0],
                color: '#17A597',
                opacity: 1,
                label: {
                    show: true,
                    position: 'end',
                    color: '#000',
                    padding: 5,
                    // formatter: [
                    //     `{title|{b}}`,
                    //     `{zhanDiMianJi|{c} 例}`
                    // ].join('\n'),
                    formatter: params => {
                        // console.log(params.data)
                        return params.data.name + "\n\n面积：" + params.data.zhanDiMianJi + "\n储量：" + params.data.zongChuLiang
                    },
                    backgroundColor: '#eee',
                    borderColor: '#17A597',
                    borderWidth: 1,
                    borderRadius: 4,
                    align: 'center',
                    width: 100,
                    rich: {
                        title: {
                            align: 'center',
                            lineHeight: 17,
                            fontSize: 12,
                            color: '#fff',
                            backgroundColor: '#17A597',
                            width: 100,
                            height: 50,
                            borderRadius: [4, 4, 0, 0]
                        },
                        zhanDiMianJi: {
                            height: 80,
                            width: 100,
                            color: '#17A597',
                            backgroundColor: '#fff',
                            borderRadius: [0, 0, 4, 4]
                        }
                    }
                },
                lineStyle: {
                    type: 'solid',
                    opacity: 1,
                    color: '#17A597',
                    curveness: 0.1
                },
                data: data.map((item) => {
                    let label = {};
                    return Object.assign({
                        coords: COORDS_LINE[item.name],
                        label
                    }, item);
                })
            }
        ],
        visualMap: {
          show: false,
            seriesIndex: 0,
            min: 0,
            max: 1000000,
            right: 20,
            bottom: 20,
            type: 'piecewise',
            align: 'left',
            itemWidth: 22,
            itemHeight: 14,
            textStyle: {
                color: '#FFFF',
                fontSize: 14,
                lineHeight: 20
            },
            color: 'green',
            pieces: [{
                    gte: 41,
                    color: '#BF464D',
                    label: '40例以上'

                },
                {
                    gte: 31,
                    lte: 40,
                    color: '#D47E6D',
                    label: '31 - 40例'
                },
                {
                    gte: 21,
                    lte: 30,
                    color: '#DE977C',
                    label: '21 - 30例'
                },
                {
                    gte: 11,
                    lte: 20,
                    color: '#F3CF9C',
                    label: '11 - 20例'
                },
                {
                    gte: 1,
                    lte: 10,
                    color: '#FAF4E0',
                    label: '1 - 10例'
                },
                {
                    value: 0,
                    color: '#fff',
                    label: '0 例'
                }
            ]
        },
        geo: {
            data: data,
            geoIndex: 1,
            map: 'chongqing',
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
            zoom: 1.2,
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
            }
        }
      };
      
      drawLine('ol-mc-china-map', option)
    }
  }
}
</script>
