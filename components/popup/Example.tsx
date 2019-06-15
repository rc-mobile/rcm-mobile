import React from 'react'
import { Popup, Button } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * PopupExample 演示案例
 * @author sayll
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = { visible: false }

  componentDidMount() {

  }

  render() {
    return (
      <div className="x-example">
        <h1>Popup 演示</h1>

        <div>
          <Popup mask animation="zoomOut" visible={this.state.visible}>
            <Button theme="primary" onClick={() => this.setState({ visible: false })}>隐藏</Button>
          </Popup>
          <Button theme="primary" onClick={() => this.setState({ visible: true })}>显示</Button>
          <Button theme="primary" onClick={() => {
            let clear: any
            Popup.create({
              mask: true,
              content: <Button theme="primary" onClick={() => clear()}>test</Button>,
              rootElement: document.querySelector('.x-example')
            }, sender => {
              clear = sender.destroy
            })
          }}>show</Button>
        </div>
      </div>
    )
  }
}

renderMobile(Example)