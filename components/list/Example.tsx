import React from 'react'
import { List, ListItem } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * ListExample 演示案例
 * @author tongxiaokang
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  render() {
    return (
      <div className="x-example">
        <h1>List 演示</h1>

        <h2>renderHeader 参数</h2>
        <span>
          <List renderHeader={'为容器内容添加分割线'}>
            <ListItem title="left" arrow="left" />
            <ListItem title="right" arrow="right" />
            <ListItem title="top" arrow="top" />
            <ListItem title="bottom" arrow="bottom" />
          </List>
        </span>

        <h2>renderFooter 参数</h2>
        <span>
          <List renderFooter={'尾部追加的其它内容'}>
            <ListItem title="left" arrow="left" />
            <ListItem title="right" arrow="right" />
            <ListItem title="top" arrow="top" />
            <ListItem title="bottom" arrow="bottom" />
          </List>
        </span>
      </div>
    )
  }
}

renderMobile(Example)