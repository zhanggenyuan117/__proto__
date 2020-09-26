<template>
  <div class="role_card">
    <div class="mask"></div>
    <div class="right_card">
      <div class="title">点位配置</div>
      <div class="content">
        <el-tree
          :data="authorities"
          :check-strictly='relation'
          show-checkbox
          node-key="id"
          accordion
          :props="defaultProps"
          :default-expanded-keys="rowData.authority"
          :default-checked-keys="rowData.authority"
          @check="checkedKeys"
        ></el-tree>
      </div>
      <div class="footer">
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.role_card {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(103, 98, 98, 0.5);
  }
  .right_card {
    box-sizing: border-box;
    padding-top: 30px;
    width: 400px;
    height: 100%;
    background: #ffffff;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 18px;
      font-weight: 530;
      margin-left:30px;
    }
    .content{
        margin-left: 30px;
        margin-top: 20px;
        font-size: 16px;
    }
    .footer {
        display: flex;
     position: absolute;
     bottom: 20px;
      width: 100%;
      text-align: center;
      .el-button{
         flex: 1;
      }
    }
  }
}
</style>
<script>
export default {
  props: ["authorities"],
  data() {
    return {
      relation:false,
      rowData:{
          roleId:'',
          roleName:'',
          authority:[]
      },
      defaultProps: {
        id: "id",
        label: "name",
        children: "children",
      },
    };
  },
  events:{
      handleRolesTree({ roleId, roleName, menuList }) {
      this.rowData = Object.assign(
        {},
        {
          roleId,
          roleName,
          authority: menuList
            .filter((item) => item.checked)
            .map((item) => item.id),
        }
      );
      console.log(this.rowData)
    }
  },
  methods: {
    checkedKeys(obj, checkedObj) {
      this.rowData.authority = checkedObj.checkedKeys;
      console.log(obj)
      if(obj.status == 2) this.relation = true;
    },
    confirm() {
      // console.log(this.rowData.authority)
      this.$emit("confirm-set", this.rowData);
    },
    cancel() {
      this.$emit("cancel-set");
    },
  },
};
</script>
