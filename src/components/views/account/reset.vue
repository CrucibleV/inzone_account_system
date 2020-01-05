<template>
    <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldpass" hide-required-asterisk="true">
            <el-input type="password" v-model="ruleForm.oldpass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass" hide-required-asterisk="true">
            <el-input type="password" v-model.number="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" hide-required-asterisk="true">
            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            var validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输旧入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validateCheckPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value != this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    oldpass: '',
                    pass:'',
                    checkPass: '',
                },
                rules: {
                    oldpass: [
                        { required: true,validator:validateOldPass, trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, message: '请输入手机号', trigger: 'blur'  },
                        {type:'number',message:'请输入11位手机号码'},
                        {
                            pattern:/^[A-Za-z0-9]{6}$/,
                            message:'请输入11位手机号码',
                            trigger:'blur'
                        }
                    ],
                    checkPass: [
                        { required: true,validator: validateCheckPass, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                let _this=this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let userId= localStorage.getItem('userId');
                        let newpass  = this.ruleForm.checkPass;
                        let oldpass = this.ruleForm.oldpass;
                        _this.$openapi.request('tUser/updUserByPwd',{id:userId,pwd:oldpass ,password:newpass} ,function (res) {
                            if(res.data===1){
                                _this.$message({
                                    message: '恭喜您，修改成功,请重新登录',
                                    type: 'success',
                                    onClose: function(){
                                        _this.$router.push({path:'/account/login'});
                                    }
                                });
                            }else if(res.data===0){
                                _this.$message.error('修改失败，请重试！');
                            }else{
                                _this.$message.error('旧密码输入错误，请重试！');
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .demo-ruleForm {
        padding:20px;
        padding-right:40px;
    }
</style>