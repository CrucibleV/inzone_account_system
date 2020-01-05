<template>
  <div class="top">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">楼层货区信息列表</span>
    </div>
    <div class="handle-box top-select-box clear">
      <div class="top1-top">
        <el-input class="searchText" v-model="tableData.shopName" placeholder="请输入门店名称、楼层"></el-input>
        <el-button size="mini" class="primaty-top" type="primary" icon="el-icon-search" @click="searchKey"><span style="font-size: 12px">查询</span></el-button>
      </div>
      <div class="bottom">
        <el-button size="mini" type="success" icon="el-icon-plus" class="bottom-top" suffix-icon="add" @click="handleAdd"><span style="font-size: 12px">新增货区</span></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" class="bottom-top" @click="deleteFileOrDirectory(sels)"><span style="font-size: 12px">删除</span></el-button>
        <el-button size="mini" type="warning" class="bottom-top"><i class="el-icon-download"></i>导入</el-button>
        <el-button size="mini" type="success" class="bottom-top"><i class="el-icon-upload2"></i>导出</el-button>
        <el-button size="mini" type="warning" icon="el-icon-refresh" class="bottom-top"><span style="font-size: 12px" @click="refresh">刷新</span></el-button>
      </div>
    </div>



      <el-table :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
        <el-table-column type="selection" width="55px" align="center"></el-table-column>
        <el-table-column prop="index1" label="ID" width="90px" align="center"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="shop" label="所在门店"  align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="floor" label="所在楼层" width="153px" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="floorName" label="楼层名称"  align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="floorAdmin" label="管理员名称" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="checkInfo(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom1">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>

      </div>





<!--    当selVisible为true的时候，就弹出查看框-->
    <el-dialog title="查看详细信息" :visible.sync="selVisible" width="20%" >
      <el-form ref="form" :model="form" label-width="85px" >
        <el-form-item label="门店" >
          <el-input v-model="form.shopLocation" style="width: 220px;margin-left: 20px;" disabled='true'  clearable></el-input>
        </el-form-item>
        <el-form-item label="楼层" >
          <el-input v-model="form.floorLocation" style="width: 220px;margin-left: 20px" disabled='true' clearable></el-input>
        </el-form-item>
        <el-form-item label="楼层名称" >
          <el-input v-model="form.floorNameLocation" style="width: 220px;margin-left: 20px" disabled='true' clearable></el-input>
        </el-form-item>
        <el-form-item label="管理员">
          <el-input v-model="form.floorManageAdmin" style="width: 220px;margin-left: 20px" disabled='true' clearable></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>





      <!--    //当addVisible为true的时候，就弹出添加框-->
    <el-dialog title="添加货区信息"  :visible.sync="addVisible" width="20%">
      <el-form ref="form" :model="form" label-width="85px" :rules="rules2" class="demo-ruleForm">
        <el-form-item label="门店" prop="shopLocation">
          <el-input v-model="form.shopLocation" placeholder="请输入所在门店" style="width: 220px;margin-left: 20px" clearable></el-input>
        </el-form-item>
        <el-form-item label="楼层" prop="floorLocation">
          <el-select v-model="form.floorLocation" placeholder="请输入所在楼层" style="width: 220px;margin-left: 20px" clearable>
            <el-option label="1F" value="1F" ></el-option>
            <el-option label="2F" value="2F" ></el-option>
            <el-option label="3F" value="3F"></el-option>
            <el-option label="4F" value="4F"></el-option>
            <el-option label="5F" value="5F"></el-option>
            <el-option label="6F" value="6F"></el-option>
            <el-option label="7F" value="7F"></el-option>
            <el-option label="8F" value="8F"></el-option>
            <el-option label="9F" value="9F"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层名称" prop="floorNameLocation">
          <el-select v-model="form.floorNameLocation" placeholder="请输入楼层名称" style="width: 220px;margin-left: 20px" clearable>
            <el-option label="软体家居馆" value="软体家居馆" ></el-option>
            <el-option label="软装材料馆" value="软装材料馆" ></el-option>
            <el-option label="现代实木家具馆" value="3F"></el-option>
            <el-option label="精品卫浴馆" value="精品卫浴馆"></el-option>
            <el-option label="家居生活馆" value="家居生活馆"></el-option>
            <el-option label="精品卫浴馆" value="精品卫浴馆"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员" prop="floorManageAdmin">
          <el-select v-model="form.floorManageAdmin" placeholder="请输入管理员名称" style="width: 220px;margin-left: 20px" clearable>
            <el-option label="张三" value="zhangsan"></el-option>
            <el-option label="李四" value="lisi"></el-option>
            <el-option label="王五" value="wangwu"></el-option>
            <el-option label="赵六" value="zhaoliu"></el-option>
            <el-option label="小刘" value="xiaoliu"></el-option>
          </el-select>

