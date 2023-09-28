const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: 'dist',
  assetsDir: './static',
  publicPath: './',
  productionSourceMap: false,
  chainWebpack: config => {
    config.optimization.minimize(true)
    config.resolve.alias.set('~', path.resolve('plugins'))
    config.module.rule('js').include.add(/plugins/).end().use('babel').loader('babel-loader').tap(options => options)
  },
  css: {
    extract: false,
  },
  configureWebpack: {
    output: {
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/[id].[chunkhash].js'
    },
  }
})
