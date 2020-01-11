<template>
  <div class="table">
    <div class="table-label">
      <i
        class="el-icon-menu"
        style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"
      ></i>
      <p class="pageTitle">交易扣款审核历史</p>
    </div>

    <div class="handle-box top-select-box clear">
      <div class="top">
        <span>审核时间范围:</span>
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
        <span class="searchcondi">查询条件:</span>
        <el-input class="searchText" placeholder="请输入返款编号"></el-input>
        <el-button
          class="searchBtn"
          size="medium"
          type="primary"
          icon="el-icon-search"
          @click="getData"
        >
          <span style="font-size: 12px">查询</span>
        </el-button>
        <el-button
          class="searchBtn"
          size="medium"
          type="success"
          icon="el-icon-upload2"
          @click="getData"
        >
          <span style="font-size: 12px">导出EXCEL</span>
        </el-button>
      </div>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      @selection-change="selsChange"
      stripe
      :row-style="{height:'45px'}"
      highlight-current-row
      :cell-style="{padding:'0px'}"
      :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}"
    >
      <el-table-column type="selection" width="55px" align="center"></el-table-column>
      <el-table-column
        prop="id"
        label="供应商"
        align="center"
        width="200px"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="floor" label="楼层" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="income" label="当周收入" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="payment" label="支付手续费" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="giftcost" label="礼品分担总额" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="lcbalance" label="浪潮余额" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column
        prop="activecost"
        label="活动定额费用"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="accountcost" label="账扣费用" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="remark" label="扣款说明" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="auditperson" label="审核人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="audittime" label="审核时间" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <font v-if="scope.row.status==='审核通过'" color="green">审核通过</font>
          <font v-else-if="scope.row.status==='审核未通过'" color="red">审核未通过</font>
          <font v-else color="#808080">待审核</font>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150px"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="checkInfo(scope.$index, scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <!--     el-pagination新增分页   -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "examineHistory",
  data() {
    return {
      sels: "",
      currentPage: 1,
      pagesize: 10,
      tableData: [
        {
          id: "[00219]济南普田工贸有限公司",
          floor: "[000501]建材商场",
          income: 102,
          payment: 11,
          giftcost: 12,
          lcbalance: 111,
          activecost: 10,
          accountcost: 111,
          remark: "",
          status: "审核通过",
          auditperson: "张三",
          audittime: "2020-01-01"
        },
        {
          id: "[]",
          floor: "F3",
          income: 222,
          payment: 13.21,
          giftcost: 12.21,
          lcbalance: 111.11,
          activecost: 10.01,
          accountcost: 111.1,
          remark: "",
          status: "审核通过",
          auditperson: "张三",
          audittime: "2020-01-01"
        }
      ],
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
      }
    };
  },
  mounted: function() {
    // axios.get("/api/money1").then(res => {
    //   if (res.data.code == 0) {
    //     this.tableData = res.data.money1;
    //     console.log(this.tableData);
    //   } else {
    //     alert("请求失败");
    //   }
    // });
  },
  methods: {
    // format(row){
    //   if (row.status=='待审核'){
    //
    //   }
    // },
    searchKey() {},
    handleAdd() {
      this.$router.push({
        path: "moneyInfo"
        // query:{shopID: 1}
      });
    },
    deleteFileOrDirectory(sels) {},
    refresh() {},
    selsChange(sels) {
      this.sels = sels;
    },
    checkInfo(row) {
      //带参转发，参数表：
      //带什么参数？？？？
    },
    handleEdit() {},
    handleDelete() {},
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange() {
      this.currentPage = val;
    },
    getData() {}
  }
};
</script>

<style scoped>
.searchcondi {
  margin-left: 10px;
}
.table {
  width: 100%;
  font-size: 14px;
  background: #efefef;
  height: 570px;
}
.table-label {
  width: 100%;
  height: 30px;
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
.searchText {
  width: 150px;
  height: 30px;
}
.top {
  float: left;
  height: 50px;
  width: 80%;
  text-align: left;
  /*width: 350px;*/
}
.searchBtn {
  height: 40px;
  margin-left: 5px;
}
.clear {
  clear: both;
}
.bottom-top {
  float: left;
}
.pageTitle {
  font-size: 18px;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  text-align: left;
}
</style>