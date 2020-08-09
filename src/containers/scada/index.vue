<template>
    <div class="j-wrapper">
        <div id="j-container">
            <div :style="marginStyle" style="position: relative;">
                <div class="j-dashboard-container" style="width: 1920px;height: 648px;" :style="transformStyle">
                    <el-container style="height:100%;">
                        <el-header height="10%" style="padding:0px;">
                            <head-bar></head-bar>
                        </el-header>

                        <el-main style="height: 90%; padding:0px;">
                            <el-row style="height: 100%;">

                                <el-col :span="6" style="height: 100%;">
                                    <el-row style="height: 100%;">
                                        <el-col :span="24" style="height:50%;padding:5px;">
                                            <LeftTop></LeftTop>
                                            <!-- <LeftTop :style="'height: 100%;padding: 5px;background: url(' + require('@/assets/images/border-bg.png') + ') no-repeat center;background-size: 100% 100%;'"></LeftTop> -->
                                        </el-col>
                                        <el-col :span="24" style="height:50%;padding:5px;">
                                            <LeftBottom></LeftBottom>
                                            <!-- <LeftBottom :style="'height: 100%;padding: 5px;background: url(' + require('@/assets/images/border-bg.png') + ') no-repeat center;background-size: 100% 100%;'"></LeftBottom> -->
                                        </el-col>
                                    </el-row>
                                </el-col>

                                <el-col :span="12" style="height: 100%;">
                                    <el-row style="height: 100%;">
                                        <el-col :span="24" style="height:70%;padding:5px;">
                                            <CenterTop></CenterTop>
                                            <!-- <CenterTop :style="'height: 100%;padding: 5px;background: url(' + require('@/assets/images/border-bg.png') + ') no-repeat center;background-size: 100% 100%;'"></CenterTop> -->
                                        </el-col>
                                        <el-col :span="24" style="height:30%;padding:5px;">
                                            <CenterBottom></CenterBottom>
                                            <!-- <CenterBottom :style="'height: 100%;padding: 5px;background: url(' + require('@/assets/images/border-bg.png') + ') no-repeat center;background-size: 100% 100%;'"></CenterBottom> -->
                                        </el-col>
                                    </el-row>
                                </el-col>

                                <el-col :span="6" style="height: 100%;">
                                    <el-row style="height: 100%;">
                                        <el-col :span="24" style="height:50%;padding:5px;">
                                            <RightTop></RightTop>
                                            <!-- <RightTop :style="'height: 100%;padding: 5px;background: url(' + require('@/assets/images/border-bg.png') + ') no-repeat center;background-size: 100% 100%;'"></RightTop> -->
                                        </el-col>
                                        <el-col :span="24" style="height:50%;padding:5px;">
                                            <RightBottom></RightBottom>
                                            <!-- <RightBottom :style="'height: 100%;padding: 5px;background: url(' + require('@/assets/images/border-bg.png') + ') no-repeat center;background-size: 100% 100%;'"></RightBottom> -->
                                        </el-col>
                                    </el-row>
                                </el-col>

                            </el-row>
                        </el-main>
                    </el-container>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { debounce } from "lodash"
import { HeadBar, LeftTop, LeftBottom, CenterTop, CenterBottom, RightTop, RightBottom } from './components'

export default {
    name: "Dashboard",
    data() {
        return {
            scaleX: 1,
            scaleY: 1,
            marginHorizontal: 0
        }
    },
    components: {HeadBar, LeftTop, LeftBottom, CenterTop, CenterBottom, RightTop, RightBottom},
    mounted() {
        this.init();
    },
    computed: {
        transformStyle: function () {
            return {
                transform: `scale(${this.scaleX}, ${this.scaleY})`
            };
        },
        marginStyle: function () {
            return {
                margin: `0px ${this.marginHorizontal}px`
            };
        }
    },
    methods: {
        init() {
            this.listenResize();
        },
        initScale() {
            // 获取DOM元素，并获取其可见区域宽高
            let $container = document.getElementById('j-container');
            let containerWidth = $container.clientWidth;
            let containerHeight = $container.clientHeight;
            containerWidth = isNaN(containerWidth) ? 0 : containerWidth;
            containerHeight = isNaN(containerHeight) ? 0 : containerHeight;

            // 定义设计稿尺寸
            let defaultHeight = 648; // 540
            let defaultWidth = 1920; // 960

            // sacle 缩放比例
            let scale = 1;
            // 当实际高小于设计高时
            if (containerHeight < defaultHeight) {
                scale = containerHeight / defaultHeight;
            }
            // 当实际高小于设计高时
            if (containerHeight > defaultHeight) {
                scale = containerHeight / defaultHeight;
            }
            this.scaleX = scale;
            this.scaleY = scale;

            // 计算margin宽度
            let marginWidth = defaultWidth * scale;
            // 默认margin等于0，如果页面宽度大于设计宽度时，出现空白边，界面居中显示
            this.marginHorizontal = 0;
            if (containerWidth > marginWidth) {
                marginWidth = (containerWidth - marginWidth) / 2;
                this.marginHorizontal = marginWidth;
            }
        },
        listenResize() {
            this.initScale();
            window.addEventListener('resize', debounce(() => {
                this.initScale();
            }, 300));
        }
    }
};
</script>

<style lang="scss">
.j-wrapper {
    height: 100%;
    width: 100%;
    position: relative;
}

#j-container {
    background-color: rgb(3, 12, 59);
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.j-dashboard-container {
    position: relative;
    user-select: none;
    transform-origin: 0 0;
    box-shadow: 0 0 5px 0 rgba(240, 236, 236, 0.5);
    transition: all .3s linear;
    overflow: hidden;
}
</style>
