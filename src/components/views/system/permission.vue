<template>
  <div class="table">
    <div class="left-table-label">
      <i class="el-icon-menu"></i>
      <span class="label-text">角色权限分配</span>
    </div>
    <div class="top-tool-wrap">
      <div class="right-handle-box">
        <div class="handle-box-select">
          <el-select v-model="roleValue" filterable placeholder="请选择角色" @change="getPermissionList" class="select-wrap">
            <!--<el-option v-for="item in roleList" :key="item.RoleID"-->
                       <!--:label="item.RoleName" :value="item.RoleID">-->
            <!--</el-option>-->
            <el-option value="系统管理员"></el-option>
            <el-option value="总部管理员"></el-option>
            <el-option value="门店管理员"></el-option>
            <el-option value="楼层管理员"></el-option>
            <el-option value="商位管理员"></el-option>
            <el-option value="维护管理员"></el-option>
          </el-select>&nbsp;
          <el-button class="primaty-top" size="medium" type="primary" @click="savePerSetting">
            <span>保存设置</span>
          </el-button>
        </div>
      </div>
    </div>


    <div class="permission-select-wrap">
      <div class="top-wrap select-wrapper">
        <div class="p-left-title">
          <span class="p-left-title-text">公共信息</span>
        </div>
        <ul class="select-ul" style="padding-left:70px;">
          <li class="select-li">
            <span class="label-title">门店管理</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="门店信息查询"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="门店添加"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="门店信息修改"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="门店信息删除"></el-checkbox>
            </el-checkbox-group>
          </li>
          <li class="select-li">
            <span class="label-title">楼层货区</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="楼层图示查看"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="楼层CAD图纸导入"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="新增楼层货区"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="修改楼层信息"></el-checkbox>
            </el-checkbox-group>
          </li>
          <li class="select-li">
            <span class="label-title">商位管理</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="商位信息查询"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="商位添加"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="商位信息修改"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="商位信息删除"></el-checkbox>
            </el-checkbox-group>
          </li>
          <li>
            <span class="label-title">供应商管理</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="供应商信息查询"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="供应商添加"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="供应商信息修改"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="供应商信息删除"></el-checkbox>
            </el-checkbox-group>
          </li>
        </ul>
      </div>


      <div class="top-wrap select-wrapper">
        <div class="p-left-title-money">
          <span class="p-left-title-text">返款管理</span>
        </div>
        <ul class="select-ul" style="padding-left:70px;">
          <li class="select-li">
            <span class="label-title">交易扣款明细</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="扣款信息查询"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="扣款信息修改"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="门店信息删除"></el-checkbox>
            </el-checkbox-group>
          </li>
          <li class="select-li">
            <span class="label-title">商位交易扣款</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="商位交易信息查看"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="商位交易信息修改"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="商位交易信息删除"></el-checkbox>
            </el-checkbox-group>
          </li>
          <li class="select-li">
            <span class="label-title">供应商交易扣款</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="供应商交易信息查看"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="供应商交易信息修改"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="供应商交易信息删除"></el-checkbox>
            </el-checkbox-group>
          </li>
          <li>
            <span class="label-title">交易扣款审核</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="扣款信息查看"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="扣款信息审核"></el-checkbox>
            </el-checkbox-group>
          </li>
          <li class="select-li">
            <span class="label-title">交易扣款审核历史</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="审核历史信息查看"></el-checkbox>
            </el-checkbox-group>
          </li>
          <li class="select-li">
            <span class="label-title">赠品扣点</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="赠品分摊查询"></el-checkbox>
            </el-checkbox-group>
          </li>
        </ul>
      </div>


      <div class="down-wrap select-wrapper" >
        <div class="p-left-title-wechat">
          <span class="p-left-title-text">微信推送</span>
        </div>
        <ul class="select-ul" style="padding-left:70px;">
          <li class="select-li">
            <span class="label-title">推送任务</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="推送任务查看"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="新增推送任务"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="推送任务再次发送"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="发送任务"></el-checkbox>
            </el-checkbox-group>
          </li>
          <li class="select-li">
            <span class="label-title">推送历史</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="推送历史查看"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="推送历史删除"></el-checkbox>
            </el-checkbox-group>
          </li>
        </ul>
      </div>






      <div class="down-wrap select-wrapper">
        <div class="p-left-title">
          <span class="p-left-title-text">系统设置</span>
        </div>
        <ul class="select-ul" style="padding-left:70px;">
          <li class="select-li">
            <span class="label-title">角色管理</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="角色信息查询"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="新增角色"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="修改角色"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="停用启用角色"></el-checkbox>
            </el-checkbox-group>
          </li>
          <li class="select-li">
            <span class="label-title">权限管理</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="权限管理"></el-checkbox>
            </el-checkbox-group>
          </li>
          <li class="select-li">
            <span class="label-title">日志管理</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="操作日志查看"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="操作日志导出"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="登录日志查看"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="登录日志导出"></el-checkbox>
            </el-checkbox-group>
          </li>
          <li>
            <span class="label-title">管理员管理</span>
            <el-checkbox-group v-model="checkList" class="check-boxs">
              <el-checkbox class="row-checkbox right-margin" label="管理员信息查询"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="管理员添加"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="管理员信息修改"></el-checkbox>
              <el-checkbox class="row-checkbox right-margin" label="删除管理员"></el-checkbox>
            </el-checkbox-group>
          </li>
        </ul>
      </div>


    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "permission",
    data() {
      return {
        roleValue: 1,    // 被选中的角色值
        roleList: [],    // 角色列表
        checkList: []    // 被选中的权限项列表
      }
    },
    created() {
      this.getPermissionList();
      this.getRoleData();
    },
    methods: {
      /**
       * 获取权限列表
       */
      getPermissionList() {
        axios({
          url: this.$store.state.UrlIP + '',
          method: "post",
          params: {
            roleID: this.roleValue || 1,//向后台传递角色值
          },
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          data: []
        }).then(res => {
          let authority = res.data.data;
          let tmpArr = [];
          for(let key in authority) {
            for(let i = 0; i<authority[key].length; i++) {
              tmpArr.push(authority[key][i].AuthorName);
            }
          }
          this.checkList = tmpArr;
        }).catch(error => {
          console.log(error);
        });
      },

      /**
       * 获取角色列表
       */
      getRoleData() {
        axios({
          url: this.$store.state.UrlIP + '',
          method: "get",
          params: {
            pageIndex: 0,
            pageSize: 0,
          },
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          data: []
        }).then(res => {
          this.roleList = res.data.data;
        }).catch(error => {
          console.log(error);
        });
      },

      /**
       * 保存权限设置
       */
      savePerSetting() {
        axios({
          url: this.$store.state.UrlIP + '',
          method: "post",
          params: {
            roleID: this.roleValue,
            data: this.checkList.join(',')
          },
          headers: {
            'Content-type':'application/x-www-form-urlencoded'
          },
          data: []
        }).then(res => {
          this.$message.success(`保存设置成功，下次登录后生效。`);
        }).catch(error => {
          console.log(error);
          this.$message.success('修改设置失败！');
        });

      }
    }
  }
