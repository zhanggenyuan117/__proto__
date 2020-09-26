<template>
  <div class="navbar">
    <div class="company">
      <!-- <div class="company-logo"></div> -->
      <div class="company-name">豫力汽配智慧管控系统</div>
    </div>
    <div class="user">
      <div class="time">{{ currentDate }}</div>
      <div class="user-icon"></div>
      <div class="user-name">
        <el-dropdown trigger="hover" @command="dealUser">
          <span class="el-dropdown-link">
            {{ user.username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :center='true'>
      <el-form :model="form" :rules='rules' ref="ruleForm">
        <el-form-item label="旧密码" :label-width="formLabelWidth" prop='oldPassword'>
          <el-input v-model="form.oldPassword" autocomplete="off" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop='newPassword'>
          <el-input show-password v-model="form.newPassword" autocomplete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
         <el-form-item label="确认新密码" :label-width="formLabelWidth" prop='checkPassword'>
          <el-input show-password v-model="form.checkPassword" autocomplete="off" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd"
          >确 认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.form.checkPassword !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible:false,
      formLabelWidth:'100px',
      form:{
        oldPassword: '',
        newPassword:'',
        checkPassword:''
      },
      rules:{
        oldPassword: [{required:true,trigger:'blur',message:'请输入旧密码'}],
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
      currentDate:'',
      timmer:''
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.login.user,
    }),
    // currentDate() {
    //   return new Date().pattern("yyyy-MM-dd hh:mm:ss");
    // },
  },
  methods: {
    dealUser(command) {
      if (command === "logout") {
        this.$confirm("是否确认退出?", "退出", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
          showClose: false,
        })
          .then(() => {
            this.resetUser();
            this.$router.push({
              path: "/login",
            });
          })
          .catch(() => {});
      }
      if (command == "changePwd") {
        this.dialogFormVisible = true;
      }
    },
    resetUser() {
      this.$store.dispatch("login/setUser", {});
      this.$store.dispatch("login/setToken", "");
      this.$store.dispatch("login/setRouter", "");
      this.$store.dispatch("system/setPath", "");
    },
    changePwd(){
      //修改密码
      this.$refs.ruleForm.validate((valid) => {
        if(valid){
          this.$axios({
            url:'/api-admin/user/updatePassword',
            type:'post',
            data:{
              id:this.user.id,
              oldPassword:this.form.oldPassword,
              password:this.form.newPassword
            }
          }).then(res => {
            let {code,msg} =res;
            if(code != 0) return this.$message({
              type:'error',
              message:msg || '修改密码失败'
            });
            this.$message({
              type:'success',
              message:msg || '修改密码成功'
            });
            this.dialogFormVisible = false
          }).catch(err => {
            this.$message({
              type:'error',
              message:err.msg || '修改密码失败'
            })
          })
        }
      })
      
    }
  },
  created () {
    this.timmer=setInterval(()=>{
      this.currentDate = new Date().pattern("yyyy-MM-dd hh:mm:ss");
    },1000)
  },
  beforeDestroy () {
    clearInterval(this.timmer);
  }
};
</script>

<style lang="less" scoped>
// @import "../../assets/fonts/font.css";

.navbar {
  display: flex;
  flex-direction: row;
  height: 80px;
  background-color: #00b9ed;
  color: #fff;
  justify-content: space-between;
}

.company {
  display: flex;

  align-items: center;

  &-logo {
    width: 60px;
    height: 60px;
    margin: 10px 20px;
    background: url(../../assets/images/logo.png) no-repeat;
    background-size: 100% 100%;
  }

  &-name {
    margin: 0 0 0 10px;
    font-family: "ALIHYAIHEI";
    font-size: 28px;
  }
}

.user {
  display: flex;
  padding: 10px 20px;

  align-items: center;
  .time {
    margin-right: 60px;
    font-weight: 700;
  }
  &-icon {
    width: 40px;
    height: 40px;
    margin: 10px 20px 10px 10px;
    background: url(../../assets/images/avatar.png) no-repeat;
    background-size: 100% 100%;
  }

  &-name {
    cursor: pointer;
  }
  /deep/ .el-dropdown {
    color: #fff;
  }
  /deep/ .el-dropdown-selfdefine {
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
