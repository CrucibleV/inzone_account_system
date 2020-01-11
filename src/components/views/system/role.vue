<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 18px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">角色成员信息列表</span>
    </div>
    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <el-input class="searchText"  v-model="tableData.roleName"  placeholder="请输入角色名称"></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>

        <el-button class="searchBtn" size="medium" type="success" icon="el-icon-plus"  suffix-icon="add" @click="handleAdd"><span style="font-size: 12px">新增角色</span></el-button>
      </div>
    </div>



    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%"  @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column prop="RoleID" label="ID" width="70px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="RoleName" label="角色名称" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="RoleDescription" label="角色描述" align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="State" label="状态" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <font v-if="scope.row.State=='停用'" color="red">停用</font>
          <font v-else color="green">正常</font>
        </template>
      </el-table-column>
      <el-table-column prop="CreateTime" label="创建时间" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="UpdateTime" label="更新时间" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <font v-if="scope.row.State=='停用'">
            <el-button size="mini" type="primary" plain @click="updateInfo(scope.$index, scope.row)">修改</el-button>
            <el-button  size="mini" type="success" plain @click="startInfo(scope.$index, scope.row)">启用</el-button>
          </font>
          <font v-else>
            <el-button size="mini" type="primary" plain @click="updateInfo(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" plain  @click="stopInfo(scope.$index, scope.row)">停用</el-button>
          </font>
        </template>

      </el-table-column>
    </el-table>


    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
      </el-pagination>
    </div>


<!--角色的添加-->
    <el-dialog v-el-drag-dialog  title="添加角色" :visible.sync="addVisible" width="25%">
      <el-form ref="form" :model="form" label-width="115px" :rules="rules2" class="demo-ruleForm">
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称" style="width: 300px;margin-left: 20px;height: 55px;" clearable ></el-input>
        </el-form-item>

        <el-form-item label="角色描述：" prop="description">
          <textarea cols="10" rows="5" v-model="form.description"  style="width: 300px;margin-left: 20px" clearable></textarea>
        </el-form-item>

        <el-form-item label="创建时间:" prop="ctime">
          <el-date-picker v-model="form.ctime" type="datetime" style="width: 300px;margin-left: 20px" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间:" prop="uptime">
          <el-date-picker v-model="form.uptima" type="datetime" style="width:300px;margin-left:20px" clearable=""></el-date-picker>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="form.status" placeholder="请选择" style="margin-left: 20px;width: 300px" clearable>
            <el-option label="正常" value="ok"></el-option>
            <el-option label="停用" value="no"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
    </el-dialog>




<!--角色的修改-->
    <el-dialog v-el-drag-dialog  title="编辑角色信息" :visible.sync="updateVisible" width="25%">
      <el-form ref="form" :model="form" label-width="115px" :rules="rules2" class="demo-ruleForm">
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称" style="width: 300px;margin-left: 20px" clearable ></el-input>
        </el-form-item>
        <el-form-item label="创建时间:" prop="ctime">
          <el-date-picker v-model="form.ctime" type="datetime" placeholder="请输入创建时间" style="width: 300px;margin-left: 20px" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间:" prop="uptime">
          <el-date-picker v-model="form.uptima" type="datetime" placeholder="请输入更新时间" style="width:300px;margin-left:20px" clearable=""></el-date-picker>
        </el-form-item>
        <el-form-item label="角色描述：" prop="description">
          <textarea cols="10" rows="5" v-model="form.description" placeholder="请输入角色描述" style="width: 300px;margin-left: 20px" clearable></textarea>
        </el-form-item>

        <el-form-item label="状态：" prop="status">
          <el-select v-model="form.status" placeholder="请选择" style="margin-left: 20px;width: 300px" clearable>
            <el-option label="正常" value="ok"></el-option>
            <el-option label="停用" value="no"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="updateVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveupdate">确 定</el-button>
        </span>
    </el-dialog>





  </div>
</template>

