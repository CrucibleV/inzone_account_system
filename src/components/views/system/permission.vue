<template>
  <div class="table">
    <div class="table-label"><i class="el-icon-menu" style="height: 30px;line-height: 30px;float: left;font-size: 20px;font-weight: bold"></i>
      <span style="font-size: 16px;height: 30px;line-height: 30px;font-weight: bold;text-align: left">后台登录角色权限分配列表</span>
    </div>

    <div class="handle-box top-select-box clear">
      <div class="top">
        <el-select v-model="role" placeholder="请选择角色" style="height: 30px;line-height: 30px">
          <el-option label="系统管理员" value="system"></el-option>
          <el-option label="门店管理员" value="shop"></el-option>
          <el-option label="楼层管理员" value="floor"></el-option>
          <el-option label="商位管理员" value="shangwei"></el-option>
        </el-select>
        <el-button size="mini" class="primaty-top" type="primary"  @click="save"><span style="font-size: 12px">保存设置</span></el-button>
      </div>
    </div>

    <div class="body-b">
      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 5px">
          <span style="height: 40px;line-height: 40px;font-size:14px;font-weight:bold;text-align: left">首页</span>
        </div>
        <div style="float: left;margin-left: 100px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left"><el-checkbox label="首页浏览"></el-checkbox></span>
        </div>
      </div>

      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 5px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">公共信息</span>
        </div>
        <div style="float: left;margin-left: 100px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left"><el-checkbox label="公共信息"></el-checkbox></span>
        </div>
      </div>

      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">门店管理</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="门店信息查询"></el-checkbox>
              <el-checkbox label="门店添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="门店信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="门店信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>




      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">楼层货区</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="楼层货区查询"></el-checkbox>
              <el-checkbox label="货区添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="货区信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="货区信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>




      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">商位管理</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="商位信息查询"></el-checkbox>
              <el-checkbox label="商位添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="商位信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="商位信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>

      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">供应商管理</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="供应商信息查询"></el-checkbox>
              <el-checkbox label="供应商添加" style="margin-left: 166px"></el-checkbox>
              <el-checkbox label="供应商信息修改" style="margin-left: 166px"></el-checkbox>
              <el-checkbox label="供应商信息删除" style="margin-left: 166px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>

      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 5px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">返款管理</span>
        </div>
        <div style="float: left;margin-left: 100px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left"><el-checkbox label="返款管理"></el-checkbox></span>
        </div>
      </div>


      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">返款生成</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="返款信息查询"></el-checkbox>
              <el-checkbox label="返款添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="返款信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="返款信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>


      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">返款审核</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="审核信息查询"></el-checkbox>
              <el-checkbox label="审核添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="审核信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="审核信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>

      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">劵扣管理</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="劵扣信息查询"></el-checkbox>
              <el-checkbox label="劵扣添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="劵扣信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="劵扣信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>




      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 5px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">微信管理</span>
        </div>
        <div style="float: left;margin-left: 100px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left"><el-checkbox label="微信管理"></el-checkbox></span>
        </div>
      </div>


      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">微信成员</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="成员信息查询"></el-checkbox>
              <el-checkbox label="成员添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="成员信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="成员信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>


      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">微信部门</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="部门信息查询"></el-checkbox>
              <el-checkbox label="部门添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="部门信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="部门信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>

      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">微信标签</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="标签信息查询"></el-checkbox>
              <el-checkbox label="标签添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="标签信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="标签信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>

      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">推送任务</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="任务信息查询"></el-checkbox>
              <el-checkbox label="任务添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="任务信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="任务信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>

      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">推送历史</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="历史信息查询"></el-checkbox>
              <el-checkbox label="历史添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="历史信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="历史信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>


      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 5px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">费用中心</span>
        </div>
        <div style="float: left;margin-left: 100px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left"><el-checkbox label="费用中心"></el-checkbox></span>
        </div>
      </div>


      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">定额费用</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="定额信息查询"></el-checkbox>
              <el-checkbox label="定额添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="定额信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="定额信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>


      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">礼品费用</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="礼品信息查询"></el-checkbox>
              <el-checkbox label="礼品添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="礼品信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="礼品信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>

      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">劵扣费用</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="劵扣费用查询"></el-checkbox>
              <el-checkbox label="劵扣费用添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="劵扣费用信息修改" style="margin-left: 153px"></el-checkbox>
              <el-checkbox label="劵扣费用信息删除" style="margin-left: 153px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>



      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 5px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">系统设置</span>
        </div>
        <div style="float: left;margin-left: 100px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left"><el-checkbox label="系统设置"></el-checkbox></span>
        </div>
      </div>


      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">角色管理</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="角色信息查询"></el-checkbox>
              <el-checkbox label="角色添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="角色信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="角色信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>


      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">权限管理</span>
        </div>
        <div style="float: left;margin-left: 80px;height:30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="权限信息查询"></el-checkbox>
              <el-checkbox label="权限添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="权限信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="权限信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>

      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">登陆管理</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="登陆信息查询"></el-checkbox>
              <el-checkbox label="登陆添加" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="登陆信息修改" style="margin-left: 180px"></el-checkbox>
              <el-checkbox label="登陆信息删除" style="margin-left: 180px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>



      <div class="body-1">
        <div style="width: 10%;height: 30px;float: left;text-align: left;margin-left: 25px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">管理员设置</span>
        </div>
        <div style="float: left;margin-left: 80px;height: 30px">
          <span style="height: 30px;line-height: 30px;font-size:14px;font-weight:bold;text-align: left">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="管理员信息查询"></el-checkbox>
              <el-checkbox label="管理员添加" style="margin-left: 166px"></el-checkbox>
              <el-checkbox label="管理员信息修改" style="margin-left: 166px"></el-checkbox>
              <el-checkbox label="管理员信息删除" style="margin-left: 166px"></el-checkbox>
            </el-checkbox-group>
          </span>
        </div>
      </div>




    </div>



  </div>
</template>

<script>
    export default {
        name: "permission",
        data(){
            return{
                role:"",
                checkList:[],
            }
        },
        methods:{
            save(){},
        }
    }
</script>

<style scoped>
  .table{
    width: 100%;
    font-size: 14px;
    background: #EFEFEF;
    height: 870px;
  }
  .table-label{
    width: 14%;
    height: 30px;
    background: #EFEFEF;
  }
  .body-b{
   border-top: 1px solid #999999;
    margin-top: 5px;
    height: 90%;
    width: 100%;
  }
  .handle-box.top-select-box {
    margin-bottom: 10px;
    height: 50px;
    width: 100%;
    background: whitesmoke;
  }

  .top{
    float:left;
    height:50px;
    width: 50%;
    text-align: right;
  }
  .clear{
    clear: both;
  }

.body-1{

  border-bottom: 1px solid #999999;
  height: 30px;
  width: 100%;
}
</style>