</script>

<style scoped>
  /* 顶部选项栏 */
  .top-tool-wrap {
    width: 100%;
    margin-bottom: 10px;
  }
  .left-table-label{
    font-size: 20px;
    height: 30px;
    width: 100%;
    line-height: 30px;
    text-align: left;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .left-table-label .label-text {
    font-size: 18px;
  }
  .right-handle-box {
    position: relative;
    height: 60px;
    width: 100%;
    background: #fafafa;
  }
  .right-handle-box .handle-box-select{
    position: absolute;
    left: 20px;
    top: 10px;
    height:30px;
    text-align: right;
  }
  .el-select.select-wrap {
    width: 260px;
  }
  .right-handle-box .handle-box-btns{
    position: absolute;
    right: 20px;
    top: 10px;
    margin-left:20px;
    height: 30px;
  }
  .handle-box-select .searchText{
    width: 180px;
    height: 30px;
  }
  /* 权限选择 */
  ul,li {
    list-style: none;
  }
  .select-wrapper {
    width: 100%;
    /*min-height：最小高度*/
    min-height: 100px;
    margin-top: 10px;
    background: #fafafa;
    padding: 20px 20px;
    position: relative;
  }
  .p-left-title {
    position: absolute;
    top: 15px;
    width: 20px;
    height: 90px;
    border: 1px solid #1b9cff;
    border-radius: 2px;
    color: #1b9cff;
    background: #e8f2fa;
    font-size: 16px;
    padding: 30px 10px;
  }
  .label-title {
    float: left;
    margin-left: 20px;
    font-size: 16px;
    font-weight: 700;
  }
  .select-li {
    padding: 10px 0;
  }
  .check-boxs {
    border-bottom: 1px dashed #ccc;
    text-align: left;
    margin-left: 170px;
  }
  .right-margin {
    width: 180px;
  }
.p-left-title-wechat{
  position: absolute;
  top: 5px;
  width: 20px;
  height: 70px;
  border: 1px solid #1b9cff;
  border-radius: 2px;
  color: #1b9cff;
  background: #e8f2fa;
  font-size: 16px;
  padding: 30px 10px;
}
  .p-left-title-money{
    position: absolute;
    top: 40px;
    width: 20px;
    height: 110px;
    border: 1px solid #1b9cff;
    border-radius: 2px;
    color: #1b9cff;
    background: #e8f2fa;
    font-size: 16px;
    padding: 30px 10px;
  }
</style>
