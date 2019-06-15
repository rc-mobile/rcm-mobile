// mark: 手机演示 demo
import * as React from 'react'
import { render } from 'react-dom'
import data from './assets/data.json'
import './index.scss'

console.log(data)

class Home extends React.Component {
  render(): React.ReactNode {
    return <div>test</div>
  }
}

render(<Home />, document.getElementById('app'))
