<template>
  <div class="table">
    <div class="left-table-label">
        <i class="el-icon-menu"></i>
        <span class="label-text">交易扣款周汇总</span>
    </div>
    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <div class="handle-box-loc handle-date-select">
          <span>日期范围：</span>
          <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <span class="select-label">查询条件:</span>
        <el-input class="searchText"  v-model="search"  placeholder="请输入推送微信"></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>
        <el-button class="searchBtn" size="medium" type="success" icon="el-icon-upload2" @click="getData">
          <span style="font-size: 12px">导出EXCEL</span>
        </el-button>
        <el-button class="searchBtn" size="medium" type="warning" icon="el-icon-upload2" @click="getData">
          <span style="font-size: 12px">提交审核</span>
        </el-button>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%;" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="lc" label="楼层" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="gysbm" label="供应商编码" width="100px"  align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="gysmc" label="供应商名称" width="110px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="pp" label="品牌" width="90px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="bzsr" label="本周收入" width="100px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="zfsxf" label="支付手续费" width="100px" align="center"></el-table-column>
      <el-table-column prop="lpftze" label="礼品分摊总额" width="110px" align="center"></el-table-column>
      <el-table-column prop="yhqftze" label="优惠券分摊总额" width="120px" align="center"></el-table-column>
      <el-table-column prop="lcye" label="浪潮余额" width="90px" align="center"></el-table-column>
      <el-table-column prop="hdgdfy" label="活动固定费用" width="120px" align="center"></el-table-column>
      <el-table-column prop="kggf" label="扣广告费" width="90px" align="center"></el-table-column>
      <el-table-column prop="kzj" label="扣租金" width="90px" align="center"></el-table-column>
      <el-table-column prop="qtkk" label="其他扣款" width="90px" align="center"></el-table-column>
      <el-table-column prop="kksm" label="扣款说明" width="130px" align="center"></el-table-column>
      <el-table-column prop="sjfk" label="实际返款" width="90px" align="center"></el-table-column>
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

    <!-- 修改弹框 -->
    <el-dialog title="交易扣款周汇总详情与修改" :visible.sync="editVisible" width="600px">
      <el-form ref="form" :model="form" label-width="150px" >
        <el-form-item label="楼层：">
          <el-input v-model="form.lc" style="width: 350px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商编码：" prop="phone">
          <el-input v-model="form.gysbm" style="width: 350px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商名称：" prop="phone">
          <el-input v-model="form.gysmc" style="width: 350px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="品牌：" prop="phone">
          <el-input v-model="form.pp" style="width: 350px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="本周收入：" prop="phone">
          <el-input v-model="form.bzsr" style="width: 350px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="支付手续费：" prop="phone">
          <el-input v-model="form.zfsxf" style="width: 350px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="礼品分摊总额：" prop="phone">
          <el-input v-model="form.lpftze" style="width: 350px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="优惠券分摊总额：" prop="phone">
          <el-input v-model="form.yhqftze" style="width: 350px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="浪潮余额：" prop="phone">
          <el-input v-model="form.lcye" style="width: 350px;margin-left: 20px" clearable></el-input>
        </el-form-item>
        <el-form-item label="活动固定费用：" prop="phone">
          <el-input v-model="form.hdgdfy" style="width: 350px;margin-left: 20px" clearable></el-input>
        </el-form-item>
        <el-form-item label="扣广告费：" prop="phone">
          <el-input v-model="form.kggf" style="width: 350px;margin-left: 20px" clearable></el-input>
        </el-form-item>
        <el-form-item label="扣租金费：" prop="phone">
          <el-input v-model="form.kzj" style="width: 350px;margin-left: 20px" clearable></el-input>
        </el-form-item>
        <el-form-item label="其他扣款：" prop="phone">
          <el-input v-model="form.qtkk" style="width: 350px;margin-left: 20px" clearable></el-input>
        </el-form-item>
        <el-form-item label="扣款说明：" prop="phone">
          <el-input v-model="form.kksm" style="width: 350px;margin-left: 20px" clearable></el-input>
        </el-form-item>
        <el-form-item label="实际返款：" prop="phone">
          <el-input v-model="form.sjfk" style="width: 350px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="phone">
          <el-input v-model="form.status" style="width: 350px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "money",
        data() {
            return {
                tableData: [
                  {
                    index: 1,
                    lc: '一层',
                    gysbm: 'D12567',
                    gysmc: '欧派橱柜',
                    pp: '欧派',
                    bzsr: '100万',
                    zfsxf: '2000',
                    lpftze: '10000',
                    yhqftze: '10780',
                    lcye: '',
                    hdgdfy: '4000',
                    kggf: '5926',
                    kzj: '8900',
                    qtkk: '19293',
                    kksm: '商业汇演场地费',
                    sjfk: '35468',
                    status: '未审核'
                  },{
                    index: 2,
                    lc: '三层',
                    gysbm: 'D12567',
                    gysmc: '瓷砖',
                    pp: '史丹利',
                    bzsr: '96万',
                    zfsxf: '2000',
                    lpftze: '89000',
                    yhqftze: '8780',
                    lcye: '',
                    hdgdfy: '8900',
                    kggf: '5926',
                    kzj: '8900',
                    qtkk: '19293',
                    kksm: '',
                    sjfk: '35468',
                    status: '审核通过'
                  },{
                    index: 3,
                    lc: '三层',
                    gysbm: 'D12567',
                    gysmc: '瓷砖',
                    pp: '史丹利',
                    bzsr: '96万',
                    zfsxf: '2000',
                    lpftze: '89000',
                    yhqftze: '8780',
                    lcye: '',
                    hdgdfy: '8900',
                    kggf: '5926',
                    kzj: '8900',
                    qtkk: '19293',
                    kksm: '',
                    sjfk: '35468',
                    status: '审核未通过'
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
