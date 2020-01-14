<template>
  <div class="table">
    <div class="left-table-label">
        <i class="el-icon-menu"></i>
        <span class="label-text">门店信息列表</span>
    </div>
    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <el-input class="searchText"  v-model="search"  placeholder="请输入门店编号或门店名称" clearable></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%;" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column type="selection" width="55px"></el-table-column>
      <el-table-column prop="MUCODE" label="门店编号"  align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="MUCNAME" label="门店名称"  align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="ShortName" label="门店简称"  align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="UpdateTime" label="最后修改时间" align="center"></el-table-column>
      <el-table-column prop="MUSTATUS" label="状态"  align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="scope">
          <el-button size="mini" type="success" plain @click="checkInfo(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="primary" plain  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    <!-- 查看弹出框 -->
      <el-dialog title="门店详细信息" :visible.sync="checkVisible" width="600px">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="门店编号">
            <el-input v-model="form.MUCODE" clearable :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="门店名称">
            <el-input v-model="form.MUCNAME" clearable :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="门店简称">
            <el-input v-model="form.ShortName" clearable :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="最后修改时间">
              <el-input v-model="form.UpdateTime" placeholder="最后修改时间" clearable :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="状态" >
            <el-input v-model="form.MUSTATUS" placeholder="状态" clearable :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="checkVisible=false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑弹出框 -->
      <el-dialog title="门店信息编辑" :visible.sync="editVisible" width="600px">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="门店编号">
            <el-input v-model="form.MUCODE" clearable :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="门店名称">
            <el-input v-model="form.MUCNAME" clearable :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="门店简称">
            <el-input v-model="form.ShortName" clearable></el-input>
          </el-form-item>
          <el-form-item label="最后修改时间:" prop="lastMod">
              <el-input v-model="form.UpdateTime" clearable :disabled="true"></el-input>
            </el-form-item>
          <el-form-item label="状态" >
            <el-input v-model="form.MUSTATUS" placeholder="请状态" clearable :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    inject:['reload'],
    data(){
      return {
          ids:[],//批量删除的id
          sels:[],//选中的值显示
          currentPage:1,
          pagesize:10,
          totalCount: 0,
          idx:0,
          msg:'',
          search: '',
          tableData: [],
          editVisible: false,
          checkVisible:false,
          identifyList:[{//数组，数组里的每个元素是对象
            "id": 1,
            "name": "是"
          },{
            "id": 0,
            "name": "否"
          },
        ],
        form:{
          MUCODE:'',
          MUCNAME:'',
          ShortName:'',
          UpdateTime:'',
          MUSTATUS:'',
          isIdentify:''
        },
          rules2:{
            MUCODE:[
                  {required:true,message:'门店编号不能为空',trigger:'blur'}
              ],
             MUCNAME:[
                  {required:true,message:'门店名称不能为空',trigger:'blur'}
              ],
              ShortName:[
                  {required:true,message:'门店简称不能为空',trigger:'blur'}
              ],
              UpdateTime:[
                  {required:true,message:'最后修改时间不能为空',trigger:'blur'}
              ]
          },
      }
    },
    watch:{
      search(newState,oldState){
        if(newState != oldState){
          this.currentPage = 1;
        }
      }
    },
    created(){
      this.getData();
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
    methods:{
        formatRole:function(row,column){
              return row.state=='0'?'正常':row.state=='1'?'已停用':''
          },
        refresh:function(){
            this.reload()
            console.log("当前页面刷新了")
        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex % 2 == 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },
        //选中的时候触发
        selsChange(sels) {
            this.sels = sels
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
      getData(){
        axios({
          url:"http://211.87.227.226:8201/company/getCompanys",
          method:"get",
          params:{
              keyWord:this.search,
              pageIndex: this.currentPage,
              pageSize: this.pagesize,
          },
          headers:{
             'Content-type':'application/x-www-form-urlencoded'
          },
          data:[]
        }).then(res=>{
          //console.log(res.data);
          this.tableData = res.data.data;
          this.totalCount = res.data.respPage.totalCount;
        });
      },
      searchKey(){
            let _search=this.tableData.MUCNAME.toLowerCase();//用于将字符串改为小写，让模糊查询更加详细
            // console.log(_search);
            let newListData=[];//用于存放搜索出来的数据
            if (_search){
                this.tableData.filter(item=>{
                    if (item.MUCNAME.toLowerCase().indexOf(_search)!==-1){
                        newListData.push(item)
                    }
                })
            }
            this.tableData=newListData;
        },
      selectIdentify(vId){
        let obj = {};
        obj = this.identifyList.find((item)=>{
          return item.id === vId;
        });
        this.form.isIdentify = vId;
      },
      handleSizeChange(val) {
        this.pagesize = val;
        console.log(`每页 ${val} 条`);
        this.getData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData();
      },
      // 查看按钮，其中index是索引，row是第几列
      checkInfo(index, row) {
        this.idx = index;
        this.msg = row;
        const item = this.msg;
        if(this.msg.IsNeedIdentify === "是"){
          this.msg.IsNeedIdentify = 1
        }else{
          this.msg.IsNeedIdentify = 0
        }
        this.form = {
            MUCODE:this.msg.MUCODE,
            MUCNAME: this.msg.MUCNAME,
            ShortName: this.msg.ShortName,
            UpdateTime:this.msg.UpdateTime,
            MUSTATUS:this.msg.MUSTATUS
        }
        this.checkVisible = true;
      },
      //编辑
      handleEdit(index, row) {
        this.idx = index;
        this.msg = row;
        const item = this.msg;
        if(this.msg.IsNeedIdentify === "是"){
          this.msg.IsNeedIdentify = 1
        }else{
          this.msg.IsNeedIdentify = 0
        }
        this.form = {
            MUCODE:this.msg.MUCODE,
            MUCNAME: this.msg.MUCNAME,
            ShortName: this.msg.ShortName,
            UpdateTime:this.msg.UpdateTime,
            MUSTATUS:this.msg.MUSTATUS
        }
        this.editVisible = true;
      },
      saveEdit() {
        axios({
          url:"http://211.87.227.226:8201/company/reviseShortName",//以ajax的方法传递给后端
          method:"get",
          params:{
              erpMuCode:this.form.MUCODE,
              shortName:this.form.ShortName,
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
      //添加
      handleAdd(){
            this.form={
                shopID:'',
                shopName:'',
                shortName:'',
                lastMod:'',
                state:'',
                isIdentify:''
            }
        this.addVisible = true;
      },
      saveAdd(){//通过ajax的方式提交到后台
        axios({
          url:"http://211.87.227.226:8201/group/addGroup",
          method:"post",
          params:{
            token: localStorage.getItem("Authorization"),//将token保存到本地
            MUCODE:this.msg.MUCODE,
            MUCNAME: this.msg.MUCNAME,
            ShortName: this.msg.ShortName,
            lastMod:this.msg.lastMod,
            MUSTATUS:this.msg.MUSTATUS
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
      }
    }
  }
</script>

<style scoped>
  .top-tool-wrap {
      width: 100%;
      margin-bottom: 10px;
  }
  .left-table-label{
      font-size: 20px;
      height: 30px;
      line-height: 30px;
      text-align: left;
      font-weight: 700;
  }
  .left-table-label .label-text {
      font-size: 18px;
  }
  .right-handle-box {
    position: relative;
    height: 40px;
    width: 100%;
    background: #fafafa;
    text-align: left;
    display: flex;
    padding: 10px 0px;
    font-size: 14px;
  }
  .handle-content-select {
    margin-left: 20px;
    display: flex;
  }
  .select-label {
    margin: 10px 0 0 20px;
  }
  .searchText {
    width: 220px !important;
    margin: 0 10px;
  }
  .searchBtn {
    height: 40px;
  }
  .bottom-top{
    float: left;
    margin-left: 20px;
  }
</style>
