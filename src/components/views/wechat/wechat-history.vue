<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">推送历史信息列表</span>
    </div>

    <el-table :data="history.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%"  @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column prop="id" label="ID" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="time" label="推送时间" align="center"></el-table-column>
      <el-table-column prop="number" label="任务编码" align="center"></el-table-column>
      <el-table-column prop="name" label="任务名称" align="center"></el-table-column>
      <el-table-column prop="stop" label="推送结果" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="primary" size="mini" @click="checkInfo(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>


    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="history.length">
      </el-pagination>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "wechat-history",
        data(){
            return{
                history:[],
                currentPage:1,
                pagesize:10,
            }
        },
        mounted:function(){
            axios({
                url:'/api/history',
                method: 'post',
                params:[]
            }).then(res=>{
                if (res.data.code=='0'){
                    this.history=res.data.History;
                }else{
                    alert('请求失败')
                }
            })
        },
        methods:{
            checkInfo(){

            },
            handleSizeChange(val){
                this.pagesize=val;
            },
            handleCurrentChange(val){
                this.currentPage=val;
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
    width: 10%;
    height: 30px;
    background: #EFEFEF;
  }
</style>
