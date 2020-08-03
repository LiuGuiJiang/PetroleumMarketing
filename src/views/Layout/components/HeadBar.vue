<template>
    <div class="head-bar">
        <!-- header-left -->
        <el-row type="flex" class="hd-left hidden-xs-only" justify="space-around" align="middle">
            <!-- <img src="../../assets/img/zm-logo.jpg" alt=""> -->
            <span class="hd-title">
                {{mainTitle}}
            </span>

            <div>
                <el-button @click="menuContraction" type="text" style="font-size:26px;color:#FFF;">
                    <i v-show="!isCollapse" class="el-icon-s-fold"></i>
                    <i v-show="isCollapse" class="el-icon-s-unfold"></i>
                </el-button>
            </div>
        </el-row>
        
        <!-- header-right -->
        <el-row class="hd-right">
            <!-- 左侧菜单 -->
            <el-col :xs="0" :sm="14" :md="12" :lg="14" :xl="18" class="hidden-xs-only">
                <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                    <el-tab-pane :name="item.name" v-for="(item,i) in $router.options.routes" :key="i" v-if="!item.hidden">
                        <span slot="label" >
                            <i :class="item.icon"></i> {{item.meta.title}}
                        </span>
                    </el-tab-pane>
                </el-tabs>
            </el-col>

            <!-- 小屏菜单收缩、展开按钮 -->
            <el-col :xs="5" style="height:40px;" class="hidden-sm-and-up">
                <el-button @click="smallNavbarShow" type="text" style="font-size:32px;color:#FFF;margin:5px 0 0 10px;">
                    <i class="el-icon-menu"></i>
                </el-button>

                <!-- 小屏菜单 -->
                <smNavbar ref="child"/>
            </el-col>

            <!-- 右侧功能 -->
            <el-col :xs="19" :sm="10" :md="12" :lg="10" :xl="6">
                <el-row type="flex" style="height:40px;" justify="space-between">
                    <div style="height:100%;line-height:40px;cursor: pointer;margin-left:5px;">
                        <el-badge :is-dot="isDot">
                            <i  @click="realTimeAlarm" style="font-size:16px;color:#FFF;"  class="el-icon-message-solid" title="实时报警"></i>
                        </el-badge>
                    </div>
                    <div style="height:100%;line-height:40px;font-size:12px;margin-right:10px;">
                        <!-- user -->
                        <el-dropdown  trigger="click" @command="settingsUser">
                            <span class="el-dropdown-link" style="color:#FFF;font-size:12px;cursor: pointer;">
                                <i class="el-icon-user-solid"></i> {{uName}}<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="a" icon="el-icon-document">个人信息</el-dropdown-item>
                                <el-dropdown-item command="b" divided icon="el-icon-edit">修改密码</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-divider direction="vertical"></el-divider>

                        <!-- 语言 -->
                        <el-dropdown trigger="click" @command="settingsLanguage">
                            <span class="el-dropdown-link" style="color:#FFF;font-size:12px;cursor: pointer;">
                                <i class="el-icon-s-opportunity"></i> 语言<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="zh" icon="el-icon-s-opportunity">简体中文</el-dropdown-item>
                                <el-dropdown-item command="en" divided icon="el-icon-s-opportunity">English</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-divider direction="vertical"></el-divider>

                        <!-- 主题 -->
                        <el-dropdown trigger="click" @command="themeChange">
                            <span class="el-dropdown-link" style="color:#FFF;font-size:12px;cursor: pointer;">
                                <i class="el-icon-star-on"></i> 主题<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(item,i) in subjectColor" :key="i" :divided="item.divided" :command="item.id">
                                    <span :style="'color:'+item.themeColor+';'"><i class="el-icon-star-on"></i> {{item.name}}</span> 
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-divider direction="vertical"></el-divider>

                        <!-- 退出 -->
                        <el-button type="text" @click="quit"><i class="el-icon-switch-button"></i> 退出</el-button>
                    </div>
                </el-row>
            </el-col>

            <!-- 实时报警信息 -->
            <el-drawer
            size="45%"
            title="实时报警信息"
            :visible.sync="drawer"
            direction="btt"
            :before-close="handleClose">
                <el-row type="flex">
                    <p style="margin:auto">
                        暂无报警信息！
                    </p>
                </el-row>
            </el-drawer>
        </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import smNavbar from "./SmNavbar"

