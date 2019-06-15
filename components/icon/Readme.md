### 演示案例：
```jsx harmony
import Example from './Example'

;<div className="mobile-example">
  {window.system && window.system.env === 'doc' 
   ? <iframe src="./components/icon.html" />
   : <div><Example /></div>
  }
</div>
``` 
```js { "file": "../Example.tsx" }
```
> <a target="_blank" href="https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=686328&keyword=">点击查看所有图标</a>