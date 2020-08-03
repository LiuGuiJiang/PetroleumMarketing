<template>
  <div class="footer-bar">
    <el-tabs :value="!isShowCrew ? 'nav' : 'team'" @tab-click="handleClick" style="padding:0 10px;">
        <el-tab-pane label="导航菜单" name="nav"></el-tab-pane>
        <el-tab-pane label="井队列表" name="team"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
        ...mapState({
            isShowCrew: state => state.wells.isShowCrew
        })
    },
  methods: {
    handleClick (tab, event) {
      console.log(tab.name)
      tab.name === 'nav' ? this.$store.commit('onIsShowCrew', false) : this.$store.commit('onIsShowCrew', true)
    }
  }
}
</script>

<style lang="scss">
.footer-bar {
  .el-tabs__header {
    margin: 0;
  }

  .el-tabs__item {
    color: #bbb8b8;
  }

  .el-tabs__item.is-active {
    color: #ffffff;
  }

  .el-tabs__nav-wrap::after {
    height: 0;
  }
}
</style>