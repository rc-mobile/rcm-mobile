### 演示案例：
```jsx harmony
import Example from './Example'

;<div className="mobile-example">
  {window.system && window.system.env === 'doc' 
   ? <iframe src="./components/radio.html" />
   : <div><Example /></div>
  }
</div>
``` 

> 更多用法，请参考[RadioGroup组件](#/Components/RadioGroup) 

```js { "file": "../Example.tsx" }
```