export default {
    data () {
        return {
            uName: sessionStorage.getItem('uName'), //用户昵称
            mainTitle: "销售战略图", //系统标题
            activeName: null, //默认选中项
            isDot: true, //是否有实时报警指示
            drawer: false, //报警显示
            locale: localStorage.getItem('lang') || 'en',
            subjectColor:[ //主题色
                {
                    id: "1",
                    divided: false, //是否添加下划线
                    name: "默认主题",
                    themeColor: "#015DB2", //主题颜色
                    asideColor: "#060C24" //侧边导航栏颜色
                },
                {
                    id: "2",
                    divided: true, //是否添加下划线
                    name: "黑色主题",
                    themeColor: "#243b41", //主题颜色
                    asideColor: "#222d32" //侧边导航栏颜色
                },{
                    id: "3",
                    divided: true, //是否添加下划线
                    name: "蓝色主题",
                    themeColor: "blue", //主题颜色
                    asideColor: "#015DB2" //侧边导航栏颜色
                },{
                    id: "4",
                    divided: true, //是否添加下划线
                    name: "绿色主题",
                    themeColor: "green", //主题颜色
                    asideColor: "#99cc00" //侧边导航栏颜色
                },{
                    id: "5",
                    divided: true, //是否添加下划线
                    name: "粉色主题",
                    themeColor: "pink", //主题颜色
                    asideColor: "#dddddd" //侧边导航栏颜色
                },{
                    id: "6",
                    divided: true, //是否添加下划线
                    name: "红色主题",
                    themeColor: "red", //主题颜色
                    asideColor: "#ffcccc" //侧边导航栏颜色
                }
            ]
        }
    },
    created () {
        this.handleSelect(this.$route)
    },
    methods: {
        //头部主菜单选中，获取name值
        handleClick(tab, event) {
            //console.log(tab.name);
            this.tabChecked(tab.name,false)
        },
        // 左侧菜单栏收缩
        menuContraction () {
            this.$store.commit("onIsCollapse")
        },
        // tabs选中时,跳转到当前模块第一个子页面
        tabChecked (name,status = false) {
            //console.log(name,status)
            // 遍历保存当前模块的左右子模块
            let currentMenu = []
            for(var item of this.$router.options.routes){
                if(!item.hidden){
                    if(name == "主页" || name == "home"){
                        this.$router.push("/Index")
                        return;
                    }else if (item.name == name){
                        currentMenu = item.children
                        break;
                    }
                }
            }
            // 如果name为GIS，隐藏左侧菜单栏
            name == "GIS" ? this.$store.commit('onIsAsideMenu',true) : this.$store.commit('onIsAsideMenu',false)

            // 更新左侧菜单栏
            this.$store.commit('updateLeftMenuNav', currentMenu)

            if (!status) {
                // 跳转到当前模块的第一个子页面
                //console.log(currentMenu)
                if(currentMenu[0].children && currentMenu[0].children.length>0){
                    this.$router.push(currentMenu[0].children[0].path)
                }else{
                    this.$router.push(currentMenu[0].path)
                }
            } else {
                // 刷新页面跳转当前页面,更改name指示器
                this.activeName = name
                this.$router.push(this.$route.path)
            }
            
        },
        // 刷新页面时，跳转到当前页面
        handleSelect (route) {
            let name = route.matched[0].name
            this.tabChecked(name,true)
        },
        // 小屏菜单显示
        smallNavbarShow () {
            this.$refs.child.smallNavbarShow()
        },
        //查看实时报警信息
        realTimeAlarm () {
            this.drawer = true
        },
        // 关闭报警弹窗
        handleClose () {
            this.drawer = false
        },
        // 用户信息设置
        settingsUser (command) {
            console.log(command)
        },
        // 语言
        settingsLanguage (command) { 
            this.$i18n.locale = command;
            localStorage.setItem('lang',command);
        },
        // 主题
        themeChange (command) {
            let themes = null;
            switch (command) {
                case "1":
                    themes = this.subjectColor[0];
                    break;
                case "2":
                    themes = this.subjectColor[1];
                    break;
                case "3":
                    themes = this.subjectColor[2];
                    break;
                case "4":
                    themes = this.subjectColor[3];
                    break;
                case "5":
                    themes = this.subjectColor[4];
                    break;
                case "6":
                    themes = this.subjectColor[5];
                    break;  
                default:
                    themes = this.subjectColor[0];
            }
            this.$emit("onThemeChange",themes)
        },
        //退出系统相关操作
        quit () {
            this.$router.push("/login")
        }
    },
    components: {
        smNavbar
    },
    computed: {
        ...mapState({
            isCollapse: state=>state.app.isCollapse
        }),
        ...mapState({
            chiefEditor: state=>state.app.chiefEditor
        })
    },
    watch: {
        $route:"handleSelect"
    }
}
</script>

