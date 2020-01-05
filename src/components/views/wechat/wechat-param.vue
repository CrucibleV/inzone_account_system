<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">微信部门信息列表</span>
    </div>

    <div class="handle-box top-select-box clear">
      <div class="top">
        <el-input class="searchText" v-model="tableData.department" placeholder="请输入部门名"></el-input>
        <el-button size="mini" class="primaty-top" type="primary" icon="el-icon-search" @click="searchKey"><span style="font-size: 12px">查询</span></el-button>
      </div>
      <div class="bottom">
        <el-button size="mini" type="success" icon="el-icon-plus" class="bottom-top" suffix-icon="add" @click="handleAdd"><span style="font-size: 12px">新增部门</span></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" class="bottom-top" @click="deleteFileOrDirectory(sels)"><span style="font-size: 12px">批量删除</span></el-button>
<!--        <el-button size="mini" type="warning" class="bottom-top"><i class="el-icon-download"></i>导入</el-button>-->
<!--        <el-button size="mini" type="success" class="bottom-top"><i class="el-icon-upload2"></i>导出</el-button>-->
        <el-button size="mini" type="warning" icon="el-icon-refresh" class="bottom-top"><span style="font-size: 12px" @click="refresh">刷新</span></el-button>
      </div>

      <el-table :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%"  @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="index" label="ID" align="center"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="department" label="部门名" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="depAdmin" label="管理员" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="duty" label="职位" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createTime" label="创建日期" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="number" label="在职人数" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="state" label="状态" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="checkInfo(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>



      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
      </div>


      <el-dialog v-el-drag-dialog title="查看详细信息" :visible.sync="selVisible" width="20%" >
        <el-form ref="form" :model="form" label-width="85px" >
          <el-form-item label="部门名称" >
            <el-input v-model="form.depName" style="width: 220px;margin-left: 20px;" disabled='true'  clearable></el-input>
          </el-form-item>
          <el-form-item label="管理员" >
            <el-input v-model="form.depAdmin" style="width: 220px;margin-left: 20px" disabled='true' clearable></el-input>
          </el-form-item>
          <el-form-item label="职位" >
            <el-input v-model="form.depJob" style="width: 220px;margin-left: 20px" disabled='true' clearable></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="form.depCreate" style="width: 220px;margin-left: 20px" disabled='true' clearable></el-input>
          </el-form-item>
          <el-form-item label="在职人数">
            <el-input v-model="form.number" style="width: 220px;margin-left: 20px" disabled='true' clearable></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-input v-model="form.state" style="width: 220px;margin-left: 20px" disabled='true' clearable></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>







<!--      当addVisible为true的时候，就弹出添加鲁昂-->
      <el-dialog v-el-drag-dialog title="添加部门信息" :visible.sync="addVisible" width="20%">
        <el-form ref="form" :model="form" label-width="85px" :rules="rules2" class="demo-ruleForm">
          <el-form-item label="部门名称:" prop="depName">
            <el-input  placeholder="请输入部门名称 " style="margin-bottom:6px;width: 230px;margin-left: 20px" clearable></el-input>
          </el-form-item>
          <el-form-item label="管理员名:" prop="depAdmin">
            <el-input  placeholder="请输入部门管理员 " style="margin-bottom:6px;width: 230px;margin-left: 20px" clearable></el-input>
          </el-form-item>
          <el-form-item label="职位名称:" prop="depJob">
            <el-input  placeholder="请输入管理员职位" style="margin-bottom:6px;width: 230px;margin-left: 20px" clearable></el-input>
          </el-form-item>
          <el-form-item label="创建日期:" prop="depCreate" >
            <el-col :span="10">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.depCreate" style="margin-bottom:6px;width: 230px;margin-left: 20px" clearable></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="在职人数:" prop="number">
            <el-input  placeholder="请输入在职人数" style="margin-bottom:6px;width: 230px;margin-left: 20px" clearable></el-input>
          </el-form-item>
          <el-form-item label="部门状态:" prop="state">
            <el-select v-model="form.state" placeholder="请选择部门状态" style="margin-bottom:6px;width: 230px;margin-left: 20px" clearable>
              <el-option label="正常" value="zhengchang"></el-option>
              <el-option label="停用" value="tingyong"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="updateVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
      </el-dialog>




<!--      当editVisible为true的时候，就弹出编辑框-->
      <el-dialog v-el-drag-dialog title="添加部门信息" :visible.sync="editVisible" width="20%">
        <el-form ref="form" :model="form" label-width="85px" :rules="rules2" class="demo-ruleForm">
          <el-form-item label="部门名称:" prop="depName">
            <el-input  v-model="form.depName" style="margin-bottom:6px;width: 230px;margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item label="管理员名:" prop="depAdmin">
            <el-input  v-model="form.depAdmin" style="margin-bottom:6px;width: 230px;margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item label="职位名称:" prop="depJob">
            <el-input  v-model="form.depJob" style="margin-bottom:6px;width: 230px;margin-left: 20px"></el-input>
          </el-form-item>
          <el-form-item label="创建日期:" prop="depCreate" >
            <el-col :span="10">
              <el-date-picker type="date" v-model="form.depCreate" style="margin-bottom:6px;width: 230px;margin-left: 20px"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="在职人数:" prop="number" >
            <el-col :span="10">
              <el-input v-model="form.number" style="margin-bottom:6px;width: 230px;margin-left: 20px"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="部门状态:" prop="state">
            <el-select v-model="form.state" style="margin-bottom:6px;width: 230px;margin-left: 20px">
              <el-option label="正常" value="zhengchang"></el-option>
              <el-option label="停用" value="tingyong"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="editAdd">确 定</el-button>
        </span>
      </el-dialog>


