<template>
  <div class="table">
    <div class="left-table-label">
        <i class="el-icon-menu"></i>
        <span class="label-text">交易扣款详情</span>
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
        <el-input class="searchText"  v-model="search"  placeholder="请输入供应商/楼层/会员卡号"></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>
        <el-button class="searchBtn" size="medium" type="warning" icon="el-icon-upload2" @click="handleData">
          <span style="font-size: 12px">提交审核</span>
        </el-button>
      </div>
    </div>

    <!-- 交易明细表格 -->
    <el-table :data="tableData" class="handle-table" style="width: 100%;" stripe :row-style="{height:'45px'}" :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" @selection-change	="handleSelectDate" @select-all="handleSelectDate">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="sellDate" label="销售日期" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="supplier" label="供应商" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="market" label="门店" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="building" label="楼栋" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="floor" label="楼层" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="brand" label="品牌" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="memberCard" label="会员卡号" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="contract" label="单据号" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="htje" label="合同金额(元)" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="xsje" label="销售金额(元)" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="sxf" label="支付手续费(元)" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="zpje" label="赠品分摊(元)" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="jkje" label="券扣费用(元)" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="yfkje" label="应返款金额(元)" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="状态" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.state | filterTableState}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
              <el-button size="mini" type="success" plain @click="getDetail(scope.row)">详情</el-button>
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


    <!-- 合同明细弹框 -->
    <el-dialog title="交易合同明细详情" :visible.sync="detilVisible" width="800px">
      <!--手续费明细弹框-->
      <el-dialog v-el-drag-dialog title="支付手续费详情" :visible.sync="sxfVisible" width="600px" append-to-body>
        <el-table :data="sxfDetail" style="width: 100%" :span-method="sxfCloneSpan">
          <el-table-column prop="zffs" label="支付方式" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="zfje" label="支付金额(元)" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sxfbl" label="手续费比例" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sxfje" label="手续费金额(元)" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sxfze" label="手续费总额(元)" align="center" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
      </el-dialog>
      <!-- --------------------------------------------------------------------------------- -->
      <!--优惠券分摊明细弹框-->
      <el-dialog v-el-drag-dialog title="优惠券分摊明细" :visible.sync="yhqVisible" width="600px" append-to-body>
        <el-table :data="yhqDetail" style="width: 100%" :span-method="yhqCloneSpan">
          <el-table-column prop="yhqmc" label="优惠券名称" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="yhqje" label="使用金额(元)" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="ftbl" label="分摊比例" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sjftje" label="商家分摊金额(元)" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sjyhqftze" label="商家优惠券分摊总额(元)" align="center" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
      </el-dialog>
      <!-- -------------------------------------------------------------------------------------- -->
      <div>
        <div class="shop-info-text">
          <div class="box-title">交易基本信息</div>
          <ul class="left-cont" :model="form">
            <li class="info-li"><span style="font-weight:700">销售日期：</span>{{form.sellDate}}</li>
            <li class="info-li"><span style="font-weight:700">门店：</span>{{form.market}}</li>
            <li class="info-li"><span style="font-weight:700">供应商编码及名称：</span>{{form.supplier}}</li>
            <li class="info-li"><span style="font-weight:700">楼栋：</span>{{form.building}}</li>
            <li class="info-li"><span style="font-weight:700">楼层：</span>{{form.floor}}</li>
            <li class="info-li"><span style="font-weight:700">品牌：</span>{{form.brand}}</li>
            <li class="info-li"><span style="font-weight:700">会员卡号：</span>{{form.memberCard}}</li>
            <li class="info-li"><span style="font-weight:700">单据号：</span>{{form.contract}}</li>
            <li class="info-li"><span style="font-weight:700">是否参加活动：</span>{{form.isActivity == 1?'是':'否'}}</li>
            <li class="info-li"><span style="font-weight:700">合同金额(元)：</span>{{form.htje}}</li>
            <li class="info-li"><span style="font-weight:700">销售金额(元)：</span>{{form.xsje}}</li>
            <li class="info-li"><span style="font-weight:700">应返款金额(元)：</span>{{form.yfkje}}</li>
            <li class="info-li"><span style="font-weight:700">实际返款金额(元)：</span>{{form.sjfkje}}</li>
          </ul>
        </div>
        <div class="shop-info-text">
          <div class="box-title">交易扣款信息</div>
          <ul class="left-cont-kkxi" :model="form">
            <li class="info-li"><span style="font-weight:700">支付手续费(元)：</span>{{form.sxf}}
              <el-button size="mini" type="success" plain @click="getSXFDetail(form.contractId)" class="detailInfoBtn">支付手续费明细</el-button>
            </li>
            <li class="info-li"><span style="font-weight:700">赠品分摊费用(元)：</span>300.23=赠品成品6300×分担比例50%×参与领赠金额30000/总金额314755</li>
            <li class="info-li"><span style="font-weight:700">优惠券分摊费用(元):</span>{{form.yhjkdfy}}
              <el-button size="mini" type="success" plain @click="getYHQDetail(form.contractId)" class="detailInfoBtn">优惠券费用明细</el-button>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleData" type="warning">审核</el-button>
          <el-button @click="detilVisible = false">取 消</el-button>
        </span>
    </el-dialog>

    
