<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;" class="comTitle">新增返款信息</span>
    </div>


    <div class="handle-box top-select-box clear">
      <div class="top">
        <span style="font-size: 18px;float: left;margin-left: 50px;">活动时间:</span>
        <el-date-picker type="date" v-model="startTime" placeholder="起始时间" style="width: 20%;float: left"></el-date-picker>
        <el-col class="line" :span="1" style="width:10px;height: 30px;line-height: 30px;text-align: center">-</el-col>
        <el-date-picker type="date" v-model="endTime" placeholder="终止时间" style="width: 20%;float: left"></el-date-picker>
        <el-input class="searchText"  placeholder="请输入查询条件" style="float:left" v-model="searchText"></el-input>
        <el-button size="mini" class="primaty-top" type="primary" icon="el-icon-search" @click="getTableData"><span style="font-size: 12px">查询</span></el-button>
      </div>
      <div class="bottom">
        <el-button size="mini" type="success" class="primaty-top" @click="handleData"><i class="el-icon-upload2"></i>提交审核</el-button>
      </div>
    </div>


    <el-table :data="tableData" class="handle-table" style="width: 100%;" stripe :row-style="{height:'45px'}" :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" @selection-change	="handleSelectDate" @select-all="handleSelectDate">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="销售日期" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="shopName" label="供应商" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="shop" label="门店" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="floor" label="楼栋" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="supplier" label="楼层" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="brand" label="品牌" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="size" label="商品编码" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="price" label="会员卡号" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="pricitant" label="合同金额" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="pricitant" label="支付手续费" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="pricitant" label="赠品分摊" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="pricitant" label="券扣费用" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="pricitant" label="状态" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
              <el-button size="mini" type="success" class="primaty-top" @click="getDetil(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>


    <div class="pagination">
      <!--     el-pagination新增分页   -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
      </el-pagination>
    </div>

    
<!--当giftVisible为true的时候，就弹出这个框-->
    <el-dialog v-el-drag-dialog title="礼品费用" :visible.sync="giftVisible" width="80%">
      <el-table :data="gift" style="width: 100%" >
        <el-table-column prop="id" label="ID" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="floor" label="楼层" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="card" label="会员卡" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="supplier" label="供应商" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="brand" label="品牌" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="pMoney" label="参与另赠金额" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="totleM" label="总金额" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="pD" label="参与领增档位" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="pL" label="参加联单金额" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="30万" align="center" :show-overflow-tooltip="true">
          <el-table-column prop="bing" label="冰箱（6300元）"  align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="huawei" label="华为手机（7000元）" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="应扣金额（50%）" align="center" :show-overflow-tooltip="true"></el-table-column>
        </el-table-column>
        <el-table-column label="50万" align="center" :show-overflow-tooltip="true">
          <el-table-column prop="" label="电视冰箱（12200元）" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="" label="创维套餐（11000元）" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="" label="应扣金额（50%）" align="center" :show-overflow-tooltip="true"></el-table-column>
        </el-table-column>
        <el-table-column prop="totleMon" label="领增费用合计" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="" label="应扣金额合计" align="center" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  import elDragDialog from '@/directive/el-drag-dialog'
  import axios from 'axios'
  import service from '../../../../axios/api'
    export default {
      directives:{elDragDialog},
        name: "moneyInfo",
        data(){
            return{
                gift:[],
                searchText:'',//搜索的关键词
                startTime:'',//搜索开始时间
                endTime:'',//搜索结束时间
                currentPage:1,//当前页码
                pageSize:10,//当前页大小
                totalCount:0,//全部记录条数
                tableData:[],//表格数据
                selectData:[],//要处理勾选的数据
                editVisible:false,
                giftVisible:false,
            }
        },
        mounted(){
          this.getPreWeekTime();
        },
        methods:{
           //提交审核数据
            handleData(){
            },
            //处理被勾选的数据
            handleSelectDate(selection){
              this.selectData = selection
              console.log(selection)
               //console.log(row)
            },
            //处理全部勾选的数据
            handleSelectDate(selection){
              console.log(selection)
            },
            getMock(val){
                this.editVisible=true;
            },
            getGift(val){
                this.giftVisible=true;
                axios.get('/api/giftMoney').then(res=>{
                    if (res.data.code=='0'){
                        this.gift=res.data.giftM;
                    }
                })
            },
            //获得上一周的周一日期和周日日期
            getPreWeekTime(){
              // let nowTime = new Date(new Date().setHours(0, 0, 0, 0));
              // let serverDaysAgo = this.dateFilter(nowTime) - 86400 * 7 * 1000;
              let nowTime = new Date().getTime()//时间戳
              let nowDay = new Date().getDay()//获取星期几（0、1、2、3、4、5、6）
              let oneDayTime = 24*60*60*1000
              let startT = null
              let endT = null
              if(nowDay>0){
                startT = nowTime-oneDayTime*(nowDay+7-1-0)//上周周一
                endT = nowTime-oneDayTime*(nowDay+7-1-6)//上周周日
              }else{
                startT = nowTime-oneDayTime*(nowDay+7+7-1-0)//上周周一
                endT = nowTime-oneDayTime*(nowDay+7+7-1-6)//上周周日
              }
              this.startTime = this.dateFilter(startT)
              this.endTime = this.dateFilter(endT)
              //console.log(this.dateFilter(startTime))
            },
            //获取该交易记录的详细数据
            getDetil(row){
              console.log(row);
            },
            //日期处理
            dateFilter(input){
                var d=new Date(input);
                var year=d.getFullYear();
                var month=d.getMonth()+1<10?'0'+(d.getMonth()+1):(d.getMonth()+1);
                var day=d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
                return  year+ '-' + month + '-' + day;
            },
            handleSizeChange(val){
                this.pageSize=val;
            },
            handleCurrentChange(val){
                this.currentPage=val;
            },
            //获取数据
            getTableData(){    
              service.get('/api/add').then(res=>{
                if (res.data.code==0){
                  this.tableData=res.data.add;
                }
              })
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
    text-align: left;
    width: 100%;
    height: 30px;
  }
  .handle-table{
    position:relative;
    top:10px;
  }
  .comTitle{
    margin-left: 20px
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
  .searchText{
    width: 180px;
    height: 30px;
    margin-left: 50px;
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
  .primaty-top{
    margin-left: 30px;
    float: left;
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
    height: 30px;
    line-height: 30px;
  }
  .bottom-top1{
    float: left;
    margin-left: 50px;
    height: 30px;
    line-height: 30px;
  }
</style>