<!--          <el-input v-model="form.floorManageAdmin" placeholder="请输入管理员名称" style="width: 220px;margin-left: 20px" clearable></el-input>-->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveAdd">确 定</el-button>
          </span>
    </el-dialog>



<!--      //当editVisible为true的时候，弹出编辑框-->
      <el-dialog title="编辑楼层" :visible.sync="editVisible" width="20%">
        <el-form ref="form" :model="form" label-width="75px">
          <el-form-item label="门店">
            <el-input v-model="form.shopLocation" style="width: 220px;margin-left: 20px" clearable></el-input>
          </el-form-item>
          <el-form-item label="楼层">
            <el-select v-model="form.floorLocation"  style="width: 220px;margin-left: 20px" clearable>
              <el-option label="1F" value="1F" ></el-option>
              <el-option label="2F" value="2F" ></el-option>
              <el-option label="3F" value="3F"></el-option>
              <el-option label="4F" value="4F"></el-option>
              <el-option label="5F" value="5F"></el-option>
              <el-option label="6F" value="6F"></el-option>
              <el-option label="7F" value="7F"></el-option>
              <el-option label="8F" value="8F"></el-option>
              <el-option label="9F" value="9F"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="楼名称">
            <el-select v-model="form.floorNameLocation" style="width: 220px;margin-left: 20px" clearable>
              <el-option label="软体家居馆" value="软体家居馆" ></el-option>
              <el-option label="软装材料馆" value="软装材料馆" ></el-option>
              <el-option label="现代实木家具馆" value="3F"></el-option>
              <el-option label="精品卫浴馆" value="精品卫浴馆"></el-option>
              <el-option label="家居生活馆" value="家居生活馆"></el-option>
              <el-option label="精品卫浴馆" value="精品卫浴馆"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管理员">
            <el-select v-model="form.floorManageAdmin" style="width: 220px;margin-left: 20px" clearable>
              <el-option label="张三" value="zhangsan"></el-option>
              <el-option label="李四" value="lisi"></el-option>
              <el-option label="王五" value="wangwu"></el-option>
              <el-option label="赵六" value="zhaoliu"></el-option>
              <el-option label="小刘" value="xiaoliu"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>



