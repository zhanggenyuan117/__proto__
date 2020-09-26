

<template>
  <el-dialog
    :title="form.id ? '编辑用户' : '用户新增'"
    width="600px"
    custom-class="usermanage"
    :visible.sync="showDialog"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :show-close="false"
    :center="true"
    :destroy-on-close="true"
  >
  
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="jobNumber" label="用户工号" :label-width="formLabelWidth">
        <el-input v-model="form.jobNumber" autocomplete="off" placeholder="请填写用户工号"></el-input>
      </el-form-item>
      <el-form-item prop="username" label="登录名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off" placeholder="请填写登录名"></el-input>
      </el-form-item>

      <el-form-item prop="teleNumber" label="手机号" :label-width="formLabelWidth">
        <el-input v-model="form.teleNumber" autocomplete="off" placeholder="请填写手机号"></el-input>
      </el-form-item>
       <el-form-item prop="deptId" label="所属部门" :label-width="formLabelWidth">
        <el-cascader
          v-model="form.deptId"
          :options="deptlist"
          :props="{ label: 'name', value: 'id' }"
          placeholder="请选择所属部门"
        ></el-cascader>
      </el-form-item>
      <el-form-item prop="roleId" label="所属角色" :label-width="formLabelWidth">
        <el-select v-model="form.roleId" placeholder="请选择所属角色">
          <el-option
            v-for="(role, i) in allRoles"
            :key="'r' + i"
            :value="role.roleId"
            :label="role.roleName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="nickName" label="用户昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickName" autocomplete="off" placeholder="请填写用户昵称"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    roles: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
  data() {
    return {
      deptlist:[],
      showDialog: true,
      formLabelWidth: "80px",
      // 表单数据
      form: {
        id: "",
        jobNumber: "",
        username: "",
        teleNumber: "",
        deptId:"",
        roleId:"",
        nickName: "",
        status:""
      },
      rules: {
        jobNumber: [
          { required: true, trigger: "blur", message: "请填写用户工号" },
        ],
        teleNumber: [{ required: true, trigger: "blur", message: "请填写手机号" }],
        username: [
          { required: true, trigger: "blur", message: "请填写登录名" },
        ],
        deptId: [
          { required: true, trigger: "blur", message: "请选择所属部门" },
        ],
        roleId: [
          { required: true, trigger: "blur", message: "请选择所属角色" },
        ],
      },
    };
  },
  computed: {
    allRoles(){
      return this.roles;
    }
  },
  watch: {},
  events: {
    editUserManage({
      id,
      jobNumber,
      username,
      deptId,
      roleId,
      teleNumber,
      nickName,
      status
    }) {
      this.form = Object.assign(
        {},
        {
          id,
          jobNumber,
          username,
          deptId,
          roleId: +roleId,
          teleNumber,
          nickName,
          status
        }
      );
    },
  },
  methods: {
    getDept() {
      this.$axios({
        url: "/api-admin/dept/all",
        type: "get"
      })
        .then(res => {
          this.deptlist = res.page || [];
        })
        .catch(err => {
          this.$message({
            message: err.msg || "获取部门列表失败"
          });
        });
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$trigger("getUserManage", this.form);
          return;
        }
        return false;
      });
    },
    close() {
      this.$trigger("closeUserManageDialog");
    },
  },
  created() {
    this.getDept();
  },
};
</script>

<style lang="less" scoped>
.usermanage {
  .area {
    display: flex;
    /deep/ .el-select {
      & + .el-select {
        margin: 0 0 0 30px;
      }
      .el-input {
        width: 90%;
      }
    }
  }
  .el-form /deep/ .el-input {
    width: 400px;
  }
}
.dialog-footer {
  text-align: center;
}
</style>
