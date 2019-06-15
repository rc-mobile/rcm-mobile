### 1.创建一个项目（走模版创建，无需任何配置，尚未开源）
走模版创建的项目，无需下面配置操作，开箱即用。敬请期待...

### 2.依赖安装
```bash
npm i -S rcm-mobile  # 下载依赖
```

### 3.初始HTML
解决不同机型的多倍屏问题，通过设置视网膜显示屏来达到统一的目的。
> 组件尺寸大小都是基于 rem 开发，可以灵活调整以适用想要适配的视网膜显示屏

- 通用做法：一倍视网膜显示屏方案
```md
<!DOCTYPE html>
<html lang="cn">
  <head>
    <meta charset="utf-8">
    <meta
      name="viewport"
      content="width=device-width,
      initial-scale=1, maximum-scale=1,
      minimum-scale=1, user-scalable=no"
    />
    <meta name="apple-mobile-web-app-capable" content="yes" />
  </head>
  <body></body>
</html>
```

- 自定义：多倍视网膜显示屏
  1. 第一步：确定视网膜显示屏倍数，如现在设成 2倍
  2. 第二步：初始化rem的大小，html{font-size: 32px}。即浏览器默认的文字大小(16px) * 视网膜显示屏倍数
  3. 第三步：恢复body下的文字大小，body{font-size: 16px}
  
```md
<!DOCTYPE html>
<html lang="cn" style="font-size: 32px;">
  <head>
    <meta charset="utf-8">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <script>
     (function () {
        var phoneScale = parseInt(window.screen.width) / 750
        document.write('\<meta name="viewport" content="width=750, minimum-scale=' + phoneScale +
          ', maximum-scale=' + phoneScale + ', user-scalable=no, viewport-fit=cover">')
      })()
    </script>
  </head>
  <body style="font-size: 16px;"></body>
</html>
```

### 4.全量使用（**不推荐**）
组件使用实例：
```jsx static
import { Button } from 'rcm-mobile';
import 'rcm-mobile/dist/rcm-mobile.css';

ReactDOM.render(<Button>Start</Button>, document.body);
```

### 5.按需加载（**推荐**）
- 方式一：使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)（推荐）
  1. 配置 `babel`
  
    ```md
    // .babelrc or babel-loader option
    {
      "plugins": [
        ["import", {
          "libraryName": "rcm-mobile",
          "libraryDirectory": "lib",
          "style": true
        }, "rcm-mobile"]
      ]
    }
    ```

然后只需从 `rcm-mobile` 引入模块即可，无需单独引入样式。
```jsx static
import { Button } from 'rcm-mobile';

ReactDOM.render(<Button>Start</Button>, document.body);
```

- 方式二：手动引入需要的组件
```jsx static
import Button from 'rcm-mobile/lib/button';  // 加载 JS
import 'rcm-mobile/lib/button/style';  // 加载 CSS
```