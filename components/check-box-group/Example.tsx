import React from 'react'
import { Button, CheckBox, CheckBoxGroup, Dialog, Form, ListItem, Switch } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * CheckBoxGroupExample 演示案例
 * @author sayll
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {
    disabled: true
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="x-example">
        <h1>CheckBoxGroup 演示</h1>

        <h2>部分选项只读</h2>
        <ListItem title="禁用B选项">
          <Switch onChange={disabled => this.setState({ disabled })} value={this.state.disabled} />
        </ListItem>
        <Form style={{ padding: '1rem' }} onSubmit={(_e, sender) => Dialog.alert(JSON.stringify(sender.values))}>
          <CheckBoxGroup value={['0', '2']} name="A">
            <span>A选项：</span>
            <CheckBox readOnly value="0">0</CheckBox>
            <CheckBox value="1">1</CheckBox>
            <CheckBox value="2">2</CheckBox>
            <CheckBox value="3">3</CheckBox>
          </CheckBoxGroup>
          <br />

          <CheckBoxGroup value={['3']} disabled={this.state.disabled} name="B">
            <span>B选项：</span>
            <CheckBox value="0">0</CheckBox>
            <CheckBox value="1">1</CheckBox>
            <CheckBox value="2">2</CheckBox>
            <CheckBox value="3">3</CheckBox>
          </CheckBoxGroup>
          <br />
          <Button theme="primary" type="submit">提交</Button>
        </Form>
      </div>
    )
  }
}

renderMobile(Example)