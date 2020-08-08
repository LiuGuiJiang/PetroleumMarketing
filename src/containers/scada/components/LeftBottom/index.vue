<template>
  <div style="height: 100%;">
    <dv-border-box-8 :color="['#00FFFF', '#113069']">
      <div style="height:100%;padding: 10px;">
        <el-carousel :interval="5000" arrow="always" style="width:100%;height:100%;">
          <el-carousel-item v-for="item in syImgs" :key="item" style="width:100%;height:100%;">
            <img :src="item" alt="" style="width:100%;height:100%;">
          </el-carousel-item>
        </el-carousel>
      </div>
    </dv-border-box-8>
  </div>
</template>

<script>
export default {
  data () {
    return {
      syImgs: [
        require('@/assets/images/sy-1.jpg'),
        require('@/assets/images/sy-2.jpg'),
        require('@/assets/images/sy-3.jpg'),
        require('@/assets/images/sy-4.jpg')
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-carousel__container {
  height: 100%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>