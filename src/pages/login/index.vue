<template>
  <div class="wrapper">
    <div class="header">
      <div>
        <span class="logo"></span>
        <span class="title">豫力汽配智慧管控系统</span>
      </div>
      <div class="date">{{ currentTime }}</div>
    </div>
    <div class="login" v-if="!isFirstLogin">
      <div class="login-box">
        <el-form ref="user" :model="user" :rules="rules" label-width="80px">
          <div class="title form-item">登录</div>
          <div class="user form-item">
            <div class="user-icon">
              <svg class="icon iconfont" aria-hidden="true">
                <use xlink:href="#icon-yonghu"></use>
              </svg>
            </div>
            <div class="user-input">
              <el-input
                type="text"
                v-model.trim="user.username"
                placeholder="请输入账号"
              ></el-input>
            </div>
          </div>
          <div class="password form-item">
            <div class="password-icon">
              <svg class="icon iconfont" aria-hidden="true">
                <use xlink:href="#icon-mima"></use>
              </svg>
            </div>
            <div class="password-input">
              <el-input
                show-password
                v-model="user.password"
                placeholder="请输入密码"
                autocomplete="off"
                @keyup.enter="login"
              ></el-input>
              <!-- <span class="yanjing"
                ><svg class="icon iconfont" aria-hidden="true">
                  <use xlink:href="#icon-yanjingbukejian-"></use></svg
              ></span> -->
            </div>
          </div>
          <div class="login-btn form-item" @click="login">登录</div>
        </el-form>
      </div>
    </div>
    <div class="resetPwd" v-if="isFirstLogin">
      <div class="login-box">
        <el-form
          ref="resetRule"
          :model="resetModel"
          :rules="resetRules"
          label-width="10px"
        >
          <div class="title form-item">重置密码</div>
          <el-form-item class="user">
            <div class="user-icon">
              <svg class="icon iconfont" aria-hidden="true">
                <use xlink:href="#icon-yonghu"></use>
              </svg>
            </div>
            <div class="user-input">
              <input type="text" v-model.trim="user.username" readonly />
            </div>
          </el-form-item>
          <el-form-item class="password" prop="newPassword">
            <div class="password-icon">
              <svg class="icon iconfont" aria-hidden="true">
                <use xlink:href="#icon-mima"></use>
              </svg>
            </div>
            <div class="password-input">
              <el-input
                show-password
                v-model.trim="resetModel.newPassword"
                placeholder="请设置你的新密码"
              ></el-input>
              <!-- <span class="yanjing"
                ><svg class="icon iconfont" aria-hidden="true">
                  <use xlink:href="#icon-yanjingbukejian-"></use></svg
              ></span> -->
            </div>
          </el-form-item>
          <el-form-item class="password" prop="checkPassword">
            <div class="password-icon">
              <svg class="icon iconfont" aria-hidden="true">
                <use xlink:href="#icon-mima"></use>
              </svg>
            </div>
            <div class="password-input">
              <el-input
               show-password
                v-model.trim="resetModel.checkPassword"
                placeholder="请再次确认你的新密码"
              ></el-input>
              <!-- <span class="yanjing"
                ><svg class="icon iconfont" aria-hidden="true">
                  <use xlink:href="#icon-yanjingbukejian-"></use></svg
              ></span> -->
            </div>
          </el-form-item>
          <div class="login-btn form-item" @click="resetPwd">确认</div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.resetModel.checkPassword !== "") {
          this.$refs.resetRule.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetModel.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isFirstLogin: false,
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
      resetModel: {
        newPassword: "",
        checkPassword: "",
      },
      resetRules: {
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
      timmer: "",
      currentTime: "",
    };
  },
  computed: {
    ...mapState({
      userObj: (state) => state.login.user,
    }),
  },
  methods: {
    login() {
      const { username, password } = this.user;
      if (!username || !password) {
        this.$message({
          type: "warning",
          message: "账号或密码不能为空！",
        });
      } else {
        this.$axios({
          type: "post",
          url: "/api-admin/login",
          data: {
            username,
            password,
          },
        })
          .then((res) => {
            const { user, token, router } = res;
            if (res.code != 0)
              return this.$message({
                type: "warning",
                message: res.msg || "登录失败",
              });
            this.$store.dispatch("login/setUser", user);
            this.$store.dispatch("login/setToken", token);
            this.$store.dispatch("login/setRouter", router);
            if (user.isLogin === 0) {
              //首次登录
              this.isFirstLogin = true;
              this.user.password = "";
            } else {
              this.$router.push({
                path: "/home",
              });
            }
          })
          .catch((err) => {
            this.$message.error(err.msg || "登录失败，请稍候再试");
          });
      }
    },
    resetPwd() {
      this.$refs.resetRule.validate((valid) => {
        if (valid) {
          this.$axios({
            url: "/api-admin/user/firResetPassword",
            type: "post",
            data: {
              id: this.userObj.id,
              password: this.resetModel.newPassword,
            },
          })
            .then((res) => {
              let { code, msg } = res;
              if (code != 0)
                return this.$message({
                  type: "error",
                  msg: msg || "重置失败",
                });
              this.$message({
                type: "success",
                msg: msg || "重置成功",
              });
              this.isFirstLogin = false;
              this.$refs.resetRule.resetFields();
            })
            .catch((err) => {
              this.$message({
                type: "error",
                msg: err.msg || "重置失败",
              });
            });
        }
      });
    },
  },
  created() {
    this.timmer = setInterval(() => {
      let date = new Date();
      this.currentTime = date.pattern("yyyy-MM-dd EEE hh:mm:ss");
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timmer);
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  zoom: 1;
  width: 100%;
  min-width: 1000px;
  height: 100%;
  min-height: 600px;
  background-color: #fff;
  .header {
    box-sizing: border-box;
    padding-top: 20px;
    padding-left: 30px;
    padding-right: 30px;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      vertical-align: middle;
    }
    .logo {
      width: 60px;
      height: 60px;
      background-image: url("../../assets/images/logo.png");
      background-repeat: no-repeat;
      background-size: contain;
    }
    .title {
      margin-left: 10px;
      font-size: 22px;
    }
    .date {
      height: 60px;
      line-height: 60px;
    }
  }
  .login {
    position: relative;
    zoom: 1;
    width: 100%;
    flex: 1;
    min-width: 1000px;
    // height: 100%;
    // min-height: 600px;
    background-color: #00b9ed;
    // background-image: url(../../assets/images/login-bg.png);
    // background-repeat: no-repeat;
    // background-position: center 0;
    // background-size: cover;
    &-box {
      position: absolute;
      right: 0;
      display: flex;
      box-sizing: border-box;
      width: 408px;
      height: 100%;
      margin: 0 50px 0 0;

      align-items: center;

      /deep/ form {
        box-sizing: border-box;
        width: 408px;
        padding: 53px 15px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 5px 5px 5px #b7a3a3;

        .form-item {
          margin: 0 26px 55px;
        }
        .el-form-item {
          margin-bottom: 40px;
          margin-left: 20px;
          margin-right: 20px;
        }
      }
    }

    .user,
    .password {
      display: flex;
      height: 40px;
      border-radius: 5px;
      box-shadow: 0 0 5px #947878;
      align-items: center;

      &-icon {
        width: 24px;
        height: 24px;
        margin: 0 10px 0 10px;
        border-right: 1px solid #cccc;
        padding-right: 5px;
        // border-radius: 50%;
      }

      &-input input {
        width: 100%;
        height: 30px;
        border: 0;
        outline: 0;
      }
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }

    .user-input {
      width: 95%;
    }

    .password-input {
      width: 95%;
      position: relative;
      .yanjing {
        position: absolute;
        right: 2px;
        top: 7px;
      }
    }

    .login-btn {
      width: 200px;
      height: 40px;
      margin: 0 auto !important;
      font-weight: 700;
      line-height: 40px;
      text-align: center;
      color: #fff;
      border-radius: 100px;
      background-color: #00b9ed;
      cursor: pointer;
    }
  }
  .resetPwd {
    position: relative;
    zoom: 1;
    width: 100%;
    flex: 1;
    min-width: 1000px;
    // height: 100%;
    // min-height: 600px;
    background-color: #00b9ed;
    // background-image: url(../../assets/images/login-bg.png);
    // background-repeat: no-repeat;
    // background-position: center 0;
    // background-size: cover;
    &-box {
      position: absolute;
      right: 0;
      display: flex;
      box-sizing: border-box;
      width: 408px;
      height: 100%;
      margin: 0 50px 0 0;

      align-items: center;

      /deep/ form {
        box-sizing: border-box;
        width: 408px;
        padding: 53px 15px;
        border-radius: 5px;
        background: #fff;
        box-shadow: 5px 5px 5px #b7a3a3;
        .el-form-item {
          margin-bottom: 40px;
          margin-left: 20px;
          margin-right: 20px;
        }
      }
    }

    .user,
    .password {
      display: flex;
      height: 40px;
      border-radius: 5px;
      box-shadow: 0 0 5px #947878;
      align-items: center;

      &-icon {
        display: inline-block;
        width: 24px;
        height: 36px;
        border-right: 1px solid #cccc;
        padding-right: 5px;
        margin-top: 4px;
        margin-right: 5px;
      }

      &-input input {
        display: inline-block;
        width: 100%;
        height: 30px;
        border: 0;
        outline: 0;
      }
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }

    .user-input {
      display: inline-block;
    }

    .password-input {
      display: inline-block;
      position: relative;
      .yanjing {
        position: absolute;
        right: -105px;
        top: 0px;
      }
    }

    .login-btn {
      width: 200px;
      height: 40px;
      margin: 0 auto !important;
      font-weight: 700;
      line-height: 40px;
      text-align: center;
      color: #fff;
      border-radius: 100px;
      background-color: #00b9ed;
      cursor: pointer;
    }
  }
  .login,.resetPwd{
    /deep/ .el-input__inner{
      padding-left: 0;
      border:none;
    }
  }
}
</style>
