### 演示案例：
```jsx harmony
import Example from './Example'

;<div className="mobile-example">
  {window.system && window.system.env === 'doc' 
   ? <iframe src="./components/input-item.html" />
   : <div><Example /></div>
  }
</div>
``` 

> 具体参数请参考 [Input](#/Components/Input) 组件

```js { "file": "../Example.tsx" }
```