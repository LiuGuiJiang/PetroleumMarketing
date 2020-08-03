<template>
    <div class="navbar">
        <!-- 菜单功能切换 -->
        <!-- <el-menu
        class="j-menu-tabs"
        :default-active="tabsActive"
        @select="handleSelect3"
        background-color="#060C24"
        text-color="#fff" 
        active-text-color="yellow" 
        unique-opened
        :collapse="isCollapse"
        :mode="!isCollapse ? 'horizontal' : 'vertical'">
            <el-menu-item index="nav">
                <i class="el-icon-s-operation"></i>
                <span slot="title">导航</span>
            </el-menu-item>
        </el-menu> -->

        <!-- 大屏左侧二级菜单 background-color="transparent" -->
        <el-menu 
        :default-active="$route.path"
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        @select="handleSelect"
        background-color="#060C24"
        text-color="#fff" 
        active-text-color="yellow" 
        router
        unique-opened
        :collapse="isCollapse"
        v-if="!isShowCrew">
            <!-- 菜单列表 -->
            <template v-for="item in leftMenuNav" v-if="!item.hidden">

                <el-submenu :index='item.name' :key="item.name" v-if="item.leaf">
                    <template slot="title">
                        <i :class="item.meta.icon"></i>
                        <span slot="title">{{$t(item.meta.title)}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">
                            <i :class="child.meta.icon"></i>{{$t(child.meta.title)}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-menu-item :index="item.path" :key="item.path" v-if="!item.leaf">
                    <i :class="item.meta.icon"></i>
                    <span slot="title">{{$t(item.meta.title)}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
            selValue: "", //默认选项值
            crewList: [], //井队信息列表
            crewList2: [], // 所有井队
            crewActive: '27', //:default-active="crewActive"
            tabsActive: localStorage.getItem('tabsActive') || 'nav', // tabs菜单切换状态
            tabsActive1: localStorage.getItem('tabsActive1') || 'a', // 井队列表分类规则
            agentData: { // socket 传输数据
                code: 1,
                item: '27'
            },
            socketDefault: {}, // socket默认
            lineTeams:[] //在线、离线井队
        }
    },
    computed: {
        ...mapState({
            isCollapse: state=>state.app.isCollapse,
            leftMenuNav: state=>state.menu.leftMenuNav,
            drillingCrew: state=>state.wells.drillingCrew,
            isSocket: state=>state.app.isSocket,
            socketData: state => state.socket.socketData,
            isShowCrew: state => state.wells.isShowCrew
        })
    },
    created () {
        this.selDrillingCrewInfo()
        this.socketApi.sendSock(this.agentData,this.getConfigResult);
    },
    methods: {
        //选项框值发生改变，快速搜索菜单
        selectChange (val) {
            console.log(val)
            if(val){
                this.$router.push(val)
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleSelect(key, keyPath)  {
            console.log(key,keyPath)
            this.$router.push(key)
        },
        // 查询井队信息
        selDrillingCrewInfo () {
            let list = JSON.parse(sessionStorage.getItem('crewList'));
            let rows = []
            // this.crewActive = list[0].id;
            for(var item of list){
                for (var i=0;i<item.teamInfo.length;i++) {
                    item.teamInfo[i].isLine = false
                    // item.teamInfo[i].push({
                    //     // id:item.id,
                    //     // teamNum: item.teamNum,
                    //     isLine: false
                    // })
                }
            }
            this.crewList = list;

            // 按在线离线分类
            // for (var ite of list) {

            // }
            // console.log(list)
        },
        //3.0选中井队
        handleOpen2(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose2(key, keyPath) {
            console.log(key, keyPath);
        },
        handleSelect2(key, keyPath)  {
            // console.log(key,keyPath) 
            this.agentData.item = key
            this.crewActive = key
            // this.$store.commit("updateSocketData",JSON.stringify(this.socketDefault))
            this.$store.commit("updateDrillingCrew",key)
        },
        //获取socket响应数据
        getConfigResult (da) {
            this.selDrillingCrewInfo()
            // console.log(da)
            this.$store.commit("updateSocketData",JSON.stringify(da.data))
            // this.socketData = da
            // let lineTeams = ['33','42','7','11']
            let lineTeams = da.data.lineTeams
            // console.log(lineTeams)
            for(var i=0;i<this.crewList.length;i++){
                for (var j=0;j<lineTeams.length;j++){
                    if (this.crewList[i].teamNum == lineTeams[j]){
                        this.crewList[i].isLine = true
                    }
                }
            }

            for(var item of this.crewList){
                for (var i=0;i<item.teamInfo.length;i++) {
                    for (var j=0;j<lineTeams.length;j++){
                        if (item.teamInfo[i].teamNum == lineTeams[j]){
                            item.teamInfo[i].isLine = true
                        }
                    }
                }
            }
        },
        // 菜单信息切换
        handleSelect3 (key) {
            key === 'nav' ? this.$store.commit('onIsShowCrew', false) : this.$store.commit('onIsShowCrew', true)
            this.tabsActive = key
            localStorage.setItem('tabsActive', key)
        },
        // 井队分类规则切换
        handleSelect4 (key) {
            this.tabsActive1 = key,
            localStorage.setItem('tabsActive1', key)
        }
    },
    updated () {},
    watch: {
        isSocket(val){ //连接成功传参
            if(val == true){
                this.socketApi.sendSock(this.agentData,this.getConfigResult);
            }
        },
        drillingCrew(val){
            // console.log("发送数据:",this.agentData)
            this.socketApi.sendSock(this.agentData,this.getConfigResult);
        }
    }
}
</script>

<style lang="scss">
    .navbar {
        // 菜单展示内容切换修改
        .j-menu-tabs {
            .el-menu-item {
                height: 30px;
                line-height: 30px;
                padding: 0 29px;
            }
            .el-menu-item:hover,
            .el-menu-item.is-active {
                background-color: rgba(255, 255, 255, 0.1) !important;
            }
            &.el-menu.el-menu--horizontal {
                border-bottom: 1px solid #818181 !important;
            }
        }
        // 井队列表分类规则
        .j-menu-tabs-2 {
            .el-menu-item {
                height: 20px;
                line-height: 20px;
                padding: 0 0px;
            }
            .el-menu-item:hover,
            .el-menu-item.is-active {
                background-color: rgba(255, 255, 255, 0.1) !important;
            }
            &.el-menu.el-menu--horizontal {
                border-bottom: 1px solid #818181 !important;
            }
        }
        // 菜单样式修改
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 240px;
        }

        .el-menu {
            border-right: 0px;
            background-color: transparent;
        }
        .el-menu-item-group>ul {
            background-color: rgba(255, 255, 255, 0.05);
        }
        .el-menu-item-group__title {
            padding: 0px;
        }
        .el-submenu__title:hover,
        .el-menu-item:hover,
        .el-menu-item.is-active {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        .el-submenu .el-menu-item{
            border: 0px;
        }
        .el-submenu.is-active .el-submenu__title{
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }
        .el-submenu__title,
        .el-menu-item {
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            height: 40px;
            line-height: 40px;
        }
        .el-submenu__title:first-child {
            //border-top: 1px solid rgba(255, 255, 255, 0.15);
        }


        /*box节点本身的样式*/
        .box{
            /*以下两个默认值，可不写*/
            /*写上只是为了便于讲解，记住这两个*/
            opacity: 1;
            margin-right: 0;
        }
        .box-enter-active,.box-leave-active{
            transition: all .5s;
        }
        .box-enter-active{
            opacity: 0.5;
            margin-right: 0%;
        }
        .box-leave-active{
            opacity: 0.5;
            margin-right: 100%;
        }
    }
</style>
