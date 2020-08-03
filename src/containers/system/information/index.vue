<template>
    <div id="ale-alarm-record">
        <!-- 功能菜单栏 -->
        <div>
            <onlyFunctionMenu 
            :funMenuButList="funMenuButList"
            :tabActiveName="tabActiveName"
            @tabHandleClick="tabHandleClick"/>
        </div>
        <!-- 内容 -->
        <div class="content">
            <baidu-map :center="center" :zoom="7" :scroll-wheel-zoom="true" style="height: 100%;overflow:hidden;">
                <bm-view style="height: 100%;"></bm-view>
                <bm-control :offset="{width: '100px', height: '50px'}">
                    <bm-auto-complete @confirm="confirmWeiZhi" v-model="keyword" :sugStyle="{zIndex: 1}">
                        <el-input slot="keyword" placeholder="请输入内容">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </bm-auto-complete>
                </bm-control>
                <bm-local-search :keyword="keyword" :auto-viewport="true" ></bm-local-search>

                <!-- 缩放控件 -->
                <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
            </baidu-map>
        </div>

        <!-- 录入数据 -->
        <el-dialog class="dialog" title="录入" :visible.sync="dialogScreenVisible">
            <el-form :model="formCondition" label-position="right">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.name" placeholder="输入名称"></el-input>
                </el-form-item>
                <el-form-item label="经度" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.jingdu" placeholder="经纬度数据，格式为：0.0"></el-input>
                </el-form-item>
                <el-form-item label="纬度" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.weidu" placeholder="经纬度数据，格式为：0.0"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.diZhi" placeholder="输入地址"></el-input>
                </el-form-item>
                <el-form-item label="面积" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.mianJi" placeholder="输入面积"></el-input>
                </el-form-item>
                <el-form-item label="柴油储量" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.zongChuLiang" placeholder="柴油储量"></el-input>
                </el-form-item>
                <el-form-item label="汽油储量" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.zongChuLiang" placeholder="汽油储量"></el-input>
                </el-form-item>
                <el-form-item label="柴油灌数" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.zongGuanShu" placeholder="柴油罐数"></el-input>
                </el-form-item>
                <el-form-item label="汽油灌数" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.zongGuanShu" placeholder="汽油罐数"></el-input>
                </el-form-item>
                <el-form-item label="备注信息" :label-width="formLabelWidth">
                    <el-input size="mini" v-model="formCondition.beiZhu" placeholder="少于500字的详细介绍"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">               
                <el-button size="mini" @click="dialogScreenVisible = false" type="primary">确 定</el-button>
                <el-button size="mini" @click="dialogScreenVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            center: {lng: 106.33, lat: 30.02},
            keyword: '关键字',
            /*1.0功能按钮组件，name必须为字符串*/
            tabActiveName: null, //默认选中项
            funMenuButList: [ //列表
                {
                    name: '1',
                    label: '录入',
                    icon: 'el-icon-edit'
                }
            ],
            // 录入对话框
            /** 内部组件*/
            formCondition: {
                name: '',
                jingdu: '',
                weidu: '',
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
            formLabelWidth: '100px'
        }        
    },
    created () {

    },
    methods: {
        // 外部方法
        //1.0 tab功能选中项,需要与功能、事件一一对应
        tabHandleClick (name) {
            //console.log(name)
            //1.1 列表功能
            switch (name) {
                case '1':
                    this.btnLuRu()
                    break;
            }
        },
        /// 信息录入弹窗
        btnLuRu () {
            this.dialogScreenVisible = true
        },
        /// 选中某条记录回车
        confirmWeiZhi ({type, target, item}) {
            console.log({type, target, item})
            this.center = target.map.NC
            // this.center = {lng: target.map.NC.lng, lat: target.map.NC.lat}
            // 获取对一个数据
            this.dialogScreenVisible = true
            this.formCondition.name = item.value.business;
            this.formCondition.jingdu = target.map.NC.lng;
            this.formCondition.weidu = target.map.NC.lat;
            this.formCondition.diZhi = item.value.city + item.value.district + item.value.business;
        }
    }

}
</script>

<style lang="scss">
    #ale-alarm-record {
        height: 100%;
        position: relative;
        &>div.content {
            position: absolute;
            top: 45px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            // color: transparent;
        }

        /*列表样式*/
        div.content>div>div.table-list {
            position: absolute;
            top: 0px;
            right: 5px;
            bottom: 40px;
            left: 5px;
        }

        // 输入框
        & .content /deep/ input {
            margin: 20px !important;
            height: 30px !important;
            width: 200px !important;
        }

    }
</style>

