<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
    provide:function(){   //父组件中通过provide来提供变量，在子组件中通过inject来注入变量
      return {
          reload:this.reload
        }
    },
    data(){
         return{
             isRouterAlive:true
         }
    },
    methods:{
      reload:function(){
          this.isRouterAlive=false;   //先关闭
          this.$nextTick(function () {
              this.isRouterAlive=true;//在打开
          })
      }
    }
}
</script>

<style>
@import "./assets/static/main.css";
@import "./assets/static/color-dark.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
