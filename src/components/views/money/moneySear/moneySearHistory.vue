<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">返款审核历史</span>
    </div>


<!--    <div class="handle-box top-select-box clear">-->
<!--      <div class="top">-->
<!--        &lt;!&ndash;        <span style="font-size: 18px;float: left;margin-left: 100px;">活动时间:</span>&ndash;&gt;-->
<!--        &lt;!&ndash;        <el-date-picker type="date" v-model="date1" placeholder="起始时间" style="width: 20%;float: left"></el-date-picker>&ndash;&gt;-->
<!--        &lt;!&ndash;        <el-col class="line" :span="1" style="wiidth:10px;height: 30px;line-height: 30px;text-align: center">-</el-col>&ndash;&gt;-->
<!--        &lt;!&ndash;        <el-date-picker type="date" v-model="date2" placeholder="终止时间" style="width: 20%;float: left"></el-date-picker>&ndash;&gt;-->
<!--        <el-input class="searchText"  placeholder="请输入返款编号"></el-input>-->
<!--        <el-button size="mini" class="primaty-top" type="primary" icon="el-icon-search" @click="searchKey"><span style="font-size: 12px">查询</span></el-button>-->
<!--      </div>-->
<!--      <div class="bottom">-->
<!--        <el-button size="mini" type="success" icon="el-icon-plus" class="bottom-top" suffix-icon="add" @click="handleAdd"><span style="font-size: 12px">新增返款</span></el-button>-->
<!--        <el-button size="mini" type="danger" icon="el-icon-delete" class="bottom-top" @click="deleteFileOrDirectory(sels)"><span style="font-size: 12px">删除</span></el-button>-->
<!--        <el-button size="mini" type="warning" class="bottom-top"><i class="el-icon-download"></i>导入</el-button>-->
<!--        <el-button size="mini" type="success" class="bottom-top"><i class="el-icon-upload2"></i>导出</el-button>-->
<!--        <el-button size="mini" type="warning" icon="el-icon-refresh" class="bottom-top"><span style="font-size: 12px" @click="refresh">刷新</span></el-button>-->
<!--      </div>-->
<!--    </div>-->



    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}">
      <el-table-column type="selection" width="55px" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" width="80px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="mnumber" label="编号" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="morder" label="返款单名称" width="280px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="mcreater" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="ctime" label="创建日期" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="uptime" label="修改日期" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态"  align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <font v-if="scope.row.status==='审核通过'" color="green">审核通过</font>
          <font v-else-if="scope.row.status==='作废'" color="red">作废</font>
          <font v-else color="#808080">待审核</font>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <!--              type="text"代表文字按钮-->
          <el-button size="mini" type="success" @click="checkInfo(scope.$index, scope.row)">查看</el-button>
<!--          <el-button size="mini" type="primary"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
<!--          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>




    <div class="pagination">
      <!--     el-pagination新增分页   -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "moneySearHistory",
        data(){
            return{
                sels:'',
                date1:'',
                date2:'',
                currentPage:1,
                pagesize:10,
                tableData:[],
            }
        },
        mounted:function(){
            axios.get('/api/money1').then(res=>{
                if (res.data.code==0){
                    this.tableData=res.data.money1;
                    console.log(this.tableData)
                }else{
                    alert('请求失败')
                }
            })
        },
        methods:{
            // format(row){
            //   if (row.status=='待审核'){
            //
            //   }
            // },
            searchKey(){},
            handleAdd(){
                this.$router.push({
                    path:'moneyInfo',
                    // query:{shopID: 1}
                })
            },
            deleteFileOrDirectory(sels){},
            refresh(){},
            selsChange(sels){
                this.sels=sels;
            },
            checkInfo(){},
            handleEdit(){},
            handleDelete(){},
            handleSizeChange(val){
                this.pagesize=val
            },
            handleCurrentChange(){
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
    width: 9%;
    height: 30px;
  }
  .handle-box.top-select-box {
    margin-bottom: 3px;
    height: 30px;
    width: 100%;
    background: whitesmoke;
  }
  .select-input-wrapper {
    margin-bottom: 20px;
    text-align: left;
  }
  .select-input {
    width: 280px !important;
    height: 32px;
    margin: 0 46px 0 16px;
  }
  .top-button {
    margin-top: 30px;
    text-align: left;
  }
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
  .searchText{
    width: 150px;
    height: 30px;
    margin-left: 80px;
  }
  .top{
    float:left;
    height:30px;
    width: 50%;
    text-align: right;
    /*width: 350px;*/
  }
  .bottom{
    float:left;
    margin-left:20px;
    height: 30px;
    /*width: 350px;*/
    width: 40%;
  }
  .clear{
    clear:both;
  }
  .bottom-top{
    float: left;
  }
</style>
