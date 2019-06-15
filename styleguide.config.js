const fs = require('fs')
const path = require('path')
const pck = require('./package')
const yml = require('./styleguide/yml')
const webpackConfig = require('./webpack.config.js')

// 移除压缩代码，es6代码压缩存在兼容问题。ps：懒的替换压缩插件，干掉好了
webpackConfig.optimization = {}

module.exports = {
  title: '移动端 - 组件',
  serverPort: 6060,
  styleguideDir: 'site',
  ignore: [
    'components/style',
    'components/tools',
    'components/**/Example.tsx'
  ],
  /**
   *  文档提示参数可为数组，但实际打包编译存在错误提示，但不影响使用
   *  https://react-styleguidist.js.org/docs/configuration.html#assetsdir
   *  assetsDir: ['./styleguide', './site']
   * */
  assetsDir: process.env.RUN_ENV === 'DOC' ? './styleguide' : ['./styleguide', 'site'],
  // components: ['components/**/*.{js,jsx,ts,tsx}'],
  moduleAliases: {
    [pck.name]: __dirname
  },
  require: [
    path.join(__dirname, 'styleguide/style/index.scss'),
    path.join(__dirname, 'components/style/index.scss')
  ],
  template: {
    favicon: 'https://sayll.com/images/favicon.ico',
    head: {
      scripts: [],
      links: [
        // { rel: 'stylesheet', href: ''}
      ]
    }
  },
  pagePerSection: true,
  sections: [
    {
      name: '介绍',
      content: 'docs/Introduction.md'
    },
    {
      name: '快速上手',
      content: 'docs/GetStarted.md'
    },
    // {
    //   name: '扫描演示',
    //   usageMode: 'hide',
    //   exampleMode: 'hide',
    //   content: 'docs/Mobile.md'
    // },
    ...Object.keys(yml).map(key => ({
      name: key,
      usageMode: 'collapse',
      exampleMode: 'collapse',
      components: yml[key].map(component => `components/${component}/[A-Z]*.tsx`),
      sectionDepth: 2
    }))
  ],
  styleguideComponents: { // 改写布局
    // Usage: path.join(__dirname, 'styleguide/components/Usage')
  },
  ribbon: {
    url: 'https://github.com/rc-mobile/rcm-mobile',
    text: '查看源码'
  },

  // https://react-styleguidist.js.org/docs/configuration.html#theme
  theme: {
    color: {
      link: '#59b4aa',
      linkHover: '#009688',
      codeBackground: '#f8fbfb',
      sidebarBackground: '#fefefe',
      border: '#e6f0ee'
    }
  },
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  propsParser: (filePath, source, resolver, handlers) => {
    const result = require('react-docgen-typescript').withCustomConfig(
      './tsconfig.json',
      {
        propFilter: {
          skipPropsWithoutDoc: true
        }
      }
    ).parse(filePath, source, resolver, handlers)

    return result.map(component => {
      const { props } = component
      const mappedProps = Object.values(props).reduce((previous, prop) => {
        const { name } = prop

        if (!!~name.indexOf('aria-')) return previous
        return {
          ...previous,
          [name]: {
            ...prop,
            type: {
              name: prop.type.name.replace('| undefined', '')
            }
          }
        }
      }, {})

      return {
        ...component,
        props: mappedProps
      }
    })
  },

  /**
   * 展示源码
   * https://react-styleguidist.js.org/docs/cookbook.html#how-to-display-the-source-code-of-any-file
   * */
  updateExample(props, exampleFilePath) {
    const { settings, lang } = props
    if (typeof settings.file === 'string') {
      const filepath = path.resolve(exampleFilePath, settings.file)
      settings.static = true
      delete settings.file
      return {
        content: fs.readFileSync(filepath, 'utf8'),
        settings,
        lang
      }
    }
    return props
  },

  // 优化文档中的组件名
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.tsx')
    return `import { ${name} } from '${pck.name}';`
  },

  // webpack配置
  webpackConfig
}
