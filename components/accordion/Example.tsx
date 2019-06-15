import React from 'react'
import { Accordion, Panel, ListItem } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * AccordionExample 演示案例
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
        <h1>Accordion 演示</h1>

        <Accordion selectedIndex={[0]} onCollapseChange={console.log}>
          <Panel title="菜单 - 1">
            <ListItem title="List - 1" />
            <ListItem title="List - 2" />
            <ListItem title="List - 3" />
          </Panel>
          <Panel title="菜单 - 2">
            <ListItem title="List - 1" />
            <ListItem title="List - 2" />
            <ListItem title="List - 3" />
          </Panel>
          <Panel title="菜单 - 3">
            <ListItem title="List - 1" />
            <ListItem title="List - 2" />
            <ListItem title="List - 3" />
          </Panel>
        </Accordion>
      </div>
    )
  }
}

renderMobile(Example)
