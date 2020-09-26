/**
 * @file 左侧菜单
 * @author donghongyan
 * @date 2020-06-02
 */
<template>
  <div class="sidebar">
    <el-menu
      style="width:100%;"
      :default-active="defaultActiveIndex"
      router
      :collapse="collapsed"
      @select="handleSelect"
      :unique-opened="true"
    >
      <el-menu-item index="/home">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- v-if="item.menuShow && !item.leaf" -->
      <template v-for="(item, index) in menus">
        <!--目录-->
        <el-submenu
          v-if="!item.leaf && item.children.length>0"
          :index="index + ''"
          :key="index+'0'"
        >
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <!--菜单-->
          <el-menu-item
            v-for="(term, index) in item.children"
            :key="index"
            :index="term.path"
            :class="$route.path === term.path ? 'is-active' : ''"
          >
            <i :class="term.iconCls"></i>
            <span slot="title">{{ term.name }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-if="!item.leaf && item.children.length==0" :index="item.path" :key="index">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapState } from "vuex";
import merge from "deepmerge";
export default {
  data() {
    return {
      defaultActiveIndex: "",
      collapsed: false,
      menus: []
    };
  },
  computed: {
    ...mapState({
      router: state => state.login.router
    })
  },
  methods: {
    collapse() {
      this.collapsed = !this.collapsed;
    },
    handleSelect(index) {
      this.defaultActiveIndex = index;
    }
  },
  mounted() {
    this.menus = JSON.parse(JSON.stringify(this.router));
    this.menus.forEach(item => {
      item.children = item.children.filter(
        itemChildren => itemChildren.menuShow
      );
    });
    this.menus = this.menus.filter(item => item.menuShow && !item.leaf);
    this.defaultActiveIndex = this.$route.path;
  }
};
</script>

<style lang="less" scoped>
.sidebar {
  width: 250px;
  font-size: 20px;
  font-weight: 700;
  background: #00b9ed;
  border-top: 1px solid #2aadd2;
  /deep/ .el-menu {
    border-right: 0;
  }
  /deep/ .el-submenu__title,
  /deep/ .el-menu-item-group__title,
  /deep/ .el-menu-item {
    font-size: 16px;
    background-color: #00b9ed;
    color:#fff;
    span {
      margin: 0 0 0 10px;
    }
  }
  /deep/ .el-menu-item.is-active {
  background: #ffffff;
  color:#00b9ed;
}
  /deep/ .el-menu-item:focus,
  /deep/ .el-menu-item:hover {
    background-color:#fff;
    color:#00b9ed;
  }
  /deep/ .el-submenu__title i {
    color: #fff;
    font-weight: 700;
}
}
</style>