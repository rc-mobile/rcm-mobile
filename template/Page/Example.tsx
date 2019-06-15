import React from 'react'
import { __componentName__ } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * __componentName__Example 演示案例
 * @author __userName__
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {}

  componentDidMount() {

  }

  render() {
    return (
      <div className="x-example">
        <h1>__componentName__ 演示</h1>

        <__componentName__ />
      </div>
    )
  }
}

renderMobile(Example)