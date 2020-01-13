<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 18px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">登录历史信息</span>
    </div>

    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <el-input class="searchText"    placeholder="请输入角色名称"></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>
      </div>
    </div>


    <el-table :data="admin.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="userName" label="用户名" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="loginTime" label="登录时间" align="center"></el-table-column>
      <el-table-column prop="status" label="登录结果" align="center">
        <template slot-scope="scope">
          <font v-if="scope.row.status=='停用'" color="red">停用</font>
          <font v-else color="green">正常</font>
        </template>
      </el-table-column>
      <el-table-column prop="lastTime" label="最近登录时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="checkInfo(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>


    <div class="pagination">
      <!--     el-pagination新增分页   -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="admin.length">
      </el-pagination>
    </div>




    <el-dialog v-el-drag-dialog  title="查看信息" :visible.sync="checkVisible" width="25%">
      <el-form ref="form" :model="form" label-width="115px" >
        <el-form-item label="登录账号：">
          <el-input v-model="form.account"  style="width: 300px;margin-left: 20px" disabled ></el-input>
        </el-form-item>
        <el-form-item label="登录时间">
          <el-col :span="10">
            <el-date-picker type="date" v-model="form.logTime" style="margin-left: 20px;width: 300px"   disabled></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="登录结果">
          <el-input v-model="form.logResult" style="width: 300px;margin-left: 20px"  disabled></el-input>
        </el-form-item>
        
        <el-form-item label="最近登录时间">
         <el-col :span="10">
            <el-date-picker type="date" v-model="form.lastLogTime" style="margin-left: 20px;width: 300px"   disabled></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="checkVisible = false">取 消</el-button>
        </span>
    </el-dialog>





  </div>
</template>

<script>
  import elDragDialog from '@/directive/el-drag-dialog'
  import axios from 'axios'
    export default {
        name: "login-control",
        directives:{elDragDialog},
        data(){
            return{
                start:false,
                stop:false,
                show:'',
                sels:'',
                admin:[
                  {
                    id:1,
                    userName:"admin",
                    loginTime:"2019-12-12",
                    status:"正常",
                    lastTime:"2020-01-01"
                  },
                  {
                    id:2,
                    userName:"shopAdmin",
                    loginTime:"2019-12-12",
                    status:"正常",
                    lastTime:"2020-02-02"
                  },
                ],
                currentPage:1,
                pagesize:10,
                addVisible:false,
                checkVisible:false,
                index:1,
                mes:'',
                form:{
                    account:'',
                    
                    logTime:'',
                    logResult:'',
                    lastLogTime:'',
                    
                },
                rules2:{
                    account:[
                        {required:true,message:'管理员名称不能为空',trigger:'blur'}
                    ],
                    nicheng:[
                        {required:true,message:'昵称不能为空',trigger:'blur'}
                    ],
                    role:[
                        {required:true,message:'角色不能为空',trigger:'blur'}
                    ],
                    ctime:[
                        {required:true,message:'创建时间不能为空',trigger:'blur'}
                    ],
                    status:[
                        {required:true,message:'状态不能为空',trigger:'blur'}
                    ],
                    pass:[
                        {required:true,message:'密码不能为空',trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            
            deleteFileOrDirectory(sels){
                this.sels=sels;
            },
            refresh(){},
            selsChange(sel){
                this.sels=sel;
            },
            handleSizeChange(val){
                this.pagesize=val;
            },
            handleCurrentChange(val){
                this.currentPage=val;
            },
            checkInfo(index,row){
              this.index=index;
              this.mes=row;
              this.form={
                  account:this.mes.userName,
                    
                    logTime:this.mes.loginTime,
                    logResult:this.mes.status,
                    lastLogTime:this.mes.lastTime,
                    
              };
              this.checkVisible=true;
            },
            
            startInfo(val){
                console.log(val);
                this.show=2;

            },
            stopInfo(index,row){
               console.log(index)
                 console.log(row)
                // this.admin.status='停用';
                this.show=1;

            }
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
    width: 8%;
    height: 30px;
    background: #EFEFEF;
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
