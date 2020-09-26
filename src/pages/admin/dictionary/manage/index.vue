<template>
  <div class="dictionary">
    <div class="operators">
      <div class="search">
        <el-input
          type="text"
          v-model.trim="key"
          placeholder="请输入字典名"
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="search"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="table-list">
      <div class="buttons">
        <el-button type="primary" size="small" @click="add"
          >&nbsp;字典新增</el-button
        >
        <el-button type="danger" size="small" @click="changeMultStatus(1)"
          >&nbsp;批量禁用</el-button
        >
        <el-button type="primary" size="small" @click="changeMultStatus(2)"
          >&nbsp;批量启用</el-button
        >
      </div>
      <el-table
        :data="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        :row-key="getRowKey"
        header-row-class-name="headerRow"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
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
        <!-- <el-table-column prop="remarks" label="备注"></el-table-column> -->
        <el-table-column label="操作" align="center">
          <template #default="{row}">
            <el-button type="primary" v-if='row.children' size="mini" @click="addType(row)"
              >添加</el-button
            >
            <el-button type="primary" size="mini" @click="edit(row)"
              >编辑</el-button
            >
            <el-button type="warning" size="mini" @click="del(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <cdialog v-if="showDictionary" :types="types"></cdialog>
    <v-dialog v-if="showDictionaryType"></v-dialog>
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
  </div>
</template>

