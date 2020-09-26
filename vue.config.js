/*
 * @Author: zhanggenyuan
 * @Date: 2020-08-06 15:01:58
 * @Description: 主文件配置
 */
let path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
};
let IS_PRODUCTION = process.env.NODE_ENV === 'production';
module.exports = {
  publicPath:
  IS_PRODUCTION ? "/production-sub-path/" : "/", //部署应用包时的基本 URL
  lintOnSave: !IS_PRODUCTION,
  filenameHashing: false,
  pages: {
    //构建多页面应用
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "豫力汽配生产管控系统",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  productionSourceMap: IS_PRODUCTION,
  configureWebpack: (config) => {
    if (IS_PRODUCTION) {
      //为生产环境进行配置 如：去除console.log ,debugger
      config.optimization.minimizer.map((arg) => {
        const option = arg.options.terserOptions.compress;
        option.drop_console = true; // 打开开关
        return arg;
      });
    } else {
      //为开发环境进行配置
    }
  },
  chainWebpack: config => {
    //设置别名  路径优化，但是若要引用static文件夹下文件，则要用一般设置
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@store", resolve("src/store"))
      .set("@pages", resolve("src/pages"))
      .set("@utils", resolve("src/utils"))
  },
  devServer: {
    port: 8082,
    open: true,
    proxy: '*****',//只配置一个跨域
    proxy: { //配置多个跨域
      // proxy all requests starting with /api to jsonplaceholder
      '/api-admin': {
        target: '*****', // 代理接口
        changeOrigin: true,
        // ws: true,//websocket支持
        // pathRewrite: {
        //     '^/api': '/mock' // 代理的路径
        // }
      },
      // '/api-admin2': {
      //   target: '', // 代理接口2
      //   changeOrigin: true,
      //   // ws: true,//websocket支持
      //   // pathRewrite: {
      //   //     '^/api': '/mock' // 代理的路径
      //   // }
      // },
    },
    before: function(app) {//mock数据
      app.use(require("./server/mockServer"));
    },
    overlay: {
      warning: true,
      error: true,
    },
  },
};
