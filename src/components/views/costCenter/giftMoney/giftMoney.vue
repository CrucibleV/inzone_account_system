<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">礼品费用信息列表</span>
    </div>

      <div class="top">
        <el-input class="searchText" v-if="gift.floor!==''" v-model="gift.floor" placeholder="请输入楼层"></el-input>
        <el-button size="mini" class="primaty-top" type="primary" icon="el-icon-search" @click="searchKey"><span style="font-size: 12px">查询</span></el-button>
        <el-button size="mini" type="warning" icon="el-icon-refresh" class="bottom-top"><span style="font-size: 12px" @click="refresh">刷新</span></el-button>
      </div>


    <el-table :data="gift.slice((currentPage-1)*pagesize,currentPage*pagesize)" border @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
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

    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="gift.length">
      </el-pagination>
    </div>




  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "giftMoney",
        data(){
            return{
                gift:[],
                currentPage:1,
                pagesize:10,
                sels:'',
            }
        },
        mounted() {
            axios.get('/api/giftMoney').then(res=>{
                if (res.data.code=='0'){
                    this.gift=res.data.giftM;
                }
            })
        },
        methods:{
            handleSizeChange(val){
                this.pagesize=val;
            },
            handleCurrentChange(val){
                this.currentPage=val;
            },
            searchKey(){
                var _search=this.gift.floor.toLowerCase();
                let newList=[];
                if (_search){
                    this.gift.filter(res=>{
                        if (res.floor.toLowerCase().indexOf(_search)!==-1){
                            newList.push(res)
                        }
                    })
                }
                this.gift=newList;
            },
            selsChange(sels){
                this.sels=sels
            },
            refresh(){

            },
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
  .top{
    height:30px;
    width: 40%;
    text-align: left;
    margin-bottom: 10px;
    /*width: 350px;*/
  }
  .searchText{
    width: 180px;
    height: 30px;
  }
</style>
