<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 18px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">当前管理员信息</span>
    </div>

  <div class="top-tool-wrap">
      <div class="right-handle-box">
        <el-input class="searchText" v-model="admin.nickName"   placeholder="请输入管理员名称"></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>

        <el-button class="searchBtn" size="medium" type="success" icon="el-icon-plus"  suffix-icon="add" @click="handleAdd"><span style="font-size: 12px">新增管理员</span></el-button>
      </div>
    </div>




    <el-table :data="admin.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column prop="adminID" label="管理员ID" width="100px"  align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="roleID" label="角色ID" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="loginName" label="登录名称" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="nickName" label="管理员姓名" align="center" :show-overflow-tooltip="true"></el-table-column>
      
      <el-table-column prop="passwordMD5" label="密码" type="password" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200px" align="center" :show-overflow-tooltip="true" ></el-table-column>
      <el-table-column prop="lastLoginTime" label="最后一次登录时间" width="200px" align="center" :show-overflow-tooltip="true" ></el-table-column>
      <el-table-column prop="lastIPAddress" label="IP地址" align="center" :show-overflow-tooltip="true" ></el-table-column>
      <el-table-column prop="state" label="状态" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <font v-if="scope.row.state=='0'" color="green">正常</font>
          <font v-else color="red">停用</font>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="updateInfo(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" plain @click="deleteInfo(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="admin.length">
      </el-pagination>
    </div>



<!-- 弹出添加框 -->

    <el-dialog v-el-drag-dialog title="新增管理员信息" :visible.sync="addVisible" width="25%">
      <el-form v-model="form" ref="form" label-width="135px" :rules="rules2" class="demo-ruleForm">
      <el-form-item label="管理员ID:">
          <el-select v-model="form.adminID" filterable style="width:290px;margin-left:20px" placeholder="请输入管理员ID">
            <el-option value="10001"></el-option>
            <el-option value="10002"></el-option>
            <el-option value="10003"></el-option>
            <el-option value="10004"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="角色ID:">
          <el-select v-model="form.roleID" filterable style="width:290px;margin-left:20px" placeholder="请输入角色ID">
            <el-option value="10001"></el-option>
            <el-option value="10002"></el-option>
            <el-option value="10003"></el-option>
            <el-option value="10004"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录名称:">
          <el-input v-model="form.loginName"  placeholder="请输入登录名称"  style="width:290px;margin-left:20px"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名:">
          <el-input v-model="form.nickName"  placeholder="请输入管理员姓名" style="width:290px;margin-left:20px" ></el-input>
        </el-form-item>
        <el-form-item label="密码:" >
          <el-input v-model="form.passwordMD5" type="password" placeholder="请输入密码" style="width:290px;margin-left:20px"></el-input>
        </el-form-item>
        <el-form-item label="创建时间:"> 
          <el-date-picker v-model="form.createTime" type="datetime" style="width: 290px;;margin-left:20px" placeholder="请输入创建时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="最后一次登录时间:"> 
          <el-date-picker v-model="form.lastLoginTime" type="datetime" style="width: 290px;;margin-left:20px" placeholder="请输入最后一次登录时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="IP地址:" >
          <el-input v-model="form.lastIPAddress"  placeholder="请输入IP地址" style="width:290px;margin-left:20px"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="form.state" placeholder="请输入状态" style="width:290px;margin-left:20px">
            <el-option value="0"></el-option>
            <el-option value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
    </el-dialog>

<!--当updateVisible为true的时候，就弹出修改对话框-->
    <el-dialog v-el-drag-dialog  title="修改密码信息" :visible.sync="updateVisible" width="20%">
      <el-form ref="form1" :model="form" label-width="95px" >
        <el-form-item label="管理员ID：" >
          <el-select v-model="form.adminID" filterable style="width:270px">
            <el-option value=100></el-option>
            <el-option value=100></el-option>
            <el-option value=100></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录名称：">
          <el-input v-model="form.loginName" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item label="旧密码：">
          <el-input v-model="form.oldPassword" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input v-model="form.newPassword" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item label="再次确认：">
          <el-input v-model="form.newPassword" style="width:270px"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="updateVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveUpdate">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
  import elDragDialog from '@/directive/el-drag-dialog'
