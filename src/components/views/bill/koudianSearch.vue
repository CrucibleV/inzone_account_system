<template>
  <div class="table">
    <div class="left-table-label">
        <i class="el-icon-menu"></i>
        <span class="label-text">赠品扣点信息</span>
    </div>
    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <div class="handle-box-loc handle-date-select">
          <span>交易时间日期范围：</span>
          <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <span class="select-label">查询条件:</span>
        <el-input class="searchText"  v-model="search"  placeholder="请输入查询条件"></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>
        <el-button class="searchBtn" size="medium" type="success" icon="el-icon-upload2" @click="getData">
          <span style="font-size: 12px">导出EXCEL</span>
        </el-button>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%;" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" :span-method="objectSpanMethod">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="index" label="序号" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="lc" label="楼层" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="vip" label="会员卡" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="gysbm" label="供应商编码" width="100px"  align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="gysmc" label="供应商名称" width="110px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="pp" label="品牌" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="quoCode" label="正价商品编码" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="jinEAmount" label="参与领增金额" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="ConutjinE" label="总金额" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="level" label="参与领增金额档位" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="lianDan" label="参与联单金额" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="giveName" label="赠品名称" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="givePrice" label="赠品价格" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="proportion" label="分摊比例" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="feeCount" label="领增费用合计" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="deduAmount" label="应扣金额" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
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
        name: "billSummary",
        data() {
            return {
                tableData: [
                  {
                    index: 1,
                    lc: '',
                    vip:'10021',
                    gysbm: '001',
                    gysmc: '欧派橱柜',
                    pp: '欧派',
                    quoCode:'',
                    jinEAmount:'30000',
                    CountjinE:'314755',
                    level:'',                    
                    lianDan:'28596.67',
                    giveName:'',
                    givePrice:'',
                    proportion:'50%',
                    feeCount:'600.47',
                    deduAmount:'300.23'
                  },{
                    index: 2,
                    lc: '',
                    vip:'10021',
                    gysbm: '002',
                    gysmc: '欧派橱柜',
                    pp: '欧派',
                    quoCode:'',
                    jinEAmount:'17155',
                    CountjinE:'314755',
                    level:'',                    
                    lianDan:'16350.81',
                    giveName:'',
                    givePrice:'',
                    proportion:'50%',
                    feeCount:'343.37',
                    deduAmount:'171.68'
                  },{
                    index: 3,
                    lc: '',
                    vip:'10021',
                    gysbm: '003',
                    gysmc: '欧派橱柜',
                    pp: '欧派',
                    quoCode:'',
                    jinEAmount:'30000',
                    CountjinE:'',
                    level:'',                    
                    lianDan:'28593.67',
                    giveName:'',
                    givePrice:'',
                    proportion:'50%',
                    feeCount:'600.47',
                    deduAmount:'300.23'
                  },{
                    index: 4,
                    lc: '',
                    vip:'10021',
                    gysbm: '001',
                    gysmc: '欧派橱柜',
                    pp: '欧派',
                    quoCode:'',
                    jinEAmount:'94000',
                    CountjinE:'',
                    level:'',                    
                    lianDan:'89593.49',
                    giveName:'',
                    givePrice:'',
                    proportion:'50%',
                    feeCount:'1881.46',
                    deduAmount:'940.73'
                  },{
                    index: 5,
                    lc: '',
                    vip:'10021',
                    gysbm: '001',
                    gysmc: '欧派橱柜',
                    pp: '欧派',
                    quoCode:'',
                    jinEAmount:'58600',
                    CountjinE:'',
                    level:'',                    
                    lianDan:'55852.97',
                    giveName:'',
                    givePrice:'',
                    proportion:'50%',
                    feeCount:'1172.91',
                    deduAmount:'586.46'
                  },{
                    index: 6,
                    lc: '',
                    vip:'10021',
                    gysbm: '001',
                    gysmc: '欧派橱柜',
                    pp: '欧派',
                    quoCode:'',
                    jinEAmount:'45000',
                    CountjinE:'',
                    level:'',                    
                    lianDan:'42890.50',
                    giveName:'',
                    givePrice:'',
                    proportion:'50%',
                    feeCount:'900.70',
                    deduAmount:'450.35'
                  },{
                    index: 7,
                    lc: '',
                    vip:'10021',
                    gysbm: '001',
                    gysmc: '欧派橱柜',
                    pp: '欧派',
                    quoCode:'',
                    jinEAmount:'40000',
                    CountjinE:'',
                    level:'',                    
                    lianDan:'38124.89',
                    giveName:'',
                    givePrice:'',
                    proportion:'50%',
                    feeCount:'800.62',
                    deduAmount:'400.31'
                  },
                ],
                totalCount: 3,
                sels:'',
                currentPage: 1,
                pagesize: 10,
                editVisible: false,
                ind: 1,
                msg: '',
                search:'', 
                form: {
                    lc:'',
                    gysbm:'',
                    gysmc:'',
                    pp:'',
                   
                }
            }
        },

        created() {
          // this.getData();
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
            /**
             * 合并行
            */
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {//行 列  行号  列号
                if (columnIndex === 9||columnIndex === 10||columnIndex === 12||columnIndex === 13) {
                    if (rowIndex %7 === 0) {
                        return {
                            rowspan: 7,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
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
  }
  .bottom-top{
    float: left;
    margin-left: 20px;
  }
</style>
