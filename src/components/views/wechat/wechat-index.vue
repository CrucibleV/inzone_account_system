<template>
  <div class="table">
    <div class="left-right">
      <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
              <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">微信成员信息列表</span>
      </div>
      <div class="handle-box top-select-box clear">
        <div class="top">
          <el-input class="searchText" v-model="tableData.name" placeholder="请输入成员姓名"></el-input>
          <el-button size="mini" class="primaty-top" type="primary" icon="el-icon-search" @click="searchKey"><span style="font-size: 12px">查询</span></el-button>
        </div>
        <div class="bottom">
          <el-button size="mini" type="success" icon="el-icon-plus" class="bottom-top" suffix-icon="add" @click="handleAdd"><span style="font-size: 12px">新增成员</span></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" class="bottom-top" @click="deleteFileOrDirectory(sels)"><span style="font-size: 12px">批量删除</span></el-button>
          <el-button size="mini" type="warning" class="bottom-top"><i class="el-icon-download"></i>导入</el-button>
          <el-button size="mini" type="success" class="bottom-top"><i class="el-icon-upload2"></i>导出</el-button>
          <el-button size="mini" type="warning" icon="el-icon-refresh" class="bottom-top"><span style="font-size: 12px" @click="refresh">刷新</span></el-button>
        </div>
      </div>
      <div class="right3">
        <el-table :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%"  @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
          <el-table-column type="selection" align="center"></el-table-column>
           <el-table-column prop="index1" label="ID" align="center"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="sex" label="性别" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="job" label="职务" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="department" label="部门" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="phone" label="电话" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="email" label="电子邮件" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="checkInfo(scope.$index, scope.row)">查看</el-button>
<!--                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
<!--                <el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
              </template>
            </el-table-column>

        </el-table>
      </div>

      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
      </div>

    </div>



    <!-- 添加弹出框,visible是否支持Dialog显示，支持sync修饰符 -->
    <el-dialog v-el-drag-dialog title="添加微信成员"  :visible.sync="addVisible" width="20%">
      <el-form ref="form" :model="form" label-position='right'  label-width="85px" :rules="rules2" class="demo-ruleForm">

        <el-form-item label="昵称:" prop="number1">
          <el-col :span="21" :push="2">
            <el-input  placeholder="请输入昵称 " style="margin-bottom:6px;" clearable></el-input>
          </el-col>
        </el-form-item>


        <el-form-item label="微信号:" prop="weChatNumber">
          <el-col :span="21" :push="2">
            <el-input  placeholder="请输入微信号" style="margin-bottom:20px;" clearable></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="性别:" prop="sex">
            <el-radio-group v-model="form" style="width: 200px;margin-left: 22px" >
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>

        <el-divider></el-divider>

        <el-form-item label="手机:" prop="phone">
          <el-col :span="21" :push="2">
            <el-input  placeholder="请输入成员手机" style="margin-bottom:6px;" clearable></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="座机:">
          <el-col :span="21" :push="2">
            <el-input  placeholder="请输入成员座机" style="margin-bottom:6px;" clearable></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="邮箱:" prop="email">
          <el-col :span="21" :push="2">
            <el-input  placeholder="请输入成员邮箱" style="margin-bottom:6px;" clearable></el-input>
          </el-col>
         </el-form-item>

        <el-form-item label="地址:" prop="address">
          <el-col :span="21" :push="2">
            <el-input  placeholder="请输入成员地址" style="margin-bottom:6px;" clearable></el-input>
          </el-col>
        </el-form-item>

        <el-divider></el-divider>

        <el-form-item label="部门:" prop="department">
          <el-select v-model="form.department" placeholder="请选择部门" style="margin-bottom:6px;width: 265px;margin-left: 25px" clearable>
            <el-option label="研发部" value="yanfa"></el-option>
            <el-option label="开发部" value="kaifa"></el-option>
            <el-option label="运维部" value="yunwei"></el-option>
            <el-option label="财务部" value="caiwu"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="职责:">
          <el-col :span="21" :push="2">
            <el-input  placeholder="请输入成员职责" style="margin-bottom:6px;"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="职务:">
          <el-select v-model="form.job" placeholder="请选择职务" style="margin-bottom:6px;width: 265px;margin-left: 25px">
            <el-option label="部长" value="buzhang"></el-option>
            <el-option label="运维" value="yunwei"></el-option>
            <el-option label="审计" value="shenji"></el-option>
            <el-option label="财务" value="caiwu"></el-option>
          </el-select>
        </el-form-item>
      </el-form>


      <span slot="footer" class="dialog-footer">
          <el-button @click="updateVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
    </el-dialog>






