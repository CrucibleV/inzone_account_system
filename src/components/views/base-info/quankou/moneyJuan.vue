<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">劵扣列表</span>
    </div>


    <div class="handle-box top-select-box clear">
      <div class="top">
        <el-input class="searchText"  placeholder="请输入劵扣名称"></el-input>
        <el-button size="mini" class="primaty-top" type="primary" icon="el-icon-search" @click="searchKey"><span style="font-size: 12px">查询</span></el-button>
      </div>
      <div class="bottom">
        <el-button size="mini" type="success" icon="el-icon-plus" class="bottom-top" suffix-icon="add" @click="handleAdd"><span style="font-size: 12px">新增劵扣</span></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" class="bottom-top" @click="deleteFileOrDirectory(sels)"><span style="font-size: 12px">删除</span></el-button>
        <el-button size="mini" type="warning" class="bottom-top"><i class="el-icon-download"></i>导入</el-button>
        <el-button size="mini" type="success" class="bottom-top"><i class="el-icon-upload2"></i>导出</el-button>
        <el-button size="mini" type="warning" icon="el-icon-refresh" class="bottom-top"><span style="font-size: 12px" @click="refresh">刷新</span></el-button>
      </div>
    </div>



    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}">
      <el-table-column type="selection" width="55px" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" width="80px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="number" label="编号" width="80px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="name" label="劵扣名称" width="280px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="style" label="劵扣方式" width="280px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="date" label="应用日期" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="creater" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="ctime" label="创建日期" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态"  align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <font v-if="scope.row.status==='生效'" color="green">生效</font>
          <font v-else-if="scope.row.status==='作废'" color="red">作废</font>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <font v-if="scope.row.status==='生效'">
            <el-button size="mini" type="success" @click="checkInfo(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="info"  @click="del(scope.$index, scope.row)">作废</el-button>
          </font>
          <font v-else>
            <el-button size="mini" type="primary"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </font>

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
        name: "moneyJuan",
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
            axios.get('/api/juan').then(res=>{
                if (res.data.code==0){
                    this.tableData=res.data.juan1;
                }
            })
        },
        // mounted:function(){
        //      axios.get('/api/juan').then(res=>{
        //          console.log(11111111111)
        //          if (res.data.code==0){
        //
        //              this.tableData=res.data.juan;
        //          }else{
        //              alert('请求失败');
        //          }
        //      })
        // },
        methods:{
            // format(row){
            //   if (row.status=='待审核'){
            //
            //   }
            // },
            searchKey(){},
            del(){},
            handleAdd(){
                this.$router.push({
                    path:'juanInfo',

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
    width: 8%;
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
