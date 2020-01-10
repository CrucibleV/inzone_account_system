<template>
  <div class="table">
    <div class="left-table-label">
        <i class="el-icon-menu"></i>
        <span class="label-text">商位信息列表</span>
    </div>
    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <el-input class="searchText"  v-model="search"  placeholder="输入供应商编码、名称或商位编码"></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%;" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column prop="shop" label="门店" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="lonDong" label="所在楼栋"  align="center"></el-table-column>
        <el-table-column prop="floor" label="所在楼层"  align="center"></el-table-column>
        <el-table-column prop="brand" label="品牌"  align="center"></el-table-column>
        <el-table-column prop="quoCodeName" label="供应商编码名称" align="center"></el-table-column>
        <el-table-column prop="quoCode" label="商位编码" align="center"></el-table-column>
        <el-table-column prop="goodLocation" label="货区编码" align="center"></el-table-column>
        <el-table-column prop="lastMod" label="最后修改时间" align="center"></el-table-column>
        <!-- <el-table-column label="操作"  align="center" width="200px" >
          <template slot-scope="scope" >
            <el-button size="mini" type="success" plain @click="checkInfo(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column> -->
      </el-table>

      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
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
                addVisible:false,
                editVisible:false,
                deleteVisible:false,
                index:0,
                msg:'',
                search:'',
                sels:'',
                tableData:[
                    {
                        index1:1,
                        shop:'法莱文商铺',
                        lonDong:'独栋',
                        floor:'2F',
                        brand:'法莱文',
                        quoCodeName:'',
                        quoCode:'000501010001',
                        goodLocation:'091-2-B1-047',
                        lastMod:'2020-01-07',
                    },
                    {
                        index1:2,
                        shop:'大成商铺',
                        lonDong:'独栋',
                        floor:'3F',
                        brand:'大成',
                        quoCodeName:'',
                        quoCode:'000501010001',
                        goodLocation:'041-2-B1-047',
                        lastMod:'2020-01-07',
                    },
                    {
                        index1:3,
                        shop:'泰尔玛商铺',
                        lonDong:'独栋',
                        floor:'1F',
                        brand:'泰尔玛',
                        quoCodeName:'',
                        quoCode:'000501010001',
                        goodLocation:'111',
                        lastMod:'2020-01-07',
                    },
                    {
                        index1:4,
                        shop:'忆家商铺',
                        lonDong:'独栋',
                        floor:'5F',
                        brand:'忆家',
                        quoCodeName:'',
                        quoCode:'000501010001',
                        goodLocation:'222',
                        lastMod:'2020-01-07',
                    },
                    {
                        index1:5,
                        shop:'赛罗克商铺',
                        lonDong:'独栋',
                        floor:'1F',
                        brand:'赛罗克',
                        quoCodeName:'',
                        quoCode:'000501010001',
                        goodLocation:'333',
                        lastMod:'2020-01-07',
                    },
                    {
                        index1:6,
                        shop:'华宝利商铺',
                        lonDong:'独栋',
                        floor:'3F',
                        brand:'华宝利',
                        quoCodeName:'',
                        quoCode:'000501010001',
                        goodLocation:'444',
                        lastMod:'2020-01-07'
                    }
                ],
                fromName:{
                    shop:'',
                    lonDong:'',
                    floor:'',
                    brand:'',
                    quoCodeName:'',
                    quoCode:'',
                    goodlocation:'',
                    lastMod:'',
                },
                rules2:{
                    shop:[
                        {required:true,message:'门店名称不能为空',trigger:'blur'}
                    ],
                    lonDong:[
                        {required:true,message:'楼栋不能为空',trigger:'blur'}
                    ],
                    floor:[
                        {required:true,message:'楼层不能为空',trigger:'blur'}
                    ],
                    quoCodeName:[
                        {required:true,message:'供应商编码名称不能为空',trigger:'blur'}
                    ],
                    quoCode:[
                        {required:true,message:'商位编码不能为空',trigger:'blur'}
                    ],
                    goodLocation:[
                        {required:true,message:'货区编码不能为空',trigger:'blur'}
                    ],
                    lastMod:[
                        {required:true,message:'修改时间不能为空',trigger:'blur'}
                    ]
                }
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
        created(){

        },
        methods:{
            selsChange(sels) {
                this.sels = sels
            },
            handleAdd(){
                this.fromName={
                    shoplocation:'',
                    shop:'',
                    floorName:'',
                    goodlocation:'',
                    shoparea:'',
                    metaial:'',
                    style:'',
                    brand:''
                }
              this.addVisible=true;
            },
            saveAdd(){
              axios({
                  url:"http://211.87.227.223:8082/group/addGroup",
                  method:"post",
                  params:{
                      token: localStorage.getItem("Authorization"),//将token保存到本地
                      shopLocation: this.fromName.shoplocation,
                      shop: this.fromName.shop,
                      floor: this.fromName.floorName,
                      goodLocation:this.fromName.goodlocation,
                      shopArea:this.fromName.shoparea,
                      metaial:this.fromName.metaial,
                      shopStyle:this.fromName.style,
                      brand:this.fromName.brand,
                  },
                  headers:{
                      'Content-type':'application/x-www-form-urlencoded'
                  }
              }).then(res=>{
                  this.getData();
                  this.$message.success('添加成功');
              }).catch(error=>{
                  console.log(error)
                  this.$message.success('添加失败');
              });
                this.addVisible = false;
            },
            searchKey(){
              let _search=this.tableData.shopLocation.toLowerCase();//用于将字符串改为小写，让模糊查询更加详细
              // console.log(_search);
              let newListData=[];//用于存放搜索出来的数据
              if (_search){
                  this.tableData.filter(item=>{
                      if (item.shopLocation.toLowerCase().indexOf(_search)!==-1){
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
                this.pagesize=val
            },
            handleCurrentChange(val){
                this.currentPage=val;
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
    width: 250px !important;
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