<!--      当delVisible为true，时，弹出删除对话框-->
      <el-dialog title="删除信息" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "floor",
        data(){
            return {
                sels:'',
                scale:'',
                floor:'',
                index:0,
                msg:'',
                addVisible:false,
                editVisible:false,
                delVisible:false,
                selVisible:false,
                currentPage:1,
                pagesize:10,
                search:'',
                newTableData:[],//声明两个空数组，用来保存原来tableData数组的值，方便后面的操作
                newTableDatafloor:[],
                items:[
                    {
                        index:1,
                        name:'1F'
                    },
                    {
                        index:2,
                        name:'2F'
                    },
                    {
                        index:3,
                        name:'3F'
                    },
                    {
                        index:4,
                        name:'4F'
                    },
                    {
                        index:5,
                        name:'5F'
                    }
                ],
                sites:[
                    {
                        index:1,
                        shopName: '银座家居中心店',
                        address: '济南北园大街419号',
                        lnglat: '117.0194330000, 36.6852550000',
                        phone: '0531-55559777',
                        state: '营业中'
                    },
                    {
                        index:2,
                        shopName: '银座家居北园店',
                        address: '济南北园大街408号',
                        lnglat: '117.0143030000, 36.6831530000',
                        phone: '0531-83160000',
                        state: '营业中'
                    },
                    {
                        index:3,
                        shopName: '银座家居莱芜店',
                        address: '山东省济南市莱芜区凤城西大街065号',
                        lnglat: '117.6699000000, 36.2036700000',
                        phone: '0634-5686118',
                        state: '营业中'
                    },
                    {
                        index:4,
                        shopName: '银座家居淄博店',
                        address: '淄博市张店区新村西路29号',
                        lnglat: '118.0517490000,36.7999040000',
                        phone: '0533-62810000',
                        state: '营业中'
                    },
                    {
                        index:5,
                        shopName: '银座家居临沂店',
                        address: '临沂市兰山区沂蒙路与金四路交汇西200米',
                        lnglat: '118.3422000000,35.0635500000',
                        phone: '0539-5639000',
                        state: '营业中'
                    },
                    {
                        index:6,
                        shopName: '银座家居菏泽店',
                        address: '菏泽市开发区人民南路688号',
                        lnglat: '115.4913700000,35.1997500000',
                        phone: '0530-7086000',
                        state: '营业中'
                    },
                    {
                        index:7,
                        shopName: '银座家居滨州店',
                        address: '滨州市黄河五路与渤海十二路交汇处',
                        lnglat: '117.9932200000,37.3809900000',
                        phone: '0543-50270000',
                        state: '营业中'
                    },
                    {
                        index:8,
                        shopName: '银座家居东营店',
                        address: '东营市东二路与府前大街交汇处225号',
                        lnglat: '118.6436900000,37.4348000000',
                        phone: '0546-7790000',
                        state: '营业中'
                    },
                    {
                        index:9,
                        shopName: '银座家居威海海滨店',
                        address: '威海市环翠区青岛北路88号',
                        lnglat: '122.1378700000,37.4770700000',
                        phone: '0631-3688800',
                        state: '营业中'
                    },
                    {
                        index:10,
                        shopName: '银座家居威海幸福店',
                        address: '威海市环翠区世昌大道1号',
                        lnglat: '122.127236,37.499399',
                        phone: '0631-3688800',
                        state: '营业中'
                    }
                ],
                tableData:[
                    {
                        index1:1,
                        shop:'银座家居威海幸福店',
                        floor:'1F',
                        floorName:'家居生活馆',
                        floorAdmin:'张三'
                    },
                    {
                        index1:2,
                        shop:'银座家居中心店',
                        floor:'2F',
                        floorName:'整体厨房馆',
                        floorAdmin:'李四'
                    },
                    {
                        index1:3,
                        shop:'银座家居北园店',
                        floor:'3F',
                        floorName:'软体家居馆',
                        floorAdmin:'小李'
                    },
                    {
                        index1:4,
                        shop:'银座家居临沂店',
                        floor:'4F',
                        floorName:'精品卫浴馆',
                        floorAdmin:'小王'
                    },
                    {
                        index1:5,
                        shop:'银座家居东营店',
                        floor:'5F',
                        floorName:'现代实木家居馆',
                        floorAdmin:'小兰'
                    },
                    {
                        index1:6,
                        shop:'银座家居中心店',
                        floor:'3F',
                        floorName:'软装材料馆',
                        floorAdmin:'小明'
                    },
                    {
                        index1:7,
                        shop:'银座家居威海幸福店',
                        floor:'4F',
                        floorName:'现代实木家居馆',
                        floorAdmin:'张三'
                    },
                    {
                        index1:8,
                        shop:'银座家居菏泽店',
                        floor:'1F',
                        floorName:'精品卫浴馆',
                        floorAdmin:'小红'
                    },
                    {
                        index1:9,
                        shop:'银座家居淄博店',
                        floor:'2F',
                        floorName:'软体家居馆',
                        floorAdmin:'小刘'
                    },
                    {
                        index1:10,
                        shop:'银座家居临沂店',
                        floor:'2F',
                        floorName:'软装材料馆',
                        floorAdmin:'小王'
                    },
                    {
                        index1:11,
                        shop:'银座家居北园店',
                        floor:'5F',
                        floorName:'整体厨房馆',
                        floorAdmin:'小李'
                    }
                ],
                form:{
                  shopLocation:'',
                  floorLocation:'',
                  floorNameLocation:'',
                  floorManageAdmin:''
                },
                rules2:{
                    shopLocation:[
                        {required:true,message:'门店名称不能为空',trigger:'blur'}
                    ],
                    floorLocation:[
                        {required:true,message:'楼层不能为空',trigger:'blur'}
                    ],
                    floorNameLocation:[
                        {required:true,message:'楼层信息不能为空',trigger:'blur'}
                    ],
                    floorManageAdmin:[
                        {required:true,message:'管理员姓名不能为空',trigger:'blur'}
                    ]
                }
            }
        },
        created(){//钩子函数，给数据做一些初始化处理，但是模板还没有被渲染成HTML，这时候通过id什么的找不到元素
            this.getData();
        },
        mounted(){//钩子函数，一般用来向后端发送请求拿到数据以后做一些业务处理，vue模板已经渲染完毕，所以，DOM操作一般是在mounted钩子函数中进行的
            this.newTableData=this.tableData;
        },
        computed:{//计算属性，对数据进行一定的操作 ，只有在相关依赖发生改变的时候才能更新变化，以函数的形式返回结果，然后可以绑定计算的属性
            tables:function(){
                var search=this.search;//‘’空字符串
                if(search){
                    return  this.tableData.filter(function(dataNews){//element-ui通过过滤器实现筛选
                        return Object.keys(dataNews).some(function(key){
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.tableData//返回过滤完的数据
            }
        },
        methods:{
            selsChange(sels) {
                this.sels = sels
            },
            currentSel(value){//通过触发这个函数对表格进行筛选
                this.tableData = this.newTableData;//复制原来的数组给一个新的数组，在原来的数组上进行操作
                let newSites  =  this.tableData.filter(item=>item.shop===value);//筛选出符合条件的value值，=》表示箭头函数，item=>item.shop相当于function（item）returnitem.shop
                this.tableData = newSites;
                this.newTableDatafloor = newSites;//对楼层进行筛选
            },
            currentFloor(value){
                if(this.scale==""){
                    alert("请先选择门店");
                    this.floor="";
                    return;
                }
                this.tableData = this.newTableDatafloor;
                let newSites  =  this.tableData.filter(item=>item.floor===value);
                this.tableData = newSites;
            },
            searchKey(){
                let _search=this.tableData.shop.toLowerCase();//用于将字符串改为小写，让模糊查询更加详细
                // console.log(_search);
                let newListData=[];//用于存放搜索出来的数据
                if (_search){
                    this.tableData.filter(item=>{
                        if (item.shop.toLowerCase().indexOf(_search)!==-1){
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
            handleAdd(){
                this.form={
                    shopLocation:'',
                    floorLocation:'',
                    floorNameLocation:'',
                    floorManageAdmin:''
                }
                this.addVisible = true;
            },
            refresh:function(){
                this.reload()
                console.log("当前页面刷新了")
            },
            saveAdd(){//通过ajax的方式提交到后台
                axios({
                    url:"http://211.87.227.223:8082/group/addGroup",//提交的url
                    method:"post",//提交的方式
                    params:{
                        token: localStorage.getItem("Authorization"),//将token保存到本地
                    },
                    headers:{
                        'Content-type':'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    this.getData();
                    this.$message.success('添加成功');//添加成功
                }).catch(error=>{
                    console.log(error)
                    this.$message.success('添加失败');//添加失败
                });
                this.addVisible = false;
            },
            handleSizeChange(val){
                this.pagesize=val;
                console.log(`每页 ${val} 条`);//每页下拉显示数据
            },
            handleCurrentChange(val){
                this.currentPage=val;//点击第几页
            },

            checkInfo(index,row){
                this.index=index;
                this.msg=row;
                this.form={
                    shopLocation:this.msg.shop,
                    floorLocation:this.msg.floor,
                    floorNameLocation:this.msg.floorName,
                    floorManageAdmin:this.msg.floorAdmin
                }
                this.selVisible=true;
                /*console.log(this.msg);
                 console.log(this.index);*/
                // var newMessage=this.tableData.filter(num1=>(num1.shop===row.shop&&num1.floor===row.floor));
                // this.$router.push({
                //     path:'floorInfo'//带参数跳转内链页面，必须首先在router的index.js中进行配置。
                //     }
                // )
            },
            handleEdit(index,row){
                this.index=index;
                this.msg=row;
                this.form={
                    shopLocation:this.msg.shop,
                    floorLocation:this.msg.floor,
                    floorNameLocation:this.msg.floorName,
                    floorManageAdmin:this.msg.floorAdmin

                },
                this.editVisible=true;
            },
            saveEdit(){
                axios({
                    url: "http://211.87.227.223:8082/group/editGroup",
                    method: "post",
                    params: {//URL上要获取的额数据，按照键值对的形式写
                        token: localStorage.getItem('Authorization'),
                        shopLocation:this.form.shop,
                        floorLocation:this.form.floor,
                        floorNameLocation:this.form.floorName,
                        floorManageAdmin:this.form.floorAdmin
                    },
                    headers: {
                        'Content-type':'application/x-www-form-urlencoded'
                    }
                }).then(res=>{

                    this.getData();
                    this.$message.success(`修改成功`);
                }).catch(error=>{
                    console.log(error)
                    this.$message.success('修改失败');
                });
            },

            handleDelete(index,row){
                this.index=index;
                this.msg=row;
                this.delVisible=true;
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
            tableRowClassName({row, rowIndex}) {
                if (rowIndex % 2 == 1) {
                    return 'warning-row';
                } else {
                    return 'success-row';
                }

            },


        }
    }
</script>

<style scoped>
  .handle-box.top-select-box {
    margin-bottom: 3px;
    height: 30px;
    width: 100%;
    background: whitesmoke;
    /*text-align: center;*/
    /*height: 100%;*/
    /*background:'#eef1f6'*/
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
  .searchText{
    width: 180px;
    height: 30px;
    margin-left: 570px;
  }
  .clear{
    clear: both;
  }
  .bottom-top{
    float: left;
  }
  .primary-top{
    float: left;
    /*width: 150px;*/
  }
  .bottom1{
    width: 100%;
    height: 30px;
  }
  .top{
    width: 100%;
    font-size: 14px;
    background: #EFEFEF;
    height: 570px;
  }

  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
  .table-label{
    width: 10%;
    height: 30px;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #FFEBCD;
  }
</style>
