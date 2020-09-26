<template>
  <div class="wrapper">
    <div class="content">
      <div class="search">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>
        <el-button type="primary" @click="addMenu">菜单新增</el-button>
      </div>
      <el-tree
        :data="menuDatas"
        node-key="id"
        default-expand-all
        accordion
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        ref="tree"
        :props="defaultProp"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span class="buttons" v-if="data.status == 1">
            <el-button
              type="primary"
              @click="() => append(data)"
              icon="el-icon-plus"
            >
            </el-button>
            <el-button
              type="primary"
              @click="() => edit(data)"
              icon="el-icon-edit"
            >
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-minus"
              @click="() => remove(node, data)"
            >
            </el-button>
          </span>
          <span class="buttons2" v-else>
            <el-button
              type="primary"
              @click="() => edit(data)"
              icon="el-icon-edit"
            >
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-minus"
              @click="() => remove(node, data)"
            >
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="dialog">
      <el-dialog
        :title="!isAdd ? '编辑' : '新增'"
        :visible.sync="dialogFormVisible"
        :center="true"
      >
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item
            v-if="!flag"
            label="类型"
            :label-width="formLabelWidth"
            prop="status"
          >
            <el-radio-group v-model="form.status" v-if="isAdd">
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">操作</el-radio>
            </el-radio-group>
            <el-radio-group v-model="form.status" v-if="!isAdd">
              <el-radio :label="1" :disabled="form.status != 1">菜单</el-radio>
              <el-radio :label="2" :disabled="form.status != 2">操作</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="请输入名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="访问路径"
            :label-width="formLabelWidth"
            prop="url"
          >
            <el-input
              v-model="form.url"
              autocomplete="off"
              placeholder="请输入访问路径"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="图标类名"
            :label-width="formLabelWidth"
            prop="icon"
          >
            <el-input
              v-model="form.icon"
              autocomplete="off"
              placeholder="请输入图标类名"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
let id = 1000;

export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    return {
      defaultProp: {
        label: "name",
      },
      filterText: "",
      menuDatas: [],
      dialogFormVisible: false,
      formLabelWidth: "100px",
      form: {
        id: "",
        name: "",
        url: "",
        icon: "",
        pid: "",
        status: 1, //默认为1 菜单
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入菜单名称" }],
        // url: [{ required: true, trigger: "blur", message: "请输入访问路径" }],
      },
      flag: true, //点击菜单新增按钮标识
      isAdd: false,
    };
  },
  methods: {
    search() {
      this.$axios({
        url: "/api-admin/menu/list",
        type: "post",
      }).then((res) => {
        let { code, msg } = res;
        if (code != 0)
          return this.$message({
            type: "error",
            message: msg || "菜单获取失败",
          });
        this.menuDatas = (res || {}).page || [];
      });
    },
    addMenu() {
      this.isAdd = true;
      this.flag = true;
      this.dialogFormVisible = true;
      this.$nextTick((_) => {
        this.$refs.ruleForm.resetFields();
      });
    },
    submit() {
      if (!this.isAdd) {
        this.update();
      } else {
        this.add();
      }
    },
    add() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.form.status) this.form.status = 1; //默认
          if (this.flag) {
            this.form.pid = 0;
          }
          let { name, url, icon, pid, status } = this.form;
          this.$axios({
            type: "post",
            url: "/api-admin/menu/add",
            data: { name, url, icon, pid, status },
          })
            .then((res) => {
              let { code, msg } = res;
              if (code != 0)
                return this.$message({
                  type: "error",
                  message: msg || "新增失败",
                });
              this.dialogFormVisible = false;
              this.search();
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err.msg || "新增失败",
              });
            });
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    append(data) {
      console.log(data);
      this.flag = false;
      this.isAdd = true;
      this.dialogFormVisible = true;
      this.$nextTick((_) => {
        this.$refs.ruleForm.resetFields();
        this.form.pid = data.id;
        console.log(this.form);
      });
    },
    edit(data) {
      this.flag = false;
      this.isAdd = false;
      this.dialogFormVisible = true;
      this.$nextTick((_) => {
        //编辑菜单
        let { id, name, url, icon, pid, status } = data;
        Object.assign(this.form, { id, name, url, icon, pid, status });
        console.log(this.form);
      });
    },
    update() {
      this.$axios({
        url: "/api-admin/menu/update",
        type: "post",
        data: this.form,
      })
        .then((res) => {
          let { code, msg } = res;
          if (code != 0)
            return this.$message({
              type: "error",
              message: msg || "更新失败",
            });
          this.$message({
            type: "success",
            message: msg || "更新成功",
          });
          this.dialogFormVisible = false;
          this.search();
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err.msg || "更新失败",
          });
        });
    },
    remove(node, data) {
      console.log(data);
      this.$axios({
        url: "/api-admin/menu/delete",
        type: "post",
        data: {
          id: data.id,
        },
      }).then((res) => {
        let { code, msg } = res;
        if (code != 0)
          return this.$message({
            type: "error",
            message: msg || "删除失败",
          });
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex((d) => d.id === data.id);
        children.splice(index, 1);
        this.$message({
          type: "success",
          message: msg || "删除成功",
        });
        this.search();
      });
    },

    // renderContent(h, { node, data, store }) {
    //   return (
    //     <span class="custom-tree-node">
    //       <span>{node.label}</span>
    //       <span>
    //         <el-button
    //           size="mini"
    //           type="text"
    //           on-click={() => this.append(data)}
    //         >
    //           Append
    //         </el-button>
    //         <el-button
    //           size="mini"
    //           type="text"
    //           on-click={() => this.remove(node, data)}
    //         >
    //           Delete
    //         </el-button>
    //       </span>
    //     </span>
    //   );
    // },
  },
  created() {
    this.search();
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  padding: 20px;
  .content {
    width: 100%;
    min-height: 600px;
    background: #fff;
    padding-top: 50px;
    padding-left: 50px;
    .search {
      margin-bottom: 30px;
      .el-input {
        width: 350px;
        margin-right: 50px;
      }
    }
    .custom-tree-node {
      flex: 0.2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      padding-right: 8px;
      .el-tree-node {
        position: relative;
      }
      .buttons,
      .buttons2 {
        display: block;
        position: absolute;
        left: 240px;
      }
      .el-button {
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        padding: 0 22px 0 6px;
      }
    }
    .buttons {
      .el-button:nth-of-type(2) {
        opacity: 0.5;
      }
      .el-button:nth-of-type(3) {
        background: transparent;
        border: 1px solid #f3b545;
        color: #f3b545;
      }
    }
    .buttons2 {
      .el-button:nth-of-type(1) {
        opacity: 0.5;
      }
      .el-button:nth-of-type(2) {
        background: transparent;
        border: 1px solid #f3b545;
        color: #f3b545;
      }
    }
  }
  .el-dialog {
    .el-form-item {
      margin-bottom: 20px;
    }
  }
}
</style>
