import React from 'react'
import { Icon } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * IconExample 演示案例
 * @author tongxiaokang
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  render() {
    return (
      <div className="x-example">
        <h1>Icon 演示</h1>

        <div style={{ padding: '20px 30px', backgroundColor: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Icon className="x-icon-arrow-left" />
            <Icon rotate={180} className="x-icon-arrow-left" />
            <Icon rotate={90} className="x-icon-arrow-left" />
            <Icon rotate={270} className="x-icon-arrow-left" />
          </div>
          <br />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Icon className="x-icon-check" />
            <Icon className="x-icon-warm" />
            <Icon className="x-icon-trash" />
            <Icon className="x-icon-search" />
          </div>
          <br />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Icon className="x-icon-close-circle" />
            <Icon className="x-icon-close-circle-o" />
            <Icon className="x-icon-circle-o" />
            <Icon className="x-icon-check-circle" />
          </div>
        </div>
      </div>
    )
  }
}

renderMobile(Example)