

<template>
  <el-dialog
    :title="form.id ? '字典值编辑' : '字典值新增'"
    :visible.sync="showDialog"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :show-close="false"
    :center="true"
    :destroy-on-close="true"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="className" label="分类名称" :label-width="formLabelWidth">
        <el-input v-model="form.className" autocomplete="off" readonly></el-input>
      </el-form-item>
      <el-form-item prop="name" label="字典值" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="remarks" label="备注" :label-width="formLabelWidth">
        <el-input type="textarea" v-model.trim="form.remarks" style="width: 250px"></el-input>
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
        id:'',
        parentId: "",
        className:"",
        name: ""
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入字段值" }],
      }
    };
  },
  events: {
    addTypeValue(row){
      let {className,id} = row;
      this.form = Object.assign({}, this.form, {className,parentId:id});
    },
    editDictionaryType(parentRow,row) {
      let {id,className} = parentRow;
      this.form = Object.assign({}, this.form, {
        parentId:id,
        className,
        name:row.name,
        id:row.id
      });
      cosnole.log(this.form)
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.form)
          this.$trigger("getDictionaryType", this.form);
          return;
        }
        return false;
      });
    },
    close() {
      this.$trigger("closeDictionaryDialog");
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.dialog-footer {
  text-align: center;
}
</style>