import Axios from 'axios';
    export default {
      directives:{elDragDialog},
        name: "admin-setting",
        data(){
            return{
                admin:[],
                form1:{

                },
                form:{
                 adminID:null,
                  loginName:"",
                  nickName:"",
                  passwordMD5:"",
                  roleID:null,
                  companyIDs:null,
                  buildingID:null,
                  floorID:null,
                  shopID:null,
                  createTime:"",
                  lastLoginTime:"",
                  lastIPAddress:"",
                  state:null,
                  oldPassword:'',
                  newPassword:''
                },
                currentPage:1,
                pagesize:10,
                sels:"",
                index:1,
                msg:'',
                updateVisible:false,
                addVisible:false,
                // rules2:{
                //     account:[
                //         {required:true,message:'登录账号不能为空',trigger:'blur'}
                //     ],
                //     nicheng:[
                //         {required:true,message:'昵称不能为空',trigger:'blur'}
                //     ],
                //     oldPassword:[
                //         {required:true,message:'旧密码不能为空',trigger:'blur'}
                //     ],
                //     newPassword:[
                //         {required:true,message:'新密码不能为空',trigger:'blur'}
                //     ],
                //     sure:[
                //         {required:true,message:'新密码不能为空',trigger:'blur'}
                //     ],
                // }
            }
        },
        created(){
          this.getAdminList();
        },
        methods:{
          /**
           * 获取管理员列表
           */
          getAdminList(){
            Axios({
              url:this.$store.state.UrlIP+'/getAdmins',
              method:'get',
              params:{
                pageIndex:0,
                pageSize:0
              },
              headers:{
                'Content-type': 'application/x-www-form-urlencoded'
              },
              data:[]
            }).then(res=>{
              this.admin=res.data.data;
            }).catch(error=>{
              console.log(error);
            })
          },

          /**
           * 查询操作
           */
          getData(){
            var adminName=this.admin.nickName;
            console.log(adminName);
            Axios({
              url:this.$$$store.state.urlIP+'',
              method:'post',
              params:{
                token:localStorage.getItem("Authorization"),
                nickName:adminName
              },
              headers:{
                'Content-type': 'application/x-www-form-urlencoded'
              },
              data:[]
            }).then(res=>{
              this.admin=res.data.data
            }).catch(error=>{
              console.log(error)
            })
          },

          handleSizeChange(val) {
                this.pagesize = val;
                this.getData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },

            selsChange(val){
                this.sels=val;
            },
            updateInfo(index,row){
                this.index=index;
                this.msg=row;
                this.form={
                    id:this.msg.id,
                    number: this.msg.number,
                    nicheng:this.msg.nicheng,
                    oldPassword:this.msg.oldPassword,
                    newPassword:''
                };
                this.updateVisible=true;
            },
            saveUpdate(){},
            handleAdd(){
              this.form={
                adminID:null,
                  loginName:"",
                  nickName:"",
                  passwordMD5:"",
                  roleID:null,
                  companyIDs:null,
                  buildingID:null,
                  floorID:null,
                  shopID:null,
                  createTime:"",
                  lastLoginTime:"",
                  lastIPAddress:"",
                  state:null
              }
              this.addVisible=true;

            },
        }
    }
</script>

<style scoped>
  .table{
    width: 100%;
    font-size: 14px;
    background: #EFEFEF;
    height: 870px;
  }
  .table-label{
    width: 9%;
    height: 30px;
    background: #EFEFEF;
  }
   .top-tool-wrap {
    width: 100%;
    margin-bottom: 10px;
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
  .searchBtn {
    height: 40px;
  }
  .searchText {
    width: 200px !important;
    margin: 0 10px;
  }
</style>
