<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">当前管理员信息</span>
    </div>
    <el-table :data="admin.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column prop="id" label="登录员ID" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="number" label="登录账号" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="nicheng" label="昵称" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="role" label="角色" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="oldPassword" label="密码" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button size="mini" type="primary" @click="updateInfo(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--当updateVisible为true的时候，就弹出修改对话框-->

    <el-dialog v-el-drag-dialog  title="修改信息" :visible.sync="updateVisible" width="20%">
      <el-form ref="form" :model="form" label-width="95px" :rules="rules2" class="demo-ruleForm">
        <el-form-item label="ID：" >
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="登录账号：" prop="account" >
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="nicheng">
          <el-input v-model="form.nicheng"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="form.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码确认" prop="sure">
          <el-input v-model="form.newPassword"></el-input>
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
    export default {
      directives:{elDragDialog},
        name: "admin-setting",
        data(){
            return{
                admin:[
                    {
                        id:'1000',
                        number:'admin',
                        nicheng:"超级管理员",
                        role:'系统管理员',
                        status:'正常',
                        oldPassword:'niu123456'
                    }
                ],
                form:{
                    id:'',
                    number: '',
                    nicheng:'',
                    oldPasswprd:'',
                    newPassword:''
                },
                currentPage:1,
                pagesize:10,
                sels:"",
                index:1,
                msg:'',
                updateVisible:false,
                rules2:{
                    account:[
                        {required:true,message:'登录账号不能为空',trigger:'blur'}
                    ],
                    nicheng:[
                        {required:true,message:'昵称不能为空',trigger:'blur'}
                    ],
                    oldPassword:[
                        {required:true,message:'旧密码不能为空',trigger:'blur'}
                    ],
                    newPassword:[
                        {required:true,message:'新密码不能为空',trigger:'blur'}
                    ],
                    sure:[
                        {required:true,message:'新密码不能为空',trigger:'blur'}
                    ],
                }
            }
        },
        methods:{
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
</style>
