import React from 'react'
import { Radio } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * RadioExample 演示案例
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
        <h1>Radio 演示</h1>

        <h2>Radio</h2>
        <div style={{ padding: '1rem' }}>
          <Radio>默认选中</Radio>
          <Radio checked={false}>默认未选</Radio>
        </div>

        <h2>Radio.Group</h2>
        <div style={{ padding: '1rem' }}>
          <Radio.Group value="2" name="radio">
            <span>radio选项：</span>
            <Radio value="0">0</Radio>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
          </Radio.Group>
        </div>
      </div>
    )
  }
}

renderMobile(Example)