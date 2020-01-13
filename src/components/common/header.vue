<template>
    <div class="header">
      <div class="right">
        <div class="header-1" style="width: 100%;height: 60px;">
          <div class="right22">
            <el-dropdown>
            <span class="el-dropdown-link">
              <i class="icon-d-wo1"></i>
              {{this.$store.state.UserName}}
              <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><i class="el-icon-setting"> 设置</i></el-dropdown-item>
                <el-dropdown-item><i class="el-icon-back" @click="loginOut"> 退出</i> </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

      </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import bus from '../common/bus';
    export default {
        data() {
            return {
                timer:"",
                currentTime:new Date(),
                hoursTip:'',
                collapse: false,
                fullscreen: false,
            }
        },
        created(){
            var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
            this.timer = setInterval(function() {
                let yy = new Date().getFullYear();
                let mm = new Date().getMonth()+1<10 ? '0'+new Date().getMonth()+1 : new Date().getMonth()+1;
                let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
                let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
                let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
                let ss=(new Date().getSeconds()).toString().padStart(2,'0');   //先把秒转换成字符串，然后进行padStart，第一个参数是展示的最大长度，第二个参数是以什么对象进行填充和

                _this.currentTime =yy+'-'+mm+'-'+dd+'   '+hh+':'+mf+':'+ss; //修改数据date
            }, 1000);
            if (new Date().getHours()>=0&&new Date().getHours()<12){
                this.hoursTip='AM'
            }else {
                this.hoursTip='PM'
            }

        },
        beforeDestroy(){
            if (this.timer) {
                clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
            }
        },
        methods:{
            loginOut(){
              //弹出一个框
                var is_loginout = confirm("您确定要退出吗？")
                if(is_loginout){
                     this.$router.replace('/login');   // 跳转到指定的URL
                    axios({
                        method: 'get',
                        url: this.$store.state.UrlIP + '/logout',
                        params:{
                            token: localStorage.getItem("Authorization"),
                        },
                        headers:{
                            'Content-type':'application/x-www-form-urlencoded'
                        },
                        data:[],                      
                    }).then(res => {
                        localStorage.removeItem("Authorization");//退出成功之后，就从store中移除Authorization
                        localStorage.removeItem('PermissionList');//退出成功之后，就从store中移除该角色所拥有的权限
                        this.$router.replace('/login');//跳转到login页面
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }
        },
    }
</script>
<style scoped>
    .span-1{
      width: 50%;
      float: left;
      color: white;
      font-size: 16px;
      text-align: right;
    }
    .header {
          width: 100%;
          height: 60px;
    }
    .header-user-con{
          display: flex;
          height: 60px;
          align-items: center;
    }
      .user-name{
          margin-left: 10px;
      }
      .el-dropdown-link {
          color: #fff;
          font-size: 16px;
      }
    .right{
      float: left;
      width: 100%;
      height: 60px;
      background: #012f6d;
    }
    .right22{
      float: right;
      width: 15%;
      height: 60px;
      line-height: 60px;
      text-align: right;
      margin-right: 20px;
    }
    .class-text{
      float: left;
      height: 60px;
      line-height: 60px;
      width: 65%;
      font-weight: bold;
      margin-top: 20px;
    }

    .right-left-2{
      width: 20%;
      height: 60px;
      float: left;
    }

  .right11{
    margin-top: 5px;
    height: 25px;
    line-height:25px;
    color: white;
    text-align: left;
    font-size: 24px;
    margin-left: 50px;
    font-family: "楷体";
  }
    .right2-2{
      margin-bottom: 5px;
      height: 25px;
      line-height: 25px;
      color: white;
      text-align: right;
      font-size: 24px;
      margin-right: 20px;
      font-family: "楷体";
    }
  .header-1{
    background: url(../../assets/images/banner-account.png) no-repeat ;
  }
</style>
