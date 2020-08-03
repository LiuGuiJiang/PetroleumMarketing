<template>
   <div id="login">
        <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">
            <!-- <img src="../assets/img/zm-logo.jpg"/> -->
            {{title}}</h3>

            <el-form-item prop="account">
                <el-input size="medium" placeholder="请输入您的账号" v-model="loginForm.account">
                    <template slot="prepend">
                        <i class="el-icon-user-solid"></i>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input size="medium" type="password" placeholder="请输入您的密码" v-model="loginForm.password">
                    <template slot="prepend">
                        <i class="el-icon-s-order"></i>
                    </template>
                </el-input>
            </el-form-item>
            
            <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> 

            <el-form-item style="width:100%;">
              <el-col :span="11">
                <el-button type="primary" style="width:100%;" size="medium" @click.native.prevent="reset">重 置</el-button>
              </el-col>
              <el-col :span="2">&nbsp;</el-col>

              <el-col :span="11">
                <el-button type="primary" style="width:100%;" size="medium" @click.native.prevent="login('loginForm')" :loading="loading" >登 录</el-button>
              </el-col>
            
            </el-form-item>
        </el-form>
   </div>
  
</template>
<script>
import Cookies from "js-cookie"
import JSEncrypt from 'jsencrypt'//前端用crypto-js进行加密
export default {
  name: 'Login',
  components:{},
  data() {
    return {
      title: '延长石油销售战略平台登录',
      loading: false,
      loginForm: {
        account: 'test',
        password: '123456'
      },
      fieldRules: { //验证
        account: [
          { required: true, message: '请输入您的账号！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入您的密码！', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  created () {
    this.keyupSubmit()
  },
  methods: {
    conversion(val){
        return (resolve) => require(['@/containers/'+val+'.vue'],resolve)
    },
    //绑定回车
    keyupSubmit(){
      document.onkeydown=e=>{
        let _key=window.event.keyCode;
        if(_key===13){
          this.login('loginForm')
        }
      }
    },
    login(formName) {       
        
        // console.log(this.loginForm.account)
        // console.log(this.loginForm.password)
        this.$refs[formName].validate((valid) => {
            if (valid) {
              this.loading = true
              // sessionStorage.setItem('uName',this.loginForm.account)
              setTimeout(() => {
                  this.loading = false
                  Cookies.set('token', 'TEST_USER_TOKEN_1234567890') // 放置token到Cookie
                  sessionStorage.setItem('uName', this.loginForm.account) // 保存用户到本地会话
                  //this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
                  this.$router.push('/')  // 登录成功，跳转到主页
                  this.$router.commit('isAsideMenu', false)
                  this.$store.commit('onIsBigScreen',false)
              }, 2000);
              

              /*
              // let userInfo = {account:this.loginForm.account, password:this.loginForm.password, captcha:this.loginForm.captcha}
              let uName = this.loginForm.account;
              // let password = this.loginForm.password;
              let password = '';

              this.$api.loginRsa.loginRsa(uName,password).then((res) => {
                // console.log(res)
                let Base64 = require('js-base64').Base64
                // Base64.encode('潘高')  // 5r2Y6auY
                // let aaa=Base64.decode('5r2Y6auY')  // 潘高
                let aaa=Base64.decode(res.data)
                let bbb=aaa.split('-')
                let pass = Base64.decode(bbb[1])//解公钥
                let uName = this.loginForm.account;
                let password = this.loginForm.password;
                // console.log(uName+'-'+password)
                // console.log('这是解密后的公钥'+pass)

                const encrypt = new JSEncrypt();
                encrypt.setPublicKey(pass);
                // console.log(uName+'-'+password)
                // console.log(typeof(uName+'-'+password))
                password = encrypt.encrypt(uName+'-'+password);// 加密后的字符串
                // console.log(password)
                // password=Base64.encode(uName+'-'+password)
                password=Base64.encode(password)                
                
                //本系统登录
                this.$api.login.login(uName,password).then((res) => {
                  // console.log(res)
                  if(res.code != 200) {
                    this.$message({
                      type: '',
                      dangerouslyUseHTMLString: true,
                      center:true,
                      message: "<span style='color:red;margin-right:10px;'><i class='el-icon-user-solid'></i> "+res.data+"</span>"
                    })
                  } else {
                    Cookies.set('token', res.data) // 放置token到Cookie
                    sessionStorage.setItem('uName', this.loginForm.account) // 保存用户到本地会话
                    //this.$store.commit('menuRouteLoaded', false) // 要求重新加载导航菜单
                    this.$router.push('/Gis/Gis')  // 登录成功，跳转到主页
                    this.$store.commit('onChiefEditor',10003)
                    this.$store.commit('onIsBigScreen',false)
                  }
                  this.loading = false
                }).catch((res) => {
                  this.$message({
                    dangerouslyUseHTMLString: true,
                    center:true,
                    message: "<span style='color:red;'>"+res.message+"</span>",
                    type: 'error'
                  })
                  this.loading = false
                });

              }).catch((res) => {
                this.$message({
                  dangerouslyUseHTMLString: true,
                  center:true,
                  message: "<span style='color:red;'>"+res.message+"</span>",
                  type: 'error'
                })

              
                this.loading = false
              });
              */        

            } else {
                return false;
            }

            
        });
    }, 
    reset() { //重置
      this.$refs.loginForm.resetFields()
    }
  },
  mounted() {},
  computed:{}
}
</script>

<style lang="scss" scoped>
.not-work {
  color:red;
}
#login {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color:rgba(120, 177, 230, 0.801);
    background-image: url('../assets/img/login-bg-2.jpg');
    background-size: 100% 100%;
    overflow: auto;
    
    /*登录主体*/
    .login-container {
        position: absolute;
        //position: relative;
        background-clip: padding-box;
        .title {
            margin-bottom: 20px;
            text-align: center;
            color: #010911;
            img {
                // width: 30px; 
                height: 20px;
                position: relative;
                top: 4px;
                border-radius: 10%;
            }
        }

        .pointer {
            height: 35px;
            position: relative;
            top: 2px;
        }

        .remember {
            margin: 0px 0px 15px 0px;
        }
    }

    @media screen and (min-width: 568px) {
        .login-container {
            width: 400px;
            top: 50%;
            right: 50%;
            margin-top: -153px;
            margin-right: -211px;
            //width: 350px;
            padding: 15px 35px 15px 35px;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            -moz-border-radius: 5px;
            background: rgba(255, 255, 255, 0.307);
            border: 1px solid #eaeaea38;
            box-shadow: 0 0 25px #cac6c69f;
            .title {
              font-size: 26px;
            }
        }
    }
    @media screen and (max-width: 568px) {
        .login-container {
            position: absolute;
            top: 100px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            padding: 100px 35px;
            .title {
                color: rgb(255, 254, 254);
            }
        }
    }

  
}
</style>