import React from 'react'
import { Panel, ListItem } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * PanelExample 演示案例
 * @author sayll
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {}

  render() {
    return (
      <div className="x-example">
        <h1>Panel 演示</h1>

        <div>
          <Panel title="可折叠">
            <ListItem title="List - 1" />
            <ListItem title="List - 2" />
            <ListItem title="List - 3" />
            <ListItem title="List - 4" />
          </Panel>
        </div>
        <br />
        <div>
          <Panel title="不可折叠" collapsed={false} collapsable={false}>
            <ListItem title="List - 1" />
            <ListItem title="List - 2" />
            <ListItem title="List - 3" />
            <ListItem title="List - 4" />
          </Panel>
        </div>
      </div>
    )
  }
}

renderMobile(Example)