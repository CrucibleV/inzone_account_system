<template>
  <div class="table">
<!--    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>-->
<!--      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">新增劵扣规则</span>-->
<!--    </div>-->
    <div class="bread">
<!--      使用面包屑，便于操作,使用separator-class 可以使用相应的iconfront作为分隔符-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/moneyJuan'}">劵扣规则</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/juanInfo'}">新增劵扣规则</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


    <div class="body">
      <div class="body-left">
        <span style="font-size: 18px;float: left">编号：</span>
        <el-input size="mini"  style="width: 150px;height: 50px;line-height: 50px;float: left" placeholder="请输入编号"></el-input>
        <span style="font-size: 18px;">劵扣名称：</span>
        <el-input size="mini"  style="width: 200px;height: 50px;line-height: 50px" placeholder="请输入劵扣名称"></el-input>
      </div>
      <div class="body-middle">
        <span style="font-size: 18px;">劵扣方式：</span>
        <el-select v-model="selectStyle" placeholder="请选择" >
          <el-option label="固定比例" value="guding" ></el-option>
          <el-option label="合同数量" value="hetong"></el-option>
          <el-option label="用劵量以及金额" value="juan"></el-option>
        </el-select>
        <span style="font-size: 18px;margin-left: 40px">创建人：</span>
        <el-select v-model="creater" placeholder="请选择">
          <el-option label="吴森宇" value="wu"></el-option>
          <el-option label="李明" value="li"></el-option>
        </el-select>

        <span style="font-size: 18px;margin-left: 40px">状态：</span>
        <el-select v-model="status" placeholder="请选择">
          <el-option label="生效" value="ok"></el-option>
          <el-option label="作废" value="no"></el-option>
        </el-select>

      </div>
      <div class="top">
        <span style="font-size: 18px;float: left; margin-left: 20px">活动时间:</span>
        <el-date-picker type="date" v-model="date1" placeholder="起始时间" style="width: 32%;float: left"  ></el-date-picker>
        <el-col class="line" :span="1" style="width:10px;height: 50px;line-height: 50px;text-align: center">-</el-col>
        <el-date-picker type="date" v-model="date2" placeholder="终止时间" style="width: 32%;float: left" ></el-date-picker>
      </div>
    </div>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"  border style="width: 100%;" @selection-change="selsChange" stripe :row-style="{height:'45px'}" highlight-current-row  :cell-style="{padding:'0px'}" :header-cell-style="{background:'#d3e3f4',color:'#5881bb'}">
      <el-table-column prop="ID" label="商铺ID" align="center" :show-overflow-tooltip="true">
<!--        <template slot-scope="scope">-->
<!--          <el-input size="mini" type="text" placeholder="请输入内容" >{{scope.row.ID}}</el-input>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="商铺承担比例" v-if="colData[0].isTrue" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="合同数量" width="90px" v-if="colData[2].isTrue" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="劵名称" v-if="colData[6].isTrue" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="劵数量" v-if="colData[1].isTrue" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="用劵总金额阀值" v-if="colData[3].isTrue" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="阀值内比例" v-if="colData[4].isTrue" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="阀值外比例" v-if="colData[5].isTrue" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="起始时间" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="终止时间" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="checkInfo(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>



  </div>
</template>

<script>
    export default {
        name: "juanInfo",
        data(){
           return{
               currentPage:1,
               pagesize:10,
               radio:'',
               selectStyle:'',
               creater:'',
               status:'',
               tableData:[],
               sels:'',
               date1:'',
               date2:'',
               colData:[
                   {title:'商铺承担比例',isTrue:true},
                   {title:'劵数量',isTrue:true},
                   {title:'合同数量',isTrue:true},
                   {title:'用劵总金额阀值',isTrue:true},
                   {title:'阀值内比例',isTrue:true},
                   {title:'阀值外比例',isTrue:true},
                   {title:'劵名称',isTrue:true},
               ]
           }
    },
        created(){

        },
        watch:{
            selectStyle(val){
                if (val=='hetong'){
                  this.colData[0].isTrue=false;
                  this.colData[1].isTrue=false;
                  this.colData[3].isTrue=false;
                }else if(val=='guding'){
                  this.colData[1].isTrue=false;
                  this.colData[2].isTrue=false;
                    this.colData[3].isTrue=false;
                    this.colData[4].isTrue=false;
                    this.colData[5].isTrue=false;
                    this.colData[6].isTrue=false;
                }else{
                    this.colData[2].isTrue=false;
                    this.colData[0].isTrue=false;
                }
            }
        },
        methods:{
            selsChange(sels){
                this.sels=sels;
            },
            // opt1(){
            //     console.log(44444444444)
            // }
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
  .bread{
    width: 20%;
    height: 25px;
    text-align: left;

  }
  .body,.body2{
    width: 100%;
    height: 50px;
    line-height: 50px;
    /*background: white;*/
  }
  .body-left{
    width: 30%;
    height: 50px;
    line-height: 50px;
    float: left;
  }
  .body-middle{
    float: left;
    width: 50%;
    height: 50px;
    line-height: 50px;
  }

  .top{
    float:left;
    height:50px;
    width: 20%;
    text-align: right;

  }
</style>
