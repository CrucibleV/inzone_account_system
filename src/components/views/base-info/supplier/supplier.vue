<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">供应商信息列表</span>
    </div>

    <div class="handle-box top-select-box clear">
      <div class="top">
        <el-input class="searchText" v-if="supplier.name!=''" v-model="supplier.name"  placeholder="请输入供应商姓名"></el-input>
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



    <el-table :data="supplier.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column type="selection" width="55px" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" width="110px" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="name" label="销售商名称"  align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="phone" label="手机号码"  align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="ctime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="uptime" label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="checkInfo(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="primary"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>



    <div class="pagination">
      <!--     el-pagination新增分页   -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="supplier.length">
      </el-pagination>
    </div>




<!--    当selVisible为true的时候，就弹出查看框-->
    <el-dialog title="查看详细信息" :visible.sync="selVisible" width="20%" >
      <el-form ref="form" :model="form" label-width="85px" >
        <el-form-item label="销售商姓名" >
          <el-input v-model="form.name" style="width: 220px;margin-left: 20px;" disabled='true'  clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" >
          <el-input v-model="form.phone" style="width: 220px;margin-left: 20px" disabled='true' clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" >
          <el-input v-model="form.status" style="width: 220px;margin-left: 20px" disabled='true' clearable></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.ctime" style="width: 220px;margin-left: 20px" disabled='true' clearable></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="form.uptime" style="width: 220px;margin-left: 20px" disabled='true' clearable></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>




<!--当addVisible为true的时候，就弹出添加框-->
    <el-dialog title="添加销售商信息" :visible.sync="addVisible" width="20%">
      <el-form ref="form" :model="form" label-width="95px" :rules="rules2" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入销售商姓名" style="width: 210px;margin-left: 20px" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话号码" style="width: 210px;margin-left: 20px" clearable></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="ctime">
          <el-col :span="10">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.ctime" style="width: 145%;margin-left: 22px" clearable></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="更新时间" prop="uptime">
          <el-col :span="10">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.uptime" style="width: 145%;margin-left: 22px" clearable></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择时间" style="margin-left: 20px;width: 210px" clearable>
            <el-option label="正常" value="zhengchang"></el-option>
            <el-option label="停用" value="zanting"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
    </el-dialog>






<!--    当editVisible为true的时候，就弹出添加框-->
    <el-dialog title="编辑销售商信息" :visible.sync="editVisible" width="20%">
      <el-form ref="form" :model="form" label-width="87px" >
        <el-form-item label="销售商姓名:">
          <el-input v-model="form.name" style="width: 215px;margin-left: 20px" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" style="width: 210px;margin-left: 20px" clearable></el-input>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-col :span="10">
            <el-date-picker type="date" v-model="form.ctime" style="width: 145%;margin-left: 22px" clearable></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="更新时间:">
          <el-col :span="10">
            <el-date-picker type="date" v-model="form.uptime" style="width: 145%;margin-left: 22px" clearable></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="form.status" style="margin-left: 20px;width: 215px" clearable>
            <el-option label="正常" value="zhengchang"></el-option>
            <el-option label="停用" value="zanting"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>







    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="deleteVisible" width="300px" center>
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
        name: "supplier",
        data(){
            return{
                sels:'',
                currentPage:1,
                pagesize:10,
                addVisible:false,
                deleteVisible:false,
                editVisible:false,
                selVisible:false,
                // name:'',
                // ctime:'',
                // uptime:'',
                // status:'',
                supplier:[],
                ind:1,
                msg:'',
                form:{
                    phone:'',
                    name:'',
                    ctime:'',
                    uptime:'',
                    status:''
                },
                rules2:{
                    name:[
                        {required:true,message:'销售者姓名不能为空',trigger:'blur'}
                    ],
                    ctime:[
                        {required:true,message:'创建时间不能为空',trigger:'blur'}
                    ],
                    uptime:[
                        {required:true,message:'更新时间不能为空',trigger:'blur'}
                    ],
                    status:[
                        {required:true,message:'状态不能为空',trigger:'blur'}
                    ],
                    phone:[
                        {required:true,message:'状态不能为空',trigger:'blur'}
                    ]
                },
            }
        },
        mounted:function(){
            axios.get('/api/supplier').then(res=>{
                let res1 = res.data;
                 if(res1.code==0){
                     this.supplier=res1.supplier
                 }

            })
        },
        methods:{


            //查询，根据姓名进行模糊查询
            searchKey(){   //注意，方法中的方法名不能喝data中的属性重名
                let _key=this.supplier.name.toLowerCase();
                // console.log(_key)
                let newList=[];//声明一个新的数组，用于存放查询出来的数据，进行页面展示
                if (_key){
                    this.supplier.filter(item=>{
                        if (item.name.toLowerCase().indexOf(_key)!==-1){
                            newList.push(item)
                        }
                    })
                }
                this.supplier=newList
            },
            handleAdd(){
                this.form={
                    id:'',
                    name:'',
                    ctime:'',
                    uptime:'',
                    status:''
                }
                this.addVisible=true;
            },
            deleteFileOrDirectory(val){},
            refresh(){},
            selsChange(sels){
                this.sels = sels
            },
            checkInfo(index,row){
                this.ind=index;
                this.msg=row;
                this.form={
                    phone:this.msg.phone,
                    name:this.msg.name,
                    ctime:this.msg.ctime,
                    uptime:this.msg.uptime,
                    status:this.msg.status,
                }
                this.selVisible=true;
            },
            handleEdit(index,row){
                this.ind=index;
                this.msg=row;
                this.form={
                    phone:this.msg.phone,
                    name:this.msg.name,
                    ctime:this.msg.ctime,
                    uptime:this.msg.uptime,
                    status:this.msg.status,
                };
                this.editVisible=true;
            },
            handleDelete(index,row){
                this.ind=index;
                this.msg=row;
                this.deleteVisible=true;
            },
            handleSizeChange(val){
                this.pagesize=val;
            },
            handleCurrentChange(val){
                this.currentPage=val;

            },
            deleteRow(){
                this.deleteVisible=false;
                axios.get('/api/delete',{
                    params:{
                        id:this.form.id
                    }
                }).then(res=>{
                    this.supplier=res.data
                })
            },
            saveAdd(){

                axios.get('/api/addSupplier',{
                    params:{
                        name:'this.form.name',
                        ctime:'this.form.ctime',
                        uptime:'this.form.uptime',
                        status:'this.form.status'
                    }
                }).then(res=>{
                    console.log(res);
                    this.supplier=res.data.supplier
                })
                // axios({
                //     url:"http://211.87.227.223:8082/group/addGroup",
                //     method:"post",
                //     params:{
                //         token: localStorage.getItem("Authorization"),//将token保存到本地
                //         shopName: this.form.shopName,
                //         address: this.form.address,
                //         lnglat: this.form.lnglat,
                //         phone:this.form.lnglat,
                //         state:this.form.state
                //     },
                //     headers:{
                //         'Content-type':'application/x-www-form-urlencoded'
                //     }
                // }).then(res=>{
                //     this.getData();
                //     this.$message.success('添加成功');
                // }).catch(error=>{
                //     console.log(error)
                //     this.$message.success('添加失败');
                // });
                // this.addVisible= false;




                // axios({
                //     url:'/api/addSupplier',
                //     methods: 'get',
                //     params: {
                //         name:this.form.name,
                //         ctime:this.form.ctime,
                //         uptime:this.form.uptime,
                //         status:this.form.status
                //     },
                //     headers:{     //将表格转化为普通表格进行提交
                //         'content-type':'application/x-www-form-urlencoded'
                //     }
                // }).then(res=>{
                //     this.$message.success('添加成功')
                // }).catch(error => {
                //     console.log(error)
                //     this.$message.success('添加失败')
                // });
                this.addVisible=false
            },
            saveEdit(){

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
  .handle-box.top-select-box {
    margin-bottom: 3px;
    height: 30px;
    width: 100%;
    background: whitesmoke;
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
  .clear{
    clear:both;
  }
  .bottom-top{
    float: left;
    margin-left: 20px;
  }
</style>
