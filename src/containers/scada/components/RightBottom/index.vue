<template>
  <div style="height: 100%;">
    <dv-border-box-8 :color="['#00FFFF', '#113069']" :reverse="true">
      <div style="height:100%;padding: 10px;" class="info">
        <h3>重庆刚发现千亿吨级油田</h3>
        <hr>
        <br>
        <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中国石油化工集团公司刚刚公布，我国首个国家级页岩气示范区——重庆涪陵页岩气田完成一期50亿立方米/年产能建设目标，并同时启动二期50亿立方米/年产能建设，争取到2017年建成年产百亿立方米的大气田。
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重庆涪陵页岩气田是全球北美地区以外第一个进行商业开采的大型页岩气田而页岩气在石油危机突现的21世纪初就曾让美国令寻谋生之路，也由此带来了石油史上的一个重大革命即页岩油，目前，页岩油已在美国广泛开采应用，根据目前已探测的页岩油储量显示，美国是世界页岩油储备最为雄厚的地区，中国紧随第二。“50亿立方米产能的建成将为我国页岩气开发奠定良好的基础。”中国石油大学教授董秀成说，涪陵页岩气开发在页岩气勘探理论和开发技术、开发模式、产业化发展和装备研发制造等方面都取得重要突破，为我国页岩气开发形成了可以复制和推广的模式。
        </div>
      </div>
    </dv-border-box-8>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.info {
  color: #FFF;
  div { // 超过10行为...
    display: -webkit-box;    
    -webkit-box-orient: vertical;    
    -webkit-line-clamp: 10;    
    overflow: hidden;
  }
}
</style>