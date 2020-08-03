<template>
    <div class="log-bor-well-site" v-loading="this.$store.getters.isLoading"
        element-loading-text="加载中..."
        element-loading-background="rgba(0, 0, 0, 0.5)" style="height:100%;">

        <!-- 地图窗口  -->
        <baidu-map  class="map" :center="{lng: 106.33, lat: 30.02}" :zoom="zoom" :scroll-wheel-zoom="true" :mapStyle="mapStyle">
            <!-- 全景 -->
            <bm-panorama></bm-panorama>

            <!-- 缩放控件 -->
            <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
            
            <!-- 地图类型 -->
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>

            <!-- 地图类型控件 -->
            <!-- 点 -->
            <div v-for="(item,index) in points" :key='index' >   
                <bm-marker v-if="!item.isShow" :position="{lng: item.x, lat: item.y}"  @click="getId(index)" :icon="{url: item.imgUrl, size: {width: 26, height: 32}, opts: {imageSize: {width:26, height:32}, imageOffset: {width:0, height:0}, anchor:{width: 13, height: 16}}}">
                </bm-marker> 
            </div>
            
            <!-- 搜索框 -->
            <!-- <bm-control :offset="{width: '10px', height: '10px'}">
                <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 1}">
                <search-field placeholder="请输入地名关键字"></search-field> 
                这里指代一个自定义搜索框组件
                </bm-auto-complete>
            </bm-control>
            <bm-local-search :keyword="keyword" :auto-viewport="true" ></bm-local-search> -->
            
            <!-- 窗口视图 -->
            <bm-info-window :position="{lng: bmInfo.x, lat: bmInfo.y}" :show="show" @close="infoWindowClose" @open="infoWindowOpen" style="width:350px;">
                <div v-show="bmInfo.type === 1">
                    <h4 style="text-align:left;padding-bottom:5px;">
                        <span>{{bmInfo.name}}</span>
                    </h4>
                    <hr>
                    <ul>
                        <li style="padding-top:5px;font-size:14px;">
                            <span style="font-weight:600;font-size:14px;padding-top:3px;">隶属：</span>
                            <span>{{bmInfo.company}}</span>
                        </li>
                        <li style="padding-top:5px;font-size:14px;">
                            <span style="font-weight:600;font-size:14px;padding-top:3px;">详情：</span>
                            <el-link @click.native="centerDialogVisible = true" type="primary">查看详情</el-link>
                        </li>
                    </ul>
                </div>
                <div v-show="bmInfo.type === 2">
                    <h4 style="text-align:left;padding-bottom:5px;">
                        <span>{{bmInfo.name}}</span>
                    </h4>
                    <hr>
                    <ul>
                        <li style="padding-top:5px;font-size:14px;">
                            <span style="font-weight:600;font-size:14px;padding-top:3px;">隶属：</span>
                            <span>{{bmInfo.brand}}</span>
                        </li>
                        <li style="padding-top:5px;font-size:14px;">
                            <span style="font-weight:600;font-size:14px;padding-top:3px;">详情：</span>
                            <el-link @click.native="centerDialogVisible = true" type="primary">查看详情</el-link>
                        </li>
                    </ul>
                </div>
            </bm-info-window>
        </baidu-map>

        <!-- 详情 -->
        <el-dialog
        v-dialogDrag
        :title="bmInfo.type === 0 ?  bmInfo.project : bmInfo.fullName"
        :visible.sync="centerDialogVisible"
        width="500px">
        <div>
            <span v-show="bmInfo.type === 0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正在建设中...</span>
            <span v-show="bmInfo.type === 1 || bmInfo.type === 2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{bmInfo.remarks}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="centerDialogVisible = false">关 闭</el-button>
        </span>
        </el-dialog>

        <!-- 录入数据 -->
        <el-dialog class="dialog" title="信息录入" :visible.sync="dialogScreenVisible">
            <el-form :model="formCondition" label-position="right">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.name" placeholder="输入名称"></el-input>
                </el-form-item>
                <el-form-item label="经度" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.weiZhi" placeholder="经纬度数据，格式为：0.0"></el-input>
                </el-form-item>
                <el-form-item label="纬度" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.weiZhi" placeholder="经纬度数据，格式为：0.0"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.diZhi" placeholder="输入地址"></el-input>
                </el-form-item>
                <el-form-item label="面积" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.mianJi" placeholder="输入面积"></el-input>
                </el-form-item>
                <el-form-item label="总储量" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.zongChuLiang" placeholder="可以分柴油、汽油储量"></el-input>
                </el-form-item>
                <el-form-item label="总灌数" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.zongGuanShu" placeholder="可以分柴油、汽油罐数"></el-input>
                </el-form-item>
                <el-form-item label="装卸能力" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.zhuangXieNengLi" placeholder="铁路，码头进、出"></el-input>
                </el-form-item>
                <el-form-item label="配送半径" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.peiSongBanJing" placeholder="300KM半径圆（海洋去掉）"></el-input>
                </el-form-item>
                <el-form-item label="装卸鹤位" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.zhuangXieHeWei" placeholder="输入装卸鹤位"></el-input>
                </el-form-item>
                <el-form-item label="备注信息" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.beiZhu" placeholder="少于500字的详细介绍"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogScreenVisible = false">取 消</el-button>
                <el-button size="mini" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'MyMap',
    data () {
        return {
            show: false,
            jiaYouZhanData: [], // 保存加油站数据
            youKuData: [], // 保存油库信息
            points: [], // 地理位置信息
            zoom: 7,
            bmInfo: {},// 详细信息
            mapStyle: {
                styleJson: [
                    {
                        "featureType": "land",
                        "elementType": "all",
                        "stylers": {
                            "color": "#e6f3ff"
                        }
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": {
                            "color": "#a1e9f5"
                        }
                    },
                    { // 铁路
                        "featureType": "railway",
                        "elementType": "all",
                        "stylers": {
                                "color": "#e6f3ff"
                        }
                    },
                    { // 高速及过道
                        "featureType": "highway",
                        "elementType": "all",
                        "stylers": {
                                "color": "#e6f3ff"
                        }
                    },
                    { // 城市主路
                        "featureType": "arterial",
                        "elementType": "all",
                        "stylers": {
                                "color": "#f3f3f3ff"
                        }
                    }
                ]
            },
            centerDialogVisible: false,
            // 录入对话框
            /** 内部组件*/
            formCondition: {
                name: '',
                weiZhi: '',
                diZhi: '',
                mianJi: '',
                zongChuLiang: '',
                zongGuanShu: '',
                zhuangXieNengLi: '',
                peiSongBanJing: '',
                zhuangXieHeWei: '',
                beiZhu: ''
            },
            dialogScreenVisible: false,
            formLabelWidth: '100px',
            // 搜索
            keyword: ''
        }
    },
    created () {
        this.getWellSite()
    },
    methods: {
        // 获取加油站信息
        getWellSite () {
            this.$store.commit("onIsLoading", true)
            this.$api.JStationSite.selStationSite().then(res => {
                console.log(res)
                if (Array.isArray(res.list)) {
                    // let rows = require('./demo.json').list // 模拟数据
                    let rows = res.list
                    for (var i = 0; i < rows.length; i++) {
                        this.jiaYouZhanData.push(rows[i])
                        this.jiaYouZhanData[i].type = 2; // type为2是加油站
                        this.jiaYouZhanData[i].imgUrl = require('@/assets/img/jiayouzhan-1.png')
                        this.jiaYouZhanData[i].isShow = true
                    }
                    // 获取油库信息并拼到一起
                    this.getYouKuData()
                }
            })
        },
        // 获取油库数据
        getYouKuData () {
            this.$api.JDepotSite.selDepotSite().then(res => {
                if (Array.isArray(res.list)) {
                    // let rows = require('./dmeo2.json').list // 模拟数据
                    let rows = res.list
                    for (var j = 0; j < rows.length; j++) {
                        this.youKuData.push(rows[j])
                        this.youKuData[j].type = 1; // type为1是油库
                        this.youKuData[j].imgUrl = require('@/assets/img/youku-1.png')
                        this.youKuData[j].isShow = false
                    }

                    let lists = this.jiaYouZhanData.concat(this.youKuData)
                    for (var n = 0; n < lists.length; n++) {
                        this.points.push(lists[n])
                    }
                    this.$store.commit("onIsLoading", false)
                    console.log(this.points)
                }
            })
        },
        getId(mess){
            this.bmInfo = this.points[mess]
            this.show = true
            console.log(this.bmInfo)
        },
        infoWindowClose () {
            this.show = false
        },
        infoWindowOpen () {
            this.show = true
        },
        // 油源显示隐藏
        youYuanIsShow (state) {
            // console.log(state)
            for (let i = 0; i < this.points.length; i++) {
                if (this.points[i].type === 0) {
                    this.points[i].isShow = !state
                }
            }
        },
        // 油库显示隐藏
        youKuIsShow (state) {
            console.log(state)
            for (let i = 0; i < this.points.length; i++) {
                if (this.points[i].type == 1) {
                    this.points[i].isShow = !state
                }
            }
            console.log(this.points)
        },
        // 加油站显示隐藏
        youZhanIsShow (state) {
            for (let i = 0; i < this.points.length; i++) {
                if (this.points[i].type == 2) {
                    this.points[i].isShow = !state
                }
            }
        },
        // 铁路线显示隐藏
        isShowTieLuXian (state) {
            console.log(this.mapStyle.styleJson)
            if (state) {                
                this.mapStyle.styleJson.push({ // 铁路
                        "featureType": "railway",
                        "elementType": "all",
                        "stylers": {
                                "color": "black-white"
                        }
                    })
            } else {
                this.mapStyle.styleJson.push({ // 铁路
                        "featureType": "railway",
                        "elementType": "all",
                        "stylers": {
                                "color": "#e6f3ff"
                        }
                    })
            }
        },
        // 公路线显示隐藏
        isShowGongLuXian (state) {
            // console.log(this.mapStyle.styleJson)
            if (state) {
                
                this.mapStyle.styleJson.push({ // 高速及过道
                        "featureType": "highway",
                        "elementType": "all",
                        "stylers": {
                                "color": "#ffbd76"
                        }
                    })
            } else {
                this.mapStyle.styleJson.push({ // 高速及过道
                        "featureType": "highway",
                        "elementType": "all",
                        "stylers": {
                                "color": "#e6f3ff"
                        }
                    })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  .log-bor-well-site, .map {
    height: 100%;
  }
</style>
