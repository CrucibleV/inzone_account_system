<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">返款生成列表</span>
    </div>


    <div class="handle-box top-select-box clear">
      <div class="top">
        <span style="font-size: 18px;float: left;margin-left: 100px;">活动时间:</span>
        <el-date-picker type="date" v-model="date1" placeholder="起始时间" style="width: 20%;float: left" @change="starTime" ></el-date-picker>
        <el-col class="line" :span="1" style="width:10px;height: 30px;line-height: 30px;text-align: center">-</el-col>
        <el-date-picker type="date" v-model="date2" placeholder="终止时间" style="width: 20%;float: left" @change="stopTime"></el-date-picker>
<!--        <el-input class="searchText"  placeholder="请输入返款编号"></el-input>-->
        <el-button size="mini" class="primaty-top" type="primary" icon="el-icon-search" @click="searchKey"><span style="font-size: 12px">查询</span></el-button>
      </div>
      <div class="bottom">
        <span style="font-size: 18px;float: left;margin-left: 10px;">劵扣规则:</span>
        <el-select v-model="value" placeholder="请选择劵种类" multiple style="margin-left: 20px;float: left">
          <el-option-group v-for="item in options" :key="item.label" :label="item.label">
            <el-option v-for="ite in item.options" :key="ite.value" :label="ite.label" :value="ite.value"></el-option>
          </el-option-group>
        </el-select>
        <el-button size="mizi" type="primary" @click="save" style="height: 30px;" class="primaty-top" ><span style="font-size: 12px">保存</span></el-button>
        <el-button size="mizi" type="danger" class="primaty-top" style="height: 30px;" @click="save" ><span style="font-size: 12px">取消</span></el-button>
<!--        <el-button size="mini" type="success" icon="el-icon-plus" class="bottom-top" suffix-icon="add" @click="handleAdd"><span style="font-size: 12px">新增返款</span></el-button>-->
<!--        <el-button size="mini" type="danger" icon="el-icon-delete" class="bottom-top" @click="deleteFileOrDirectory(sels)"><span style="font-size: 12px">删除</span></el-button>-->
<!--        <el-button size="mini" type="warning" class="bottom-top"><i class="el-icon-download"></i>导入</el-button>-->
<!--        <el-button size="mini" type="success" class="bottom-top"><i class="el-icon-upload2"></i>导出</el-button>-->
<!--        <el-button size="mini" type="warning" icon="el-icon-refresh" class="bottom-top"><span style="font-size: 12px" @click="refresh">刷新</span></el-button>-->
      </div>
    </div>


    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}">
      <el-table-column prop="id" label="ID" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="shopName" label="门店" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="shop" label="商场" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="floor" label="楼层" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="supplier" label="供应商" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="brand" label="品牌" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="size" label="合同号" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="price" label="实付款金额" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="pricitant" label="是否参与领增" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="online" label="线上费用" align="center"  >
        <template scope="scope">
          <font v-if="scope.row.pricitant==='是'"><div style="color: red" @click="getMock(scope.row)">{{scope.row.online}}</div></font>
          <font v-else style="font-size: 22px">-</font>
        </template>
      </el-table-column>
      <el-table-column prop="solider" label="定额费用" align="center" :show-overflow-tooltip="true">
        <template scope="scope">
          <font v-if="scope.row.pricitant==='是'"><el-input v-model="solider" placeholder="请输入" ></el-input></font>
          <font v-else style="font-size: 22px">-</font>
        </template>
      </el-table-column>
      <el-table-column prop="gift" label="礼品费" align="center" :show-overflow-tooltip="true">
        <template scope="scope">
          <font v-if="scope.row.pricitant==='是'"><div style="color: red" @click="getGift(scope.row)">{{scope.row.gift}}</div></font>
          <font v-else style="font-size: 22px">-</font>
        </template>
      </el-table-column>
      <el-table-column prop="juankou" label="劵扣费用" align="center" :show-overflow-tooltip="true">
        <template scope="scope">
          <font v-if="scope.row.pricitant==='是'">选择劵扣规则后自动生成</font>
          <font v-else style="font-size: 22px">-</font>
        </template>
      </el-table-column>
    </el-table>


    <div class="pagination">
      <!--     el-pagination新增分页   -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
      </el-pagination>
    </div>





<!--    当点击表格的某一个单元格的时候，就弹出显示框-->
    <el-dialog v-el-drag-dialog title="线上费用明细表" :visible.sync="editVisible" width="60%">
      <el-table >

      </el-table>
    </el-dialog>



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
    export default {
      directives:{elDragDialog},
        name: "moneyInfo",
        data(){
            return{
                solider:'',
                options: [{
                    label: 'A类劵',
                    options: [{
                        value: 'shuangshiyiA',
                        label: '双十一A类用劵'
                    }, {
                        value: 'alei',
                        label: '普通A类用劵'
                    }]
                }, {
                    label: 'B类劵',
                    options: [{
                        value: 'shuangshiyiB',
                        label: '双十一A类用劵'
                    }, {
                        value: 'blei',
                        label: '普通B类用劵'
                    },]
                }],
                gift:[],
                value: '',
                date1:'',
                date2:'',
                currentPage:1,
                pagesize:10,
                sels:'',
                tableData:[],
                editVisible:false,
                giftVisible:false,
            }
        },
        methods:{
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
            dateFilter:function(input){
                var d=new Date(input);
                var year=d.getFullYear();
                var month=d.getMonth()+1<10?'0'+(d.getMonth()+1):(d.getMonth()+1);
                var day=d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
                return  year+ '-' + month + '-' + day;
            },
            starTime(val){
                let startTime = this.dateFilter(val);
                this.date1 = startTime;
            },
            stopTime(val){
                let endTime = this.dateFilter(val);
                this.date2 = endTime;
            },
            selsChange(sels){
                this.sels=sels;
            },
            handleSizeChange(val){
                this.pagesize=val;
            },
            handleCurrentChange(val){
                this.currentPage=val;
            },
           async searchKey(start,stop){
                let param = {
                    date1: this.date1,
                    date2: this.date2
                };
                try {
                    axios.get('/api/add').then(res=>{
                        if (res.data.code==0){
                            this.tableData=res.data.add;
                        }
                    })
                    // const reportData = await getTeamReportList(param);
                    // if (reportData.result) {
                    //     console.log(reportData);
                    //
                    //     this.tableData = reportData.data;
                    // } else {
                    //     throw new Error(reportData.msg);
                    // }
                } catch (err) {
                    this.$message.error(err.message);
                    console.log('获取数据失败', err);
                }
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
    width: 40%;
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
