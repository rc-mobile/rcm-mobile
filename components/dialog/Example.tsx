import React from 'react'
import { Toast, Dialog, Button } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * DialogExample 演示案例
 * @author sayll
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {}

  componentDidMount() {

  }

  render() {
    return (
      <div className="x-example">
        <h1>Dialog 演示</h1>
        <div>
          <Button
            theme="info" className="x-blank"
            onClick={() => Dialog.alert('内容：alert', 'alert', () => Toast.success('成功'))}
          >Dialog.alert</Button>
          <Button
            theme="info" className="x-blank"
            onClick={() => Dialog.confirm('内容：confirm', 'confirm', () => Toast.success('成功'))}
          >Dialog.confirm</Button>
          <Button
            theme="info" className="x-blank"
            onClick={() => Dialog.confirm('内容：confirm', '自定义操作栏', undefined, {
              onOk: () => Toast.success('点击了OK'),
              onCancel: () => Toast.error('点击了Cancel'),
              buttons: { 'OK': true, 'Cancel': false }
            })}
          >自定义：Dialog.confirm</Button>
          <Button
            theme="info" className="x-blank"
            onClick={() => Dialog.confirm('onBeforeOk为false,无法触发确定的事件', 'alert', () => Toast.success('成功'), {
              onBeforeOk: (sender) => {
                console.log(sender)
                return false
              }
            })}
          >onBeforeOk为false</Button>
        </div>
      </div>
    )
  }
}

renderMobile(Example)