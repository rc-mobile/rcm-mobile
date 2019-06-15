const path = require('path')
const pck = require('./package')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getWebpackConfig = require('rcm-tools/lib/getWebpackConfig')
const { getEntries } = require('rcm-tools/lib/utils/buildHelper')

// 打包器
const run_env = process.env.RUN_ENV

const webpackConfig = getWebpackConfig({
  // libraries: ['rcm-mobile'],
  styleGlobal: pck.styleGlobal, // 注入全局的sass
  webpackConfig: {
    resolve: {
      alias: {
        example: path.resolve('example')
      }
    },
    plugins: [
      new getWebpackConfig.webpack.DefinePlugin({
        'process.env.RUN_ENV': JSON.stringify(run_env || '')
      })
    ]
  }
})

if (run_env) {
  switch (run_env) {
    case 'DOC':
      /**
       * markdown编译所需的配置
       * fixme: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/73
       * */
      webpackConfig.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }))
      break
    case 'DEMO':
      buildDemo(webpackConfig)
      break
    case 'MOBILE':
      buildMobile(webpackConfig)
      break
    default:
      // 为组件打包排除掉其它一些外部依赖
      webpackConfig.forEach(config => {
        pck.externalDependencies.forEach(node => externalRCM(config, node))
      })
  }
}
else {
  /**
   * fixme: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/73
   * */
  webpackConfig.plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }))
}

module.exports = webpackConfig

// 排除公共项
function externalRCM(config, rcm) {
  config.externals[rcm] = {
    amd: rcm,
    root: rcm,
    commonjs: rcm,
    commonjs2: rcm
  }
}

// 打包Demo
function buildDemo(webpackConfig) {
  webpackConfig.mode = 'production'
  webpackConfig.entry = {
    index: './example/index.jsx'
  }
  webpackConfig.output = {
    path: path.resolve('./demo'),
    filename: '[name].js'
  }
  webpackConfig.plugins.push(
    new HTMLPlugin({
      template: './example/index.html',
      hash: false,
      inject: true
    }),
    // fixme: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/73
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  )
}

// 打包手机演示
function buildMobile(webpackConfig) {
  webpackConfig.mode = 'production'
  webpackConfig.output.path = path.resolve('./site')
  webpackConfig.entry = {}

  // 组件案例模版
  const componentsInfo = getEntries('./components')
  for (let key in componentsInfo) {
    if (componentsInfo.hasOwnProperty(key)
      && !({ // 排除这类非组件进入打包
        'components/index': true,
        'components/style': true,
        'components/tools': true
      })[key]) {
      webpackConfig.entry[key] = [`./${key}/Example.tsx`]
    }
  }

  for (let key in webpackConfig.entry) {
    webpackConfig.plugins.push(new HTMLPlugin({
      filename: key + '.html',
      template: path.resolve('./example/index.html'),
      inject: 'body',
      chunks: [key]
    }))
  }

  // 添加手机演示模版
  // webpackConfig.entry.mobile = ['./example/mobile.tsx']
  webpackConfig.plugins.push(
    new getWebpackConfig.webpack.DefinePlugin({
      'process.env.RUN_ENV': JSON.stringify(process.env.RUN_ENV || '')
    }),
    // new HTMLPlugin({
    //   filename: 'mobile.html',
    //   template: path.resolve('./example/index.html'),
    //   inject: 'body',
    //   chunks: ['mobile']
    // }),
    new MiniCssExtractPlugin({ filename: '[name].css' })
  )
}