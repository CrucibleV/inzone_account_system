<template>
  <div class="table">
    <div class="left-table-label">
        <i class="el-icon-menu"></i>
        <span class="label-text">微信推送历史记录</span>
    </div>

    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <div class="handle-box-loc handle-date-select">
          <span >推送日期选择：</span>
          <el-date-picker v-model="value2" type="daterange" align="right"
                      unlink-panels range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期"
                      :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <span class="select-label">查询条件:</span>
        <el-input class="searchText" v-model="search"  placeholder="请输入推送微信"></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%;" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="tsTime" label="推送日期" width="200px" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="taskName" label="任务名称" width="230px"  align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="shTime" label="审核时间" width="200px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="person" label="推送人" width="110px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="result" label="推送情况" width="110px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="sm" label="说明" align="center"></el-table-column>
      <el-table-column label="操作" width="200px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" plain @click="checkInfo(scope.$index, scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>

    <!-- 查看详情弹框 -->
    <el-dialog title="推送详情" :visible.sync="selVisible" width="1300px" >
      <WechatInfo :item="2" ></WechatInfo>
    </el-dialog>

  </div>
</template>

<script>
    import axios from 'axios'
    import WechatInfo from './wechat-info.vue'
    export default {
        name: "wechat-history",
        components: {
          WechatInfo
        },
        data() {
            return {
                tableData: [
                  {
                    id: 1,
                    tsTime: '2020年01月08日 14:20',
                    taskName: '浪潮余额审核',
                    shTime: '2020年01月10日 16:32',
                    person: '赵真真',
                    result: '已推送',
                    sm: '无'
                  },{
                    id: 2,
                    tsTime: '2020年01月08日 14:21',
                    taskName: '礼品费审核',
                    shTime: '2020年01月10日 16:32',
                    person: '赵真真',
                    result: '已推送',
                    sm: '无'
                  }
                ],
                totalCount: 2,
                currentPage: 1,
                pagesize: 10,
                selVisible: false,
                ind: 1,
                msg: '',
                search: '',  
                form: {
                    id: '',
                    tsTime: '',
                    taskName: '',
                    shTime: '',
                    person: '',
                    result: '',
                    sm: ''
                }
            }
        },

        created() {
          this.getData();
        },

        methods: {
            getData() {
                axios({
                    url: this.$store.state.UrlIP_ERP + '',
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

            /**
             * 查看详情
            */
            checkInfo(index, row) {
                this.ind = index;
                this.msg = row;
                console.log(row);
                this.form = {
                    id: this.msg.id,
                    tsTime: this.msg.tsTime,
                    taskName: this.msg.taskName,
                    shTime: this.msg.shTime,
                    person: this.msg.person,
                    result: this.msg.result,
                    sm: this.msg.sm
                }
                this.selVisible = true;
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
    padding: 10px 0;
    font-size: 14px;
  }
  .handle-date-select {
    margin-left: 20px;
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
  }
  .bottom-top{
    float: left;
    margin-left: 20px;
  }
</style>
