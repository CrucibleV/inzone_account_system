<template>
    <div class="login-wrap">
        <div class="ms-login">
<!--            <div class="ms-title">后台管理系统</div>-->
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="ms-content">

                <el-form-item prop="loginName">
                    <el-input v-model="loginForm.loginName" placeholder="用户名" style="margin-top: 30px;margin-bottom: 8px;">
                        <el-button slot="prepend" icon="icon-d-wo1"></el-button>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input type="password"  v-model="loginForm.password" placeholder="密码" style="margin-top: 30px;margin-bottom: 8px;">
                        <el-button slot="prepend" icon="icon-d-yuechi1"></el-button>
                    </el-input>
                </el-form-item>

<!--              验证码-->
                <el-form-item prop="vCode">
                   <el-input v-model="loginForm.vCode" placeholder="验证码" style="margin-top: 30px;margin-bottom: 8px;">
                        <el-button slot="prepend" icon="el-icon-menu"></el-button>
                    </el-input>
                    <img :src="this.vcode" title="点击刷新" alt="点击刷新" class="vcode" @click="updateCode" />

                    <el-checkbox v-model="loginForm.checked" class="checked_password">记住密码</el-checkbox>
		            <a style="float: right; color: dodgerblue;" href="#">忘记密码</a>
                </el-form-item>

                <div class="login-btn">
                    <el-button type="primary" @click="login">登录</el-button>
                </div>

            </el-form>
        </div>


      <div class="bottom-b">
        <span style="color: white;font-size: 18px">版本号：0.1</span>
      </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapMutations } from 'vuex';
    export default {
        data: function(){
            return {
                loginForm: {
                    loginName: '',
                    password: '',
                     vCode:'',
                    checked:false,
                },
                userToken:'',
                 vcode:'',
                flag: 1,
                src:'',  //验证码
                rules: {
                    loginName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                     vCode: [
                         { required: true, message: '请输入验证码', triger: 'blur'}
                     ]
                }
            }
        },
        created(){
            this.getData();
        },
        methods: {
            ...mapMutations(['changeLogin']),//函数的绑定,引入验证接口
            login(){
                 if(this.loginForm.loginName === '' || this.loginForm.password === ''){
                     alert('账号或密码不能为空');
                 }else{
                    // this.$router.replace('/home');
                    this.$router.push('/home');
                    // axios({
                    //     method: 'post',
                    //     url: 'http://211.87.227.223:8082/admin/login',
                    //     params:{
                    //         loginName: this.loginForm.loginName,
                    //         password: this.loginForm.password,
                    //         code: this.loginForm.vCode,
                    //     },
                    //     headers:{//即将被发送的自定义请求头
                    //         'Content-type':'application/x-www-form-urlencoded'
                    //     }
                    // }).then(res=>{
                    //     if(res.data.code != 0){
                    //         if(res.data.code === 200){
                    //             alert('用户名不存在或停用，请检查！');
                    //         }
                    //         else if(res.data.code === 201){
                    //             alert('密码错误，请重新输入！');
                    //         }
                    //         else if(res.data.code === 203){
                    //             alert('验证码错误');
                    //         }
                    //         else if(res.data.code === 204){
                    //             alert('验证码已过期，请重新刷新！');
                    //         }
                    //     }

                        // this.userToken = res.data.data.token;
                        //将用户token保存到vuex中
                        // this.changeLogin({Authorization: this.userToken });

                        // //将token设置到axios的默认headers中，以此达到后续axios请求都带token(由于跟后台沟通将token以参数而非headers形式传递)
                        // axios.defaults.headers.common['Authorization'] = res.data.data.token;

                        // if(this.userToken){
                        //     this.$router.push('/home');
                        //     if(res.data.code === 202){
                        //         alert('该管理员已经登录，无需再次登录。');
                        //     }
                        // }
                        // else{
                        //     this.$router.replace('/login');
                        // }

                        //this.loginWebSocket();
                    // }).catch(error=>{
                    //     console.log(error)
                    // })
                 }
            },
            getData(){
                // axios({
                //     url:"http://211.87.227.223:8082/admin/getValidateCode",
                //     // url: 'http://192.168.1.103:8082/admin/getValidateCode',
                //     method:"get",
                //     params:{},
                //     headers:{
                //         'Content-type':'application/x-www-form-urlencoded'
                //     },
                //     data:[]
                // }).then(res=>{
                //     this.vcode = "http://211.87.227.223:8082/admin/getValidateCode";
                //     // this.vcode = "http://192.168.1.103:8082/admin/getValidateCode";
                // }).catch(error=>{
                //     console.log(error)
                // });
            },
            updateCode(){
                 axios({
                     url:"http://211.87.227.223:8082/admin/getValidateCode?" + this.flag,
                     method:"get",
                     params:{},
                     headers:{
                         'Content-type':'application/x-www-form-urlencoded'
                     },
                     data:[]
                 }).then(res=>{
                     this.vcode = "http://211.87.227.223:8082/admin/getValidateCode?" + this.flag;
                     this.flag++;
                 }).catch(error=>{
                     console.log(error)
                 });
            },
        }
    }
</script>

<style scoped>
    html,body{height: 100%;width: 100%; margin:0;padding:0;}
    .login-wrap{
        background-image: url(../../../assets/images/4.jpg);
        position: relative;
        height:100%;
        background-size: 100%;
    }
    .checked_password {
        margin-left:0px;
        /*background: red;*/
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #aaa;
        border-bottom: 1px solid rgb(156, 154, 154);
    }
    .ms-login{
        position: absolute;
        height: 400px;
        left:47%;
        top:50%;
        width:450px;
        margin:-80px 0 0 0;
        border-radius: 5px;
        /*background: rgba(255,255,255, 0.8);*/
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;

    }
    .login-btn{
        text-align: center;
      margin-top: 20px;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#aaa;
    }
    .vcode{
        height:30px;
        line-height: 30px;
        width:100px;
        position:relative;
        margin-top:-35px;
        margin-right:4px;
        float: right;
        z-index:999;
    }
  .bottom-b{
    color: black;
    padding-top: 980px;
    text-align: left;
    margin-left: 50px;
  }
  .body-b{

  }
</style>