<!--赠品明细弹框-->
    <el-dialog v-el-drag-dialog title="赠品详情" :visible.sync="giftVisible" width="80%">
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
  import service from '../../../axios/api'
    export default {
      directives:{elDragDialog},
        name: "billDetail",
        data(){
            return{
                searchDateTime:'',//时间选定
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
                gift:[],
                search:'',//搜索的关键词
                currentPage:1,//当前页码
                pageSize:10,//当前页大小
                totalCount:0,//全部记录条数
                tableData:[  //表格数据
                  {
                    contractId:1,
                    sellDate:'2020-01-03',
                    supplier:"[04044]济南银座家居梦蒂家私经营",
                    market:"中心店",
                    building:'独栋',
                    floor:'1F',
                    brand:'欧派衣柜',
                    memberCard:'48488848',
                    contract:'1544815',
                    htje:100000,
                    xsje:99999,
                    isActivity:1,
                    sxf:100,
                    zpje:861,
                    jkje:69,
                    yfkje:15499,
                    sjfkje:15499,
                    yhjkdfy:5000,
                    state:'1'
                  }
                ],//表格数据
                selectData:[],//要处理勾选的数据
                form:{     //交易明细的详细数据
                  sellDate:'',//交易日期
                  supplier:'',//供应商编码及名称
                  market:'',
                  building:'',//楼栋
                  floor:'',//楼层
                  brand:'',//品牌
                  memberCard:'',//会员卡号
                  contract:'',//合同号
                  xshtje:'',//销售合同金额
                  sfje:'',//实付金额
                  sxf:30,//手续费（借记卡手续费、贷记卡手续费、面值卡手续费、一卡通手续费、联名卡手续费、刮刮卡手续费、微信手续费、支付宝手续费）
                  fkje:'',//应返款金额
                  isActivity:0,//是否参加活动
                  deje:'',//账扣定额活动费明细
                  giftje:'',//礼品扣点明细
                  zkggf:'',//账扣广告费明细
                  zkzjf:'',//账扣租金明细
                  yhjkdfy:5000,//优惠卷的扣点费用
                  qtkk:'',//其他扣款,
                  sjfkje:''//实际返款金额
                },
                sxfDetail:[
                  {//手续费详细数据
                    zffs:"借记卡",
                    zfje:6000,
                    sxfbl:'100%',
                    sxfje:20,
                    sxfze:20
                  }
                ],
                yhqDetail:[
                  {//手续费详细数据
                    yhqmc:"优惠券A",
                    yhqje:1000,
                    ftbl:'100%',
                    sjftje:1000,
                    sjyhqftze:2000
                  },
                  {//手续费详细数据
                    yhqmc:"优惠券B",
                    yhqje:2000,
                    ftbl:'50%',
                    sjftje:1000,
                    sjyhqftze:20
                  }
                ],
                giftVisible:false,
                sxfVisible:false,//手续费弹框
                yhqVisible:false,//优惠券弹框
                detilVisible:false//合同详细内容弹框
            }
        },
        filters:{
          filterTableState(value){//表格中状态过滤器
            switch(value){
              case '0':
                return '未确认'
                break;
              case '1':
                return '确认未审核'
                break;
              case '2':
                return '等待审核'
                break;
              case '3':
                return '审核通过'
                break;
              case '4':
                return '审核未通过'
                break;
              default:
                break;
            }
          }
        },
        watch:{
        },
        mounted(){
            if(this.$route.params.length>0){

            }else{
              console.log(this.$route.params)
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
            }
        },
        methods:{
            sxfCloneSpan({ row, column, rowIndex, columnIndex }){
              if(columnIndex === 4){
                return [this.sxfDetail.length,1];
              }
            },
            //总手续费列合并
            yhqCloneSpan({ row, column, rowIndex, columnIndex }){
              if(columnIndex === 4){
                return [this.yhqDetail.length,1];
              }
            },
            //查看优惠券分摊明细
            getYHQDetail(value){
              this.yhqVisible = true
            },
            //查看手续费详情
            getSXFDetail(value){
              this.sxfVisible = true
            },
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
            getGift(val){
                this.giftVisible=true;
                axios.get('/api/giftMoney').then(res=>{
                    if (res.data.code=='0'){
                        this.gift=res.data.giftM;
                    }
                })
            },
            //获取该交易记录的详细数据
            getDetail(row){
              this.form = row
              this.detilVisible = true
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
            getData(){
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
      height: 280px;
      margin: 20px 0 0 20px;
  }
  .left-cont-kkxi {
      width: 700px;
      height: 160px;
      margin: 20px 0 0 20px;
  }
  .left-cont li {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: left;
      height: 30px;
      width: 350px;
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
  .detailInfoBtn{
    float:right;
    margin-left: 50px
  }
</style>
