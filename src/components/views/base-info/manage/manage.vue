<template>
  <div class="table">
    <div class="left-table-label">
        <i class="el-icon-menu"></i>
        <span class="label-text">商位信息列表</span>
    </div>
    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <el-input class="searchText"  v-model="search"  placeholder="输入供应商编码、名称或商位编码" clearable></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%;" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column prop="MUCNAME" label="门店" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="LD" label="所在楼栋"  align="center"></el-table-column>
        <el-table-column prop="LC" label="所在楼层"  align="center"></el-table-column>
        <el-table-column prop="CBCNAME" label="品牌"  align="center"></el-table-column>
        <el-table-column prop="SBID" label="供应商编码" align="center"></el-table-column>
        <el-table-column prop="SBCNAME" label="供应商名称" align="center"></el-table-column>
        <el-table-column prop="ID" label="商位编码" align="center"></el-table-column>
        <el-table-column prop="SPNAME" label="货区编码" align="center"></el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination @size-change="handleSizeChange"                 @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "manage",
        data(){
            return {
                currentPage:1,
                pagesize:10,
                value:'',
                list:[],
                index:0,
                totalCount: 0,
                msg:'',
                search:'',
                sels:'',
                tableData:[],
            }
        },
        computed:{
            tables:function(){
                var search=this.search;//‘’空字符串
                if(search){
                    return  this.tableData.filter(function(dataNews){
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.tableData
            }
        },
        watch:{
            search(newState,oldState){
                if(newState != oldState){
                this.currentPage = 1;
                }
            }
        },
        created(){
            this.getData();
        },
        methods:{
            selsChange(sels) {
                this.sels = sels
            },
            getData(){
                axios({
                url:"http://211.87.227.226:8201/shop/getShops",
                method:"get",
                params:{
                    keyWord:this.search,
                    pageIndex: this.currentPage,
                    pageSize: this.pagesize,
                },
                headers:{
                    'Content-type':'application/x-www-form-urlencoded'
                },
                data:[]
                }).then(res=>{
                //console.log(res.data);
                this.tableData = res.data.data;
                this.totalCount = res.data.respPage.totalCount;
                });
            },
            searchKey(){
              let _search=this.tableData.ID.toLowerCase();//用于将字符串改为小写，让模糊查询更加详细
              console.log(_search);
              let newListData=[];//用于存放搜索出来的数据
              if (_search){
                  this.tableData.filter(item=>{
                      if (item.ID.toLowerCase().indexOf(_search)!==-1){
                          newListData.push(item)
                      }
                  })
              }
              this.tableData=newListData;
            },
            checkInfo(index,row){
                this.index=index;
                this.msg=row;
                this.$router.push({
                    path:'manageInfo',
                    // query:{shopID: 1}
                })
            },
            handleSizeChange(val){
                this.pagesize=val;
                this.getData();
            },
            handleCurrentChange(val){
                this.currentPage=val;
                this.getData();
            },
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
    padding: 10px 0px;
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
    width: 260px !important;
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
