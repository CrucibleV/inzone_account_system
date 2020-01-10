<template>
  <div>
    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <div class="handle-box-loc handle-date-select">
          <span>推送日期选择：</span>
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
      <el-table-column prop="date" label="日期范围" width="180px" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="shop" label="门店简称" width="100px"  align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="ld" label="楼栋" width="80px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="lc" label="楼层" width="80px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="gysbm" label="供应商编码" width="110px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="gysmc" label="供应商名称" width="110px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="wechat" label="微信管理员" width="100px" align="center"></el-table-column>
      <el-table-column prop="shPerson" label="审核人" width="100px" align="center"></el-table-column>
      <el-table-column prop="shTime" label="审核时间" width="120px" align="center"></el-table-column>
      <el-table-column prop="tsPerson" label="推送人" width="100px" align="center"></el-table-column>
      <el-table-column prop="tsTime" label="推送时间" width="120px" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" width="100px" align="center"></el-table-column>
      <el-table-column label="操作" width="230px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="checkInfo(scope.$index, scope.row)">对账文件</el-button>
          <el-button size="mini" type="success" plain @click="checkInfo(scope.$index, scope.row)">再次发送</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        props: ['item'],  // 父页面中对应的第几条推送历史
        data() {
            return {
                tableData: [
                  {
                    id: 1,
                    date: '2019.12.30 - 2020.01.05',
                    shop: '北园店',
                    ld: 'A座',
                    lc: '3层',
                    gysbm: 'ASFDH782',
                    gysmc: '大自然地板',
                    wechat: '李丽',
                    shPerson: '王三利',
                    shTime: '2020年1月13日 13:40',
                    tsPerson: '赵真真',
                    tsTime: '2020年1月12日 09:40',
                    status: '发送成功'
                  },{
                    id: 2,
                    date: '2020.01.06 - 2020.01.12',
                    shop: '北园店',
                    ld: 'A座',
                    lc: '3层',
                    gysbm: 'ASFDH782',
                    gysmc: '大自然地板',
                    wechat: '李丽',
                    shPerson: '王三利',
                    shTime: '2020年1月13日 13:40',
                    tsPerson: '赵真真',
                    tsTime: '2020年1月12日 09:40',
                    status: '发送成功'
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
