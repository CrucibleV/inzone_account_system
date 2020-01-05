<template>
  <div class="top">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">商位管理信息列表</span>
    </div>
    <div class="handle-box top-select-box clear">
      <div class="top1-top">
        <el-input class="searchText" v-model="tableData.shopLocation" placeholder="请输入门店名称"></el-input>
        <el-button size="mini" class="primaty-top" type="primary" icon="el-icon-search" @click="searchKey"><span style="font-size: 12px">查询</span></el-button>
      </div>
      <div class="bottom">
        <el-button size="mini" type="success" icon="el-icon-plus" class="bottom-top" suffix-icon="add" @click="handleAdd"><span style="font-size: 12px">新增门店</span></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" class="bottom-top" @click="deleteFileOrDirectory(sels)"><span style="font-size: 12px">删除</span></el-button>
        <el-button size="mini" type="warning" class="bottom-top"><i class="el-icon-download"></i>导入</el-button>
        <el-button size="mini" type="success" class="bottom-top"><i class="el-icon-upload2"></i>导出</el-button>
        <el-button size="mini" type="warning" icon="el-icon-refresh" class="bottom-top"><span style="font-size: 12px" @click="refresh">刷新</span></el-button>
      </div>
    </div>

      <el-table :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" border @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
        <el-table-column type="selection" width="55px" align="center"></el-table-column>
        <el-table-column prop="index1" label="ID" width="90px" align="center"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="shopLocation" label="商铺" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="shop" label="所在门店" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="floor" label="所在楼层" width="120px" align="center"></el-table-column>
        <el-table-column prop="goodLocation" label="所在货区" width="145px" align="center"></el-table-column>
        <el-table-column prop="shopArea" label="商铺面积" width="120px" align="center"></el-table-column>
        <el-table-column prop="meatial" label="材质" width="120px" align="center"></el-table-column>
        <el-table-column prop="shopStyle" label="风格" width="120px" align="center"></el-table-column>
        <el-table-column prop="brand" label="品牌" width="120px" align="center"></el-table-column>
        <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <!--              type="text"代表文字按钮-->
            <el-button size="mini" type="success" @click="checkInfo(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="footer">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
      </div>




<!--      当addVisible为true的时候，就弹出添加框-->
      <el-dialog title="添加商位" :visible.sync="addVisible" width="25%" >
        <el-form ref="fromName" :model="fromName" label-width="75px" :rules="rules2" class="demo-ruleForm">
          <el-form-item label="商铺" prop="shopLocation">
            <el-input v-model="fromName.shoplocation" placeholder="请输入商铺名称" clearable></el-input>
          </el-form-item>

          <el-form-item label="门店" prop="shop">
            <el-input v-model="fromName.shop" placeholder="请输入门店名称" clearable></el-input>
          </el-form-item>

          <el-form-item label="楼层" prop="floorName">
            <el-input v-model="fromName.floorName" placeholder="请输入楼层" clearable></el-input>
          </el-form-item>

          <el-form-item label="货区" prop="goodLocation">
            <el-input v-model="fromName.goodlocation" placeholder="请输入货区编码" clearable></el-input>
          </el-form-item>

          <el-form-item label="面积" prop="shopArea">
            <el-input v-model="fromName.shoparea" placeholder="请输入面积" clearable></el-input>
          </el-form-item>

          <el-form-item label="材质" prop="metaial">
            <el-input v-model="fromName.metaial" placeholder="请输入材质" clearable></el-input>
          </el-form-item>

          <el-form-item label="风格" prop="style">
            <el-input v-model="fromName.style" placeholder="请输入风格" clearable></el-input>
          </el-form-item>

          <el-form-item label="品牌" prop="brand">
            <el-input v-model="fromName.brand" placeholder="请输入品牌" clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
      </el-dialog>




<!--      当editVisible为true的时候，就弹出编辑框-->
      <el-dialog title="编辑" :visible.sync="editVisible" width="25%" >
        <el-form ref="fromName" :model="fromName" label-width="75px">
          <el-form-item label="商铺">
            <el-input v-model="fromName.shoplocation" clearable></el-input>
          </el-form-item>

          <el-form-item label="门店">
            <el-input v-model="fromName.shop" clearable></el-input>
          </el-form-item>

          <el-form-item label="楼层">
            <el-input v-model="fromName.floorName" clearable></el-input>
          </el-form-item>

          <el-form-item label="货区">
            <el-input v-model="fromName.goodlocation"></el-input>
          </el-form-item>

          <el-form-item label="面积">
            <el-input v-model="fromName.shoparea" clearable></el-input>
          </el-form-item>

          <el-form-item label="材质">
            <el-input v-model="fromName.metaial"></el-input>
          </el-form-item>

          <el-form-item label="风格">
            <el-input v-model="fromName.style"></el-input>
          </el-form-item>

          <el-form-item label="品牌">
            <el-input v-model="fromName.brand"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>



