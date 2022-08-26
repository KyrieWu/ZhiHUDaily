const { defineConfig } = require("@vue/cli-service");
const ENV = process.env.NODE_ENV;
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: ENV !== "production",
  publicPath: "./",
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
