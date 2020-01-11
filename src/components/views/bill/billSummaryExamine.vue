<template>
  <div class="table">
    <div class="table-label">
      <i
        class="el-icon-menu"
        style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"
      ></i>
      <p class="pageTitle">交易扣款审核</p>
    </div>

    <div class="handle-box top-select-box clear">
      <div class="top">
        <span>交易时间:</span>
        <el-date-picker
          v-model="searchDateTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <span>查询条件:</span>
        <el-input class="searchText" placeholder="请输入查询条件" v-model="searchText"></el-input>
        <el-button
          size="mini"
          class="searchBtn"
          type="primary"
          icon="el-icon-search"
          @click="getTableData"
        >
          <span style="font-size: 12px">查询</span>
        </el-button>

        <el-button size="mini" type="success" class="searchBtn" @click="checkSevral">
          <i class="el-icon-upload2"></i>
          <span style="font-size: 12px">批量审核</span>
        </el-button>
        <el-button
          class="searchBtn"
          size="medium"
          type="success"
          icon="el-icon-upload2"
          @click="getExcel"
        >
          <span style="font-size: 12px">导出EXCEL</span>
        </el-button>
      </div>
    </div>

    <!-- 交易明细表格 -->
    <el-table
      :data="tableData"
      border
      class="handle-table"
      style="width: 100%;"
      stripe
      :row-style="{height:'45px'}"
      :cell-style="{padding:'0px'}"
      :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}"
      @selection-change="handleSelectDate"
      @select-all="handleSelectDate"
    >
      <el-table-column type="selection" width="55px" align="center"></el-table-column>
      <el-table-column prop="supplier" label="供应商" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="market" label="门店" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="building" label="楼栋" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="floor" label="楼层" align="center" :show-overflow-tooltip="true"></el-table-column>
      <!-- <el-table-column prop="brand" label="品牌" align="center" :show-overflow-tooltip="true"></el-table-column> -->
      <el-table-column prop="income" label="当周收入（元）" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="payment" label="支付手续费（元）" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column
        prop="giftcost"
        label="礼品分担总额（元）"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="lcbalance"
        label="浪潮余额（元）"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="activecost"
        label="活动定额费用（元）"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="accountcost"
        label="账扣费用(元)"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="remark" label="扣款说明" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <font v-if="scope.row.status==='审核通过'" color="green">审核通过</font>
          <font v-else-if="scope.row.status==='审核未通过'" color="red">审核未通过</font>
          <font v-else color="#808080">待审核</font>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180px" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="checkOne(scope.row)">审核</el-button>
          <el-button size="mini" type="success" plain @click="getDetail(scope.row)">交易记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 合同明细弹框 -->
    <el-dialog title="审核" :visible.sync="checkOneVisible" width="600px">
      <!-- 当前列详细情况 -->
      <div>
        <div class="shop-info-text">
          <div class="box-title">交易扣款详细信息</div>
          <ul class="left-cont" :model="detailData">
            <li class="info-li">
              <span style="font-weight:700">供应商：</span>
              {{detailData.supplier}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">门店：</span>
              {{detailData.market}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">楼栋：</span>
              {{detailData.building}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">楼层：</span>
              {{detailData.floor}}
            </li>
            <!-- <li class="info-li">
              <span style="font-weight:700">品牌：</span>
              {{detailData.brand}}
            </li>-->
            <li class="info-li">
              <span style="font-weight:700">当周收入：</span>
              {{detailData.income}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">支付手续费：</span>
              {{detailData.payment}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">礼品分担总额：</span>
              <!-- {{form.isActivity == 1?'是':'否'}} -->
              {{detailData.giftcost}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">浪潮余额：</span>
              {{detailData.lcbalance}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">活动定额费用：</span>
              {{detailData.activecost}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">账扣费用：</span>
              {{detailData.accountcost}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">状态：</span>
              <font v-if="detailData.status==='审核通过'" color="green">审核通过</font>
              <font v-else-if="detailData.status==='审核未通过'" color="red">审核未通过</font>
              <font v-else color="#808080">待审核</font>
            </li>
          </ul>
        </div>
        <!-- 交易合同明细 -->
        <div class="shop-info-text">
          <div class="box-title">交易合同明细</div>
          <!-- 这一部分获取的数据是billDetail页面的参数,单独请求接口 -->
          <ul class="left-cont" :model="form">
            <li class="info-li">
              <span style="font-weight:700">销售日期：</span>
              {{form.sellDate}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">门店：</span>
              {{form.market}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">供应商编码及名称：</span>
              {{form.supplier}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">楼栋：</span>
              {{form.building}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">楼层：</span>
              {{form.floor}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">品牌：</span>
              {{form.brand}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">会员卡号：</span>
              {{form.memberCard}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">单据号：</span>
              {{form.contract}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">是否参加活动：</span>
              {{form.isActivity == 1?'是':'否'}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">合同金额(元)：</span>
              {{form.htje}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">销售金额(元)：</span>
              {{form.xsje}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">应返款金额(元)：</span>
              {{form.yfkje}}
            </li>
            <li class="info-li">
              <span style="font-weight:700">实际返款金额(元)：</span>
              {{form.sjfkje}}
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleData" type="warning">审核</el-button>
        <el-button @click="checkOneVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 分页条 -->
    <div class="pagination">
      <!--     el-pagination新增分页   -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-drag-dialog";
import axios from "axios";
import service from "../../../axios/api";
export default {
  directives: { elDragDialog },
  name: "billSummaryExamine",
  data() {
    return {
      gift: [],
      searchText: "", //搜索的关键词
      currentPage: 1, //当前页码
      pageSize: 10, //当前页大小
      totalCount: 0, //全部记录条数
      tableData: [
        {
          id: 1,
          supplier: "[00219]济南普田工贸有限公司", //供应商
          market: "中心店", //门店
          building: "独栋", //楼栋
          floor: "1F", //楼层
          // brand: "欧派衣柜",
          income: "124", //当周收入
          payment: "2", //支付手续费
          giftcost: "3.2", //礼品分担总额
          lcbalance: "20", //浪潮余额
          activecost: "5.6", //活动定额费用
          accountcost: "1.2", //账扣费用
          remark: "", //扣款说明
          status: "审核未通过" //状态
        }
      ], //表格数据
      // 详情数据
      detailData: {
        id: 1,
        supplier: "[00219]济南普田工贸有限公司",
        market: "中心店",
        building: "独栋",
        floor: "1F",
        // brand: "欧派衣柜",
        income: "124",
        payment: "2",
        giftcost: "3.2",
        lcbalance: "20",
        activecost: "5.6",
        accountcost: "1.2",
        remark: "",
        status: "审核未通过"
      },
      // 合同明细数据
      contractData: {
        saleDate: "",
        supplier: ""
      },
      selectData: [], //要处理勾选的数据
      searchDateTime: "",
      pickerOptions: {
        //时间选择快捷选项
        shortcuts: [
          {
            text: "上一周",
            onClick(picker) {
              let nowTime = new Date().getTime(); //时间戳
              let nowDay = new Date().getDay(); //获取星期几（0、1、2、3、4、5、6）
              let oneDayTime = 24 * 60 * 60 * 1000;
              let startT = null;
              let endT = null;
              if (nowDay > 0) {
                startT = nowTime - oneDayTime * (nowDay + 7 - 1 - 0); //上周周一
                endT = nowTime - oneDayTime * (nowDay + 7 - 1 - 6); //上周周日
              } else {
                //如果是周日
                startT = nowTime - oneDayTime * (nowDay + 7 + 7 - 1 - 0); //上周周一
                endT = nowTime - oneDayTime * (nowDay + 7 + 7 - 1 - 6); //上周周日
              }
              picker.$emit("pick", [startT, endT]);
            }
          }
        ]
      },
      checkSeveralVisible: false,
      checkOneVisible: false
    };
  },
  filters: {},
  mounted() {
    this.getPreWeekTime();
  },
  methods: {
    //提交审核数据
    checkSevral() {
      this.checkSeveralVisible = false;
    },
    //处理被勾选的数据
    handleSelectDate(selection) {
      this.selectData = selection;
      console.log(selection);
      //console.log(row)
    },
    //处理全部勾选的数据
    handleSelectDate(selection) {
      console.log(selection);
    },
    //获得上一周的周一日期和周日日期
    getPreWeekTime() {
      // let nowTime = new Date(new Date().setHours(0, 0, 0, 0));
      // let serverDaysAgo = this.dateFilter(nowTime) - 86400 * 7 * 1000;
      let nowTime = new Date().getTime(); //时间戳
      let nowDay = new Date().getDay(); //获取星期几（0、1、2、3、4、5、6）
      let oneDayTime = 24 * 60 * 60 * 1000;
      let startT = null;
      let endT = null;
      if (nowDay > 0) {
        startT = nowTime - oneDayTime * (nowDay + 7 - 1 - 0); //上周周一
        endT = nowTime - oneDayTime * (nowDay + 7 - 1 - 6); //上周周日
      } else {
        startT = nowTime - oneDayTime * (nowDay + 7 + 7 - 1 - 0); //上周周一
        endT = nowTime - oneDayTime * (nowDay + 7 + 7 - 1 - 6); //上周周日
      }
      this.startTime = this.dateFilter(startT);
      this.endTime = this.dateFilter(endT);
      //console.log(this.dateFilter(startTime))
    },
    //获取该交易记录的详细数据
    getDetail(row) {
      this.detailVisible = true;
      console.log(row);
    },
    //审核数据
    checkOne(row) {
      this.checkOneVisible = true;
    },
    //日期处理
    dateFilter(input) {
      var d = new Date(input);
      var year = d.getFullYear();
      var month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
      return year + "-" + month + "-" + day;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleData() {
      console.log("审核单个数据");
    },
    //获取数据
    getTableData() {},
    //导出Excel
    getExcel() {}
  }
};
</script>

<style scoped>
.searchBtn {
  height: 40px;
  margin-left: 5px;
}
.table {
  width: 100%;
  font-size: 14px;
  background: #efefef;
  height: 570px;
}
.table-label {
  text-align: left;
  width: 100%;
  height: 30px;
}
.handle-table {
  position: relative;
  top: 10px;
}
.handle-box.top-select-box {
  padding: 10px 20px;
  margin-bottom: 10px;
  height: 40px;
  width: 100%;
  background: #fafafa;
}
.select-input-wrapper {
  margin-bottom: 20px;
  text-align: left;
}
.searchText {
  width: 150px;
  height: 30px;
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
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
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
.top {
  float: left;
  height: 50px;
  width: 100%;
  min-width: 1000px;
  text-align: left;
  /*width: 350px;*/
}
.bottom {
  float: left;
  margin-left: 20px;
  height: 30px;
  /*width: 350px;*/
  width: 40%;
}
.clear {
  clear: both;
}
.bottom-top {
  float: left;
  height: 30px;
  line-height: 30px;
}
.bottom-top1 {
  float: left;
  margin-left: 50px;
  height: 30px;
  line-height: 30px;
}
.pageTitle {
  font-size: 18px;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  text-align: left;
}
</style>