const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const {path, configWebpack} = require('./util')
const config = {
  author: 'YogurtCat',
  date: '2020-',
  name: '@yogurtcat/lib',
  repository: {
    git: 'https://github.com/YogurtCat2020/lib'
  }
}


module.exports = [
  configWebpack({
    path: path(__dirname),
    config,
    webpack,
    TerserPlugin,
    entry: 'src/index.ts',
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    min: false
  }),
  configWebpack({
    path: path(__dirname),
    config,
    webpack,
    TerserPlugin,
    entry: 'src/index.ts',
    filename: 'index.min.js',
    libraryTarget: 'global',
    library: '$yogurtcat$lib',
    min: true
  })
]
