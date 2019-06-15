import React from 'react'
import { Button, TouchFeedback } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * TouchFeedbackExample 演示案例
 * @author tongxiaokang
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  render() {
    const activeStyle = { color: 'red' }
    const activeClassName = 'x-test-active'
    return (
      <div className="x-example">
        <h1>TouchFeedback 演示</h1>

        <h3>追加点击时的属性：</h3>
        <div>
          <div className="x-blank">activeStyle: {JSON.stringify(activeStyle)}</div>
          <div className="x-blank">activeClassName: {JSON.stringify(activeClassName)}</div>

          <TouchFeedback activeStyle={activeStyle} activeClassName={activeClassName}>
            <Button theme="info">点我追加点击样式哦</Button>
          </TouchFeedback>
        </div>
      </div>
    )
  }
}

renderMobile(Example)