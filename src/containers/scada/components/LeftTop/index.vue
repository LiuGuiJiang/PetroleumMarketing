<template>
  <div style="height:100%;">
    <dv-border-box-8 :color="['#00FFFF', '#113069']">
      <el-row style="height:100%;padding: 10px;">
        <el-col :span="24" style="height: 70%;">
          <div id="left-top" style="height:100%;"></div>
        </el-col>
        <el-col :span="24" style="height: 30%;">
          <el-row style="height: 100%;">
            <el-col :span="8" style="height: 100%;display:flex;">
              <div style="margin:auto;">
                <el-badge :value="120" :max="99" class="item" type="danger">
                  <el-tag  size="medium" type="danger" effect="plain">油库数量</el-tag>
                </el-badge>
              </div>
            </el-col>
            <el-col :span="8" style="height: 100%;display:flex;">
              <div style="margin:auto;">
                <el-badge :value="12" :max="99" class="item" type="success">
                  <el-tag  size="medium" type="success" effect="plain">油库总库容</el-tag>
                </el-badge>
              </div>
            </el-col>
            <el-col :span="8" style="height: 100%;display:flex;">
              <div style="margin:auto;">
                <el-badge :value="82" :max="99" class="item" type="warning">
                  <el-tag  size="medium" type="warning" effect="plain">其他油库</el-tag>
                </el-badge>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </dv-border-box-8>
  </div>
</template>

<script>
import { drawLine } from '@/utils/drawLine.js'

export default {
  data () {
    return {}
  },
  mounted () {
    this.leftTop()
  },
  methods: {
    // 绘制左上角图
    leftTop () {
      const res = [{
              "label": "自有油库统计",
              "value": 20
          },
          {
              "label": "区域油库统计",
              "value": 18
          }
      ]

      const color = ['#00FFFF', 'rgba(196,36,255,1)'];
      const data = [];

      for (let i = 0; i < res.length; i++) {
          data.push({
              value: res[i].value,
              name: res[i].label,
              itemStyle: {
                  normal: {
                      borderWidth: 15,
                      shadowBlur: 10,
                      borderColor: color[i],
                      shadowColor: color[i]
                  }
              }
          }, {
              value: res[0].value / 10,
              name: '',
              itemStyle: {
                  normal: {
                      label: {
                          show: false
                      },
                      labelLine: {
                          show: false
                      },
                      color: 'rgba(0, 0, 0, 0)',
                      borderColor: 'rgba(0, 0, 0, 0)',
                      borderWidth: 0
                  }
              }
          });
      }
      let option = {
          color,
          graphic: {
              elements: [
                  {
                      type: 'image',
                      z: 3,
                      style: {
                          width: '100%',
                          height: '100%'
                      },
                      left: '36%',
                      top: 'center'
                  },
                  {
                      type: 'image',
                      z: 3,
                      style: {
                          width: '100%',
                          height: '100%'
                      },
                      right: '36%',
                      top: 'center'
                  }
              ]
          },
          tooltip: {
              show: true
          },
          toolbox: {
              show: true
          },
          series: [{
              name: '',
              type: 'pie',
              clockWise: false,
              radius: ['50%', '50%'],
              hoverAnimation: false,
              itemStyle: {
                  normal: {
                      label: {
                          show: true,
                          fontSize: 14,
                          formatter(params) {
                              return params.name ?
                                  params.name + '\n\n' + params.value + '个' :
                                  '';
                          }
                      },
                      labelLine: {
                          width: '90%',
                          length: 20,
                          length2: 20,
                          show: true,
                          color: '#00ffff'
                      }
                  }
              },
              data
          }]
      };

      drawLine('left-top', option)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-tag--plain.el-tag--danger,
/deep/ .el-tag--plain.el-tag--success,
/deep/ .el-tag--plain.el-tag--warning {
  background-color: #03173C;
}
</style>