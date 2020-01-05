<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">门店信息列表</span>
    </div>
      <div class="handle-box top-select-box clear">
        <div class="top">
          <el-input class="searchText" v-model="tableData.shopName" placeholder="请输入门店名称"></el-input>
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
<!--      主要就是借助于tables数组的分割slice()方法来实现的，其中currentPage是当前页数，pagesize是当前页面显示多少条数据-->
<!--      <el-table :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >-->
<!--          <el-table-column type="selection" width="55px" align="center"></el-table-column>-->
<!--          <el-table-column prop="index" label="ID" width="90px" align="center"  :show-overflow-tooltip="true"></el-table-column>-->
<!--          <el-table-column prop="shopName" label="门店名称" width="150px" align="center"  :show-overflow-tooltip="true"></el-table-column>-->
<!--          <el-table-column prop="address" label="地址" align="center" :show-overflow-tooltip="true"></el-table-column>-->
<!--          <el-table-column prop="lnglat" label="GPS经纬度" align="center"></el-table-column>-->
<!--          <el-table-column prop="phone" label="电话" align="center"></el-table-column>-->
<!--          <el-table-column prop="state" label="状态" width="150px" align="center"></el-table-column>-->
<!--          <el-table-column label="操作" align="center">-->
<!--            <template slot-scope="scope">-->
<!--&lt;!&ndash;              type="text"代表文字按钮&ndash;&gt;-->
<!--              <el-button size="mini" type="success" @click="checkInfo(scope.$index, scope.row)">查看</el-button>-->
<!--              <el-button size="mini" type="primary"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
<!--              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--      </el-table>-->



    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column type="selection" width="55px" align="center"></el-table-column>
      <el-table-column prop="index" label="ID" width="90px" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="shopName" label="门店名称" width="150px" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="address" label="地址" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="lnglat" label="经纬度"  align="center"></el-table-column>
      <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" width="150px" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!--              type="text"代表文字按钮-->
          <el-button size="mini" type="success" @click="checkInfo(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="primary"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>



      <div class="pagination">
<!--     el-pagination新增分页   -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
      </div>




      <!-- 添加弹出框,visible是否支持Dialog显示，支持sync修饰符 -->
      <el-dialog title="添加门店信息"  :visible.sync="addVisible" width="20%">
          <el-form ref="form" :model="form" label-width="85px" :rules="rules2" class="demo-ruleForm">
            <el-form-item label="名称:" prop="groupName" >
              <el-input v-model="form.groupName" placeholder="请输入门店名称" style="width: 220px;margin-left: 20px" clearable></el-input>
            </el-form-item>
            <el-form-item label="地址:" prop="address">
              <el-input v-model="form.address" placeholder="请输入门店地址" style="width: 220px;margin-left: 20px" clearable></el-input>
            </el-form-item>
            <el-form-item label="经纬度:">
              <el-input v-model="form.lnglat" placeholder="请输入门店经纬度" style="width: 220px;margin-left: 20px" clearable></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入门店电话" style="width: 220px;margin-left: 20px" clearable></el-input>
            </el-form-item>
            <el-form-item label="状态:" prop="state">
<!--              <el-input v-model="form.state" placeholder="请输入门店状态" clearable></el-input>-->
              <el-select v-model="form.state" placeholder="请输入门店状态" style="width: 220px;margin-left: 20px">
                <el-option label="正常" value="zhengchang"></el-option>
                <el-option label="暂停" value="zanting"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveAdd">确 定</el-button>
          </span>
      </el-dialog>




      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" :visible.sync="editVisible" width="20%">
        <el-form ref="form" :model="form" label-width="75px">
          <el-form-item label="门店名称:">
            <el-input v-model="form.groupName" style="width: 220px;margin-left: 20px" clearable></el-input>
          </el-form-item>
          <el-form-item label="地址:">
            <el-input v-model="form.address" style="width: 220px;margin-left: 20px" clearable></el-input>
          </el-form-item>
          <el-form-item label="经纬度:">
            <el-input v-model="form.lnglat" style="width: 220px;margin-left: 20px" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话:">
            <el-input v-model="form.phone" style="width: 220px;margin-left: 20px" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态:">
<!--            <el-input v-model="form.state" clearable></el-input>-->
            <el-select v-model="form.state" style="width: 220px;margin-left: 20px">
              <el-option label="正常" value="zhengchang"></el-option>
              <el-option label="暂停" value="zanting"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
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

