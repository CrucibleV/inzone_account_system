<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">推送任务信息列表</span>
    </div>

    <div class="handle-box top-select-box clear">
      <div class="top">
        <el-input class="searchText"  placeholder="请输入任务编号"></el-input>
        <el-button size="mini" class="primaty-top" type="primary" icon="el-icon-search" @click="searchKey"><span style="font-size: 12px">查询</span></el-button>
      </div>
      <div class="bottom">
        <el-button size="mini" type="success" icon="el-icon-plus" class="bottom-top" suffix-icon="add" @click="handleAdd"><span style="font-size: 12px">新增任务</span></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" class="bottom-top" @click="deleteFileOrDirectory(sels)"><span style="font-size: 12px">批量删除</span></el-button>
        <el-button size="mini" type="warning" class="bottom-top"><i class="el-icon-download"></i>导入</el-button>
        <el-button size="mini" type="success" class="bottom-top"><i class="el-icon-upload2"></i>导出</el-button>
        <el-button size="mini" type="warning" icon="el-icon-refresh" class="bottom-top"><span style="font-size: 12px" @click="refresh">刷新</span></el-button>
      </div>
    </div>


    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%"  @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}"  >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" width="70px" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="number" label="任务编码" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="name" label="任务名称" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="start" label="推送起始时间" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="pin" label="推送频率" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="lastTime" label="上次推送时间" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="nextTime" label="下次推送时间" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="creater" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态" align="center" :show-overflow-tooltip="true">
        <template scope="scope">
          <font v-if="scope.row.status=='生效'" color="green">{{scope.row.status}}</font>
          <font  v-else color="red">{{scope.row.status}}</font>
        </template>
      </el-table-column>
      <el-table-column  label="操作" width="260px" align="center" >
        <template scope="scope">
          <font v-if="scope.row.status=='生效'" color="green">
            <el-button size="mini" type="primary" @click="checkInfo(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="danger
" @click="handleDel(scope.$index, scope.row)">停用</el-button>
          </font>
          <font  v-else color="red">
            <el-button size="mini" type="primary" @click="checkInfo(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="success" @click="start(scope.$index, scope.row)">启用</el-button>
          </font>
        </template>
      </el-table-column>
    </el-table>




    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
      </el-pagination>
    </div>



<!--    当checkVisible为true的时候，就弹出添加框-->
    <el-dialog v-el-drag-dialog  title="新增任务" :visible.sync="checkVisible" width="30%">
      <el-form ref="from" :model="from" label-width="95px" :rules="rules2" class="demo-ruleForm">
        <el-form-item label="任务名称：" prop="dask" >
          <el-input size="mini"  style="width: 200px;height: 40px;line-height: 40px;" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item label="开始时间：" prop="time">
          <el-date-picker type="date" v-model="date1" placeholder="起始时间" style="width: 32%;float: left;height: 40px;line-height: 40px"  ></el-date-picker>
          <el-col class="line" :span="2" style="width:10px;height: 40px;line-height: 40px;text-align: center">-</el-col>
          <el-time-picker placeholder="请选择时间" v-model="date2" style="width: 34%;float: left;height: 40px;line-height: 40px"></el-time-picker>
        </el-form-item>
        <el-form-item label="创建人：" prop="creater">
          <el-select v-model="creater" placeholder="请选择" style="height: 40px;line-height: 40px">
            <el-option label="吴森宇" value="wu"></el-option>
            <el-option label="李明" value="li"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="sta" placeholder="请选择" style="height: 40px;line-height: 40px">
            <el-option label="生效" value="ok"></el-option>
            <el-option label="无效" value="no"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推送频率：" prop="pin">
          <el-radio-group v-model="checkList" style="height: 40px;line-height: 40px;float: left">
            <el-radio label="每日" style="height: 40px;line-height: 40px;font-size: 16px"></el-radio>
            <el-radio label="每周" style="height: 40px;line-height: 40px;margin-left: 50px"></el-radio>
            <el-radio label="每月" style=" height: 40px;line-height: 40px;margin-left: 50px"></el-radio>
            <el-radio label="每季" style="height: 40px;line-height: 40px;margin-left: 50px"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="推送内容：" prop="content">
          <el-select v-model="select" style="height: 50px;line-height: 40px;width: 40%;float: left">
            <el-option label="[1452] 2019年10月7日-2019年10月13日返款表" value="1452"></el-option>
            <el-option label="[1214] 2019年10月2日-2019年10月7日返款表" value="1214"></el-option>
            <el-option label="[1215] 2019年10月14日-2019年10月15日返款表" value="1215"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推送人员：" prop="people">
          <el-autocomplete v-model="people" placeholder="搜索好友"
                           @select="handleSelect" :fetch-suggestions="querySearch"
                           style="width: 40%;float: left;height: 40px;line-height: 40px" >
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-autocomplete>
        </el-form-item>
      </el-form>


      <span slot="footer" class="dialog-footer">
          <el-button @click="checkVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
    </el-dialog>




  </div>
