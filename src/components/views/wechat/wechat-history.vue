<template>
  <div class="table">
    <div class="left-table-label">
        <i class="el-icon-menu"></i>
        <span class="label-text">微信推送历史记录</span>
    </div>

    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <div class="handle-box-select">
          <el-input class="searchText" v-if="supplier.name!=''" v-model="search"  placeholder="请输入推送微信"></el-input>
          <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
            <span style="font-size: 12px">查询</span>
            </el-button>
        </div>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%;" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column prop="ROW_ID" label="ID" width="70px" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="SBID" label="代码" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="SBCNAME" label="销售商名称" width="200px"  align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="SBWMID1" label="经销" width="80px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="SBWMID2" label="成本代销" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="SBWMID3" label="扣率代销" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="SBSTATUS" label="状态" width="90px" align="center"></el-table-column>
      <el-table-column prop="SBWMID4" label="联营" width="80px" align="center"></el-table-column>
      <el-table-column prop="SBWMID5" label="租赁" width="80px" align="center"></el-table-column>
      <el-table-column prop="SBREGCODE" label="地区代码" width="100px" align="center"></el-table-column>
      <el-table-column prop="SBLRRQ" label="录入日期" width="160px" align="center"></el-table-column>
      <el-table-column prop="SBCATCODE" label="分类" width="90px" align="center"></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>

    <!-- 查看弹框 -->
    <el-dialog title="供应商信息详情" :visible.sync="selVisible" width="600px" >
      <el-form ref="form" :model="form" label-width="85px" >
        <el-form-item label="供应商ID" >
          <el-input v-model="form.SBID" style="width: 420px;margin-left: 20px;" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" >
          <el-input v-model="form.SBCNAME" style="width: 420px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商分类" >
          <el-input v-model="form.SBCATCODE" style="width: 420px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="录入时间">
          <el-input v-model="form.SBLRRQ" style="width: 420px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="地区代码">
          <el-input v-model="form.SBREGCODE" style="width: 420px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.SBSTATUS" style="width: 420px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="selVisible = false">取 消</el-button>
        </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="deleteVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "wechat-history",
        data() {
            return {
                tableData: [],
                totalCount: 0,
                sels:'',
                currentPage: 1,
                pagesize: 10,
                addVisible:false,
                deleteVisible:false,
                editVisible:false,
                selVisible:false,
                supplier:[],
                ind: 1,
                msg: '',
                search:'',  //搜索关键字相关信息
                form: {
                    SBID: '',
                    SBCNAME: '',
                    SBCATCODE: '',
                    SBLRRQ: '',
                    SBREGCODE: '',
                    SBSTATUS: ''
                }
            }
        },

        created() {
          this.getData();
        },

        methods: {
            getData() {
                axios({
                    url: this.$store.state.UrlIP_ERP + "",
                    method: "post",
                    params: {
                        // token: localStorage.getItem("Authorization"),
                        pageIndex: this.currentPage,
                        pageSize: this.pagesize,
                        keyword: this.search
                    },
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    this.tableData = res.data.data;
                    this.totalCount = res.data.respPage.totalCount;
                }).catch(error=>{
                    console.log(error)
                });
            },

            handleAdd() {
                this.form={
                    id:'',
                    name:'',
                    ctime:'',
                    uptime:'',
                    status:''
                }
                this.addVisible=true;
            },

            /**
             * 查看详情
            */
            checkInfo(index, row) {
                this.ind = index;
                this.msg = row;
                console.log(row);
                this.form = {
                    SBID: this.msg.SBID,
                    SBCNAME: this.msg.SBCNAME,
                    SBCATCODE: this.msg.SBCATCODE,
                    SBREGCODE: this.msg.SBREGCODE,
                    SBLRRQ: this.msg.SBLRRQ,
                    SBSTATUS: this.msg.SBSTATUS,
                }
                this.selVisible = true;
            },

            handleDelete(index,row){
                this.ind=index;
                this.msg=row;
                this.deleteVisible=true;
            },
            deleteRow() {
                this.deleteVisible=false;
            },

            /**
             * 处理分页
            */
            handleSizeChange(val) {
                this.pagesize = val;
                this.getData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            }
        }
    }
</script>

<style scoped>

  /* = 顶部选项栏 = */
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
    height: 60px;
    width: 100%;
    background: #fafafa;
  }
  .right-handle-box .handle-box-select{
      position: absolute;
      left: 20px;
      top: 10px;
      height:30px;
      text-align: right;
  }
  .right-handle-box .handle-box-btns{
      position: absolute;
      right: 20px;
      top: 12px;
      margin-left:20px;
      height: 30px;
  }
  .handle-box-select .searchText{
    width: 260px;
    height: 30px;
  }

  .bottom-top{
    float: left;
    margin-left: 20px;
  }
</style>
