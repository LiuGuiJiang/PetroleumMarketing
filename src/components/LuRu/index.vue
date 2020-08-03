<template>
  <!-- 详情 -->
  <el-dialog
  v-dialogDrag
  :title="bmInfo.type === 0 ?  bmInfo.project : bmInfo.fullName"
  :visible.sync="centerDialogVisible"
  width="500px">
  <div>
      <span v-show="bmInfo.type === 0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正在建设中...</span>
      <span v-show="bmInfo.type === 1 || bmInfo.type === 2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{bmInfo.xiangQing}}</span>
  </div>
  <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="centerDialogVisible = false">关 闭</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {

}
</script>

<style>

</style>