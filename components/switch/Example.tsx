import React from 'react'
import { Dialog, Form, Switch, Button, List, ListItem } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * SwitchExample 演示案例
 * @author sayll
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {
    test3: false
  }

  render() {
    return (
      <div className="x-example">
        <h1>Switch 演示</h1>
        <Form onSubmit={(_e, sender) => Dialog.alert(JSON.stringify(sender.values), '表单结果')}>
          <List>
            <ListItem title="启用状态">
              <Switch size={1.1} color="#208fee" name="test1" defaultValue={true} />
            </ListItem>

            <ListItem title="禁用状态">
              <Switch size={1.3} name="test2" defaultValue={true} disabled />
            </ListItem>

            <ListItem title="异步任务">
              <Switch
                name="test3"
                value={this.state.test3}
                loading={true}
                checkLabel={'开'}
                unCheckLabel={'关'}
                onBeforeChange={() => new Promise(resolve => setTimeout(() => resolve(true), 1000))}
              />
            </ListItem>
          </List>
          <Button theme="primary" className="x-blank" type="submit">submit</Button>
          <Button theme="info" onClick={() => this.setState({ test3: !this.state.test3 })}>手动切换异步任务</Button>
        </Form>
      </div>
    )
  }
}

renderMobile(Example)