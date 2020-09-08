<template>
  <div style="height:100%;" class="j-gis">
    <div v-show="!isCollapse" style="width: 200px;" class="j-gis-left">
      <h3 style="padding: 7.5px 3px;"><i class="el-icon-caret-bottom"></i> GIS图层</h3>
      <!-- <hr> -->
      <el-tree
        @check="currentCheck"
        :data="coverageData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current>
      </el-tree>
    </div>

    <div class="j-gis-right">
      <div class="j-gis-right-top">
        <!-- <el-button @click="onIsShowCoverage" type="primary" plain :icon="isShowCoverage ? 'el-icon-back' : 'el-icon-right'" style="float:left;margin-right:5px;" :title="isShowCoverage ? '隐藏图层' : '展开图层'"></el-button> -->

        <el-radio-group @change="handleMapStyle" v-model="styleType" style="float:left;">
          <el-radio-button label="BD" title="地图"><i class="el-icon-postcard"></i></el-radio-button>
          <el-radio-button label="2D" title="区域地图"><i class="el-icon-picture-outline-round"></i></el-radio-button>
          <el-radio-button label="3D" title="标注地图"><i class="el-icon-money"></i></el-radio-button>
        </el-radio-group>

        <el-button-group style="margin-left: 5px;">
          <el-button type="primary" plain icon="el-icon-s-data" title="数据统计图"></el-button>
          <el-button type="primary" plain icon="el-icon-time" title="经纬度坐标显示"></el-button>
          <el-button type="primary" plain icon="el-icon-coin" title="油库配送半径"></el-button>
          <el-button type="primary" plain icon="el-icon-chat-line-square" title="油库详细信息"></el-button>
          <!-- <el-button type="primary" plain icon="el-icon-postcard" title="油库列表"></el-button> -->
          <el-button type="primary" plain icon="el-icon-search" title="当前区域加油站搜索"></el-button>
          <!-- <el-button type="primary" plain icon="el-icon-more" title="其他功能"></el-button> -->
        </el-button-group>
      </div>
      <div class="j-gis-right-main">
        <!-- <my-baidu v-if="styleType === 'BD'" ref="MyMap"></my-baidu> -->
        <three-di-tu v-if="styleType === 'BD'" ref="MyMap"></three-di-tu>
        <!-- <gaode-map v-if="styleType === '2D'" ref="GaodeMap"></gaode-map> -->
        <chong-qing-shi v-else-if="styleType === '2D'"></chong-qing-shi>
        <three-map v-else-if="styleType === '3D'"></three-map>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import MyBaidu from './components/MyBaidu'
import ChongQingShi from './components/ChongQingShi'
import ThreeMap from './components/ThreeMap'
import ThreeDiTu from './components/ThreeDiTu'

export default {
  components: {
    MyBaidu,
    ChongQingShi,
    ThreeMap,
    ThreeDiTu
  },
  data () {
    return {
      // 图层
      coverageData: [{
        id: 1,
        label: '油源'
      }, {
        id: 2,
        label: '油库'
      }, {
        id: 3,
        label: '加油站',
        children: [
          {
            id: 101,
            label: '中石油',
          }, {
            id: 102,
            label: '中石化',
          }, {
            id: 103,
            label: '延长石油',
          }, {
            id: 104,
            label: '延长壳牌',
          }, {
            id: 105,
            label: '其他',
          }
        ]
      }, {
        id: 4,
        label: '铁路线'
      }, {
        id: 5,
        label: '公路线'
      }, {
        id: 6,
        label: '航运线'
      }, {
        id: 7,
        label: '输油管'
      },{
        id: 8,
        label: '文字'
      },{
        id: 9,
        label: '重庆区域'
      },{

        id: 10,
        label: '行政区域',
        children: [{
          id: 80,
          label: '市域'
        }, {
          id: 81,
          label: '县域'
        }]
      },],
      styleType: 'BD',
      checkboxGroup3: [],
      isShowCoverage: true, // 是否显示图层
    }
  },
  computed: {
      ...mapState({
          isCollapse: state=>state.app.isCollapse
      })
  },
  methods: {
    // 操作地图样式
    handleMapStyle (label) {
      this.styleType = label
    },
    // 其他操作
    handleMapStyle2 () {
      console.log(this.checkboxGroup3)
    },
    // 图层显示隐藏
    onIsShowCoverage () {
      this.isShowCoverage = !this.isShowCoverage
    },
    // 节点选中操作
    currentCheck (data, node) {
      // console.log(data, node)
      switch(data.id){
        case 1:
          this.$refs.MyMap.youYuanIsShow(node.checkedKeys.indexOf(1) !== -1)
          break;
        case 2:
          this.$refs.MyMap.youKuIsShow(node.checkedKeys.indexOf(2) !== -1)
          break;
        case 3:
          this.$refs.MyMap.youZhanIsShow(node.checkedKeys.indexOf(3) !== -1)
          break;
        case 4:
          this.$refs.MyMap.isShowTieLuXian(node.checkedKeys.indexOf(4) !== -1)
          break;
        case 5:
          this.$refs.MyMap.isShowGongLuXian(node.checkedKeys.indexOf(5) !== -1)
          break;
      }
    }
  }
}
</script>

<style lang="scss">
.j-gis {
  width: 100%;
  height: 100%;
  display: flex;

  .j-gis-left {
    .el-tree {
      background: transparent;
      .el-checkbox, .el-tree-node__label {
        color: #8a8888 !important;
      }
      .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
        background: #20417e;
      }
    }
  }

  .j-gis-right {
    width: 100%;
    position: relative;

    .j-gis-right-top {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 40px;
      padding: 5px;
    }

    .j-gis-right-main {
      position: absolute;
      top: 40px;
      right: 0;
      left: 0;
      bottom: 0;
    }
  }
}
</style>