<script>
import dialog from "@/components/dictionary/manage/dialog";
import vDialog from '@/components/dictionary/type/dialog';
import { columnConfig } from "./index";
export default {
  components: { cdialog: dialog,'v-dialog':vDialog },
  data() {
    return {
      columnConfig: columnConfig,
      activeColor: "#00B9ED",
      unactiveColor: "red",
      key: "",
      table: [],
      page: 1,
      limit: 10,
      total: 0,
      // 所有字典分类
      types: [],
      showDictionary: false,
      showDictionaryType:false,
      multipleSelection: [],
    };
  },
  events: {
    getDictionary({ id, name }) {
      if (id) {
        this.editSubmit({ id, name });
        return;
      }
      this.addSubmit({ name });
    },
    closeDictionaryDialog() {
      this.showDictionary = false;
       this.showDictionaryType = false;
    },
    getDictionaryType({ id,parentId, name }) {
      if (id) {
        this.editValueSubmit({ id, parentId, name });
        return;
      }
      this.addValueSubmit({ parentId,name});
    },
    // closeDictionaryTypeDialog() {
    //   this.showDictionaryType = false;
    // }
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
        url: "/api-admin/dictType/list",
        type: "get",
        data: {
          page: this.page,
          limit: this.limit,
          name: this.key,
        },
      })
        .then((res) => {
          const page = (res || {}).page || {};
          this.table = page.rows || [];
          if(this.table.length>0){
            this.table.forEach(item => {
              item.status = item.delFlag == 0?false:true;
              item.children.forEach(_item => {
                _item.status = _item.delFlag == 0?false:true;
              })
            })
          }
          this.total = +page.total;
        })
        .catch((err) => {
          this.$message({
            message: err.msg || "获取字典列表失败",
          });
        });
    },
    add() {
      this.showDictionary = true;
    },
    addType(row){
      this.showDictionaryType = true;
      this.$nextTick(_ => {
        this.$trigger('addTypeValue',row)
      })
    },
    addSubmit({ name }) {
      this.$axios({
        url: "/api-admin/dictType/add",
        type: "post",
        data: {
          name
        },
      })
        .then((res) => {
          this.showDictionary = false;
          this.search();
        })
        .catch((err) => {
          this.$message({
            message: err.msg || "添加字典失败",
          });
        });
    },
    edit(row) {
      console.log(row);
      //判断是字典分类还是字典值编辑
      if(row.children){
        this.showDictionary = true;
         this.$nextTick((_) => {
        this.$trigger("editDictionary", row);
      });
      }else{
        let parentRow;
        for(let i=0;i<this.table.length;i++){
          let _item=this.table[i];
          this.table[i].children.forEach(it => {
           if(it.id == row.id) parentRow = _item;
          })

        }
        console.log(parentRow);
        this.showDictionaryType = true;
        //值编辑需要获取到主键id和父级id
      this.$nextTick((_) => {
        this.$trigger("editDictionaryType", parentRow,row);
      });
      }
    },
    editSubmit({ id, name}) {
      this.$axios({
        url: "/api-admin/dictType/update",
        type: "post",
        data: {
          id,
          name
        },
      })
        .then((res) => {
          this.showDictionary = false;
          this.search();
        })
        .catch((err) => {
          this.$message({
            message: err.msg || "字典更新失败",
          });
        });
    },
    addValueSubmit({parentId,name}){
       this.$axios({
        url: "/api-admin/dict/add",
        type: "post",
        data: {
          parentId,
          name
        },
      })
        .then((res) => {
          this.showDictionaryType = false;
          this.search();
        })
        .catch((err) => {
          this.$message({
            message: err.msg || "添加字典值失败",
          });
        });
    },
    editValueSubmit({id,parentId,name}){
      this.$axios({
        url: "/api-admin/dict/update",
        type: "post",
        data: {
          id,
          parentId,
          name
        },
      })
        .then((res) => {
          this.showDictionaryType = false;
          this.search();
        })
        .catch((err) => {
          this.$message({
            message: err.msg || "字典值更新失败",
          });
        });
    },
    changeStatus(val,row){
      console.log(val,row)
      let params={},url='';
      if(row.children){
        //更改分类
        params = {
          id:row.id,
          name:row.className,
          delFlag:val?1:0
        },
        url='/api-admin/dictType/update'
      }else{
        //更改值
         params = {
          id:row.id,
          parentId:row.parentId,
          name:row.name,
          delFlag:val?1:0
        },
        url='/api-admin/dict/update'
      }
      this.$axios({
        url: url,
        type: "post",
        data:params
      })
        .then((res) => {
          let { code, msg } = res;
          if (code == 0) {
            this.$set(row, "status", val);
            this.$message({
              type: "success",
              message: msg || "状态更新成功",
            });
            this.search();
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
    del(row) {
      this.$confirm("是否确认删除此条字典字段?", "安全提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let url= row.children?'/api-admin/dictType/delete':'/api-admin/dict/delete'
          this.$axios({
            url: url,
            type: "post",
            data: {
              id:row.id
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
    getAllDictType() {
      this.$axios({
        url: "/api-admin/dictType/all",
        type: "get",
      }).then((res) => {
        this.types = res.page || [];
      });
    },
    getDictTypeName(id) {
      return this.types.find((item) => +item.id === +id).name || "";
    },
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    changeMultStatus(i) {
      console.log(i)
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: "info",
          message: "请勾选要批量禁用的项",
        });
      } else {
        this.$confirm("是否确认进行批量禁用?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let dictIds=[],dictTypeIds=[];
            this.multipleSelection.forEach(item => {
              dictTypeIds.push(item.id);
              if(item.children.length>0){
                item.children.forEach(_item => {
                  dictIds.push(_item.id)
                })
              }
            })
            this.$axios({
              url: i==1?"/api-admin/dictType/batchDisable":"/api-admin/dictType/batchEnable",
              type: "post",
              data: {
                dictIds:dictIds.join(','),
                dictTypeIds:dictTypeIds.length>0?dictTypeIds.join(','):''
              },
            })
              .then((res) => {
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
                this.search();
              })
              .catch((err) => {
                this.$message({
                  message: err.msg || "操作失败",
                });
              });
          })
          .catch(() => {});
      }
    },
    getRowKey(row) {
      return row.id;
    },
  },
  created() {
    this.getAllDictType();
    this.search();
  },
};
</script>

<style lang="less" scoped>
.dictionary {
  padding: 20px;
  .operators,
  .operators .search {
    display: flex;
  }
  .table-list {
    margin: 20px 0 0 0;
    background: #ffffff;
    .buttons {
      padding-top: 20px;
    }
  }
  .operators /deep/ .el-input {
    width: 250px;
  }
  // .pagination {
  //   padding: 50px;
  //   text-align: center;
  //   background-color: #fff;
  // }
  /deep/ .el-button {
    margin: 0 0 0 20px;
  }
}
</style>
