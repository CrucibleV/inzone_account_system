<template>
  <div class="table">
    <div class="left-table-label">
        <i class="el-icon-menu"></i>
        <span class="label-text">数据范围</span>
    </div>

    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <div class="handle-box-loc handle-date-select">
          <span>日期范围选择：</span>
          <el-date-picker v-model="value2" type="daterange" align="center"
                      unlink-panels range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期"
                      :picker-options="pickerOptions" @change="getDateTime">
          </el-date-picker>
        </div>
        <span class="select-label">查询条件:</span>
        <el-input class="searchText" v-if="tableData.shopID!=''" v-model="tableData.shopID"  placeholder="请输入门店ID"></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>

        <el-button class="searchBtn" size="medium" type="success" icon="el-icon-plus"  suffix-icon="add" @click="handleAdd"><span style="font-size: 12px">新增数据</span></el-button>
        <el-button class="searchBtn" size="medium" type="warning" :loading="downloadLoading" icon="el-icon-upload2" @click="handleDownload">
          <span style="font-size: 12px">导出EXCEL</span>
        </el-button>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%;" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}" >
      <el-table-column prop="ROW_ID" label="ID" width="70px" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="dataName" label="数据名称" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="shopID" label="门店ID"  align="center"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="floorID" label="楼层ID"  align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="manageID" label="商位ID"  align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" width="250px"  align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" plain @click="checkInfo(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="primary" plain  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>




    <!-- 查看弹框 -->
    <el-dialog title="数据信息详情" :visible.sync="selVisible" width="480px" >
      <el-form ref="form" :model="form" label-width="85px" >
        <el-form-item label="数据名称：" >
          <el-input v-model="form.dataName" style="width: 300px;margin-left: 20px;" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="创建时间：" >
          <el-input v-model="form.createTime" style="width: 300px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="门店ID：" >
          <el-input v-model="form.shopID" style="width: 300px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="楼层ID：">
          <el-input v-model="form.floorID" style="width: 300px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="商位ID：">
          <el-input v-model="form.manageID" style="width: 300px;margin-left: 20px" disabled clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="selVisible = false">取 消</el-button>
        </span>
    </el-dialog>







    <!--编辑框-->
    <el-dialog title="编辑数据信息" :visible.sync="editVisible" width="480px" >
      <el-form ref="form" :model="form" label-width="75px">
        <el-form-item label="数据名称:" >
          <el-input v-model="form.dataName" style="width: 300px;margin-left: 20px;" clearable></el-input>
        </el-form-item>
        <el-form-item label="创建时间:" >
          <el-date-picker type="date" v-model="form.createTime" style="width: 300px;margin-left: 20px;" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="门店ID:" >
          <el-select v-model="form.shopID" style="width: 300px;margin-left: 20px;" filterable  clearable>
            <el-option value="002"  ></el-option>
            <el-option value="003" ></el-option>
            <el-option value="004" ></el-option>
            <el-option value="005" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层ID:">
          <el-select v-model="form.floorID" style="width: 300px;margin-left: 20px;" filterable clearable>
            <el-option value="1002" ></el-option>
            <el-option value="1003" ></el-option>
            <el-option value="1004" ></el-option>
            <el-option value="1005" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商位ID:">
          <el-select v-model="form.manageID" style="width: 300px;margin-left: 20px;" filterable clearable>
            <el-option value="1002"></el-option>
            <el-option value="1003" ></el-option>
            <el-option value="1004" ></el-option>
            <el-option value="1005" ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveUpdate">确 定</el-button>
      </span>
    </el-dialog>



    <!--新增弹框-->

    <el-dialog title="新增数据" :visible.sync="addVisible" width="480px" >
      <el-form ref="form" :model="form" label-width="85px" >
        <el-form-item label="数据名称：" >
          <el-input v-model="form.dataName" style="width: 300px;margin-left: 20px;" clearable></el-input>
        </el-form-item>
        <el-form-item label="创建时间：" >
          <el-date-picker type="date" v-model="form.createTime" style="width: 300px;margin-left: 20px;" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="门店ID:" >
          <!--为el-select添加filterable属性，可以实现启用搜索功能-->
          <el-select v-model="form.shopID" style="width: 300px;margin-left: 20px;" filterable  clearable>
            <el-option value="002"  ></el-option>
            <el-option value="003" ></el-option>
            <el-option value="004" ></el-option>
            <el-option value="005" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层ID:">
          <el-select v-model="form.floorID" style="width: 300px;margin-left: 20px;" filterable clearable>
            <el-option value="1002" ></el-option>
            <el-option value="1003" ></el-option>
            <el-option value="1004" ></el-option>
            <el-option value="1005" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商位ID:">
          <el-select v-model="form.manageID" style="width: 300px;margin-left: 20px;" filterable clearable>
            <el-option value="1002"></el-option>
            <el-option value="1003" ></el-option>
            <el-option value="1004" ></el-option>
            <el-option value="1005" ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
           <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
    </el-dialog>



   

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="deleteVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "wechat-history",
        data() {
            return {
                tableData: [
                  {
                    ROW_ID:1,
                    dataName:"2019/9/12-2019/10/12的销售明细",
                    createTime:"2019/9/12",
                    shopID:"001",
                    floorID:"101",
                    manageID:"111"
                  },
                  {
                    ROW_ID:2,
                    dataName:"2019/3/16-2019/8/22的销售明细",
                    createTime:"2019/3/16",
                    shopID:"002",
                    floorID:"102",
                    manageID:"112"
                  },
                  {
                    ROW_ID:3,
                    dataName:"2019/5/12-2019/10/19的销售明细",
                    createTime:"2019/5/12",
                    shopID:"003",
                    floorID:"103",
                    manageID:"113"
                  },
                ],
              downloadLoading: false,
                value2:"",
                totalCount: 0,
                sels:'',
                currentPage: 1,
                pagesize: 10,
                addVisible:false,
                deleteVisible:false,
                editVisible:false,
                selVisible:false,
                supplier:[],
                ind: 1,
                msg: '',
                search:'',  //搜索关键字相关信息
                form: {
                  ROW_ID:"",
                  dataName:"",
                  createTime:"",
                  shopID:"",
                  floorID:"",
                  manageID:""
                }
            }
        },

        created() {
          this.getData();
        },

        methods: {
          /**
           * 当选中时间之后，就筛选时间范围*/
          getDateTime(val){
            console.log(val);
            // var _time=
          },


        /**将数据导出execl表
         * */
          handleDownload() {
            this.downloadLoading = true;
            import('../../../../vendor/Export2Excel').then(excel => {
              const tHeader = ['ID', '数据名称', '创建时间', '门店ID', '楼层ID', '商位ID']//头
              const filterVal = ['ROW_ID', 'dataName', 'createTime', 'shopID', 'floorID', 'manageID']//值
              const data = this.formatJson1(filterVal, this.tableData);
              excel.export_json_to_excel({
                header: tHeader,
                data,
                filename: '数据范围基本信息',
              })
            })
            this.downloadLoading = false
          },
          formatJson1(filterVal, jsonData) {
            return jsonData.map(v=>filterVal.map(j=>v[j]))
          },

            getData() {
              var _key=this.tableData.shopID;
                axios({
                    url: this.$store.state.UrlIP + "",
                    method: "post",
                    params: {
                        token: localStorage.getItem("Authorization"),
                        pageIndex: this.currentPage,
                        pageSize: this.pagesize,
                        keyword: _key
                    },
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    }
                }).then(res => {
                    this.tableData = res.data.data;
                    this.totalCount = res.data.respPage.totalCount;
                }).catch(error=>{
                    console.log(error)
                });
            },

            handleAdd() {
                this.form={
                  ROW_ID:"",
                  dataName:"",
                  createTime:"",
                  shopID:"",
                  floorID:"",
                  manageID:""
                }
                this.addVisible=true;
            },

          saveAdd(){
            var dName=this.form.dataName;
            var cTime=this.form.createTime;
            var sID=this.form.shopID;
            var fID=this.form.floorID;
            var mID=this.form.manageID;
            axios({
              url:this.$store.state.UrlIP+"",
              method:"post",
              params:{
                token:localStorage.getItem("Authorization"),//将token保存到本地
                dataName:dName,
                createTime:cTime,
                shopID:sID,
                floorID:fID,
                manageID:mID
              },
              headers:{
                "Content-type":"application/x-www-form-urlencoded"

              },
            }).then(res=>{
              this.$message.success("添加成功");
            }).catch(error=>{
              console.log(error);
            })
          },



            /**
             * 查看详情
            */
            checkInfo(index, row) {
                this.ind = index;
                this.msg = row;
                console.log(row);
                this.form = {
                  ROW_ID: this.msg.ROW_ID,
                  dataName: this.msg.dataName,
                  createTime: this.msg.createTime,
                  shopID: this.msg.shopID,
                  floorID: this.msg.floorID,
                  manageID: this.msg.manageID,
                }
                this.selVisible = true;
            },

           /**
            * 编辑按钮
            * */

          handleEdit(index,row){
             this.ind=index;
             this.msg=row;
             this.form = {
               ROW_ID: this.msg.ROW_ID,
               dataName: this.msg.dataName,
               createTime: this.msg.createTime,
               shopID: this.msg.shopID,
               floorID: this.msg.floorID,
               manageID: this.msg.manageID,
             }
             this.editVisible=true;
          },

          saveUpdate(){
            var dName=this.form.dataName;
            var cTime=this.form.createTime;
            var sID=this.form.shopID;
            var fID=this.form.floorID;
            var mID=this.form.manageID;
            axios({
              url:this.$store.state.UrlIP+'',
              method:'post',
              params: {
                token:localStorage.getItem("Authorization"),//将token保存到本地
                dataName:dName,
                createTime:cTime,
                shopID:sID,
                floorID:fID,
                manageID:mID
              },
              headers: {
                'Content-type': 'application/x-www-form-urlencoded'
              },
            }).then(res=>{
              this.$message.success("编辑成功");
            }).catch(error=>{
              alert("编辑失败");
            })
          },


            handleDelete(index,row){
                this.ind=index;
                this.msg=row;
                this.deleteVisible=true;
            },
            deleteRow() {
                var deleteId=this.mes.ROW_ID;
                console.log(deleteId);
                axios({
                  url:this.$store.state.UrlIP,
                  method:"post",
                  params:{
                    token:localStorage.getItem("Authorization"),//将token保存到本地
                    deleteId:deleteId
                  },
                  headers:{
                    "Content-type":"application/x-www-form-urlencoded"
                  }
                }).then(res=>{
                  this.$message.success("删除成功");
                }).catch(error=>{
                  console.log(error)
                });
                this.deleteVisible=false;
            },

            /**
             * 处理分页
            */
            handleSizeChange(val) {
                this.pagesize = val;
                this.getData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            }
        }
    }
</script>

<style scoped>
  /* = 顶部选项栏 = */
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
