<template>
  <div style="height: 100%;position:relative;">
    <dv-border-box-8 :color="['#00FFFF', '#113069']" :reverse="true">
      <div style="height:100%;padding: 10px;">
        <div id="right-top" style="height: 100%;"></div>
      </div>
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
    this.rightTop()
  },
  methods: {
    rightTop () {
      let option = {
          title: {
              text:'加油站总数\n\n8',
              left:'center',
              top:'46%',
              padding:[0,0],
              textStyle:{
                  fontSize: 14,
                  color:'#6B9DD7',
                  fontWeight:'normal',
                  align:'center'
              }
          },
          legend: {
              show: false,
              orient: 'vertical',
              top: "center",
              right: "5%",
              data: ['自有油站', '区域油站', '其他油站'],
              textStyle: {
                  color: "#fff",
                  fontSize: 16
              }
          },
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [{
              name: '半径模式',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['50%', '50%'],
              roseType: 'radius',
              label: {
                  show: true,
                  normal: {
                      position: 'outside',
                      fontSize: 16
                  }
              },
              labelLine: {
                  length: 1,
                  length2: 20,
                  smooth: true
              },
              data: [{
                      value: 5,
                      name: '自有油站',
                      itemStyle: {
                          color: "rgba(50,123,250,0.7)",
                          borderColor: "rgba(50,123,250,1)",
                          borderWidth: 3
                      }
                  },
                  {
                      value: 2,
                      name: '区域油站',
                      itemStyle: {
                          color: "rgba(244,201,7,0.7)",
                          borderColor: "rgba(244,201,7,1)",
                          borderWidth: 3
                      }
                  },
                  {
                      value: 1,
                      name: '其他油站',
                      itemStyle: {
                          color: "rgba(23,216,161,0.7)",
                          borderColor: "rgba(23,216,161,1)",
                          borderWidth: 3
                      }
                  }
              ]
          }]
      };
      drawLine('right-top', option)
    }
  }

}
</script>

<style>

</style>