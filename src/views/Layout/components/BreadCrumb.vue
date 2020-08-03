<template>
    <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>|| {{crumbs}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data () {
        return {
            crumbs: '' //面包屑导航
        }
    },
    watch: {
        $route: 'handleRoute'
    },
    created () {
        this.handleRoute(this.$route)
    },
    methods: {
        handleRoute (route) {
            //console.log(route)
            this.crumbs = route.name
        }
    }
}
</script>

<style lang="scss">
    .crumbs {
        background-color: #33669967;
        border-bottom: 1px solid #336699b4;
        padding: 8px 10px;
        color: aliceblue;
        .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link,.el-breadcrumb__item:last-child .el-breadcrumb__inner {
            color: aliceblue;
        }
        .el-breadcrumb__inner {
            color: aliceblue;
        }
    }
</style>
