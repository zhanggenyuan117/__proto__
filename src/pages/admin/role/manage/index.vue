<template>
  <div class="role-manage">
    <div class="table-list">
      <div class="operators">
        <el-button
          type="primary"
          class="fa fa-plus-circle fa-lg"
          size="small"
          @click="add"
          >&nbsp;角色新增</el-button
        >
      </div>
      <el-table
        ref="table"
        :data="
          tableData.filter(
            (data) =>
              !codeSearch ||
              data.roleName.toLowerCase().includes(codeSearch.toLowerCase())
          )
        "
        style="width: 100%"
        header-row-class-name="headerRow"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column prop="roleName" label="角色" align="center">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.isAdd || scope.row.isEdit"
              v-model="scope.row.roleName"
              size="small"
              placeholder="请设置角色名"
            />
            <span v-else>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header">
            <el-input
              v-model="codeSearch"
              size="small"
              placeholder="输入角色名进行搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button
              type="primary"
              v-if="!scope.row.isAdd && !scope.row.isEdit"
              size="mini"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="!scope.row.isAdd && !scope.row.isEdit"
              size="mini"
              type="warning"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
            <el-button
              v-if="!scope.row.isAdd && !scope.row.isEdit"
              size="mini"
              type="primary"
              @click="handleRole(scope.row)"
              >权限配置</el-button
            >
            <el-button
              type="primary"
              v-if="scope.row.isAdd || scope.row.isEdit"
              size="mini"
              @click="handleComplete(scope.row)"
              >完成</el-button
            >
            <el-button
              v-if="scope.row.isAdd || scope.row.isEdit"
              size="mini"
              type="warning"
              @click="handleCancel(scope.$index, scope.row)"
              >取消</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <transition name="slide-fade" mode="out-in">
      <role-card v-if="showRoleCard" v-on:cancel-set='cancelSet' v-on:confirm-set='confirmSet' :authorities='authorities'></role-card>
    </transition>
  </div>
</template>

<script>
import roleCard from '../../../../components/role/manage/handlerole';
export default {
  data() {
    return {
      key: "",
      tableData: [],
      codeSearch: "",
      page: 1,
      limit: 10,
      total: 0,
      // 所有字典分类
      authorities: [],
      showRoleCard:false
    };
  },
  components: {
    "role-card":roleCard
  },
  methods: {
    handleSizeChange(pageSize) {
      this.limit = pageSize;
      this.search();
    },
    handleCurrentChange(current) {
      this.page = current;
      this.search();
    },
    search() {
      this.$axios({
        url: "/api-admin/role/list",
        type: "get",
        data: {
          page: this.page,
          limit: this.limit,
          title: this.key,
        },
      })
        .then((res) => {
          const page = (res || {}).page || {};
          this.tableData = page.rows || [];
          this.total = +page.total;
        })
        .catch((err) => {
          this.$message({
            message: err.msg || "获取角色列表失败",
          });
        });
    },
    add() {
      //增加表格行
      this.tableData.unshift({
        roleName: "",
        isAdd: true,
      });
    },
    handleComplete(row) {
      //校验
      if (!row.roleName) {
        this.$message({
          type: "info",
          message: "请输入角色名",
        });
      } else {
        //区分是新增还是编辑
        if (row.isAdd) {
          this.$axios({
            url: "/api-admin/role/add",
            type: "post",
            data: {
              roleName: row.roleName,
            },
          })
            .then((res) => {
              this.search();
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err.msg || "角色新增失败",
              });
            });
        }
        if (row.isEdit) {
          this.$axios({
            url: "/api-admin/role/update",
            type: "post",
            data: {
              roleId: row.roleId,
              roleName: row.roleName,
            },
          })
            .then((res) => {
              this.search();
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err.msg || "角色修改失败",
              });
            });
        }
      }
    },
    handleCancel(index, row) {
      //区分是新增还是编辑
      if(row.isAdd){
        //删除表格行
      this.tableData.splice(index, 1);
      }
      if(row.isEdit){
        this.$set(row,'isEdit',false)
      }
    },
    handleEdit(row) {
      console.log(row);
      this.$set(row, "isEdit", true);
    },
    handleDelete({ roleId }) {
      console.log(roleId)
      this.$confirm("是否确认删除此角色?", "安全提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            url: "/api-admin/role/delete",
            type: "post",
            data: {
              roleId,
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
    handleRole(row){
      this.showRoleCard = true;
      this.$nextTick(_ => {
        this.$trigger('handleRolesTree',row)
      })
    },
    confirmSet(rowData){
      console.log(rowData)
      this.$axios({
            url: "/api-admin/role/update",
            type: "post",
            data: {
              roleId: rowData.roleId,
              roleName: rowData.roleName,
              menuIds: rowData.authority.join(',')
            },
          })
            .then((res) => {
              let {code,msg} = res;
              if(code != 0) return this.$message({
                type:'error',
                message:msg || '配置失败'
              })
              this.$message({
                type:'success',
                message:msg || '配置成功'
              })
              this.showRoleCard = false
              this.search();
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err.msg || "权限配置失败",
              });
            });
    },
    cancelSet(){
      console.log('取消')
      this.showRoleCard = false;
    },
    getAuthorities() {
      this.$axios({
        url: "/api-admin/menu/list",
        type: "get",
      })
        .then((res) => {
          this.authorities = res.page || [];
        })
        .catch((err) => {
          this.$message({
            message: err.msg || "权限加载失败",
          });
        });
    },
  },
  created() {
    this.getAuthorities();
    this.search();
  },
};
</script>

<style lang="less" scoped>
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.role-manage {
  padding: 20px;
  .operators {
    display: flex;
    padding-top: 20px;
  }
  .table-list {
    margin: 20px 0 0 0;
    background: #fff;
    /deep/ .el-input {
      width: 80%;
    }
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
