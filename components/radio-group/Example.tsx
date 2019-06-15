import React from 'react'
import { Radio, RadioGroup, Form, Button, Dialog, ListItem, Switch } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * RadioGroupExample 演示案例
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
        <h1>RadioGroup 演示</h1>
        <div>
          <ListItem title="禁用C选项">
            <Switch onChange={disabled => this.setState({ disabled })} value={this.state.disabled} />
          </ListItem>
        </div>

        <Form style={{ padding: '1rem' }} onSubmit={(_e, sender) => Dialog.alert(JSON.stringify(sender.values))}>
          <RadioGroup name="A" value="0">
            <span>A选项(正常)：</span>
            <Radio value="0">0</Radio>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio disabled value="3">不可选</Radio>
          </RadioGroup>

          <hr />
          <RadioGroup readOnly name="B" value="1">
            <span>B选项(只读)：</span>
            <Radio value="0">0</Radio>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
          </RadioGroup>

          <hr />
          <RadioGroup disabled={this.state.disabled} name="C" value="2">
            <span>C选项(禁用)：</span>
            <Radio value="0">0</Radio>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
          </RadioGroup>
          <br />

          <Button theme="primary" type="submit">提交</Button>
        </Form>
      </div>
    )
  }
}

renderMobile(Example)