<template>
  <div class="table">
    <div class="table-label">
      <i
        class="el-icon-menu"
        style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"
      ></i>
      <p
        style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left"
      >供应商联系人</p>
    </div>

    <div class="handle-box top-select-box clear">
      <div class="top">
        <span>查询条件:</span>
        <el-input class="searchText" v-model="keyWord" placeholder="请输入供应商姓名"></el-input>
        <el-button
          size="mini"
          class="topBtn"
          type="primary"
          icon="el-icon-search"
          @click="searchKey"
        >
          <span style="font-size: 12px">查询</span>
        </el-button>
        <el-button
          size="mini"
          type="success"
          class="topBtn"
          :loading="downloadLoading"
          @click="getExcel"
        >
          <i class="el-icon-upload2"></i>导出
        </el-button>
        <el-button size="mini" type="warning" icon="el-icon-refresh" class="topBtn">
          <span style="font-size: 12px" @click="refresh">刷新</span>
        </el-button>
      </div>
    </div>

    <el-table
      :data="supplier"
      border
      style="width: 100%;"
      @selection-change="selsChange"
      stripe
      :row-style="{height:'45px'}"
      highlight-current-row
      :cell-style="{padding:'0px'}"
      :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}"
    >
      <el-table-column
        prop="MFPCODE,MUCNAME"
        label="门店"
        width="150px"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">[{{scope.row.MFPCODE}}] {{scope.row.MUCNAME}}</template>
      </el-table-column>
      <el-table-column
        prop="FLOOR,MFCNAME"
        label="商场"
        width="200px"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">[{{scope.row.FLOOR}}] {{scope.row.MFCNAME}}</template>
      </el-table-column>
      <el-table-column
        prop="SUPID,SBCNAME"
        label="供应商"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">[{{scope.row.SUPID}}] {{scope.row.SBCNAME}}</template>
      </el-table-column>
      <el-table-column prop="WxUserID1" label="企业联系人1" align="center">
        <template slot-scope="scope">
          <font v-if="scope.row.WxUserID1===null">无</font>
          <font v-else>{{scope.row.WxUserID1}}</font>
        </template>
      </el-table-column>
      <el-table-column prop="WxUserID2" label="企业联系人2" align="center">
        <template slot-scope="scope">
          <font v-if="scope.row.WxUserID2===null">无</font>
          <font v-else>{{scope.row.WxUserID2}}</font>
        </template>
      </el-table-column>
      <el-table-column prop="UpdateTime" label="录入日期" align="center">
        <template slot-scope="scope">
          <font v-if="scope.row.UpdateTime===null">无</font>
          <font v-else>{{scope.row.UpdateTime}}</font>
        </template>
      </el-table-column>
      <el-table-column prop="SBCATCODE" label="供应商类型" align="center"></el-table-column>
      <!-- <el-table-column prop="status" label="状态" align="center"></el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="checkInfo(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>

    <!-------------------------添加微信弹框---------------------------------------->
    <el-dialog title="编辑微信" :visible.sync="editVisible" width="20%">
      <el-form ref="form" :model="form" label-width="95px" class="demo-ruleForm">
        <el-form-item label="企业联系人1">
          <el-select v-model="form.wechat1" clearable placeholder="请选择">
            <el-option
              v-for="item in wechatoptions"
              :key="item.userName"
              :label="item.nickName"
              :value="item.userName"
            >[{{item.tagName}}]{{item.nickName}}({{item.userName}})</el-option>
            <!-- value表示选项值，label代表最终显示在下拉框里的字 -->
          </el-select>
        </el-form-item>
        <el-form-item label="企业联系人2">
          <el-select v-model="form.wechat2" clearable placeholder="请选择">
            <el-option
              v-for="item in wechatoptions"
              :key="item.userName"
              :label="item.nickName"
              :value="item.userName"
            >[{{item.tagName}}]{{item.nickName}}({{item.userName}})</el-option>
            <!-- value表示选项值，label代表最终显示在下拉框里的字 -->
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveEdit">确 定</el-button>
        <el-button @click="editVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- ---------------------------------------------------------------------- -->

    <!-- ---------------------------详细信息弹窗-------------------------------- -->
    <el-dialog title="详细信息" :visible.sync="selVisible" width="500px">
      <div class="shop-info-text">
        <div class="box-title">交易基本信息</div>
        <ul class="left-cont" :model="msg">
          <li class="info-li">
            <span style="font-weight:700">门店：</span>
            [{{msg.MFPCODE}}] {{msg.MUCNAME}}
          </li>
          <li class="info-li">
            <span style="font-weight:700">商场：</span>
            [{{msg.FLOOR}}] {{msg.MFCNAME}}
          </li>
          <li class="info-li">
            <span style="font-weight:700">供应商：</span>
            [{{msg.SUPID}}] {{msg.SBCNAME}}
          </li>

          <li class="info-li">
            <span style="font-weight:700">供应商类型：</span>
            {{msg.SBCATCODE}}
          </li>
        </ul>
      </div>
      <div class="shop-info-text">
        <div class="box-title">联系人信息</div>
        <ul class="left-cont" :model="msg">
          <li class="info-li">
            <span style="font-weight:700">企业联系人1：</span>
            <font v-if="msg.WxUserID1===null">无</font>
            <font v-else>{{msg.WxUserID1}}</font>
          </li>
          <li class="info-li">
            <span style="font-weight:700">企业联系人2：</span>
            <font v-if="msg.WxUserID2===null">无</font>
            <font v-else>{{msg.WxUserID2}}</font>
          </li>
          <li class="info-li">
            <span style="font-weight:700">录入日期：</span>
            <font v-if="msg.UpdateTime===null">无</font>
            <font v-else>{{msg.UpdateTime}}</font>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "supplier",
  data() {
    return {
      sels: "",
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      editVisible: false,
      selVisible: false,
      keyWord: "",
      // "SUPID": "供应商编号",
      // "SBCNAME": "供应商名称",
      // "MFPCODE": "门店编号",
      // "MUCNAME": "门店名称",
      // "FLOOR": "商场编号",
      // "MFCNAME": "商场名称",
      // "SBCATCODE": "供应商类型编码"
      // "ROW_ID":
      // "WxUserID1": "微信联系人1"
      // "WxUserID2": "微信联系人2"
      // "UpdateTime": "录入日期"
      supplier: [],
      ind: 1,
      msg: "",
      form: {
        wechat1: "",
        wechat2: ""
      },
      wechatoptions: [],
      downloadLoading: false
    };
  },
  mounted: function() {
    this.getTabledata();
    this.getContactdata();
  },
  methods: {
    //获取供应商联系方式
    getContactdata() {
      axios({
        url: "http://192.168.1.103:8201/wechat/getAllUserByTagID",
        method: "get",
        params: {},
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          console.log(res.data);
          this.wechatoptions = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取列表数据
    getTabledata() {
      axios({
        // 192.168.1.103:8201/shopPeople/getShopContact
        url: "http://192.168.1.103:8201/shopPeople/getShopContact",
        method: "get",
        params: {
          pageIndex: this.currentPage,
          pageSize: this.pageSize,
          keyWord: this.keyWord
        },
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          //   取数据
          console.log(res.data);
          if (res.data.code == "0") {
            this.supplier = res.data.data;
            this.totalCount = res.data.respPage.totalCount;
          }
          // console.log(this.supplier.length);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //查询，根据姓名进行模糊查询
    searchKey() {
      //注意，方法中的方法名不能喝data中的属性重名
      let _key = this.supplier.name.toLowerCase();
      // console.log(_key)
      let newList = []; //声明一个新的数组，用于存放查询出来的数据，进行页面展示
      if (_key) {
        this.supplier.filter(item => {
          if (item.name.toLowerCase().indexOf(_key) !== -1) {
            newList.push(item);
          }
        });
      }
      this.supplier = newList;
    },
    handleAdd() {
      this.form = {
        id: "",
        name: "",
        ctime: "",
        uptime: "",
        status: ""
      };
      this.addVisible = true;
    },
    deleteFileOrDirectory(val) {},
    refresh() {
      this.getTabledata();
    },
    getExcel() {
      this.downloadLoading = true;
      import("../../../../vendor/Export2Excel").then(excel => {
        const tHeader = [
          "行编号",
          "供应商编号",
          "供应商名称",
          "门店编号",
          "门店名称",
          "商场编号",
          "商场名称",
          "供应商类型编码",
          "微信联系人1",
          "微信联系人2",
          "录入日期"
        ]; //头
        const filterVal = [
          "ROW_ID",
          "SUPID",
          "SBCNAME",
          "MFPCODE",
          "MUCNAME",
          "FLOOR",
          "MFCNAME",
          "SBCATCODE",
          "WxUserID1",
          "WxUserID2",
          "UpdateTime"
        ]; //值
        const data = this.formatJson1(filterVal, this.supplier);
        console.log(data);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "供应商联系人信息"
        });
      });
      this.downloadLoading = false;
    },
    formatJson1(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    selsChange(sels) {
      this.sels = sels;
    },
    checkInfo(index, row) {
      this.ind = index;
      this.msg = row;
      // this.form = {
      //   phone: this.msg.phone,
      //   name: this.msg.name,
      //   ctime: this.msg.ctime,
      //   uptime: this.msg.uptime,
      //   status: this.msg.status
      // };
      this.selVisible = true;
    },
    handleEdit(index, row) {
      this.ind = index;
      this.msg = row;
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.ind = index;
      this.msg = row;
      this.deleteVisible = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTabledata();
      // console.log(`当前页：${val}`);
      // console.log(this.currentPage);
    },
    deleteRow() {
      this.deleteVisible = false;
      axios
        .get("/api/delete", {
          params: {
            id: this.form.id
          }
        })
        .then(res => {
          this.supplier = res.data;
        });
    },
    // 修改微信信息
    saveEdit() {
      // url:192.168.1.103:8201/shopPeople/updateContact
      axios
        .get("http://192.168.1.103:8201/shopPeople/updateContact", {
          params: {
            companyId: this.msg.FLOOR, //商场编号
            supplierId: this.msg.SUPID,
            wxUserID1: this.form.wechat1,
            wxUserID2: this.form.wechat2
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code == "0") {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      this.getTabledata();
      this.editVisible = false;
    }
    // saveEdit() {}
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
  width: auto;
  height: 30px;
}
.handle-box.top-select-box {
  height: 40px;
  width: 100%;
  background: #fafafa;
  padding: 10px 20px;
  margin-bottom: 10px;
}
.searchText {
  width: 180px;
  height: 30px;
}
.top {
  float: left;
  height: 40px;
  width: 100%;
  text-align: left;
  /*width: 350px;*/
}
.topBtn {
  height: 40px;
  margin-left: 5px;
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
.left-cont {
  width: 400px;
  height: 150px;
  margin: 20px 0 0 20px;
}
.left-cont li {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  height: 30px;
  width: 100%;
  line-height: 30px;
  /* float: left; */
  margin-bottom: 10px;
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
.shop-info-text {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
}
</style>
