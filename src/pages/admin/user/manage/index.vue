<template>
  <div class="user-manage">
    <div class="operators">
      <div class="search">
        <el-form :inline="true" ref="paramsModel" :model="params">
          <el-form-item label="登录名" prop="name">
            <el-input
              type="text"
              v-model.trim="params.name"
              placeholder="请输入登录名"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="teleNumber">
            <el-input
              type="text"
              v-model.trim="params.teleNumber"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="params.roleId" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="search"
              >搜索</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="reset"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table-list">
      <el-button
        type="primary"
        class="fa fa-plus-circle fa-lg"
        size="small"
        @click="add"
        >&nbsp;用户新增</el-button
      >
      <el-button
        type="warning"
        class="fa fa-plus-circle fa-lg"
        size="small"
        @click="delets"
        >&nbsp;批量删除</el-button
      >
      <el-table
        ref="multipleTable"
        :data="table"
        @selection-change="handleSelectionChange"
        :row-key="getRowKey"
        header-row-class-name="headerRow"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          v-for="(column, i) in columnConfig"
          :key="i"
          :label="column.label"
          :prop="column.prop"
          :min-width="column.minWidth"
          :align="column.align"
        ></el-table-column>
        <el-table-column label="状态">
          <template #default="{row}">
            <el-switch
              v-model="row.status"
              :active-color="activeColor"
              :inactive-color="unactiveColor"
              @change="(val) => changeStatus(val, row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="150px">
          <template #default="{row}">
            <el-button type="primary" size="mini" @click="edit(row)"
              >编辑</el-button
            >
            <el-button type="warning" size="mini" @click="del(row)"
              >删除</el-button
            >
            <el-button type="danger" size="mini" @click="resetPwd(row)"
              >重置密码</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <cdialog v-if="showUserManage" :roles="options"></cdialog>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import dialog from "@/components/user/manage/dialog";
