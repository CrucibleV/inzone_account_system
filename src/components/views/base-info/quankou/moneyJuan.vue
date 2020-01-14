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
                      start-placeholder="开始日期" end-placeholder="结束日期">
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

        <el-table :data="tableData" border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}">
          <el-table-column type="selection" width="55px" align="center"></el-table-column>
          <el-table-column prop="CouponRuleID" label="ID" width="80px" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="RuleName" label="规则名称"  align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="RuleTyple" label="分摊类型"  align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="ShopID" label="商位ID" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="规则详情" prop="RuleTyple"  align="center" :show-overflow-tooltip="true">
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
          <el-table-column label="操作" align="center" :show-overflow-tooltip="true" width="250px">
            <template slot-scope="scope">
              <font v-if="scope.row.State =='0'">
                <el-button size="mini" type="success" plain @click="handleDelete(scope.$index, scope.row)">作废</el-button>
                <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row,scope.row.RuleTyple)">修改</el-button>
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
                        :current-page="currentPage" :page-sizes="[10,20]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
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
          <el-form ref="form1" :model="form1" label-width="110px">
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
          <el-form ref="form1" :model="form1" label-width="27%" :rules="rules2" class="demo-ruleForm" center>
            <el-form-item label="选择劵扣规则:" prop="manner" center>
              <el-select v-model="form1.manner" placeholder="请选择劵扣规则" style="width: 70%;margin-left: 2%" clearable center>
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
          <el-form ref="form1" :model="form1" label-width="27%" :rules="rules1" class="demo-ruleForm">
            <el-form-item label="分摊类型:" prop="Value1" >
              <el-input v-model="form1.Value1" style="width: 70%;margin-left: 2%" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="商铺ID:" prop="ShopID" >
              <el-input v-model="form1.ShopID" placeholder="请输入商铺编码" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="商铺承担比例:" prop="Type1ShopRatio" >
              <el-input v-model="form1.Type1ShopRatio" placeholder="请输入商铺承担比例" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="开始日期:" prop="StartTime">
              <el-date-picker v-model="form1.StartTime" placeholder="请选择开始日期" style="width: 70%;margin-left: 2%" type="date" clearable format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期:" prop="EndTime">
              <el-date-picker v-model="form1.EndTime" placeholder="请选择结束日期" style="width: 70%;margin-left: 2%" type="date" clearable format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="preFixedRatio">上一步</el-button>
            <el-button type="primary" @click="saveAdd1">提 交</el-button>
          </span>
      </el-dialog>

      <el-dialog title="用卷数量和金额"  :visible.sync="addAmount" width="600px" center :before-close="handleClose">
          <el-form ref="form1" :model="form1" label-width="27%" :rules="rules1" class="demo-ruleForm">
            <el-form-item label="分摊类型:" prop="Value2" >
              <el-input v-model="form1.Value2" style="width: 70%;margin-left: 2%" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="商铺ID:" prop="ShopID" >
              <el-input v-model="form1.ShopID" placeholder="请输入商铺编码" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="劵名称:" prop="CouponName" >
              <el-input v-model="form1.CouponName" placeholder="请输入劵名称" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="数量N:" prop="ThresholdN" >
              <el-input v-model="form1.ThresholdN" placeholder="请输入数量N" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="用卷总金额阈值:" prop="ThresholdSum" >
              <el-input v-model="form1.ThresholdSum" placeholder="请输入用卷总金额阈值" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="阈值内比例:" prop="RatioInThreshold" >
              <el-input v-model="form1.RatioInThreshold" placeholder="请输入阈值内比例" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="阈值外比例:" prop="RatioOutThreshold" >
              <el-input v-model="form1.RatioOutThreshold" placeholder="请输入阈值外比例" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="开始日期:" prop="StartTime">
              <el-date-picker v-model="form1.StartTime" placeholder="请选择开始日期" style="width: 70%;margin-left: 2%" type="date" clearable format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期:" prop="EndTime">
              <el-date-picker v-model="form1.EndTime" placeholder="请选择结束日期" style="width: 70%;margin-left: 2%" type="date" clearable format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="preAmount">上一步</el-button>
            <el-button type="primary" @click="saveAdd2">提 交</el-button>
          </span>
      </el-dialog>

      <el-dialog title="销售合同数量"  :visible.sync="addContract" width="600px" center :before-close="handleClose">
          <el-form ref="form1" :model="form1" label-width="27%" :rules="rules1" class="demo-ruleForm">
            <el-form-item label="分摊类型:" prop="Value3" >
              <el-input v-model="form1.Value3" style="width: 70%;margin-left: 2%" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="商铺ID:" prop="ShopID" >
              <el-input v-model="form1.ShopID" placeholder="请输入商铺编码" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="劵名称:" prop="CouponName" >
              <el-input v-model="form1.CouponName" placeholder="请输入劵名称" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="数量N:" prop="ThresholdN" >
              <el-input v-model="form1.ThresholdN" placeholder="请输入数量N" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="阈值内比例:" prop="RatioInThreshold" >
              <el-input v-model="form1.RatioInThreshold" placeholder="请输入阈值内比例" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="阈值外比例:" prop="RatioOutThreshold" >
              <el-input v-model="form1.RatioOutThreshold" placeholder="请输入阈值外比例" style="width: 70%;margin-left: 2%" clearable></el-input>
            </el-form-item>
            <el-form-item label="开始日期:" prop="StartTime">
              <el-date-picker v-model="form1.StartTime" placeholder="请选择开始日期" style="width: 70%;margin-left: 2%" type="date" clearable format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期:" prop="EndTime">
              <el-date-picker v-model="form1.EndTime" placeholder="请选择结束日期" style="width: 70%;margin-left: 2%" type="date" clearable format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="preContract">上一步</el-button>
            <el-button type="primary" @click="saveAdd3">提 交</el-button>
          </span>
      </el-dialog>

      <!-- 编辑固定比例弹出框 -->
      <el-dialog title="券扣规则信息编辑" :visible.sync="editVisible" width="600px">
        <el-form ref="form1" :model="form1" label-width="100px">
          <el-form-item label="门店编号">
            <el-input v-model="form1.ShopID" clearable></el-input>
          </el-form-item>
          <el-form-item label="商铺承担比列">
            <el-input v-model="form1.Type1ShopRatio" clearable></el-input>
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
      <!-- 编辑用卷数量和金额弹出框 -->
      <el-dialog title="券扣规则信息编辑" :visible.sync="editVisible" width="600px">
        <el-form ref="form1" :model="form1" label-width="100px">
          <el-form-item label="商铺ID">
            <el-input v-model="form1.MUCODE" clearable ></el-input>
          </el-form-item>
          <el-form-item label="门店名称">
            <el-input v-model="form.MUCNAME" clearable ></el-input>
          </el-form-item>
          <el-form-item label="门店简称">
            <el-input v-model="form.ShortName" clearable></el-input>
          </el-form-item>
          <el-form-item label="最后修改时间:" prop="lastMod">
              <el-input v-model="form.UpdateTime" clearable></el-input>
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
      <!-- 编辑销售合同数量弹出框 -->
      <el-dialog title="券扣规则信息编辑" :visible.sync="editVisible" width="600px">
        <el-form ref="form1" :model="form1" label-width="100px">
          <el-form-item label="门店编号">
            <el-input v-model="form.MUCODE" clearable ></el-input>
          </el-form-item>
          <el-form-item label="门店名称">
            <el-input v-model="form.MUCNAME" clearable ></el-input>
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
    export default {
        name: "moneyJuan",
        data(){
            return{
                sels:'',
                date1:'',
                date2:'',
                currentPage:1,
                pagesize:10,

                RuleTyple:'',
                idx:0,
                msg:'',

                startDate:'',
                endDate:'',
                search:'',

                totalCount: 0,
                checkVisible1:false,
                checkVisible2:false,
                checkVisible3:false,
                tableData:[],
                addVisible: false,
                addFixedRatio:false,
                addAmount:false,
                addContract:false,
                editVisible: false,
                form1:{
                  Value1:'1',
                  Value2:'2',
                  Value3:'3',
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
                  ShopID:'',
                  isIdentify:'',
                  manner:'',
                  state:'',
                },
                form:{
                  manner:'',
                  state:'',
                  isIdentify:''
                },
                rules1:{
                    ShopID:[
                        {required:true,message:'商铺编码不能为空',trigger:'blur'}
                    ],
                    RuleName:[
                        {required:true,message:'卷扣名称不能为空',trigger:'blur'}
                    ],
                    Type1ShopRatio:[
                        {required:true,message:'商铺承担比例不能为空',trigger:'blur'}
                    ],
                    CouponName:[
                        {required:true,message:'卷名称不能为空',trigger:'blur'}
                    ],
                    ThresholdN:[
                        {required:true,message:'数量不能为空',trigger:'blur'}
                    ],
                    ThresholdSum:[
                        {required:true,message:'用卷总金额阈值不能为空',trigger:'blur'}
                    ],
                    RatioInThreshold:[
                        {required:true,message:'阈值内比例不能为空',trigger:'blur'}
                    ],
                    RatioOutThreshold:[
                        {required:true,message:'阈值外比例不能为空',trigger:'blur'}
                    ],
                    StartTime:[
                        {required:true,message:'开始日期不能为空',trigger:'blur'}
                    ],
                    EndTime:[
                        {required:true,message:'结束日期不能为空',trigger:'blur'}
                    ]
                },
                rules2:{
                    manner:[
                        {required:true,message:'方法不能为空',trigger:'blur'}
                    ]
                },
              optionsfrequency: [{
                    value: '1',
                    label: '固定比例'
                    }, {
                    value: '2',
                    label: '用卷数量和金额'
                    }, {
                    value: '3',
                    label: '销售合同数量'
                    }],
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
            selsChange(sels) {
                this.sels = sels
            },
            getData(){
              axios({
                url:"http://211.87.227.226:8201/couponRule/getRules",
                method:"get",
                params:{
                    keyWord:this.search,
                    pageIndex: this.currentPage,
                    pageSize: this.pagesize,
                    // startDate:'',
                    // endDate:'',
                    // shopID:''
                },
                headers:{
                  'Content-type':'application/x-www-form-urlencoded'
                },
                data:[]
              }).then(res=>{
                //this.tableData = [];
                this.tableData = res.data.data;
                console.log( this.tableData);
                this.totalCount = res.data.respPage.totalCount;
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
              if(this.form1.manner=='1'){
                  // this.form={
                  //   manner:'',
                  //   state:'',
                  //   isIdentify:''
                  // }
                  this.addVisible = false;
                  this.addFixedRatio=true;
              }else if(this.form1.manner=='2'){
                  this.addVisible = false;
                  this.addAmount=true;
              }else if(this.form1.manner=='3'){
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
                  RatioInThreshold: this.msg.RatioInThreshold,
                  RatioOutThreshold: this.msg.RatioOutThreshold,
                  StartTime:this.msg.StartTime,
                  EndTime:this.msg.EndTime,
              }
              this.checkVisible3 = true;
            },
            //编辑修改
            handleEdit(index, row,RuleTyple) {
              this.idx = index;
              this.msg = row;
              const item = this.msg;
              if(this.msg.IsNeedIdentify === "是"){
                this.msg.IsNeedIdentify = 1
              }else{
                this.msg.IsNeedIdentify = 0
              }
              if(RuleTyple=='1'){
                  this.form1 = {
                       shopID:this.msg.ShopID,
                       type1ShopRatio:this.msg.Type1ShopRatio,
                       startTime:this.msg.StartTime,
                       endTime:this.msg.EndTime,
                  }
              }else if(RuleTyple=='2'){
                  this.form1 = {
                       shopID:this.msg.ShopID,
                       CouponName:this.msg.CouponName,
                       ThresholdN:this.msg.ThresholdN,
                       ThresholdSum:this.msg.ThresholdSum,
                       RatioInThreshold: this.msg.RatioInThreshold,
                       RatioOutThreshold: this.msg.RatioOutThreshold,
                       startTime:this.msg.StartTime,
                       endTime:this.msg.EndTime,
                  }
              }else if(RuleTyple=='3'){
                  this.form1 = {
                       shopID:this.msg.ShopID,
                       CouponName:this.msg.CouponName,
                       ThresholdN:this.msg.ThresholdN,
                       RatioInThreshold: this.msg.RatioInThreshold,
                       RatioOutThreshold: this.msg.RatioOutThreshold,
                       startTime:this.msg.StartTime,
                       endTime:this.msg.EndTime,
                  }
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
            handleDelete(){},

            handleSizeChange(val){
                this.pagesize=val;
                this.getData();
            },
            handleCurrentChange(val){
                this.currentPage=val;
                this.getData();
            },
            //添加固定比例
            saveAdd1(){//通过ajax的方式提交到后台
                axios({
                  url:"http://211.87.227.226:8201/couponRule/addRule",
                  method:"post",
                  params:{
                       ruleTyple:this.form1.Value1,
                       shopID:this.form1.ShopID,
                       type1ShopRatio:this.form1.Type1ShopRatio,
                       startTime:this.form1.StartTime,
                       endTime:this.form1.EndTime,
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
                this.addFixedRatio = false;
            },
            //添加用卷的数量和金额
            saveAdd2(){//通过ajax的方式提交到后台
                axios({
                  url:"http://211.87.227.226:8201/couponRule/addRule",
                  method:"post",
                  params:{
                       ruleTyple:this.form1.Value2,
                       shopID:this.form1.ShopID,
                       CouponName:this.form1.CouponName,
                       ThresholdN:this.form1.ThresholdN,
                       ThresholdSum:this.form1.ThresholdSum,
                       RatioInThreshold: this.form1.RatioInThreshold,
                       RatioOutThreshold: this.form1.RatioOutThreshold,
                       startTime:this.form1.StartTime,
                       endTime:this.form1.EndTime,
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
                this.addAmount = false;
            },
            //添加销售合同数量
            saveAdd3(){//通过ajax的方式提交到后台
                axios({
                  url:"http://211.87.227.226:8201/couponRule/addRule",
                  method:"post",
                  params:{
                       ruleTyple:this.form1.Value3,
                       shopID:this.form1.ShopID,
                       CouponName:this.form1.CouponName,
                       ThresholdN:this.form1.ThresholdN,
                       RatioInThreshold: this.form1.RatioInThreshold,
                       RatioOutThreshold: this.form1.RatioOutThreshold,
                       startTime:this.form1.StartTime,
                       endTime:this.form1.EndTime,
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
                this.addContract = false;
            },
            deleteFileOrDirectory(sels){},
            //refresh(){},
            searchKey(){
              let _search=this.tableData.ID.toLowerCase();//用于将字符串改为小写，让模糊查询更加详细
              console.log(_search);
              let newListData=[];//用于存放搜索出来的数据
              if (_search){
                  this.tableData.filter(item=>{
                      if (item.ID.toLowerCase().indexOf(_search)!==-1){
                          newListData.push(item)
                      }
                  })
              }
              this.tableData=newListData;
            },
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
