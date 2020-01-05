<template>
  <div class="table">
    <div class="container">
        待开发中...
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    data(){
      return {
        currentPage:1
      }
    },
    created(){
      this.getData();
    },
    methods:{
      getData(){
        // axios({
        //   url:"",
        //   method:"get",
        //   params:{
        //     token: localStorage.getItem("Authorization"),
        //   },
        //   headers:{
        //      'Content-type':'application/x-www-form-urlencoded'
        //   },
        //   data:[]
        // }).then(res=>{
        //   this.tableData = res.data.data;
        // });
      }

    }
  }
</script>

<style>
    
</style>