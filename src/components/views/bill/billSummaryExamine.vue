<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;" class="comTitle">交易扣款审核</span>
    </div>


    <div class="handle-box top-select-box clear">
      <div class="top">
        <span style="font-size: 16px;float: left;margin-left: 50px;margin-top:10px">交易时间:</span>
        <el-date-picker type="date" v-model="startTime" placeholder="起始时间" style="width: 20%;float: left"></el-date-picker>
        <el-col class="line" :span="1" style="width:10px;height: 30px;line-height: 30px;text-align: center">-</el-col>
        <el-date-picker type="date" v-model="endTime" placeholder="终止时间" style="width: 20%;float: left"></el-date-picker>
        <el-input class="searchText"  placeholder="请输入查询条件" style="float:left" v-model="searchText"></el-input>
        <el-button size="mini" class="primaty-top" type="primary" icon="el-icon-search" @click="getTableData"><span style="font-size: 12px">查询</span></el-button>
      </div>
      <div class="bottom">
        <el-button size="mini" type="success" class="primaty-top" @click="handleData"><i class="el-icon-upload2"></i>批量审核</el-button>
      </div>
    </div>

    <!-- 交易明细表格 -->
    <el-table :data="tableData" class="handle-table" style="width: 100%;" stripe :row-style="{height:'45px'}" :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" @selection-change	="handleSelectDate" @select-all="handleSelectDate">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="supplier" label="供应商" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="market" label="门店" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="building" label="楼栋" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="floor" label="楼层" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="brand" label="品牌" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="memberCard" label="当周收入（元）" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="contract" label="支付手续费（元）" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="xshtje" label="礼品分担总额（元）" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="sxf" label="浪潮余额（元）" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="giftje" label="活动定额费用（元）" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="yhjkdfy" label="账扣费用(元)" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="yhjkdfy" label="扣款说明" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="state" label="状态" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" align="center" width="180px" fixed="right">
        <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="getDetil(scope.row)">审核</el-button>
              <el-button size="mini" type="success" plain @click="getDetil(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页条 -->
    <div class="pagination">
      <!--     el-pagination新增分页   -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import elDragDialog from '@/directive/el-drag-dialog'
  import axios from 'axios'
  import service from '../../../axios/api'
    export default {
      directives:{elDragDialog},
        name: "billSummaryExamine",
        data(){
            return{
                gift:[],
                searchText:'',//搜索的关键词
                startTime:'',//搜索开始时间
                endTime:'',//搜索结束时间
                currentPage:1,//当前页码
                pageSize:10,//当前页大小
                totalCount:0,//全部记录条数
                tableData:[
                  {
                    id:1,
                    supplier:"[00219]济南普田工贸有限公司",
                    market:"中心店",
                    building:'独栋',
                    floor:'1F',
                    brand:'欧派衣柜',
                    memberCard:'124',
                    contract:'2',
                    xshtje:'3.2',
                    sxf:'20',
                    giftje:'5.6',
                    yhjkdfy:'1.2',
                    state:''
                  }
                ],//表格数据
                selectData:[],//要处理勾选的数据
                form:{     //交易明细的详细数据
                  saleDate:'',//交易日期
                  supplier:'',//供应商编码及名称
                  market:'',
                  building:'',//楼栋
                  floor:'',//楼层
                  brand:'',//品牌
                  memberCard:'',//会员卡号
                  contract:'',//合同号
                  xshtje:'',//销售合同金额
                  sfje:'',//实付金额
                  sxf:'',//手续费（借记卡手续费、贷记卡手续费、面值卡手续费、一卡通手续费、联名卡手续费、刮刮卡手续费、微信手续费、支付宝手续费）
                  fkje:'',//应返款金额
                  isActivity:'',//是否参加活动
                  deje:'',//账扣定额活动费明细
                  giftje:'',//礼品扣点明细
                  zkggf:'',//账扣广告费明细
                  zkzjf:'',//账扣租金明细
                  yhjkdfy:'',//优惠卷的扣点费用
                  qtkk:'',//其他扣款,
                  sjfkje:''//实际返款金额
                },
                editVisible:false,
                giftVisible:false,
                detilVisible:false
            }
        },
        filters:{

        },
        mounted(){
          this.getPreWeekTime();
        },
        methods:{
           //提交审核数据
            handleData(){
              this.detilVisible = false
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
              this.detilVisible = true;
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
    height: 40px;
    margin-left: 30px;
    float: left;
  }
  /*弹框详情信息*/ 
  .shop-info-text {
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 5px;
  }
  .box-title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #afcff0;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
  }
  .left-cont {
      width: 700px;
      height: 240px;
      margin: 20px 0 0 20px;
  }
  .left-cont-kkxi {
      width: 700px;
      height: 280px;
      margin: 20px 0 0 20px;
  }
  .left-cont li {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: left;
      height: 30px;
      width: 300px;
      line-height: 30px;
      float: left;
      margin-bottom: 10px;
  }
  .left-cont-kkxi li {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
    height: 30px;
    width: 600px;
    line-height: 30px;
    float: left;
    margin-bottom: 10px;
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