<!--    当编辑的属性为true的时候，就弹出编辑框-->
    <el-dialog v-el-drag-dialog title="编辑成员信息" :visible.sync="updateVisible" width="30%">
      <el-form ref="form" :model="form" label-position='right'  label-width="100px" >
        <el-form-item >
          <el-col :span="3" :pull="2" style="border:1px solid white; height:60px;" class="col-img" >
          </el-col>
          <el-col :span="21" :pull="1">
            <el-input  v-model="form.name" style="margin-bottom:6px;" clearable></el-input>
            <el-input  v-model="form.alise" style="margin-bottom:6px;" clearable></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="微信号:">
<!--          <el-input  v-model="form.number" clearable></el-input>-->
          <el-col :span="21" :push="2">
            <el-input  v-model="form.number" style="margin-bottom:6px;" clearable></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="性别:">
          <el-col :span="21" :push="2">
            <el-input  v-model="form.sex" style="margin-bottom:6px;" clearable></el-input>
          </el-col>
<!--          <el-input v-model="form.sex" clearable></el-input>-->
        </el-form-item>

        <el-divider></el-divider>

        <el-form-item label="手机:">
<!--          <el-input  v-model="form.phone" clearable></el-input>-->
          <el-col :span="21" :push="2">
            <el-input  v-model="form.phone" style="margin-bottom:6px;" clearable></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="座机:">
<!--          <el-input  v-model="form.phone1" clearable></el-input>-->
          <el-col :span="21" :push="2">
            <el-input  v-model="form.phone1" style="margin-bottom:6px;" clearable></el-input>
            <span style="color: grey">未设置</span>
          </el-col>
        </el-form-item>

        <el-form-item label="邮箱:">
<!--          <el-input  placeholder="请输入成员邮箱" clearable></el-input>-->
          <el-col :span="21" :push="2">
            <el-input  v-model="form.email" style="margin-bottom:6px;" clearable></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="地址:">
<!--          <el-input  v-model="form.address" clearable></el-input>-->
          <el-col :span="21" :push="2">
            <el-input  v-model="form.address" style="margin-bottom:6px;" clearable></el-input>
          </el-col>
        </el-form-item>

        <el-divider></el-divider>

        <el-form-item label="部门:">
          <el-col :span="21" :push="2">
            <el-select v-model="form.department" style="margin-bottom:6px;width: 100%">
              <el-option label="研发部" value="yanfa"></el-option>
              <el-option label="开发部" value="kaifa"></el-option>
              <el-option label="运维部" value="yunwei"></el-option>
              <el-option label="财务部" value="caiwu"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