<!--当deleteVisible为true的时候，就弹出删除框-->
      <el-dialog v-el-drag-dialog title="提示" :visible.sync="deleteVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import elDragDialog from '@/directive/el-drag-dialog'
    export default {
        directives:{elDragDialog},
        name: "wechat-param",
        data(){
            return{
                addVisible:false,
                editVisible:false,
                deleteVisible:false,
                selVisible:false,
                currentPage:1,
                pagesize:10,
                search:'',
                sels:'',
                index:1,
                msg:'',
                tableData:[
                    {
                        index:1,
                        department:'研发部',
                        depAdmin:'任一飞',
                        duty:'部长',
                        createTime:'2016-09-26',
                        number:21,
                        state:'正常',
                    },{
                        index:2,
                        department:'开发部',
                        depAdmin:'张三',
                        duty:'部长',
                        createTime:'2017-04-03',
                        number:21,
                        state:'正常',
                    },{
                        index:3,
                        department:'运维部',
                        depAdmin:'李四',
                        duty:'部长',
                        createTime:'2017-09-23',
                        number:21,
                        state:'正常',
                    },{
                        index:4,
                        department:'财务部',
                        depAdmin:'王五',
                        duty:'部长',
                        createTime:'2017-07-08',
                        number:21,
                        state:'正常',
                    },{
                        index:5,
                        department:'销售部',
                        depAdmin:'张红',
                        duty:'部长',
                        createTime:'2017-08-09',
                        number:11,
                        state:'正常',
                    }, {
                        index:6,
                        department:'研发部',
                        depAdmin:'任一飞',
                        duty:'部长',
                        createTime:'2016-09-26',
                        number:21,
                        state:'正常',
                    },{
                        index:7,
                        department:'开发部',
                        depAdmin:'张三',
                        duty:'部长',
                        createTime:'2017-04-03',
                        number:21,
                        state:'正常',
                    },{
                        index:8,
                        department:'运维部',
                        depAdmin:'李四',
                        duty:'部长',
                        createTime:'2017-09-23',
                        number:21,
                        state:'正常',
                    },{
                        index:9,
                        department:'财务部',
                        depAdmin:'王五',
                        duty:'部长',
                        createTime:'2017-07-08',
                        number:21,
                        state:'正常',
                    },{
                        index:10,
                        department:'销售部',
                        depAdmin:'张红',
                        duty:'部长',
                        createTime:'2017-08-09',
                        number:11,
                        state:'正常',
                    },


                ],
                form:{
                    depName:'',
                    depAdmin:'',
                    depJob:'',
                    depCreate:'',
                    state:'',
                    date2:'',
                    number:''
                },
            rules2:{
                    depName: [
                        { required: true, message: '请输入部门名称', trigger: 'blur' },
                    ],
                    depAdmin:[
                        {
                            required: true, message: '请输入部门管理员', trigger: 'blur'
                        }
                    ],
                depCreate:[
                    {
                       type:'date', required: true, message: '请输入部门创建日期', trigger: 'blur'
                    }
                ],
                state:[
                    {
                        required: true, message: '请输入部门状态', trigger: 'blur'
                    }
                ],
                depJob:[
                    {
                        required: true, message: '请输入部门状态', trigger: 'blur'
                    }
                ],
                number:[
                    {required: true, message: '请输入在职人数', trigger: 'blur'}
                ]
              }
            }
        },
        methods:{
            //选中的时候触发
            selsChange(sels) {
                this.sels = sels
            },
            searchKey(){
                let _search=this.tableData.department.toLowerCase();
                console.log(_search)
                //let _search=this.tableData.department.toLowerCase();//用于将字符串改为小写，让模糊查询更加详细
                // console.log(_search);
                let newListData=[];//用于存放搜索出来的数据
                if (_search){
                    this.tableData.filter(item=>{   //过滤函数
                        if (item.department.toLowerCase().indexOf(_search)!==-1){
                            newListData.push(item)//将搜索出来额数据存放到另一个数组中
                        }
                    })
                }
                this.tableData=newListData;//展现出新的数组
            },
            handleDel(ind,row){
                this.index=ind;
                this.msg=row;
                this.deleteVisible=true;
            },
            handleEdit(ind,row){
              this.index=ind;
              this.msg=row;
              this.form={
                  depName:this.msg.department,
                  depAdmin:this.msg.depAdmin,
                  depJob:this.msg.duty,
                  depCreate:this.msg.createTime,
                  state:this.msg.state,
                  number:this.msg.number
              }
              this.editVisible=true;  //当editVisible为true的时候，就弹出编辑框
            },
            checkInfo(index,row){
                this.index=index;
                this.msg=row;
                this.form={
                    depName:this.msg.department,
                    depAdmin:this.msg.depAdmin,
                    depJob:this.msg.duty,
                    depCreate:this.msg.createTime,
                    state:this.msg.state,
                    number:this.msg.number
                }
                this.selVisible=true;
            },
            refresh(){},
            handleAdd(){
                this.addVisible=true;
            },
            deleteFileOrDirectory(){},
            handleSizeChange(val){
                this.pagesize=val;
            },
            handleCurrentChange(val){
                this.currentPage=val;
            },
            saveAdd(){

            },
            editAdd(){},
            deleteRow(){},
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
    width: 12%;
    height: 30px;
    background: #EFEFEF;
  }
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
  .bottom-top{
    float: left;
  }
</style>
