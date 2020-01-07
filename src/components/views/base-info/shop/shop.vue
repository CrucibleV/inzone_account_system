<template>
  <div class="table">
    <div class="left-table-label">
        <i class="el-icon-menu"></i>
        <span class="label-text">门店信息列表</span>
    </div>
    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <el-input class="searchText"  v-model="search"  placeholder="请输入门店编号"></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>

        <el-button class="searchBtn" size="medium" type="success" icon="el-icon-plus"  suffix-icon="add" @click="handleAdd"><span style="font-size: 12px">新增门店</span></el-button>
        
        <!-- <el-button class="searchBtn" size="medium" type="success" icon="el-icon-upload2" @click="getData">
          <span style="font-size: 12px">导出EXCEL</span>
        </el-button>
        <el-button class="searchBtn" size="medium" type="warning" icon="el-icon-upload2" @click="getData">
          <span style="font-size: 12px">提交审核</span>
        </el-button> -->
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%;" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column type="selection" width="55px"></el-table-column>
      <el-table-column prop="shopID" label="门店编号"  align="center"  :show-overflow-tooltip="true"></el-table-column>

      <el-table-column prop="shopName" label="门店名称"  align="center"  :show-overflow-tooltip="true"></el-table-column>

      <el-table-column prop="shortName" label="门店简称"  align="center"  :show-overflow-tooltip="true"></el-table-column>

      <!-- <el-table-column prop="address" label="地址" align="center" :show-overflow-tooltip="true"></el-table-column>
      
      <el-table-column prop="phone" label="电话号码" align="center"></el-table-column> -->

      <el-table-column prop="lastMod" label="最后修改时间" align="center"></el-table-column>

      <el-table-column prop="state" label="状态"  align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="scope">
          <!--              type="text"代表文字按钮-->
          <el-button size="mini" type="success" plain @click="checkInfo(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="primary" plain  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
        </el-pagination>
      </div>

    <!-- 添加弹出框,visible是否支持Dialog显示，支持sync修饰符 -->
      <el-dialog title="添加门店信息"  :visible.sync="addVisible" width="600px">
          <el-form ref="form" :model="form" label-width="110px" :rules="rules2" class="demo-ruleForm">
            <el-form-item label="门店编号" prop="shopID" >
              <el-input v-model="form.shopID" placeholder="请输入门店编号"  clearable></el-input>
            </el-form-item>
            <el-form-item label="门店名称" prop="shopName" >
              <el-input v-model="form.shopName" placeholder="请输入门店名称"  clearable></el-input>
            </el-form-item>
            <el-form-item label="门店简称" prop="shortName" >
              <el-input v-model="form.shortName" placeholder="请输入门店简称"  clearable></el-input>
            </el-form-item>
            <!-- <el-form-item label="地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入门店地址"  clearable></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="经纬度">
              <el-input v-model="form.lnglat" placeholder="请输入门店经纬度" clearable></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="电话号码" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入门店电话" clearable></el-input>
            </el-form-item> -->
            <el-form-item label="最后修改时间" prop="lastMod">
              <el-input v-model="form.lastMod" placeholder="请选择最后修改时间" clearable></el-input>
            </el-form-item>
            <el-form-item label="状态:" prop="state" >
              <el-select v-model="form.state" placeholder="请选择门店状态" style="width: 100%;">
                <el-option label="正常" value="zhengchang"></el-option>
                <el-option label="暂停" value="zanting"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer" >
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveAdd">确 定</el-button>
          </span>
      </el-dialog>

    <!-- 查看弹出框 -->
      <el-dialog title="门店详细信息" :visible.sync="checkVisible" width="600px">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="门店编号">
            <el-input v-model="form.shopID" clearable :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="门店名称">
            <el-input v-model="form.shopName" clearable :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="门店简称">
            <el-input v-model="form.shortName" clearable :disabled="true"></el-input>
          </el-form-item>
          <!-- <el-form-item label="地址">
            <el-input v-model="form.address" clearable :disabled="true"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="经纬度">
            <el-input v-model="form.lnglat" clearable></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="电话">
            <el-input v-model="form.phone" clearable :disabled="true"></el-input>
          </el-form-item> -->
          <el-form-item label="最后修改时间">
              <el-input v-model="form.lastMod" placeholder="最后修改时间" clearable :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="状态" >
            <el-input v-model="form.state" placeholder="状态" clearable :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="checkVisible = false">取 消</el-button>
          <el-button type="primary" @click="checkVisible=false">确 定</el-button>
        </span>
      </el-dialog>


      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" :visible.sync="editVisible" width="600px">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="门店编号">
            <el-input v-model="form.shopID" clearable :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="门店名称">
            <el-input v-model="form.shopName" clearable :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="门店简称">
            <el-input v-model="form.shortName" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item label="地址">
            <el-input v-model="form.address" clearable></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="经纬度">
            <el-input v-model="form.lnglat" clearable></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="电话">
            <el-input v-model="form.phone" clearable></el-input>
          </el-form-item> -->
          <el-form-item label="最后修改时间" >
              <el-input v-model="form.lastMod" placeholder="请最后修改时间" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态" >
            <el-select v-model="form.state" style="width: 100%;">
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
              // index:1,
              shopID:'0001',
              shopName: '银座家居中心店',
              shortName:'中心店',
              // address: '济南北园大街419号',
              // // lnglat: '117.019433, 36.685255',
              // phone: '0531-55559777',
              lastMod: '2020/01/06',
              state: '正常'
            },
            {
                // index:2,
                shopID:'0002',
                shopName: '银座家居北园店',
                shortName:'北园店',
                // address: '济南北园大街408号',
                // // lnglat: '117.014303, 36.683153',
                // phone: '0531-83160000',
                lastMod: '2020/01/06',
                state: '正常'
            },
           {
              //  index:3,
               shopID:'0003',
               shopName: '银座家居莱芜店',
               shortName:'莱芜店',
              //  address: '山东省济南市莱芜区凤城西大街065号',
              // //  lnglat: '117.669900, 36.203670',
              //  phone: '0634-5686118',
               lastMod: '2020/01/06',
               state: '正常'
          },
           {
              //  index:4,
               shopID:'0004',
               shopName: '银座家居淄博店',
               shortName:'淄博店',
              //  address: '淄博市张店区新村西路29号',
              // //  lnglat: '118.051749,36.799904',
              //  phone: '0533-62810000',
               lastMod: '2020/01/06',
               state: '正常'
           },
           {
              //  index:5,
               shopID:'0005',
               shopName: '银座家居临沂店',
               shortName:'临沂店',
              //  address: '临沂市兰山区沂蒙路与金四路交汇西200米',
              // //  lnglat: '118.342200,35.063550',
              //  phone: '0539-5639000',
               lastMod: '2020/01/06',
               state: '正常'
           },
           {
              //  index:6,
               shopID:'0006',
               shopName: '银座家居菏泽店',
               shortName:'菏泽店',
              //  address: '菏泽市开发区人民南路688号',
              // //  lnglat: '115.491370,35.199750',
              //  phone: '0530-7086000',
               lastMod: '2020/01/06',
               state: '正常'
           },
            {
                // index:7,
                shopID:'0007',
                shopName: '银座家居滨州店',
                shortName:'滨州店',
                // address: '滨州市黄河五路与渤海十二路交汇处',
                // // lnglat: '117.993220,37.380990',
                // phone: '0543-50270000',
                lastMod: '2020/01/06',
                state: '正常'
            },
             {
                //  index:8,
                 shopID:'0008',
                 shopName: '银座家居东营店',
                 shortName:'东营店',
                //  address: '东营市东二路与府前大街交汇处225号',
                // //  lnglat: '118.643690,37.434800',
                //  phone: '0546-7790000',
                 lastMod: '2020/01/06',
                 state: '正常'
             },
             {
                //  index:9,
                 shopID:'0009',
                 shopName: '银座家居威海海滨店',
                 shortName:'海滨店',
                //  address: '威海市环翠区青岛北路88号',
                // //  lnglat: '122.137870,37.477070',
                //  phone: '0631-3688800',
                 lastMod: '2020/01/06',
                 state: '正常'
            },
             {
                //  index:10,
                 shopID:'0010',
                 shopName: '银座家居威海幸福店',
                 shortName:'幸福店',
                //  address: '威海市环翠区世昌大道1号',
                // //  lnglat: '122.127236,37.499399',
                //  phone: '0631-3688800',
                 lastMod: '2020/01/06',
                 state: '正常'
             }
        ],
        editVisible: false,
        delVisible: false,
        addVisible: false,
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
          shopID:'',
          shopName:'',
          shortName:'',
          //address:'',
          // lnglat:'',
          //phone:'',
          lastMod:'',
          state:'',
          isIdentify:''
        },
          rules2:{
            shopID:[
                  {required:true,message:'门店编号不能为空',trigger:'blur'}
              ],
             shopName:[
                  {required:true,message:'门店名称不能为空',trigger:'blur'}
              ],
              shortName:[
                  {required:true,message:'门店简称不能为空',trigger:'blur'}
              ],
              // address:[
              //     {required:true,message:'地址不能为空',trigger:'blur'}
              // ],
              // lnglat:[
              //     {required:true,message:'经纬度不能为空',trigger:'blur'}
              // ],
              // phone:[
              //     {required:true,message:'门店电话不能为空',trigger:'blur'}
              // ],
              lastMod:[
                  {required:true,message:'最后修改时间不能为空',trigger:'blur'}
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
        this.idx = index;
        this.msg = row;
        const item = this.msg;
        if(this.msg.IsNeedIdentify === "是"){
          this.msg.IsNeedIdentify = 1
        }else{
          this.msg.IsNeedIdentify = 0
        }
        this.form = {
            shopID:this.msg.shopID,
            shopName: this.msg.shopName,
            shortName: this.msg.shortName,
            //address: this.msg.address,
            // lnglat: this.msg.lnglat,
            //phone: this.msg.phone,
            lastMod:this.msg.lastMod,
            state:this.msg.state
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
            shopID:this.msg.shopID,
            shopName: this.msg.shopName,
            shortName: this.msg.shortName,
            //address: this.msg.address,
            // lnglat: this.msg.lnglat,
            //phone: this.msg.phone,
            lastMod:this.msg.lastMod,
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
              shopID:this.form.shopID,
              shopName: this.form.shopName,
              shortName: this.form.shortName,
              //address: this.form.address,
              // lnglat: this.form.lnglat,
              //phone: this.form.phone,
              lastMod:this.form.lastMod,
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
                shopID:'',
                shopName:'',
                shortName:'',
                //address:'',
                // lnglat:'',
                //phone:'',
                lastMod:'',
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
            shopID:this.form.shopID,
            shopName: this.form.shopName,
            shortName: this.form.shortName,
            //address: this.form.address,
            // lnglat: this.form.lnglat,
            //phone:this.form.lnglat,
            lastMod:this.form.lastMod,
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
    padding: 10px 20px;
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
    width: 200px !important;
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
