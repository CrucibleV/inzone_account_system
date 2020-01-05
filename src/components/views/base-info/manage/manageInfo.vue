<template>
  <div class="top">
    <div class="container">
      <div class="left-top">
        <iframe src="static/index.html" frameborder="0" style="width: 100%;height:calc(100vh + 10px)"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
 import axios from 'axios'
    export default {
        name: "floorInfo",
        methods:{
            handleAdd(){

            },
            reback(){

            },
        }
    }
</script>

<style scoped>
  .top{
    width:100%;
    height: 700px;
    font-size: 14px;
    background-color: white;
  }
  .container{
    width: 100%;
    height: 630px;
  }
  .left-top{
    width: 100%;
    height: 630px;
    float: left;
  }

</style>
