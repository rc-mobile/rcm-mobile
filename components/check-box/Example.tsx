import React from 'react'
import { CheckBox, Button, Switch, ListItem } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * CheckBoxExample 演示案例
 * @author sayll
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {
    checked: false,
    disabled: false
  }

  componentDidMount() {

  }

  render() {
    const { disabled } = this.state
    return (
      <div className="x-example">
        <h1>CheckBox 演示</h1>
        <div style={{ padding: '1rem' }}>
          <CheckBox checked={this.state.checked} disabled={disabled}>{disabled ? '禁用' : '正常'}</CheckBox>
        </div>
        <div>
          <ListItem title="是否禁用">
            <Switch value={disabled} onChange={() => this.setState({ disabled: !disabled })} />
          </ListItem>
          <Button className="x-blank" theme="info" onClick={() => this.setState({ checked: !this.state.checked })}>check</Button>
        </div>
      </div>
    )
  }
}

renderMobile(Example)