<!--        <el-form-item label="职责:">-->
<!--          <el-col :span="21" :push="2">-->
<!--            <el-input  v-model="form.duty" style="margin-bottom:6px;" clearable></el-input>-->
<!--            <span style="color: grey">未设置</span>-->
<!--          </el-col>-->
<!--        </el-form-item>-->

        <el-form-item label="职务:">
          <el-col :span="21" :push="2">
            <el-select v-model="form.job" style="margin-bottom:6px;width: 100%">
              <el-option label="部长" value="buzhang"></el-option>
              <el-option label="运维" value="yunwei"></el-option>
              <el-option label="审计" value="shenji"></el-option>
              <el-option label="财务" value="caiwu"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>


      <span slot="footer" class="dialog-footer">
          <el-button @click="updateVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
    </el-dialog>




    <!-- 删除提示框 -->
    <el-dialog v-el-drag-dialog  title="提示" :visible.sync="deleteVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import elDragDialog from '@/directive/el-drag-dialog'
    export default {
      directives:{elDragDialog},
        name: "wechat-index",
        data(){
            return{
                addVisible:false,
                searchVisible:false,
                updateVisible:false,
                deleteVisible:false,
                sels:[],
                ids:[],
                input:'',
                index:0,
                msg:'',
                currentPage:1,
                pagesize:10,
                search:'',
                department:'',
                scale:'',
                newJob:[],
                newDepartment:[],
                value:'',
                value1:'',
                value2:'',
                filterText: '',
                ite1:[
                    {
                        index:1,
                        job:'部长'
                    },
                    {
                        index:2,
                        job:'审计'
                    },
                    {
                        index:3,
                        job:'运维'
                    },
                    {
                        index:4,
                        job:'财务'
                    },
                ],
                ite:[
                    {
                        index:1,
                        dep:'研发部'
                    },
                    {
                        index:2,
                        dep:'运维部'
                    },
                    {
                        index:3,
                        dep:'开发部'
                    },
                    {
                        index:4,
                        dep:'审计部'
                    }
                ],
                itemss:[
                    {
                        value:'选项1',
                        label:'女'
                    },
                    {
                        value: '选项2',
                        label: '男'
                    }
                ],
                items:[
                    {
                        index:1,
                        departments:'研发部'
                    },{
                        index:2,
                        departments:'运维部'
                    },{
                        index:3,
                        departments:'商务部'
                    },{
                        index:4,
                        departments:'测试部'
                    },{
                        index:5,
                        departments:'开发部'
                    },
                ],
                sites:[
                    {
                        index:1,
                        jobs:'部长',
                    },
                    {
                        index:2,
                        jobs:'运维',
                    },
                    {
                        index:3,
                        jobs:'审计',
                    },
                    {
                        index:4,
                        jobs:'财务',
                    },
                ],
                tableData:[
                    {
                        index1:1,
                        name:'郭瑞',
                        sex:'男',
                        job:"部长",
                        department:'研发部',
                        phone:'111',
                        email:'11@qq.com'
                    },
                    {
                        index1:2,
                        name:'张玉龙',
                        sex:'男',
                        job:"运维",
                        department:'运维部',
                        phone:'22',
                        email:'22@qq.com'
                    },
                    {
                        index1:3,
                        name:'程满元',
                        sex:'男',
                        job:"审计",
                        department:'开发部',
                        phone:'333',
                        email:'33@qq.com'
                    },
                    {
                        index1:4,
                        name:'牛亚朦',
                        sex:'女',
                        job:"财务",
                        department:'财务部',
                        phone:'888',
                        email:'888@qq.com'
                    },
                ],
                form:{
                    alise:'七年~',
                    remarks:'',
                    name:'',
                    number:'m2331771385',
                    sex:'',
                    address:'山东菏泽',
                    phone:'',
                    phone1:'',
                    department:'',
                    email:'',
                    job:'',
                    duty:'',
                    domains: [{
                        value: ''
                    }],
                },
                rules2: {
                    weChatNumber: [
                        { required: true, message: '请输入微信号', trigger: 'blur' },
                        // { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
                    ],
                    sex:[
                        {required: true,message:'性别不能为空',trigger:'blur'}
                    ],
                    address:[
                        {required:true,message:'地址不能为空',trigger:'blur'}
                    ],
                    department:[
                        {required:true,message:'部门不能为空',trigger:'blur'}
                    ],
                    phone:[
                        {required:true,message:'电话不能为空',trigger:'blur'}
                    ],
                    email:[
                        {required:true,message:'email不能为空',trigger:'blur'}
                    ],
                    number1:[
                        {required:true,message:'昵称不能为空',trigger:'blur'}
                    ],

                }
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
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
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                var index = this.form.domains.indexOf(item)
                if (index !== -1) {
                    this.form.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.form.domains.push({
                    value: '',
                    key: Date.now()
                });
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            add(){
              // alert(111)
            },
            //选中的时候触发
            selsChange(sels) {
                this.sels = sels
            },
            handleSizeChange(val) {
                this.pagesize = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            currentSel(val) {
                // console.log(this.scale)
                // console.log("val:"+val)
                this.tableData = this.newJob;//复制原来的数组给一个新的数组，在原来的数组上进行操作
                let newSites = this.tableData.filter(item => item.job === val);//筛选出符合条件的value值，=》表示箭头函数，item=>item.shop相当于function（item）returnitem.shop
                this.tableData = newSites;
                // this.newTableDatafloor = newSites;//
            },
            currentDepartment(val) {

            },
            searchKey(){
                let _search=this.tableData.name.toLowerCase();//用于将字符串改为小写，让模糊查询更加详细
                // console.log(_search);
                let newListData=[];//用于存放搜索出来的数据
                if (_search){
                    this.tableData.filter(item=>{
                        if (item.name.toLowerCase().indexOf(_search)!==-1){
                            newListData.push(item)
                        }
                    })
                }
                 this.tableData=newListData;
            },
            handleAdd() {
                this.addVisible=true;
            },
            saveAdd(){

            },
            checkInfo(index, row) {
                this.searchVisible=true;
                 this.$router.push({
                         path: 'wechatInfo'//带参数跳转内链页面，必须首先在router的index.js中进行配置。
                     }
                 )
            },
            handleEdit(index, row) {
                this.index=index;
                this.msg=row;
                this.form={
                    alise:'七年~',
                    remarks:'',
                    name:this.msg.name,
                    number:'m2331771385',
                    sex:this.msg.sex,
                    address:'山东菏泽',
                    phone:this.msg.phone,
                    phone1:'',
                    department:this.msg.department,
                    email:this.msg.email,
                    job:this.msg.job,
                    duty:'',
                }
                this.updateVisible=true;
            },
            handleDel(index, row) {
                this.index=index;
                this.msg=row;
                this.deleteVisible=true;
            },
            //批量的删除
            deleteFileOrDirectory(rows) {
                var _this = this;
                _this.$confirm('是否确认此操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    rows.forEach(element =>{
                        _this.ids.push(element.index1)
                    })
                    let param = {
                        // "token": getSessiontoken('token'),
                        "index1":_this.ids
                    }

                    // deleteAllCharging(param).then(function (res) {
                    //
                    //     console.log(111)
                    //     var obj = JSON.parse(utilFile.decrypt(res.data.a));
                    //     if (obj.code == '200') {
                    //         _this.$message.success('操作成功');
                    //         _this.chargingUserList();
                    //     } else {
                    //         _this.$message.error(obj.msg);
                    //     }
                    // }).catch(function (err) {
                    //     console.log(err);
                    // })

                }).catch(() => {
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
            updatePhoto(){

            },
            deleteRow(){
                // var groupID = this.msg.GroupID;
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
            }
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
  .searchText{
    width: 180px;
    height: 30px;
    margin-left: 570px;
  }
  .top{
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
  .table{
    width: 100%;
    font-size: 14px;
    background: #EFEFEF;
    height: 570px;
  }
  .header{
    margin-bottom: 10px;
    height: 40px;
    width: 100%;
    background: whitesmoke;
  }

  .clear{
    clear: both;
  }

  .primary-top{
    float: left;
    /*width: 150px;*/
  }

  .bottom1{
    width: 100%;
    height: 30px;
  }
  .container{
    background: #EFEFEF;
    height: 570px;
    width: 95%;
  }
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center;
    color: black;
  }
  .el-table .warning-row {
   background: #5FB878;

  }
  .el-table .success-row {
    background: yellowgreen;
  }
  .table-label{
    width: 12%;
    height: 30px;
    background: #EFEFEF;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #FFEBCD;
  }
  .clear{
    clear:both;
  }
  .bottom-top{
     float: left;
   }
  .left-left{
    width: 15%;
    height: 100%;
    float: left;
    background: whitesmoke;
  }
  .left-top{
    height: 6%;
    width: 100%;
  }
  .left-top-left{
    float: left;
    height: 100%;
    width: 85%;
    margin-top: 5px;
  }
  .left-top-right{
    float: left;
    width: 15%;
    height: 100%;
  }
  .left-right{
    float: left;
    width:100%;
    height: 100%;
  }
  .right-middle{
    height: 40px;
    line-height: 40px;
    width: 100%;
    background: whitesmoke;
    margin-top: 5px;
  }
  .right3{
    width: 100%;
  }
  .left-bottom{
    width: 100%;
    height:90%;
    margin-top:10px;
  }
  .right-1{
    height: 23%;
    width: 95%;
    margin-left: 10px;
    border-bottom: #bcbec2 1px solid;
  }
  .right-img{
    height:100%;
    width: 20%;
    background: url(../../../assets/images/wecha.jpg) no-repeat;
    float: left;
  }
  .right-text{
    margin-left: 10px;
    float: left;
    height: 100%;
    width: 70%;
  }
  .center-1{
    height: 550px;
    width: 100%;
  }
  .right-text-1,.right-text-3{
    color: black;
    font-size: 20px;
    width: 50%;
    height: 33%;
    text-align: left;
  }

  .right-text-2{
    font-size: 20px;
    width: 50%;
    height: 33%;
    text-align: left;
    color: grey;
  }
  .right-2{
    height: 33%;
    width: 95%;
    margin-left: 10px;
    border-bottom: #bcbec2 1px solid;

  }
  .right-2-left1,.right-2-left2{
    width: 50%;
    height: 23%;
    color: black;
    font-size: 20px;
  }
  .col-img{
    background: url(../../../assets/images/img-1.jpg);
  }
</style>
