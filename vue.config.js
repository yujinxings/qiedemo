module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        "/pin": {
          target: "http://api.pingcc.cn/",
          changeOrigin: true,
          pathRewrite: { "^/pin": "" }
        },
        "/zs": {
          target: "http://api.zhuishushenqi.com/",
          changeOrigin: true,
          pathRewrite: { "^/zs": "" }
        }
      }
    }
  }
}