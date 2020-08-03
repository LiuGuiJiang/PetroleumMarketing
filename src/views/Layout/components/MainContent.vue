<template>
    <div class="main-container">
        
        <!-- 面包屑导航 hidden-sm-and-up-->
        <!-- <div class="crumbs-nav">
            <BreadCrumb/>
        </div> -->

        <!-- 主内容区域 -->
        <div class="main-content">
            <keep-alive>
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </keep-alive>
        </div>
        
    </div>
</template>

<script>
import BreadCrumb from './BreadCrumb.vue';

export default {
    components: {
        BreadCrumb
    }

}
</script>

<style lang="scss">
    .main-container {
        position: relative;
        height: 100%;
        overflow: auto;
    }
    .main-content {
        color: #FFF;
        font-family: '微软雅黑';
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
    }
</style>
