import React from 'react'
import { Button, Toast } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * ToastExample 演示案例
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
        <h1>Toast 演示</h1>

        <div>
          <Button
            theme="info" className="x-blank"
            onClick={() => Toast.info('info', 1500, undefined, { mask: false })}
          >无遮罩，多实例</Button>
          <Button theme="info" className="x-blank" onClick={() => Toast.info('info')}>Toast.info</Button>
          <Button theme="info" className="x-blank" onClick={() => Toast.warning('warning')}>Toast.warning</Button>
          <Button theme="info" className="x-blank" onClick={() => Toast.success('success')}>Toast.success</Button>
          <Button theme="info" className="x-blank" onClick={() => Toast.error('error')}>Toast.error</Button>
          <Button theme="info" onClick={() => Toast.loading('加载中', 2000)}>Toast.loading</Button>
        </div>
      </div>
    )
  }
}

renderMobile(Example)