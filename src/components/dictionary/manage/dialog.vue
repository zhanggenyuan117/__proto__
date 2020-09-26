

<template>
  <el-dialog
    :title="form.id ? '字典分类编辑' : '字典分类新增'"
    :visible.sync="showDialog"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :show-close="false"
    :center="true"
    :destroy-on-close="true"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="name" label="分类名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" placeholder='请输入字典名称'></el-input>
      </el-form-item>
      <!-- <el-form-item prop="remarks" label="描述" :label-width="formLabelWidth">
        <el-input type="textarea" v-model.trim="form.remarks" placeholder='请输入描述'></el-input>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      showDialog: true,
      formLabelWidth: "80px",
      form: {
        id: "",
        name: ""
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入字典名称" }],
      }
    };
  },
  events: {
    editDictionary(row) {
      let {id,className} = row;
      this.form = Object.assign({}, this.form, {id,name:className});
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$trigger("getDictionary", this.form);
          return;
        }
        return false;
      });
    },
    close() {
      this.$trigger("closeDictionaryDialog");
    }
  }
};
</script>

<style lang="less">
.dialog-footer {
  text-align: center;
}
</style>