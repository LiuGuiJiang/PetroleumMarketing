<template>
    <div id="home">
        <!-- 公共根组件一 -->
        <el-container>

            <!-- header -->
            <el-header height="40px" :style="'background-color:'+subjectColor.themeColor+';'">
               <HeadBar v-show="!isBigScreen" @onThemeChange="onThemeChange"></HeadBar>
            </el-header>
            
            <!-- container -->
            <el-container class="section" :class="isBigScreen?'big-section-top':'section-top'">

                <!-- nav -->
                <div class="aside hidden-xs-only" 
                v-show="isAsideMenu" 
                :style="'background-color:'+subjectColor.asideColor+';'">
                    <NavBar></NavBar>
                </div>

                <!-- main -->
                <el-main>
                    <MainContent></MainContent>
                </el-main>
            </el-container>

            <!-- <el-footer :style="'background-color:'+subjectColor.themeColor+';'" height="40px">
                <footer-bar></footer-bar>
            </el-footer> -->
        </el-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import HeadBar from "./components/HeadBar"
import NavBar from "./components/NavBar"
import MainContent from "./components/MainContent"
import FooterBar from "./components/FooterBar"

export default {
    data () {
        return {
            subjectColor: JSON.parse(localStorage.getItem("subjectColor")) || { //默认主题
                    themeColor: "#015DB2", //主题颜色
                    asideColor: "#060C24" //侧边导航栏颜色
                } 

        }
    },
    computed: {
        ...mapState({
            isBigScreen: state=>state.app.isBigScreen
        }),
        ...mapState({
            isAsideMenu: state=>state.app.isAsideMenu
        })
    },
    methods: {
        //改变主题颜色
        onThemeChange (val) {
            this.subjectColor = val
            localStorage.setItem("subjectColor",JSON.stringify(val))
        }
    },
    components:{
        HeadBar,
        NavBar,
        MainContent,
        FooterBar
    }
}
</script>

<style lang="scss"> 
    #home {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
         
        /*header*/
        .el-header {
            padding: 0;
        }

        /*section*/ 
        .section {
            position: absolute;
            right: 0px;
            bottom: 0px;
            left: 0px;

            /*nav*/
            .aside {
                //background-color: #060C24;
                overflow: auto;
                padding-right:3px;
                //box-shadow: 0px 0px 100px 5px rgba(255, 255, 255, 0.1) inset;
            }

            /*main*/
            .el-main {
                padding: 0px;
                background-color: #03173C;
            }
        }
        
        .section-top {
            top:40px;
        }
        .big-section-top {
            top: 0px;
        }

        // footer
        .el-footer {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0;
        }
    }
</style>
