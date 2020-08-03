<template>
  <div class="proce">
    <div  class="process-box1">
      <div class="parent">
        <div class="top">
          {{process[0]}}
        </div>
        <div class="box1">
          <div class="pro1"></div>
        </div>
        <div v-show='data' class="bottom">
          {{process[1]}}
        </div>
        <div class="bottom1">
          <span class="iconfont" style="font-size:21px;color:#289322;cursor:pointer">&#xe7de;</span>
        </div>
      </div>
      <div class="parent">
        <div class="top">
          {{process[2]}}
        </div>
        <div class="box1">
          <div class="pro11"></div>
        </div>
        <div v-show='data' class="bottom">
          {{process[3]}}
        </div>
        <div class="bottom1">
          <span class="iconfont" style="font-size:21px;color:#289322;cursor:pointer">&#xe7de;</span>
        </div>
      </div>
      <div class="parent">
        <div class="top">
          {{process[4]}}
        </div>
        <div class="box1">
          <div class="pro12"></div>
        </div>
       <div v-show='data' class="bottom">
          {{process[5]}}
        </div>
        <div class="bottom1">
          <span class="iconfont" style="font-size:21px;color:#289322;cursor:pointer">&#xe7de;</span>
        </div>
      </div>       
    </div>
    <!-- <div v-show='view2' class="process-box2">
      <div class="left">222</div>
      <div class="box2">
        <div class="pro2"></div>
      </div> 
      <div class="right">27.5V</div>   
    </div>       -->
  </div>
</template>
<script>
    export default {
      data () {
        return {
          data() {
            return {
              data:process[1],
              view1:'true',
              view2:''
            }
          },
        }
      },
      props: ['process'],
      mounted() { 
        // 第一个
          var HH=10
          var pro1=document.querySelector('.pro1')
          var pro11=document.querySelector('.pro11')
          var pro12=document.querySelector('.pro12')
          //console.log(pro1)        
          this.time1=setInterval(()=>{
            HH+=5
            pro1.style.height=HH+"%"
            pro11.style.height=HH+"%"
            pro12.style.height=HH+"%"
            if(HH>=100){
              HH=0
            }
            //console.log(HH)
          },500)







        // 第二个
          // var HH2=10
          // var pro2=document.querySelector('.pro2')
          // //console.log(pro2)        
          // this.time2=setInterval(()=>{
          //   HH2+=5
          //   pro2.style.width=HH2+"%"
          //   if(HH2>=100){
          //     HH2=0
          //   }
          //   //console.log(HH2)
          // },500)



          // var icon=document.querySelector('.bottom1')
          // console.log(icon)
          // if(this.process[1]===''){
          //   icon.style.display='block'
          // }
      },
      beforeDestroy () {
        if(this.time1){
          clearInterval(this.time1)
        }
        if(this.time2){
          clearInterval(this.time2)
        }
      }
    }
</script>
<style lang='scss' scoped>
  .bottom1{
    display: none;
  }
  .proce{
    width: 100%;
    height: 100%;
  }
  .process-box1{    
    // width: 200px;
    // height: 300px;
    width: 100%;
    height: 90%;
    // border: 1px solid red;
    // 上下
    .parent{
      margin: 10px 8%;
      margin-top: 12px;
      display: inline-block;
      width: 15%;
      height: 100%;
      text-align: center;
      .top{
        margin-bottom: 8px;
      }
      .bottom{
        margin-top:6px;
      }
      .box1{      
        width: 100%;
        height:80%;
        background: #3d454d;
        position: relative;
        .pro1{
          width: 100%;
          height: 33%;
          background:#2da1fe;
          position: absolute;
          bottom:0;
        }
        .pro11{
          width: 100%;
          background:#2da1fe;
          position: absolute;
          height: 13%;
          bottom:0,
        }
        .pro12{
          width: 100%;
          background:#2da1fe;
          position: absolute;
          height: 23%;
          bottom:0
        }
      }
    }
  }
  // .process-box2{    
  //   width: 50%;
  //   height: 200px;
  //   border: 1px solid red;
  //   text-align: center;
  //   // 上下
  //   .left{
  //     display: inline-block;
  //     position: relative;
  //     top:-7%;
  //     margin-right: 10px;
  //   }
  //   .right{
  //     display: inline-block;
  //     position: relative;
  //     top:-7%;
  //     margin-left: 10px;
  //   }
  //   .box2{
  //     display: inline-block;
  //     width: 70%;
  //     height:20%;
  //     background: #3d454d;
  //     .pro2{
  //       width: 33%;
  //       height: 100%;
  //       background: #2da1fe;
  //     }
  //   }
  // }
</style>