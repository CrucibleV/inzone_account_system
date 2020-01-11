<template>
  <div class="table">
    <div class="left-table-label">
        <i class="el-icon-menu"></i>
        <span class="label-text">劵扣管理</span>
    </div>
    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <div class="handle-box-loc handle-date-select">
          <span>日期范围：</span>
          <el-date-picker v-model="startDate" type="daterange" align="right" unlink-panels range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <span class="select-label">查询条件:</span>
        <el-input class="searchText"  v-model="search"  placeholder="请输入查询条件"></el-input>
        <el-button class="searchBtn" size="medium" type="primary" icon="el-icon-search" @click="getData">
          <span style="font-size: 12px">查询</span>
        </el-button>

        <el-button class="searchBtn" size="medium" type="success" icon="el-icon-plus" suffix-icon="add" @click="handleAdd"><span style="font-size: 12px">新增劵扣</span></el-button>

        <el-button class="searchBtn" size="medium" type="warning" icon="el-icon-upload2" @click="getData">
          <span style="font-size: 12px">提交审核</span>
        </el-button>
      </div>
    </div>

        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}">
          <el-table-column type="selection" width="55px" align="center"></el-table-column>
          <el-table-column prop="CouponRuleID" label="ID" width="80px" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="RuleName" label="规则名称" width="200px" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="RuleTyple" label="分摊类型" width="200px" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="ShopID" label="商位ID" width="200px" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="规则详情" prop="RuleTyple" width="200px" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <font v-if="scope.row.RuleTyple =='1'">
                <el-button size="mini" type="success" plain @click="checkInfo1(scope.$index, scope.row)">详情</el-button>
              </font>
              <font v-else-if="scope.row.RuleTyple =='2'">
                <el-button size="mini" type="success" plain @click="checkInfo2(scope.$index, scope.row)">详情</el-button>
              </font>
              <font v-else-if="scope.row.RuleTyple =='3'">
                <el-button size="mini" type="success" plain @click="checkInfo3(scope.$index, scope.row)">详情</el-button>
              </font>
            </template>
          </el-table-column>
          <el-table-column prop="StartTime" label="开始日期" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="EndTime" label="结束日期" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="State" label="状态"  align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <font v-if="scope.row.State==='0'" color="66CD00">未生效</font>
              <font v-else-if="scope.row.State==='1'" color="#86CD00">已生效</font>
              <font v-else-if="scope.row.State==='2'" color="#808080">作废</font>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <font v-if="scope.row.State =='0'">
                <el-button size="mini" type="success" plain @click="handleDelete(scope.$index, scope.row)">作废</el-button>
                <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button size="mini" type="danger" plain  @click="checkInfo(scope.$index, scope.row)">生效</el-button>
              </font>
              <font v-else>
                <el-button size="mini" type="success" plain @click="handleDelete(scope.$index, scope.row)">作废</el-button>
              </font>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                        :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
          </el-pagination>
        </div>
        <!-- 查看固定比例弹出框 -->
        <el-dialog title="详细信息" :visible.sync="checkVisible1" width="600px">
          <el-form ref="form1" :model="form1" label-width="100px">
            <el-form-item label="商铺ID">
              <el-input v-model="form1.ShopID" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="商铺承担比例">
              <el-input v-model="form1.Type1ShopRatio" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-input v-model="form1.StartTime" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-input v-model="form.EndTime" clearable :disabled="true"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="checkVisible1=false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 查看用卷的数量和金额弹出框 -->
        <el-dialog title="详细信息" :visible.sync="checkVisible2" width="600px">
          <el-form ref="form1" :model="form1" label-width="100px">
            <el-form-item label="商铺ID">
              <el-input v-model="form1.ShopID" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="卷名称">
              <el-input v-model="form1.CouponName" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用卷数量N">
              <el-input v-model="form1.ThresholdN" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用卷总金额阈值">
              <el-input v-model="form1.ThresholdSum" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="阈值内比列">
              <el-input v-model="form1.RatioInThreshold" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="阈值外比列">
              <el-input v-model="form1.RatioOutThreshold" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-input v-model="form1.StartTime" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-input v-model="form.EndTime" clearable :disabled="true"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="checkVisible2=false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 查看销售合同数量弹出框 -->
        <el-dialog title="详细信息" :visible.sync="checkVisible3" width="600px">
          <el-form ref="form1" :model="form1" label-width="100px">
            <el-form-item label="商铺ID">
              <el-input v-model="form1.ShopID" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="卷名称">
              <el-input v-model="form1.CouponName" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用卷数量N">
              <el-input v-model="form1.ThresholdN" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="阈值内比列">
              <el-input v-model="form1.RatioInThreshold" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="阈值外比列">
              <el-input v-model="form1.RatioOutThreshold" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-input v-model="form1.StartTime" clearable :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-input v-model="form.EndTime" clearable :disabled="true"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="checkVisible3=false">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="新增劵扣"  :visible.sync="addVisible" width="600px" center :before-close="handleClose">
          <el-form ref="form" :model="form" label-width="27%" :rules="rules2" class="demo-ruleForm" center>
            <el-form-item label="选择劵扣规则:" prop="manner" center>
              <el-select v-model="form.manner" placeholder="请选择劵扣规则" style="width: 70%;margin-left: 2%" clearable center>
                <el-option v-for="item in optionsfrequency" :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleManner">下一步</el-button>
          </span>
      </el-dialog>

      <el-dialog title="固定比例"  :visible.sync="addFixedRatio" width="600px" center :before-close="handleClose">
          <el-form ref="formFixedRatio" :model="formFixedRatio" label-width="27%" :rules="rulesFixedRatio" class="demo-ruleForm">
            <el-form-item label="商铺ID:" prop="shopId" >
              <el-input v-model="formFixedRatio.shopId" placeholder="请输入商铺编码" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="商铺承担比例:" prop="proportion" >
              <el-input v-model="formFixedRatio.proportion" placeholder="请输入商铺承担比例" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="开始日期:" prop="startTime">
              <el-date-picker v-model="formFixedRatio.startTime" placeholder="请选择开始日期" style="width: 70%;margin-left: 2%" type="date" clearable :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期:" prop="endTime">
              <el-date-picker v-model="formFixedRatio.endTime" placeholder="请选择结束日期" style="width: 70%;margin-left: 2%" type="date" clearable :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="preFixedRatio">上一步</el-button>
            <el-button type="primary" @click="saveAdd">提 交</el-button>
          </span>
      </el-dialog>

      <el-dialog title="用卷数量和金额"  :visible.sync="addAmount" width="600px" center :before-close="handleClose">
          <el-form ref="formAmount" :model="formAmount" label-width="27%" :rules="rulesAmount" class="demo-ruleForm">
            <el-form-item label="商铺ID:" prop="shopId" >
              <el-input v-model="formAmount.shopId" placeholder="请输入商铺编码" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="劵名称:" prop="juanName" >
              <el-input v-model="formAmount.juanName" placeholder="请输入劵名称" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="N:" prop="countN" >
              <el-input v-model="formAmount.countN" placeholder="请输入数量N" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="用卷总金额阈值:" prop="threshold" >
              <el-input v-model="formAmount.threshold" placeholder="请输入用卷总金额阈值" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="阈值内比例:" prop="interRatio" >
              <el-input v-model="formAmount.interRatio" placeholder="请输入阈值内比例" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="阈值外比例:" prop="outRatio" >
              <el-input v-model="formAmount.outRatio" placeholder="请输入阈值外比例" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="开始日期:" prop="startTime">
              <el-date-picker v-model="formAmount.startTime" placeholder="请选择开始日期" style="width: 70%;margin-left: 2%" type="date" clearable :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期:" prop="endTime">
              <el-date-picker v-model="formAmount.endTime" placeholder="请选择结束日期" style="width: 70%;margin-left: 2%" type="date" clearable :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="preAmount">上一步</el-button>
            <el-button type="primary" @click="saveAdd">提 交</el-button>
          </span>
      </el-dialog>

      <el-dialog title="销售合同数量"  :visible.sync="addContract" width="600px" center :before-close="handleClose">
          <el-form ref="formContract" :model="form" label-width="27%" :rules="rulesContract" class="demo-ruleForm">
            <el-form-item label="商铺ID:" prop="shopId" >
              <el-input v-model="formContract.shopId" placeholder="请输入商铺编码" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="劵名称:" prop="juanName" >
              <el-input v-model="formContract.juanName" placeholder="请输入劵名称" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="数量N:" prop="countN" >
              <el-input v-model="formContract.countN" placeholder="请输入数量N" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="阈值内比例:" prop="interRatio" >
              <el-input v-model="formContract.interRatio" placeholder="请输入阈值内比例" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="阈值外比例:" prop="outRatio" >
              <el-input v-model="formContract.outRatio" placeholder="请输入阈值外比例" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="开始日期:" prop="startTime">
              <el-date-picker v-model="formContract.startTime" placeholder="请选择开始日期" style="width: 70%;margin-left: 2%" type="date" clearable :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期:" prop="endTime">
              <el-date-picker v-model="formContract.endTime" placeholder="请选择结束日期" style="width: 70%;margin-left: 2%" type="date" clearable :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="preContract">上一步</el-button>
            <el-button type="primary" @click="saveAdd">提 交</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "moneyJuan",
        data(){
            return{
                sels:'',
                date1:'',
                date2:'',
                currentPage:1,
                pagesize:10,

                startDate:'',
                endDate:'',
                search:'',
                checkVisible1:false,
                checkVisible2:false,
                checkVisible3:false,
                tableData:[],
                addVisible: false,
                addFixedRatio:false,
                addAmount:false,
                addContract:false,
                form1:{
                  ThresholdSum:'',
                  AdminID:'',
                  RatioInThreshold:'',
                  EndTime:'',
                  CreateTime:'',
                  StartTime:'',
                  RuleTyple:'',
                  ThresholdN:'',
                  CouponRuleID:'',
                  CouponName:'',
                  State:'',
                  RatioOutThreshold:'',
                  State:'',
                  Type1ShopRatio:'',
                  RuleName:'',
                  ShopID:''
                },
                form:{
                  manner:'',
                  state:'',
                  isIdentify:''
                },
                formFixedRatio:{
                  shopId:'',
                  proportion:'',
                  startTime:'',
                  endTime:'',
                  state:'',
                  isIdentify:''
                },
                formAmount:{
                  shopId:'',
                  juanName:'',
                  countN:'',
                  threshold:'',
                  interRatio:'',
                  outRatio:'',
                  startTime:'',
                  endTime:'',
                  state:'',
                  isIdentify:''
                },
                formContract:{
                  shopId:'',
                  juanName:'',
                  countN:'',
                  interRatio:'',
                  outRatio:'',
                  startTime:'',
                  endTime:'',
                  state:'',
                  isIdentify:''
                },
                rules2:{
                    manner:[
                        {required:true,message:'方法不能为空',trigger:'blur'}
                    ]
                },
                rulesFixedRatio:{
                    shopId:[
                        {required:true,message:'商铺编码不能为空',trigger:'blur'}
                    ],
                    juanKouName:[
                        {required:true,message:'卷扣名称不能为空',trigger:'blur'}
                    ],
                    proportion:[
                        {required:true,message:'商铺承担比例不能为空',trigger:'blur'}
                    ],
                    startTime:[
                        {required:true,message:'开始日期不能为空',trigger:'blur'}
                    ],
                    endTime:[
                        {required:true,message:'结束日期不能为空',trigger:'blur'}
                    ]
                },
                rulesAmount:{
                    shopId:[
                        {required:true,message:'商铺编码不能为空',trigger:'blur'}
                    ],
                    juanKouName:[
                        {required:true,message:'卷扣名称不能为空',trigger:'blur'}
                    ],
                    juanName:[
                        {required:true,message:'卷名称不能为空',trigger:'blur'}
                    ],
                    countN:[
                        {required:true,message:'数量不能为空',trigger:'blur'}
                    ],
                    threshold:[
                        {required:true,message:'用卷总金额阈值不能为空',trigger:'blur'}
                    ],
                    interRatio:[
                        {required:true,message:'阈值内比例不能为空',trigger:'blur'}
                    ],
                    outRatio:[
                        {required:true,message:'阈值外比例不能为空',trigger:'blur'}
                    ],
                    startTime:[
                        {required:true,message:'开始日期不能为空',trigger:'blur'}
                    ],
                    endTime:[
                        {required:true,message:'结束日期不能为空',trigger:'blur'}
                    ]
                },
                rulesContract:{
                    shopId:[
                        {required:true,message:'商铺编码不能为空',trigger:'blur'}
                    ],
                    juanKouName:[
                        {required:true,message:'卷扣名称不能为空',trigger:'blur'}
                    ],
                    juanName:[
                        {required:true,message:'卷名称不能为空',trigger:'blur'}
                    ],
                    countN:[
                        {required:true,message:'数量不能为空',trigger:'blur'}
                    ],
                    interRatio:[
                        {required:true,message:'阈值内比例不能为空',trigger:'blur'}
                    ],
                    outRatio:[
                        {required:true,message:'阈值外比例不能为空',trigger:'blur'}
                    ],
                    startTime:[
                        {required:true,message:'开始日期不能为空',trigger:'blur'}
                    ],
                    endTime:[
                        {required:true,message:'结束日期不能为空',trigger:'blur'}
                    ]
                },
              optionsfrequency: [{
                    value: '选项1',
                    label: '固定比例'
                    }, {
                    value: '选项2',
                    label: '用卷数量和金额'
                    }, {
                    value: '选项3',
                    label: '销售合同数量'
                    }],
              pickerOptions: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                  },
                  shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                      picker.$emit('pick', new Date());
                    }
                  }, {
                    text: '昨天',
                    onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24);
                      picker.$emit('pick', date);
                    }
                  }, {
                    text: '一周前',
                    onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', date);
                    }
                  }]
              }
            }
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
        methods:{
            // format(row){
            //   if (row.status=='待审核'){
            //
            //   }
            // },
            // handleAdd(){
            //     this.$router.push({
            //         path:'moneyInfo',
            //         // query:{shopID: 1}
            //     })
            // },
            selsChange(sels) {
                this.sels = sels
            },
            getData(){
              axios({
                url:"http://192.168.1.103:8201/couponRule/getRules",
                method:"get",
                params:{
                    //keyWord:this.search,
                    pageIndex: this.currentPage,
                    pageSize: this.pagesize,
                    startDate:'',
                    endDate:'',
                    shopID:''
                },
                headers:{
                  'Content-type':'application/x-www-form-urlencoded'
                },
                data:[]
              }).then(res=>{
                //console.log(res.data);
                this.tableData = res.data.data;
              });
            },
          handleAdd(){
                  this.form={
                    manner:'',
                    state:'',
                    isIdentify:''
                  }
                  this.addVisible = true;
          },
          handleManner () {
              if(this.form.manner=='选项1'){
                  this.form={
                    manner:'',
                    state:'',
                    isIdentify:''
                  }
                  this.addVisible = false;
                  this.addFixedRatio=true;
              }else if(this.form.manner=='选项2'){
                  this.form={
                      manner:'',
                      state:'',
                      isIdentify:''
                  }
                  this.addVisible = false;
                  this.addAmount=true;
              }else if(this.form.manner=='选项3'){
                  this.form={
                      manner:'',
                      state:'',
                      isIdentify:''
                  }
                  this.addVisible = false;
                  this.addContract=true;
              }else{
                alert("请选择劵扣方式");
              } 
          },
            preFixedRatio(){
                this.addVisible = true;
                this.addFixedRatio=false;
            },
            preAmount(){
                this.addVisible = true;
                this.addAmount=false;
            },
            preContract(){
                this.addVisible = true;
                this.addContract=false;
            },
            selsChange(sels){
                this.sels=sels;
            },
            
            // 查看固定比例1按钮，其中index是索引，row是第几列
            checkInfo1(index, row) {
              this.idx = index;
              this.msg = row;
              this.form1 = {
                  ShopID: this.msg.ShopID,
                  Type1ShopRatio:this.msg.Type1ShopRatio,
                  StartTime: this.msg.StartTime,
                  EndTime:this.msg.EndTime,
              }
              this.checkVisible1 = true;
            },
            // 查看用卷的数量和金额2按钮，其中index是索引，row是第几列
            checkInfo2(index, row) {
              this.idx = index;
              this.msg = row;
              this.form1 = {
                  ShopID: this.msg.ShopID,
                  CouponName:this.msg.CouponName,
                  ThresholdN:this.msg.ThresholdN,
                  ThresholdSum:this.msg.ThresholdSum,
                  ThresholdN:this.msg.ThresholdN,
                  RatioInThreshold: this.msg.RatioInThreshold,
                  RatioOutThreshold: this.msg.RatioOutThreshold,
                  StartTime:this.msg.StartTime,
                  EndTime:this.msg.EndTime,
              }
              this.checkVisible2 = true;
            },
            // 查看销售合同数量3按钮，其中index是索引，row是第几列
            checkInfo3(index, row) {
              this.idx = index;
              this.msg = row;
              this.form1 = {
                  ShopID: this.msg.ShopID,
                  CouponName:this.msg.CouponName,
                  ThresholdN:this.msg.ThresholdN,
                  ThresholdN:this.msg.ThresholdN,
                  RatioInThreshold: this.msg.RatioInThreshold,
                  RatioOutThreshold: this.msg.RatioOutThreshold,
                  StartTime:this.msg.StartTime,
                  EndTime:this.msg.EndTime,
              }
              this.checkVisible3 = true;
            },
            handleEdit(){},
            handleDelete(){},
            handleSizeChange(val){
                this.pagesize=val
            },
            handleCurrentChange(){
                this.currentPage=val;
            },
            saveAdd(){//通过ajax的方式提交到后台
                axios({
                  url:"",
                  method:"post",
                  params:{
                      // token: localStorage.getItem("Authorization"),//将token保存到本地
                      // shopName: this.form.shopName,
                      // address: this.form.address,
                      // lnglat: this.form.lnglat,
                      // phone:this.form.lnglat,
                      // state:this.form.state
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
            deleteFileOrDirectory(sels){},
            refresh(){},
            searchKey(){},
            handleClose(done) {
              this.$confirm('确认关闭？')
                .then(_ => {
                  done();
                })
                .catch(_ => {});
            }
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
  }
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
    width: 150px;
    height: 30px;
    margin-left: 80px;
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
  .newDark{
    background: #409EFF;
    color:#FFFFFF;
    text-align: left;
  }
  .pagination{
    text-align: right;
    margin-top: 20px;
  }
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
