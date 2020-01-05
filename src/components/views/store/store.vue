<template>
  <div class="table">
    <div class="container">
      <div class="handle-box top-select-box">
        <div class="select-input-wrapper">
          <span class="select-label">店铺</span>
          <el-select class="select-input" placeholder="请选择" @change='selectIdentify' v-model="form.isIdentify" style="width: 100%;" >
              <el-option v-for="item in identifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span class="select-label">商户</span>
          <el-select class="select-input" @change='selectIdentify' v-model="form.isIdentify" style="width: 100%;">
              <el-option v-for="item in identifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
<!--          <span class="select-label">业态</span>-->
<!--          <el-select class="select-input" @change='selectIdentify' v-model="form.isIdentify" style="width: 100%;">-->
<!--              <el-option v-for="item in identifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
<!--          </el-select>-->
        </div>
        <div class="select-input-wrapper">
          <span class="select-label">店铺</span>
          <el-select class="select-input" @change='selectIdentify' v-model="form.isIdentify" style="width: 100%;">
              <el-option v-for="item in identifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <span class="select-label">合同</span>
          <el-select class="select-input" @change='selectIdentify' v-model="form.isIdentify" style="width: 100%;">
              <el-option v-for="item in identifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
<!--          <span class="select-label">铺位</span>-->
<!--          <el-select class="select-input" @change='selectIdentify' v-model="form.isIdentify" style="width: 100%;">-->
<!--              <el-option v-for="item in identifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
<!--          </el-select>-->
        </div>
          <div class="top-button">
            <el-button type="primary" icon="search" @click="search">查询</el-button>
            <el-button type="primary" icon="search" @click="search">清空</el-button>
            <el-button type="primary" suffix-icon="add" @click="handleAdd">新增门店</el-button>
          </div>
      </div>
      <el-table :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" stripe :header-cell-style="{background:'#1E90FF',color:'#FFFFFF'}">
          <el-table-column prop="shopName" label="店铺名称" width="140px" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="contractId" label="合同号" width="100px" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="business" label="商户" width="90px" align="center"></el-table-column>
          <el-table-column prop="brand" label="品牌" width="150px" align="center"></el-table-column>
          <el-table-column prop="mode" label="经营模式" width="80px" align="center"></el-table-column>
          <el-table-column prop="type" label="业态品类" width="95px" align="center" > </el-table-column>
          <el-table-column prop="building" label="楼栋" width="120px" align="center" > </el-table-column>
          <el-table-column prop="state" label="状态" width="70px" align="center" > </el-table-column>
          <el-table-column label="操作" width="220" align="center">
            <template slot-scope="scope">
              <el-button size="mini"  plain @click="checkInfo(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" type="success"  plain @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
      </div>

      <!-- 添加弹出框 -->
      <el-dialog title="添加" :visible.sync="addVisible" width="40%">
        <el-form ref="form" :model="form" label-width="75px">
          <el-form-item label="部门名称">
            <el-input v-model="form.groupName" clearable></el-input>
          </el-form-item>
          <el-form-item label="需要验证">
            <el-select @change='selectIdentify' v-model="form.isIdentify" style="width: 100%;">
              <el-option v-for="item in identifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门描述">
            <el-input type="textarea" v-model="form.description" clearable ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
        <el-form ref="form" :model="form" label-width="75px">
          <el-form-item label="部门名称">
            <el-input v-model="form.groupName" clearable></el-input>
          </el-form-item>
          <el-form-item label="需要验证" >
            <el-select @change='selectIdentify' v-model="form.isIdentify" style="width: 100%;">
              <el-option v-for="item in identifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
				  </el-form-item>
          <el-form-item label="部门描述">
            <el-input type="textarea" v-model="form.description" clearable  rows='3' ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 删除提示框 -->
      <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
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
  import axios from 'axios'
  export default{
    data(){
      return {
        currentPage:1,
        pagesize:10,
        idx:0,
        msg:'',
        search: '',
        tableData: [
          {
            shopName: 'Zara',
            contractId: '1234560',
            business: 'Zara',
            brand: 'Zara时尚有限公司',
            mode: '联营',
            type: '服饰',
            building: '主楼A座',
            state: '开业中'
          },
          {
            shopName: '顾家家居',
            contractId: '345680',
            business: '顾家家居',
            brand: '顾家家居有限公司',
            mode: '联营',
            type: '家居',
            building: '主楼A座',
            state: '进场中'
          },
          {
            shopName: 'Zara',
            contractId: '1234560',
            business: 'Zara',
            brand: 'Zara时尚有限公司',
            mode: '联营',
            type: '服饰',
            building: '主楼A座',
            state: '开业中'
          },
          {
            shopName: '顾家家居',
            contractId: '345680',
            business: '顾家家居',
            brand: '顾家家居有限公司',
            mode: '联营',
            type: '家居',
            building: '主楼A座',
            state: '进场中'
          },
          {
            shopName: 'Zara',
            contractId: '1234560',
            business: 'Zara',
            brand: 'Zara时尚有限公司',
            mode: '联营',
            type: '服饰',
            building: '主楼A座',
            state: '开业中'
          },
          {
            shopName: '顾家家居',
            contractId: '345680',
            business: '顾家家居',
            brand: '顾家家居有限公司',
            mode: '联营',
            type: '家居',
            building: '主楼A座',
            state: '进场中'
          }
        ],
        editVisible: false,
        delVisible: false,
        addVisible: false,
        identifyList:[{
            "id": 1,
            "name": "是"
          },{
            "id": 0,
            "name": "否"
          },
        ],
        form:{
          groupName:'',
          droneNum:'',
          pilotNum:'',
          isIdentify:'',
          description:'',
        },
      }
    },
    created(){
      this.getData();
    },
    computed:{
      tables:function(){
        var search=this.search;
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
      getData(){
        // axios({
        //   url:"",
        //   method:"get",
        //   params:{
        //     token: localStorage.getItem("Authorization"),
        //   },
        //   headers:{
        //      'Content-type':'application/x-www-form-urlencoded'
        //   },
        //   data:[]
        // }).then(res=>{
        //   this.tableData = res.data.data;
        // });
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
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },

      // 查看
      checkInfo(index, row) {
        this.$router.push({
          path:'shopInfo',
          // query:{shopID: 1}
        })
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
          groupName: this.msg.GroupName,
          description: this.msg.GroupDescription,
          isIdentify: this.msg.IsNeedIdentify,
        }
        this.editVisible = true;
      },
      saveEdit() {
        axios({
          url:"http://211.87.227.223:8082/group/editGroup",
          method:"post",
          params:{
            token: localStorage.getItem("Authorization"),
            groupid: this.msg.GroupID,
            groupname: this.form.groupName,
            groupdescription: this.form.description,
            isneedidentify: this.form.isIdentify,
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
        this.addVisible = true;
      },
      saveAdd(){
        axios({
          url:"http://211.87.227.223:8082/group/addGroup",
          method:"post",
          params:{
            token: localStorage.getItem("Authorization"),
            groupname: this.form.groupName,
            groupdescription: this.form.description,
            isneedidentify: this.form.isIdentify,
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
      },

      //删除
      handleDelete(index, row) {
        this.idx = index;
        this.msg = row;  //每一条数据的记录
        this.delVisible = true;
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
      }

    }
  }
</script>

<style>
    .handle-box.top-select-box {
      margin-bottom: 20px;
      height: 160px;
    }
    .select-input-wrapper {
      margin-bottom: 20px;
      text-align: left;
    }
    .select-input {
      width: 280px !important;
      height: 32px;
      margin: 0 46px 0 16px;
    }
    .top-button {
      margin-top: 30px;
      text-align: left;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
         height: 750px;
    }
    .red{
        color: #ff0000;
    }
  /*.container{*/
  /*  width: 100%;*/
  /*  height: 750px;*/
  /*}*/
</style>
