<template>
    <div class="table">
        <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
            <span style="font-size: 18px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">操作日志信息</span>
        </div>
    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <div class="handle-box-loc handle-date-select">
          <span>日期范围选择：</span>
          <el-date-picker v-model="value2" type="daterange" align="center"
                      unlink-panels range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期"
                      :picker-options="pickerOptions" @change="getDateTime">
          </el-date-picker>
        </div>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>
      </div>
    </div>



    <el-table :data="log.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
        <el-table-column prop="id" label="编号ID" width="100px"  align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="oper" label="操作人" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="opeTime" label="操作时间" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="opeType" label="操作类型" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="opeInner"" label="操作内容" type="password" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" align="center" width="220px">
            <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="checkInfo(scope.$index, scope.row)">查看</el-button>
            </template>
        </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>






    <el-dialog v-el-drag-dialog  title="查看信息" :visible.sync="checkVisible" width="25%">
      <el-form ref="form" :model="form" label-width="115px" >
        <el-form-item label="操作人">
          <el-input v-model="form.oper"  style="width: 300px;margin-left: 20px" disabled ></el-input>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-col :span="10">
            <el-date-picker type="date" v-model="form.opeTime" style="margin-left: 20px;width: 300px"   disabled></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="操作类型">
          <el-input v-model="form.opeType" style="width: 300px;margin-left: 20px"  disabled></el-input>
        </el-form-item>
        
        <el-form-item label="操作内容">
         <el-col :span="10">
            <el-date-picker type="date" v-model="form.opeInner" style="margin-left: 20px;width: 300px"   disabled></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="checkVisible = false">取 消</el-button>
        </span>
    </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value2:'',
            log:[
            {
                id:1,
                oper:"李勇",
                opeTime:"2019-01-01 12:01:01",
                opeType:'',
                opeInner:'查看门店信息'
            }
            ],
            currentPage:1,
            pagesize:10,
            checkVisible:false,
            form:{
                oper:'',
                opeTime:'',
                opeType:'',
                opeInner:'',
            }

        }
    },
    methods:{
        handleSizeChange(val) {
                this.pagesize = val;
                this.getData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },
            checkInfo(index,row){
              this.index=index;
              this.mes=row;
              this.form={
                   oper:this.mes.oper,
                opeTime:this.mes.opeTime,
                opeType:this.mes.opeType,
                opeInner:this.mes.opeInner,
              };
              this.checkVisible=true;
            },
    }
}
</script>
<style scoped>
      .table{
    width: 100%;
    font-size: 14px;
    background: #EFEFEF;
    height: 870px;
  }
  .table-label{
    width: 9%;
    height: 30px;
    background: #EFEFEF;
  }
     .top-tool-wrap {
      width: 100%;
      margin-bottom: 10px;
  }
  .left-table-label{
      font-size: 20px;
      height: 30px;
      line-height: 30px;
      text-align: left;
      font-weight: 700;
  }
  .left-table-label .label-text {
      font-size: 18px;
  }
  .right-handle-box {
    position: relative;
    height: 40px;
    width: 100%;
    background: #fafafa;
    text-align: left;
    display: flex;
    padding: 10px 20px;
    font-size: 14px;
  }
  .handle-content-select {
    margin-left: 20px;
    display: flex;
  }
  .select-label {
    margin: 10px 0 0 20px;
  }
  .searchText {
    width: 200px !important;
    margin: 0 10px;
  }
  .searchBtn {
    height: 40px;
    margin-left:10px;
  }
  .bottom-top{
    float: left;
    margin-left: 20px;
  }
</style>