import { columnConfig } from "./index.js";
export default {
  components: { cdialog: dialog },
  data() {
    return {
      activeColor: "#00B9ED",
      unactiveColor: "red",
      table: [],
      options: [],
      params: {
        page: 1,
        limit: 10,
        name: "",
        teleNumber: "",
        roleId: "",
      },
      total: 0,
      columnConfig: columnConfig,
      showUserManage: false,
      multipleSelection: [],
    };
  },
  events: {
    getUserManage({
      id,
      jobNumber,
      username,
      deptId,
      roleId,
      teleNumber,
      nickName,
      status,
    }) {
      if (id) {
        this.editSubmit({
          id,
          jobNumber,
          username,
          deptId,
          roleId,
          teleNumber,
          nickName,
          status,
        });
        return;
      }
      this.addSubmit({
        jobNumber,
        username,
        deptId,
        roleId,
        teleNumber,
        nickName,
      });
    },
    closeUserManageDialog() {
      this.showUserManage = false;
    },
  },
  methods: {
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    getRowKey(row) {
      return row.id;
    },
    reset() {
      this.$refs["paramsModel"].resetFields();
      this.search();
    },
    resetPwd({ id }) {
      this.$confirm("是否确认重置密码?", "安全提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            url: "/api-admin/user/resetPassword",
            type: "post",
            data: {
              id
            },
          })
            .then((res) => {
              let {code,msg} = res;
              if(code != 0) return this.$message({
                type:'info',
                message:msg || '重置失败'
              })
              this.$message({
                type:'info',
                message:msg || '重置成功'
              })
            })
            .catch((err) => {
              this.$message({
                message: err.msg || "重置失败",
              });
            });
        })
        .catch(() => {});
    },
    handleSizeChange(pageSize) {
      this.limit = pageSize;
      this.search();
    },
    handleCurrentChange(current) {
      this.page = current;
      this.search();
    },
    getRoleLists() {
      //获取角色管理列表
      this.$axios({
        url: "/api-admin/role/all",
        type: "get",
      })
        .then((res) => {
          const page = (res || {}).page || [];
          this.options = page;
        })
        .catch((err) => {});
    },
    search() {
      this.$axios({
        url: "/api-admin/user/list",
        type: "get",
        data: this.params,
      })
        .then((res) => {
          const page = (res || {}).page || {};
          this.table = page.rows || [];
          if (this.table.length > 0)
            [
              this.table.forEach((item) => {
                //status新增时默认为1--启用
                item.status = item.status == 0 ? false : true;
              }),
            ];
          this.total = +page.total;
        })
        .catch((err) => {
          this.$message({
            message: err.msg || "获取字典列表失败",
          });
        });
    },
    add() {
      this.showUserManage = true;
    },
    addSubmit({ jobNumber, username, deptId, roleId, teleNumber, nickName }) {
      this.$axios({
        url: "/api-admin/user/add",
        type: "post",
        data: {
          jobNumber,
          username,
          deptId:deptId.slice(-1)[0],
          roleId,
          teleNumber,
          nickName,
        },
      })
        .then((res) => {
          this.showUserManage = false;
          this.search();
        })
        .catch((err) => {
          this.$message({
            message: err.msg || "用户新增失败",
          });
        });
    },
    edit(row) {
      this.showUserManage = true;
      this.$nextTick((_) => {
        console.log(row)
        this.$trigger("editUserManage", row);
      });
    },
    editSubmit({
      id,
      jobNumber,
      username,
      deptId,
      roleId,
      teleNumber,
      nickName,
      status,
    }) {
      this.$axios({
        url: "/api-admin/user/update",
        type: "post",
        data: {
          id,
          jobNumber,
          username,
          deptId,
          roleId,
          teleNumber,
          nickName,
          status:status?1:0,
        },
      })
        .then((res) => {
          this.showUserManage = false;
          this.search();
        })
        .catch((err) => {
          this.$message({
            message: err.msg || "用户编辑失败",
          });
        });
    },
    del({ id }) {
      this.$confirm("是否确认删除此用户?", "安全提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            url: "/api-admin/user/delete",
            type: "post",
            data: {
              ids: id,
            },
          })
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.search();
            })
            .catch((err) => {
              this.$message({
                message: err.msg || "删除失败",
              });
            });
        })
        .catch(() => {});
    },
    delets() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: "info",
          message: "请勾选要删除的项",
        });
      } else {
        let ids = [];
        this.multipleSelection.forEach((item) => {
          ids.push(item.id);
        });
        this.$confirm("是否确认删除所选用户?", "安全提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios({
              url: "/api-admin/user/delete",
              type: "post",
              data: {
                ids: ids.join(","),
              },
            })
              .then((res) => {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.search();
              })
              .catch((err) => {
                this.$message({
                  message: err.msg || "删除失败",
                });
              });
          })
          .catch(() => {});
      }
    },
    changeStatus(val, row) {
      let {
        id,
        jobNumber,
        username,
        deptId,
        roleId,
        teleNumber,
        nickName,
      } = row;
      this.$axios({
        url: "/api-admin/user/update",
        type: "post",
        data: {
          id,
          jobNumber,
          username,
          deptId,
          roleId: +roleId,
          teleNumber,
          nickName,
          status:!!val?1:0,
        },
      })
        .then((res) => {
          let { code, msg } = res;
          if (code == 0) {
            this.$set(row, "status", val);
            this.$message({
              type: "success",
              message: msg || "状态更新成功",
            });
          } else {
            this.$set(row, "status", !val);
            this.$message({
              type: "info",
              message: msg || "状态更新失败",
            });
          }
        })
        .catch((err) => {
          this.$set(row, "status", !val);
          this.$message({
            type: "info",
            message: err.msg || "状态更新失败",
          });
        });
    },
  },
  created() {
    this.search();
    this.getRoleLists();
  },
};
</script>

<style lang="less" scoped>
.user-manage {
  padding: 20px;
  .operators,
  .operators .search {
    display: flex;
  }
  .table-list {
    margin: 20px 0 0 0;
    background: #fff;
    padding-top: 20px;
  }
  .operators /deep/ .el-input {
    width: 250px;
  }
  .pagination {
    padding: 50px;
    text-align: center;
    background-color: #fff;
  }
  /deep/ .el-button {
    margin: 0 0 0 20px;
  }
}
</style>