<!--      当deleteVisible为true的时候，就弹出删除框-->
      <el-dialog title="提示" :visible.sync="deleteVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow">确 定</el-button>
        </span>
      </el-dialog>
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
                        shopLocation:'法莱文商铺',
                        shop:'银座家居中心店',
                        floor:'2F',
                        goodLocation:'091-2-B1-047',
                        shopArea:'200平方',
                        meatial:'防水',
                        shopStyle:'日系',
                        brand:'法莱文'
                    },
                    {
                        index1:2,
                        shopLocation:'大成商铺',
                        shop:'银座家居北园店',
                        floor:'3F',
                        goodLocation:'041-2-B1-047',
                        shopArea:'100平方米',
                        meatial:'塑胶',
                        shopStyle:'田园',
                        brand:'大成'
                    },
                    {
                        index1:3,
                        shopLocation:'泰尔玛商铺',
                        shop:'银座家居临沂店',
                        floor:'1F',
                        goodLocation:'111',
                        shopArea:'50平方米',
                        meatial:'防水',
                        shopStyle:'欧美',
                        brand:'泰尔玛'
                    },
                    {
                        index1:4,
                        shopLocation:'忆家商铺',
                        shop:'银座家居菏泽店',
                        floor:'5F',
                        goodLocation:'222',
                        shopArea:'100平方米',
                        meatial:'塑胶',
                        shopStyle:'田园',
                        brand:'忆家'
                    },
                    {
                        index1:5,
                        shopLocation:'赛罗克商铺',
                        shop:'银座家居滨州店',
                        floor:'1F',
                        goodLocation:'333',
                        shopArea:'50平方米',
                        meatial:'防水',
                        shopStyle:'日系',
                        brand:'赛罗克'
                    },
                    {
                        index1:6,
                        shopLocation:'华宝利商铺',
                        shop:'银座家居中心店',
                        floor:'3F',
                        goodLocation:'444',
                        shopArea:'100平方米',
                        meatial:'塑胶',
                        shopStyle:'欧美',
                        brand:'华宝利'
                    }
                ],
                fromName:{
                    shoplocation:'',
                    shop:'',
                    floorName:'',
                    goodlocation:'',
                    shoparea:'',
                    metaial:'',
                    style:'',
                    brand:''
                },
                rules2:{
                    shopLocation:[
                        {required:true,message:'商铺不能为空',trigger:'blur'}
                    ],
                    shop:[
                        {required:true,message:'门店名称不能为空',trigger:'blur'}
                    ],
                    floorName:[
                        {required:true,message:'楼层不能为空',trigger:'blur'}
                    ],
                    goodLocation:[
                        {required:true,message:'货区不能为空',trigger:'blur'}
                    ],
                    shopArea:[
                        {required:true,message:'面积不能为空',trigger:'blur'}
                    ],
                    metaial:[
                        {required:true,message:'材质不能为空',trigger:'blur'}
                    ],
                    style:[
                        {required:true,message:'风格不能为空',trigger:'blur'}
                    ],
                    brand:[
                        {required:true,message:'品牌不能为空',trigger:'blur'}
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
            //批量的删除
            deleteFileOrDirectory(row) {
                var _this = this;
                _this.$confirm('是否确认此操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    rows.forEach(element =>{
                        _this.ids.push(element.chargingStationId)
                    })
                    let param = {
                        "token": getSessiontoken('token'),
                        "chargingStationIdList":_this.ids
                    }
                    deleteAllCharging(param).then(function (res) {
                        var obj = JSON.parse(utilFile.decrypt(res.data.a));
                        if (obj.code == '200') {
                            _this.$message.success('操作成功');
                            _this.chargingUserList();
                        } else {
                            _this.$message.error(obj.msg);
                        }
                    }).catch(function (err) {
                        console.log(err);
                    })

                }).catch(() => {
                    alert(2)
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            refresh:function(){
                this.reload()
                console.log("当前页面刷新了")
            },
            checkInfo(index,row){
                this.index=index;
                this.msg=row;
                this.$router.push({
                    path:'manageInfo',
                    // query:{shopID: 1}
                })
            },
            handleEdit(index,row){
                this.index=index;
                this.msg=row;
                this.editVisible=true;
                this.fromName={
                    shoplocation:this.msg.shopLocation,
                    shop:this.msg.shop,
                    floorName:this.msg.floor,
                    goodlocation:this.msg.goodLocation,
                    shoparea:this.msg.shopArea,
                    metaial:this.msg.meatial,
                    style:this.msg.shopStyle,
                    brand:this.msg.brand
                }
            },
            saveEdit() {
                axios({
                    url:"http://211.87.227.223:8082/group/editGroup",//以ajax的方法传递给后端
                    method:"post",
                    params:{
                        token: localStorage.getItem("Authorization"),//将token保存到本地
                        shopLocation: this.fromName.shoplocation,
                        shop: this.fromName.shop,
                        floor: this.fromName.floorName,
                        goodLocation:this.fromName.goodlocation,
                        shopArea:this.fromName.shoparea,
                        meatial:this.fromName.metaial,
                        shopStyle:this.fromName.style,
                        brand:this.fromName.brand,
                    },
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded'
                    }
                }).then(res=>{

                    this.getData();
                    this.$message.success(`修改成功`);
                }).catch(error=>{
                    console.log(error)
                    this.$message.success('修改失败');
                });
                this.editVisible = false;

            },
            deleteRow(){
                var groupID = this.msg.GroupID;
                axios({
                    url:"http://211.87.227.223:8082/group/deleteGroup",
                    method:"post",
                    params:{
                        groupID: groupID,
                        token:localStorage.getItem("Authorization"),
                    },
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    this.getData();
                    this.$message.success('删除成功');
                }).catch(error=>{
                    console.log(error)
                    this.$message.success('删除失败');
                });
                this.delVisible = false;
            },
            handleDelete(index,row){
                this.index=index;
                this.msg=row;
                this.deleteVisible=true;
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
  .top{
    width: 100%;
    font-size: 14px;
    background: #EFEFEF;
    height: 570px;
  }
  .footer {
    margin-top: 10px;
  }
  .el-pagination{
    text-align: right;
  }
  .table-label{
    width: 10%;
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
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
  .searchText{
    width: 180px;
    height: 30px;
    margin-left: 570px;
  }
  .top1-top{
    float:left;
    height:30px;
    width: 50%;
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
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #FFEBCD;
  }
  .bottom-top{
    float: left;
    margin-left: 20px;
  }
</style>
