<template>
    <!-- 弹框-曲线图 -->
    <div id="graph" v-show="isPopoutShow == true">
        <div class="graph">
            <div class="g-title">
                <span>{{gTitle}}</span>
            </div>

            <span class="g-close" @click="closePopout()">
                <i class="el-icon-close"></i>
            </span>

            <div id="chart" style="height:300px;padding:5px 10px;"></div>

            <!-- <div class="g-info">
                设备信息
            </div> -->
        </div>
    </div>
</template>

<script>
import onlyChart from '../Echarts/index'

export default {
    data () {
        return {
            isPopoutShow: false, //曲线图的显示与隐藏
            gTitle: null, //标题
            chartName: null,
            legendData: [],
            seriesType: 'line',
            xAxisData: ["2018-1", "2018-2", "2018-3", "2018-4", "2018-5", "2018-6", "2018-7", "2018-8", "2018-9", "2018-10", "2018-11", "2018-12"],
            seriesData: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 15.6, 12.2, 48.7, 18.8, 6.0, 2.3],
            seriesData2: [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 2],
            yAxisName: null
        }
    },
    mounted () {
    },
    methods: {
        //1.0采集系统对应的曲线图
        showSplineView (item) {
            //console.log(item)
            this.isPopoutShow = true
            this.gTitle = item.name
            this.legendData[0]=item.name
            this.yAxisName = item.unit
            //1.1绘制曲线图
            setTimeout(()=> {
                onlyChart.chartLine('chart',this.chartName,this.legendData,this.seriesType,this.xAxisData,this.seriesData,this.yAxisName)
            },1000) 
        },
        //2.0设备状态曲线
        showSplineView2 (item) {
            //console.log(item)
            this.isPopoutShow = true
            this.gTitle = item.name
            this.legendData[0]=item.name
            this.yAxisName = item.unit
            //1.1绘制曲线图
            setTimeout(()=> {
                onlyChart.chartLine('chart',this.chartName,this.legendData,this.seriesType,this.xAxisData,this.seriesData2,this.yAxisName)
            },500) 
        },
        //3.0大棚上线记录
        showSplineView3 (chartId,chartName,legendData,seriesType,xAxisData,seriesData2,yAxisName) {
            this.isPopoutShow = true
            this.gTitle = chartName
            //1.1绘制曲线图
            setTimeout(()=> {
                onlyChart.chartLine(chartId,chartName,legendData,seriesType,xAxisData,seriesData2,yAxisName)
            },500)
        },
        //3.0关闭曲线图
        closePopout () {
            this.isPopoutShow = false
        }
    }

}
</script>

<style lang="scss">
#graph {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: 100;
    background-color: rgba(139, 138, 138, 0.376);
    /*内容*/
    .graph {
        width: 50%;
        max-width: 600px;
        min-width: 320px;
        border-radius: 5px;
        position: relative;
        margin: 0 auto 50px;
        background-color: #FFF;
        box-sizing: border-box;
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
        margin-top: 15vh;
        .g-close {
            position: absolute;
            top: 4px;
            right: 8px;
            cursor: pointer;
            color: #FFF;
        }
    }
    .g-title {
        height: 30px;
        text-align: center;
        color: #FFF;
        line-height: 30px;
        background-color: #66CC66;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        font-size: 12px;
    }

    /*信息*/
    .g-info {
        margin: 0 10px;
        background-color: #66cccc;
        color: #FFF;
    }
}
</style>
