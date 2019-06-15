### 演示案例：
```jsx harmony
import Example from './Example'

;<div className="mobile-example">
  {window.system && window.system.env === 'doc' 
   ? <iframe src="./components/check-box.html" />
   : <div><Example /></div>
  }
</div>
``` 

> 更多用法，请参考[CheckBoxGroup组件](#/Components/CheckBoxGroup) 
```js { "file": "../Example.tsx" }
```