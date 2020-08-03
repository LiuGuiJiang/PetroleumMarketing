<template>
    <div class="small-nav">
        <el-drawer
        size="70%"
        title="导航"
        :visible.sync="drawer"
        direction="rtl">
            <el-menu
            :default-active="$route.path" 
            class="el-menu-vertical-demo" 
            text-color="#72767b" 
            active-text-color="#ffd04b" 
            unique-opened 
            router>
                <!-- 一级菜单 -->
                <template v-for="item in $router.options.routes" v-if="!item.hidden && (item.number == 10001 || item.number == chiefEditor)">
                    <el-submenu v-if="item.children && item.children.length" :index="item.name" :key="item.name">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <!-- <span>{{item.name}}</span> -->
                            <span>{{$t(item.name)}}</span>
                        </template>
                        
                        <!-- 二级菜单 -->
                        <template v-for="itemChild in item.children">
                            <el-submenu v-if="itemChild.children && itemChild.children.length" :index="itemChild.name" :key="itemChild.name">
                                <template slot="title"><i :class="itemChild.icon"></i><span>{{$t(itemChild.name)}}</span></template>
                                
                                <!-- 三级菜单 -->
                                <el-menu-item v-for="itemChild_Child in itemChild.children" :index="itemChild_Child .path" :key="itemChild_Child.path" @click="decan">
                                    <i :class="itemChild_Child.icon"></i>
                                    <!-- <span slot="title">{{itemChild_Child.name}}</span> -->
                                    <span slot="title">{{$t(itemChild_Child.name)}}</span>
                                </el-menu-item>
                            </el-submenu>
                            
                            <el-menu-item v-else :index="itemChild.path" :key="itemChild.path" @click="decan">
                                <i :class="itemChild.icon"></i>
                                <!-- <span slot="title">{{itemChild.name}}</span> -->
                                <span slot="title">{{$t(itemChild.name)}}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                    
                    <el-menu-item v-else :index="item.path" :key="item.path" @click="decan">
                        <i :class="item.icon"></i>
                        <!-- <span slot="title">{{item.name}}</span> -->
                        <span slot="title">{{$t(item.name)}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-drawer>
    </div>
</template>

<script>
import { mapState } from 'vuex' 

export default {
    data () {
        return {
            drawer: false
        }
    },
    methods: {
        //小屏菜单显示
        smallNavbarShow () {
            this.drawer = true
        },
        //小屏选中菜单项，抽屉关闭
        decan() {
            this.drawer = false
        }
    },
    computed: {
        ...mapState({
            chiefEditor: state=>state.app.chiefEditor
        })
    }

}
</script>

<style>

</style>