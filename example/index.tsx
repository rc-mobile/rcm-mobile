import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'

// 修复此处调试组件 Example 地址
import Example from '../components/form/Example'

function Render(App: any) {
  render(
    <App />,
    document.getElementById('app')
  )
}

Render(hot(module)(() => <Example />))