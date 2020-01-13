<template>
  <div class="table">
    <div class="left-table-label">
        <i class="el-icon-menu"></i>
        <span class="label-text">供应商交易扣款汇总</span>
    </div>
    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <div class="handle-box-loc handle-date-select">
          <span>日期范围：</span>
          <el-date-picker v-model="searchDateTime" type="daterange" align="right" unlink-panels range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <span class="select-label">查询条件:</span>
        <el-input class="searchText"  v-model="search"  placeholder="请输入供应商/楼层"></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>
        <el-button class="searchBtn" size="medium" type="success" icon="el-icon-upload2" @click="exportDataToExcel">
          <span style="font-size: 12px">导出EXCEL</span>
        </el-button>
        <el-button class="searchBtn" size="medium" type="warning" icon="el-icon-upload2" @click="getData">
          <span style="font-size: 12px">批量提交审核</span>
        </el-button>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%;" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column  label="商场" align="center" width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
         [{{scope.row.MALLID}}]{{scope.row.MFCNAME}}
        </template>
      </el-table-column>
      <el-table-column label="供应商" width="210px"  align="center"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
         [{{scope.row.SUPID}}]{{scope.row.SBCNAME}}
        </template>
      </el-table-column>
      <el-table-column prop="MINSUM" label="销售收入(元)" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="SXFHJ" label="支付手续费(元)" width="100px" align="center"></el-table-column>
      <el-table-column prop="lpftze" label="赠品分摊总额(元)" width="110px" align="center"></el-table-column>
      <el-table-column prop="yhqftze" label="优惠券分摊总额(元)" width="120px" align="center"></el-table-column>
      <el-table-column prop="lcye" label="浪潮余额(元)" width="90px" align="center"></el-table-column>
      <el-table-column prop="fxyj" label="风险押金(元)" width="90px" align="center"></el-table-column>
      <el-table-column prop="hdgdfy" label="活动固定费用(元)" width="120px" align="center"></el-table-column>
      <el-table-column prop="kggf" label="扣广告费(元)" width="90px" align="center"></el-table-column>
      <el-table-column prop="kzj" label="扣租金(元)" width="90px" align="center"></el-table-column>
      <el-table-column prop="qtkk" label="其他扣款(元)" width="90px" align="center"></el-table-column>
      <el-table-column prop="kksm" label="扣款说明" width="130px" align="center"></el-table-column>
      <el-table-column prop="HJ" label="实际返款(元)" width="90px" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" width="100px" align="center"></el-table-column>
      <el-table-column label="操作" width="180px" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="success" plain @click="toSeeDetail(scope.$index, scope.row)">明细</el-button>
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
        name: "billSupplierSummary",
        data() {
            return {
                pickerOptions:{  //时间选择快捷选项
                  shortcuts:[{
                    text: '上一周',
                    onClick(picker){
                      let nowTime = new Date().getTime()//时间戳
                      let nowDay = new Date().getDay()//获取星期几（0、1、2、3、4、5、6）
                      let oneDayTime = 24*60*60*1000
                      let startT = null
                      let endT = null
                      if(nowDay>0){
                        startT = nowTime-oneDayTime*(nowDay+7-1-0)//上周周一
                        endT = nowTime-oneDayTime*(nowDay+7-1-6)//上周周日
                      }else{//如果是周日
                        startT = nowTime-oneDayTime*(nowDay+7+7-1-0)//上周周一
                        endT = nowTime-oneDayTime*(nowDay+7+7-1-6)//上周周日
                      }
                      picker.$emit('pick', [startT,endT])
                    }
                  }]
                },
                searchDateTime:'',//时间选择
                tableData: [
                ],
                totalCount: 0,
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
                    bzsr:'',
                    zfsxf:'',
                    lpftze: '',
                    yhqftze:'',
                    lcye:'',
                    hdgdfy:'',
                    kggf:'',
                    kzj:'',
                    qtkk:'',
                    kksm:'',
                    sjfk:'',
                    status:''
                }
            }
        },
        mounted(){
            let nowTime = new Date().getTime()//时间戳
            let nowDay = new Date().getDay()//获取星期几（0、1、2、3、4、5、6）
            let oneDayTime = 24*60*60*1000
            let startT = null
            let endT = null
            if(nowDay>0){
              startT = nowTime-oneDayTime*(nowDay+7-1-0)//上周周一
              endT = nowTime-oneDayTime*(nowDay+7-1-6)//上周周日
            }else{//如果是周日
              startT = nowTime-oneDayTime*(nowDay+7+7-1-0)//上周周一
              endT = nowTime-oneDayTime*(nowDay+7+7-1-6)//上周周日
            }
            this.searchDateTime = [startT,endT]
            this.getData();
        },
        created() {
           
        },
        filters:{
          filterTableData(value){
            console.log(value.name)
          }
        },
        methods: {
            getData() {
                axios({
                    url: this.$store.state.TestIP + "/refundMallSup/getRefunds",
                    method: "get",
                    params: {
                        // token: localStorage.getItem("Authorization"),
                        pageIndex: this.currentPage,
                        pageSize: this.pagesize,
                        keyword: this.search,
                        startDate:'2019-12-09',//this.dateFilter(this.searchDateTime[0]),
                        endDate:'2019-12-15'//this.dateFilter(this.searchDateTime[1])
                    }
                }).then(res => {
                    this.tableData = res.data.data;
                    this.totalCount = res.data.respPage.totalCount;
                }).catch(error=>{
                    console.log(error)
                });
            },

            /**
             * 详情与修改
            */
            handleEdit(index,row){
                this.ind=index;
                this.msg=row;
                this.form={
                    lc: this.msg.lc,
                    gysbm: this.msg.gysbm,
                    gysmc: this.msg.gysmc,
                    pp: this.msg.pp,
                    bzsr: this.msg.bzsr,
                    zfsxf: this.msg.zfsxf,
                    lpftze: this.msg.lpftze,
                    yhqftze: this.msg.yhqftze,
                    lcye: this.msg.lcye,
                    hdgdfy: this.msg.hdgdfy,
                    kggf: this.msg.kggf,
                    kzj: this.msg.kzj,
                    qtkk: this.msg.qtkk,
                    kksm: this.msg.kksm,
                    sjfk:this.msg.sjfk,
                    status: this.msg.status
                };
                this.editVisible=true;
            },
            // 导出数据为excel
            exportDataToExcel(){

            },
            /**
             * 查看本周汇总的明细
            */
            toSeeDetail(index,row) {
              alert('正在开发... 将会查看本周汇总的明细!');
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
            },
            //日期处理
            dateFilter(input){
                var d=new Date(input);
                var year=d.getFullYear();
                var month=d.getMonth()+1<10?'0'+(d.getMonth()+1):(d.getMonth()+1);
                var day=d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
                return  year+ '-' + month + '-' + day;
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
