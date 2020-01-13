<template>
    <div class="login-wrap">
      <div class="pic-login">
        <div class="login-text">
          <!--以表单的形式展示出来-->
          <el-form v-model="loginForm"  ref="loginForm" label-width="0px" class="pic-content" >
            <el-form-item class="formItem">
              <el-input v-model="loginForm.loginName" placeholder="请输入用户名">
                <!--slot="prepend"在输入框的前面进行拼接  -->
                <el-button slot="prepend" icon="icon-d-wo1"></el-button>
              </el-input>
            </el-form-item>

            <el-form-item class="formItem">
              <el-input v-model="loginForm.loginPassword" type="password" placeholder="请输入密码">
                <el-button slot="prepend" icon="icon-d-yuechi1"></el-button>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-input v-model="loginForm.vCode" placeholder="请输入验证码" clearable>
                <el-button slot="prepend" icon="el-icon-more"></el-button>
              </el-input>
              <img :src="this.vcode" title="点击刷新" alt="点击刷新" class="code" @click="updateVode">

              <el-checkbox :model="loginForm.checked" class="checked_password">记住密码</el-checkbox>
              <a href="#" class="forgetPass">忘记密码</a>
            </el-form-item>

            <div >
              <el-button class="m-login" type="primary" @click="login">登录</el-button>
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
         loginForm:{   //表单验证规则数组
           loginName:"",  //用户名
           loginPassword:"", //密码
           vCode:"",  //验证码
           checked:false  //是否记住密码
         },
         vcode:"",
         flag:1,
         src:"",
         userToken:"",//用户token
         permissionList:[],//用户所获得的权限列表

       }
     },
      created(){
       this.getData()//获取验证码方法
      },
      methods:{
        ...mapMutations(['changeLogin']),//将this.changeLogin()映射为`this.$store.commit('increment')`
        login(){
          
          if(this.loginForm.loginName===''||this.loginForm.loginPassword===''){
            alert("用户名或密码不能为空")
          }else{
            axios({
              url:this.$store.state.UrlIP+"/login",
              method:"get",
              params:{
                loginName: this.loginForm.loginName,
                password:this.loginForm.loginPassword,
                code:this.loginForm.vCode
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
              this.userToken=res.data.data.token;  //将后台返回的token记录在用户token列表中
              let authorization=res.data.data.authority;
            
              let arr=[];
              for(let key in authorization){
                for(var i=0;i<authorization[key].length;i++){
                  console.log(authorization[key][i].MenuName);
                  arr.push(authorization[key][i].AuthorName)
                }
              }
              this.permissionList=arr;
              this.changeLogin({
                UserName: this.loginForm.loginName,
                Authorization: this.userToken,
                PermissionList: this.PermissionList,
              });
              if(this.userToken) {
                this.$router.push('/home');
                

              } else {
                this.$router.replace('/login');
              }
            }).catch(error=>{
             
              console.log("ERROR:"+error)
            })
          }
        },


      /**
       * 验证码的信息，当一刷新页面的时候，就出现第一个验证码
       * 
       */

        getData(){
          axios({
            url:this.$store.state.UrlIP+"/getValidateCode",
            method:"get",
            params:{
              token:localStorage.getItem("Authorization"),
            },
            headers: {
              'Content-type':'application/x-www-form-urlencoded'
            },
          }).then(res=>{   //成功获取验证码后执行的方法
            this.vcode=this.$store.state.UrlIP + '/getValidateCode'
          }).catch(error=>{
            console.log(error);
          })
        },



        /**
         * 当验证码错误的时候，执行更新验证码
         * 向后台数据传递一个数值类型的flag，可以实时更新验证码
         */
        updateVode(){
          axios({
            url:this.$store.state.UrlIP+"/getValidateCode?"+this.flag,
            method:"get",
            params:{
              token:localStorage.getItem("Authorization"),
            },
            headers: {
              'Content-type':'application/x-www-form-urlencoded'
            },
          }).then(res=>{
            this.vcode = this.$store.state.UrlIP + '/getValidateCode?'+this.flag;//如果成功就显示当前的验证码
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
 .code{
   height: 30px;
    width: 80px;
    position: relative;
    margin-top: -34px;
    margin-right: 20px;
    float: right;
    z-index: 999;
   /*z-index属性设置元素的堆叠顺序，拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面
   该属性可以设置一个元素在另一个元素里面 */
 }
</style>