<style lang="scss">
.head-bar {
    height: 100%;
    position: relative;

    // header-left
    .hd-left {
        width: 430px;
        padding: 0 5px;
        height: 100%;
        background: rgba(143, 141, 141, 0.2);
        img {
            height: 30px;
            border-radius: 3px;
        }
        span.hd-title {
            color: #fff;
            font-size:20px;
            font-weight:550;
            position: relative;
            top: -2px;
            letter-spacing: 5px;
        }
    }

    // header-right
    .hd-right {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 430px;

        @media screen and (max-width: 767px) {
            left: 0px;
        }

        //实时报警
        .el-badge__content.is-fixed {
            top: 15px;
        }

        // tabs
        .el-tabs--border-card,
        .el-tabs--border-card>.el-tabs__header {
            background-color: transparent;
            border: 0px;
            -webkit-box-shadow: 0 0 0 0;
            box-shadow: 0 0 0 0;
        }
        .el-tabs--border-card>.el-tabs__content {
            padding: 0px;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item {
            height: 40px;
            line-height: 40px;
            color: #FFF;
            font-family: "黑体";
            font-size: 14px;
            border-right: 1px solid rgba(201, 199, 199, 0.52);
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item:first-child {
            margin-left: 0px;
            border-left: 1px solid rgba(201, 199, 199, 0.52);
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
            color:yellow;
            background-color: rgba(255, 255, 255, 0.055);
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
            background-color: rgba(255, 255, 255, 0.055);
            border-color: rgba(201, 199, 199, 0.52);
            border-bottom: 2px solid yellow;
            color: yellow;
        }
        .el-tabs__nav-next, .el-tabs__nav-prev {
            line-height: 40px;
            color: rgb(189, 185, 185);
            padding: 0 3px;
        }
        .el-tabs__nav-next {
            border-right: 1px solid  rgba(255, 255, 255, 0.2);
        }
        .el-tabs__nav-prev {
            border-left: 1px solid  rgba(255, 255, 255, 0.2);
        }
        .el-tabs__nav-next:hover, .el-tabs__nav-prev:hover {
            background-color: rgba(255, 255, 255, 0.2);
            color: #FFF;
        }
        //button退出按钮
        .el-button--text {
            color: #FFF;
        }
        .el-button--text :hover {
            color: rgb(226, 222, 222);
        }
    }

    //小屏菜单导航
    .el-drawer__header>:first-child {
        font-weight: 800;
    }
    .el-drawer__body {
        overflow: auto;
    }

}

</style>