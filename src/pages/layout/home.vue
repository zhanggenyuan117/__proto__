<template>
  <div class="main">
    <navbar></navbar>
    <div class="container">
      <sidebar></sidebar>
      <div class="content">
        <div class="content-path">
          <i
            v-if="$route.meta.length > 2"
            class="el-icon-back"
            style="color:#999999;padding-right: 10px;cursor: pointer;"
            @click="goBack"
            >返回</i
          >{{ path }}
        </div>
        <div class="content-detail">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/pages/layout/navbar";
import sidebar from "@/pages/layout/sidebar";
import bus from "@/utils/bus";
import { mapState } from "vuex";
export default {
  watch: {
    $route(to, from) {
      let path;
      if (!this.$route.meta) {
        path = "";
      } else {
        if (this.$route.meta.length > 1) {
          path = this.$route.meta.join("-");
        } else if (this.$route.meta.length == 1) {
          path = this.$route.meta[0];
        }
      }
      this.$store.dispatch("system/setPath", path);
    },
  },
  computed: {
    ...mapState({
      path: (state) => state.system.path,
      user: (state) => state.login.user,
    }),
  },
  components: {
    navbar,
    sidebar,
  },
  methods: {
    goBack(){
      this.$router.back();
    },
    resetUser() {
      this.$store.dispatch("login/setUser", {});
      this.$store.dispatch("login/setToken", "");
      this.$store.dispatch("login/setRouter", "");
      this.$store.dispatch("system/setPath", "");
    },
  },
  // getDictionaries() {
  //   this.$axios({
  //     type: "GET",
  //     url: "/api-admin/dictType/all",
  //   }).then((res) => {
  //     this.$store.dispatch("classes/setDictLists", res.page);
  //   });
  // },
  mounted() {
    if (this.$route.path == "/home") this.$store.dispatch("system/setPath", "");
    bus.$on("goto", (path) => {
      this.resetUser();
      this.$router.push({
        path,
      });
    });
  },
};
</script>

<style lang="less">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  height: 100%;
  flex-direction: row;
}

.content {
  height: 100%;
  width: calc(~"100% - 250px");
  border-top: 1px solid #ddd;
  position: relative;

  &-path {
    height: 56px;
    padding-left:20px;
    line-height: 50px;
    color: #000;
    box-shadow: 10px 10px 5px #ccc;
  }

  &-detail {
    box-sizing: border-box;
    // min-height: 600px;
    height: 100%;
    background-color: #eff1f3;
    padding: 20px;
    .searchModel{
      background: #fff;
      margin-bottom: 20px;
      padding: 20px 0 0 20px;
    }
    .opratorBtns{
      display: flex;
      justify-content: space-between;
      background: #fff;
      padding:20px 20px 10px 20px;
    }
  }
}
</style>