</template>

<script>
  import elDragDialog from '@/directive/el-drag-dialog'
    import axios from 'axios'
    export default {
      directives:{elDragDialog},
        name: "wechat-manage",
        data(){
            return{
                tableData:[],
                currentPage:1,
                pagesize:10,
                sels:'',
                checkVisible:false,
                date1:'',
                date2:'',
                checkList:[],
                creater:'',
                sta:'',
                select:'',
                people:'',
                person:[],
                rules2:{
                    dask:[
                        {required: true, message: '任务名称不能为空', trigger: 'blur'}
                    ],
                    time:[
                        {required: true, message: '开始时间不能为空', trigger: 'blur'}
                    ],
                    creater:[
                        {required: true, message: '创建人不能为空', trigger: 'blur'}
                    ],
                    status:[
                        {required: true, message: '状态不能为空', trigger: 'blur'}
                    ],
                    pin:[
                        {required: true, message: '推送频率不能为空', trigger: 'blur'}
                    ],
                    content:[
                        {required: true, message: '推送内容不能为空', trigger: 'blur'}
                    ],
                    people:[
                        {required: true, message: '推送人员不能为空', trigger: 'blur'}
                    ],
                }
            }
        },
        mounted() {
            this.person=this.loadAll();
        },
        created:function(){
            axios({
                url:'/api/dask',
                method: 'get',
                params:[],
            }).then(res=>{
                if (res.data.code=='0'){
                    this.tableData=res.data.dask;
                }else{
                    alert('请求失败')
                }

            })
        },
        methods:{
            start(index,row){},
            saveAdd(){},
            querySearch(queryString, cb) {
                var person = this.person;
                var results = queryString ? person.filter(this.createFilter(queryString)) : person;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (per) => {
                    return (per.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            loadAll() {
                return [
                    { "value": "牛亚朦" },
                    { "value": "吴森宇" },
                    { "value": "李明" },
                    { "value": "七年~" },
                    { "value": "class" },


                ];
            },
            handleSelect(item) {
                console.log(item);
            },
            selsChange(sels){
                this.sels=sels;
            },
            handleSizeChange(val){
                this.pagesize=val
            },
            handleCurrentChange(val){
                this.currentPage=val;
            },
            searchKey(){},
            handleAdd(){
                this.checkVisible=true;
                // this.$router.push({
                //         path: 'wemanageInfo'//带参数跳转内链页面，必须首先在router的index.js中进行配置。
                //     }
                // )
            },
            deleteFileOrDirectory(sels){},
            refresh(){},
            checkInfo(index,row){},
            handleEdit(index,row){},
            handleDel(index,row){},
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
  .clear{
    clear: both;
  }
  .bottom-top{
    float: left;
    margin-left: 20px;
  }
</style>
