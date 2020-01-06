<template>
  <div class="table">
    <div class="table-label">
      <i
        class="el-icon-menu"
        style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"
      ></i>
      <span
        style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left"
      >交易扣款审核历史</span>
    </div>

    <div class="handle-box top-select-box clear">
      <div class="top">
        <span style="font-size: 18px;float: left;margin-left: 50px;margin-top:5px">时间范围:</span>
        <el-date-picker
          type="date"
          v-model="date1"
          placeholder="起始时间"
          style="width: 15%;float: left;margin-left:10px"
        ></el-date-picker>
        <el-col
          class="line"
          :span="1"
          style="wiidth:10px;height: 30px;line-height: 30px;text-align: center"
        >-</el-col>
        <el-date-picker
          type="date"
          v-model="date2"
          placeholder="终止时间"
          style="width: 15%;float: left"
        ></el-date-picker>
        <span style="font-size: 18px;float: left;margin-left: 50px;margin-top:5px">查询条件:</span>
        <el-input style="float:left;margin-left:10px" class="searchText" placeholder="请输入返款编号"></el-input>
        <el-button
          size="mini"
          class="primaty-top"
          type="primary"
          icon="el-icon-search"
          @click="searchKey"
          style="float:left;margin-left:10px;margin-top:5px"
        >
          <span style="font-size: 12px;">查询</span>
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
      <!-- 自定义求和函数:summary-method="getSummaries" -->
      <el-table-column type="selection" width="55px" align="center"></el-table-column>
      <el-table-column
        prop="id"
        label="供应商"
        align="center"
        width="200px"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="floor"
        label="楼层"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="brand"
        label="品牌"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
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
      <el-table-column label="操作" width="200px" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <!--              type="text"代表文字按钮-->
          <el-button size="mini" type="success" @click="checkInfo(scope.$index, scope.row)">详细</el-button>

          <!--          <el-button size="mini" type="primary"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
          <!--          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
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
      date1: "",
      date2: "",
      currentPage: 1,
      pagesize: 10,
      tableData: [
        {
          id: "[00219]济南普田工贸有限公司",
          floor: "[000501]建材商场",
          brand: "欧派",
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
        }
        // ,
        // {
        //   id: "[]",
        //   floor: "F3",
        //   brand: "银座家居2",
        //   income: 222,
        //   payment: 13.21,
        //   giftcost: 12.21,
        //   lcbalance: 111.11,
        //   activecost: 10.01,
        //   accountcost: 111.1,
        //   remark: "",
        //   status: "审核通过",
        //   auditperson: "张三",
        //   audittime: "2020-01-01"
        // }
      ]
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
    checkInfo() {},
    handleEdit() {},
    handleDelete() {},
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange() {
      this.currentPage = val;
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  font-size: 14px;
  background: #efefef;
  height: 570px;
}
.table-label {
  width: 9%;
  height: 30px;
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
  margin-left: 80px;
}
.top {
  float: left;
  height: 50px;
  width: 50%;
  text-align: right;
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
}
</style>
