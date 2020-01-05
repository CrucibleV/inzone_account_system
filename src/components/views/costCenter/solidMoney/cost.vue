<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">定额费用信息列表</span>
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

<style scoped>
  .table{
    width: 100%;
    font-size: 14px;
    background: #EFEFEF;
    height: 570px;
  }
  .table-label{
    width: 9%;
    height: 30px;
  }
</style>
