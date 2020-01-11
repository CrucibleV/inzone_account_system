<template>
    <div class="login-wrap">
      <div class="pic-login">
        <div class="login-text">
          <!--以表单的形式展示出来-->
          <el-form :model="loginForm"  ref="loginForm" label-width="0px" class="pic-content" >
            <el-form-item class="formItem">
              <el-input :model="loginForm.loginName" placeholder="请输入用户名">
                <el-button slot="prepend" icon="icon-d-wo1"></el-button>
              </el-input>
            </el-form-item>

            <el-form-item class="formItem">
              <el-input :model="loginForm.loginPassword" placeholder="请输入密码">
                <el-button slot="prepend" icon="icon-d-yuechi1"></el-button>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-input :model="loginForm.vCode" placeholder="请输入验证码">
                <el-button slot="prepend" icon="el-icon-more"></el-button>
                <img :src="this.vcode" title="点击刷新" alt="点击刷新" @click="updateVode">
              </el-input>

              <el-checkbox :model="loginForm.checked">记住密码</el-checkbox>
              <a href="#" class="forgetPass">忘记密码</a>
            </el-form-item>

            <div >
              <el-button class="m-login" type="primary" @click="login">登陆</el-button>
            </div>
          </el-form>

        </div>
      </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapMutations } from 'vuex';
    export default {
     data:function () {
       return{
         loginForm:{
           loginName:"",
           loginPassword:"",
           vCode:"",
           checked:false
         },
         vcode:"",
         flag:1,
          src:"",
         userToken:"",//用户token
         permissionList:[],//用户所获得的权限列表

       }
     },
      mounted(){
       this.getData()
      },
      methods:{
        ...mapMutations(['changeLogin']),//将this.changeLogin()映射为`this.$store.commit('increment')`
        login(){
          if(this.loginForm.loginName===''||this.loginForm.loginPassword===''){
            alert("用户名或密码不能为空")
          }else{
            axios({
              url:this.$store.state.UrlIP+"",
              method:"post",
              params:{
                loginName: this.loginForm.loginName,
                loginPassword:this.loginForm.loginPassword,
                vCode:this.loginForm.vCode
              },
              headers:{
                'Content-type':'application/x-www-form-urlencoded'
              }
            }).then(res=>{
              if(res.data.code != 0){
                if(res.data.code === 200){
                  alert('用户名不存在或停用，请检查！');
                } else if(res.data.code === 201){
                  alert('密码错误，请重新输入！');
                } else if(res.data.code === 203){
                  alert('验证码错误');
                } else if(res.data.code === 204){
                  alert('验证码已过期，请重新刷新！');
                }
              }
              this.userToken=res.data.data.token;
              let authorization=res.data.data.authorization;
              let arr=[];
              for(let key in authorization){
                for(var i=0;i<authorization[key].length;i++){
                  arr.push(authorization[key][i].authorizationName)
                }
              }
              this.permissionList=arr;
              this.changeLogin({
                loginName: this.loginForm.loginName,
                loginPassword:this.loginForm.loginPassword,
                vCode:this.loginForm.vCode
              });
              if(this.userToken) {
                this.$router.push('/home');
              } else {
                this.$router.replace('/login');
              }
            }).catch(error=>{
              console.log(error)
            })
          }
        },
        getData(){
          axios({
            url:this.$store.state.UrlIP+"/admin/getValidateCode",
            method:"get",
            params:{
              token:localStorage.getItem("Authorization"),
            },
            headers: {
              'Content-type':'application/x-www-form-urlencoded'
            },
          }).then(res=>{
            this.vcode=this.$store.state.UrlIP + '/admin/getValidateCode'
          }).catch(error=>{
            console.log(error);
          })
        },
        updateVode(){
          axios({
            url:this.$store.state.UrlIP+"/admin/getValidateCode?"+this.flag,
            method:"get",
            params:{
              token:localStorage.getItem("Authorization"),
            },
            headers: {
              'Content-type':'application/x-www-form-urlencoded'
            },
          }).then(res=>{
            this.vcode = this.$store.state.UrlIP + '/admin/getValidateCode'+this.flag;//如果成功就显示当前的验证码
            this.flag++;//flag自增，用于下次刷新的时候显示
          }).catch(error=>{
            console.log(error)
          })
        }
      }
    }
</script>

<style scoped>
    html,body{
      height: 100%;
      width: 100%;
      margin:0;
      padding:0;
    }
  .login-wrap{
    background-image: url(../../../assets/images/loginbg.jpg);
    position: relative;
    width: 100%;
    height: 100%;
    background-size: 100%;
  }
  .pic-login{
    background-image: url(../../../assets/images/loginbox2.jpg);
    position: absolute;
    left: 30%;
    top: 25%;
    width: 680px;
    height: 470px;
    /*使用border-radius可以设置圆角形状*/
    border-radius: 5px;
    overflow: hidden;
  }
  .login-text{
    /*设置绝对位置*/
    position: absolute;
    width: 330px;
    height: 305px;
    left: 315px;
    top: 150px;
  }
   .formItem{
     margin-top: 5px;
     margin-bottom: 20px;
  }
  .forgetPass{
    margin-left: 170px;
  }
  .m-login{
    margin-top: 20px;
    width: 100%;
    height: 38px;
  }
</style>