<script>
  import elDragDialog from '@/directive/el-drag-dialog'
  import axios from 'axios'
    export default {
        name: "role",
        directives:{elDragDialog},
        data(){
            return{
                addVisible:false,
                updateVisible:false,
                tableData:[],
                currentPage :1,
                pagesize:10 ,
                sels:'',
                index:1,
                mes:'',
                form:{
                    name:'',
                    description:'',
                    status:'',
                    ctime:'',
                    uptime:'',
                },
                rules2:{
                    name:[
                        {required:true,message:'角色名称不能为空',trigger:'blur'}
                    ],
                    description:[
                        {required:true,message:'角色描述不能为空',trigger:'blur'}
                    ],
                    status:[
                        {required:true,message:'状态不能为空',trigger:'blur'}
                    ],
                    ctime:[
                      {required:true,message:'创建时间不能为空',trigger:'blur'}
                    ],
                    uptime:[
                      {required:true,message:'更新时间不能为空',trigger:'blur'}
                    ]
            
                }

            }
        },
        created(){
          this.getRoleList();
        },
        methods:{
          /**
           * 获取角色列表.
           */
          getRoleList(){
            axios({
              url:this.$store.state.urlIPs+'/getRoles',
              method:"get",
              params:{
                pageIndex: 0,
                pageSize: 0,
              },
              headers:{
                'Content-type': 'application/x-www-form-urlencoded'
              },
              data:[]
            }).then(res=>{
              console.log(11111111);
              this.tableData=res.data.data;
            }).catch(error=>{
              console.log(error);
            })
          },


          /**
           * 查询数据*/
          getData(){
            var _key=this.tableData.roleName;
            console.log(_key);
            axios({
              url:this.$store.state.UrlIP+"",
              method:"post",
              params:{
                token: localStorage.getItem("Authorization"),//将token保存到本地
                serchKey:_key
              },
              headers:{
                'Content-type': 'application/x-www-form-urlencoded'
              }
            }).then(res=>{
              this.tableData=res.data.data;
            }).catch(error=>{
              console,log(error);
            })
          },

            //前端实现的模糊查询
            // searchKey(){
            //     var _search=this.tableData.name.toLowerCase();
            //     let newList=[];
            //     if(_search){
            //         this.tableData.filter(item=>{
            //             if (item.name.toLowerCase().indexOf(_search)!==-1){
            //                 newList.push(item)
            //             }
            //         })
            //     }
            //     this.tableData=newList;
            // },
            /**
             * 新增角色
             */
            handleAdd(){
                this.form={
                    name:'',
                    description: '',
                    status: "",
                    ctime:"",
                    uptime:'',
                }
                this.addVisible=true;
            },
            
            selsChange(sels){
                this.sels=sels;
            },
            handleSizeChange(val){
                this.pagesize=val;
            },
            handleCurrentChange(val){
                this.currentPage=val;
            },
            updateInfo(index,row){
                this.index=index;
                this.mes=row;
                this.form={
                    name:this.mes.RoleName,
                    description:this.mes.RoleDescription,
                    status: this.mes.State,
                    ctime:this.mes.CreateTime,
                    uptime:this.mes.UpdateTime
                };
                this.updateVisible=true;
            },
            startInfo(index,row){
                console.log(index);
                console.log(row);




            },
            stopInfo(index,row){

            },

            saveAdd(){
              var rName=this.form.name;
              var rDescribe=this.form.description;
              var rStatus=this.form.status;
              var rCtime=this.form.ctime;
              var rUPtime=this.form.uptime;
              console.log(rName+","+rDescribe+","+rStatus);
              axios({
                url: this.$store.state.UrlIP+"",
                method:"post",
                params: {
                  token:localStorage.getItem("Authorization"),
                  RoleName:rName,
                  RoleDescription:rDescribe,
                  State:rStatus,
                  CreateTime:rCtime,
                  UpdateTime:rUPtime,
                },
                headers:{
                  'Content-type':'application/x-www-form-urlencoded'
                }
              }).then(res=>{
                this.$message.success("添加成功");
              }).catch(error=>{
                console.log(error);
              })
            },
            saveupdate(){
              var rName=this.form.name;
              var rDescribe=this.form.description;
              var rStatus=this.form.status;
              var rCtime=this.form.ctime;
              var rUPtime=this.form.uptime;
              console.log(rName+","+rDescribe+","+rStatus);
              axios({
                url:this.$store.state.UrlIP+"",
                method:"post",
                params:{
                  token:localStorage.getItem("Authorization"),
                  RoleName:rName,
                  RoleDescription:rDescribe,
                  State:rStatus,
                  CreateTime:rCtime,
                  UpdateTime:rUPtime,
                },
                headers:{
                  'Content-type':'application/x-www-form-urlencoded'
                }
              }).then(res=>{
                this.$message.success("修改成功");
              }).catch(error=>{
                console.log(error);
              })
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
  .clear{
    clear: both;
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
