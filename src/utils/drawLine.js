import echarts from 'echarts'
import { EleResize } from './esresize.js'

/**
 * 多图表自适应函数方法，使用自定义主题
 * @param {*} dom ID 名称
 * @param {*} option 画图实例
 */
const drawLine =  (dom, option) => {
  let myChart = echarts.init(document.getElementById(dom))
  let resizeDiv = document.getElementById(dom)
  myChart.setOption(option)
  let listener = () => {
    myChart.resize()
  }
  EleResize.on(resizeDiv, listener)
}

export {
  drawLine
}
