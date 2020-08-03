<template>
    <div class="function-menu">
        <!-- 说明：此模块为列表项的功能菜单，适用于数据展示，报表等。 -->
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane :name="item.name" v-for="item in funMenuButList" :key="item.name">
                <span slot="label"><i :class="item.icon"></i> {{item.label}}</span>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeName : this.tabActiveName
        }
    },
    props:{
        funMenuButList:{
            default: [],
            type: Array
        },
        tabActiveName: {
            default: null,
            type: String
        }
    },
    methods: {
        //1.0 tabs选中项
        handleClick (tab,event) {
            //console.log(tab,event)
            let pitchOn = tab.name
            this.$emit('tabHandleClick',pitchOn)
        }
    }

}
</script>

<style lang="scss">
    .function-menu {
        padding: 4px 0 2px 0;
        background-color: #003366;
        border-bottom: 2px solid #0679ec98;
        .el-tabs--border-card>.el-tabs__header,.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active,.el-tabs--border-card,.el-tabs--border-card>.el-tabs__header .el-tabs__item {
            background-color: #03173C;
            border: 0;
        }
        .el-tabs__item {
            //background-image: url("../../assets/images/but-bg-4.png");
            // background-size: 102% 170%;
            // background-position: -1px -10px;
            //background-color: #03173C;
        }
        .el-tabs--border-card>.el-tabs__content {
            padding: 0;
        }
        .el-tabs--top.el-tabs--border-card .el-tabs__item:nth-child(2) {
            padding-left: 15px;
        }
        .el-tabs--top.el-tabs--border-card .el-tabs__item:last-child {
            padding-right: 15px;
        }
        .el-tabs__item {
            padding: 0 15px;
            height: 30px;
            line-height: 30px;
            color: #FFF;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item {
            color: rgb(253, 250, 250);
            font-weight: 600;
            font-size: 13px;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item:hover {
            color: yellow;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
            color: yellow;
        }
        .el-tabs__nav-next, .el-tabs__nav-prev {
            color: #fff;
            line-height: 30px;
        }
    }
</style>