<!--    </div>-->

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
        idx:0,
        msg:'',
        search: '',
        tableData: [
           {
               index:1,
             shopName: '银座家居中心店',
              address: '济南北园大街419号',
              lnglat: '117.019433, 36.685255',
              phone: '0531-55559777',
              state: '正常'
            },
            {
                index:2,
                shopName: '银座家居北园店',
                address: '济南北园大街408号',
                lnglat: '117.014303, 36.683153',
                phone: '0531-83160000',
                state: '正常'
            },
           {
               index:3,
               shopName: '银座家居莱芜店',
               address: '山东省济南市莱芜区凤城西大街065号',
               lnglat: '117.669900, 36.203670',
               phone: '0634-5686118',
               state: '正常'
          },
           {
               index:4,
               shopName: '银座家居淄博店',
               address: '淄博市张店区新村西路29号',
               lnglat: '118.051749,36.799904',
               phone: '0533-62810000',
               state: '正常'
           },
           {
               index:5,
               shopName: '银座家居临沂店',
               address: '临沂市兰山区沂蒙路与金四路交汇西200米',
               lnglat: '118.342200,35.063550',
               phone: '0539-5639000',
               state: '正常'
           },
           {
               index:6,
               shopName: '银座家居菏泽店',
               address: '菏泽市开发区人民南路688号',
               lnglat: '115.491370,35.199750',
               phone: '0530-7086000',
               state: '正常'
           },
            {
                index:7,
                shopName: '银座家居滨州店',
                address: '滨州市黄河五路与渤海十二路交汇处',
                lnglat: '117.993220,37.380990',
                phone: '0543-50270000',
                state: '正常'
            },
             {
                 index:8,
                 shopName: '银座家居东营店',
                 address: '东营市东二路与府前大街交汇处225号',
                 lnglat: '118.643690,37.434800',
                 phone: '0546-7790000',
                 state: '正常'
             },
             {
                 index:9,
                 shopName: '银座家居威海海滨店',
                 address: '威海市环翠区青岛北路88号',
                 lnglat: '122.137870,37.477070',
                 phone: '0631-3688800',
                 state: '正常'
            },
             {
                 index:10,
                 shopName: '银座家居威海幸福店',
                 address: '威海市环翠区世昌大道1号',
                 lnglat: '122.127236,37.499399',
                 phone: '0631-3688800',
                 state: '正常'
             }
        ],
        editVisible: false,
        delVisible: false,
        addVisible: false,
        identifyList:[{//数组，数组里的每个元素是对象
            "id": 1,
            "name": "是"
          },{
            "id": 0,
            "name": "否"
          },
        ],
        form:{
          groupName:'',
          address:'',
          lnglat:'',
          phone:'',
          state:'',
          isIdentify:''
        },
          rules2:{
              groupName:[
                  {required:true,message:'门店名称不能为空',trigger:'blur'}
              ],
              address:[
                  {required:true,message:'地址不能为空',trigger:'blur'}
              ],
              phone:[
                  {required:true,message:'门店电话不能为空',trigger:'blur'}
              ]
          },

      }
    },
    created(){
      this.getData();
    },
      // mounted:function(){
      //
      //     axios.get('http://192.168.0.66:8667/info/CompanyInfo').then(res=>{
      //         if (res.data.code==0){
      //             this.tableData=res.data.data;
      //         }else{
      //             alert('失败')
      //         }
      //     })
      // },
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
        searchKey(){
            let _search=this.tableData.shopName.toLowerCase();//用于将字符串改为小写，让模糊查询更加详细
            // console.log(_search);
            let newListData=[];//用于存放搜索出来的数据
            if (_search){
                this.tableData.filter(item=>{
                    if (item.shopName.toLowerCase().indexOf(_search)!==-1){
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
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },

      // 查看按钮，其中index是索引，row是第几列
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
            groupName: this.msg.shopName,
          address: this.msg.address,
          lnglat: this.msg.lnglat,
            phone: this.msg.phone,
            state:this.msg.state
        }
        this.editVisible = true;

      },
      saveEdit() {
        axios({
          url:"http://211.87.227.223:8082/group/editGroup",//以ajax的方法传递给后端
          method:"post",
          params:{
            token: localStorage.getItem("Authorization"),//将token保存到本地
              groupName: this.form.shopName,
              address: this.form.address,
              lnglat: this.form.lnglat,
              phone: this.form.phone,
              state:this.form.state
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
                groupName:'',
                address:'',
                lnglat:'',
                phone:'',
                state:'',
                isIdentify:''
            }
        this.addVisible = true;
      },
      saveAdd(){//通过ajax的方式提交到后台
        axios({
          url:"http://211.87.227.223:8082/group/addGroup",
          method:"post",
          params:{
            token: localStorage.getItem("Authorization"),//将token保存到本地
            shopName: this.form.shopName,
            address: this.form.address,
            lnglat: this.form.lnglat,
              phone:this.form.lnglat,
              state:this.form.state
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
      margin-bottom: 3px;
      height: 30px;
      width: 100%;
      background: whitesmoke;
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
    }
    .primaty-top{
      /*float: left;*/
      /*background: #EFEFEF;*/

    }
    .table{
        width: 100%;
        font-size: 14px;
        background: #EFEFEF;
        height: 570px;
    }

    .el-table__header-wrapper{
      height: 40px;

    }
    .red{
        color: #ff0000;
    }
    .el-table .warning-row {
      /*background: #b3e19d;*/
      background: #F0E68C;
    }
    .el-table .success-row {
      /*background: #b3d8ff;*/
    }

    .table-label{
      width: 9%;
      height: 30px;
    }
    .el-table--enable-row-hover .el-table__body tr:hover>td {
      background-color: #FFEBCD;
    }
  .form-lable{
    background: #fbc4c4;
  }
</style>
