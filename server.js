const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getServerConfig = require('rcm-tools/lib/getServerConfig')
const getWebpackConfig = require('rcm-tools/lib/getWebpackConfig')

const pck = require('./package')

const webpackConfig = getWebpackConfig({
  styleGlobal: pck.styleGlobal,
  webpackConfig: {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
      index: './example/index.tsx'
    },
    resolve: {
      alias: {
        example: path.resolve('example')
      }
    },
    plugins: [
      new getWebpackConfig.webpack.DefinePlugin({
        'process.env.RUN_ENV': JSON.stringify(process.env.RUN_ENV || '')
      }),
      new HTMLPlugin({
        template: './example/index.html',
        hash: false,
        inject: true
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ]
  }
})

getServerConfig(webpackConfig)
