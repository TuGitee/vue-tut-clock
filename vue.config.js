const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir: 'dist',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set('~', path.resolve('plugins'))
    config.module.rule('js').include.add(/plugins/).end().use('babel').loader('babel-loader').tap(options => options)
  },
  css: {
    extract: false,
  },
})
