import React from 'react'
import { Picker, Form, Button, Dialog } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * PickerExample 演示案例
 * @author sayll
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {
    value: 0,
    showValue: '',
    multipleValue: []
  }

  componentDidMount() {
    setInterval(() => {
      this.setState((state: any) => ({ value: state.value === 5 ? 0 : state.value + 1 }))
    }, 1000)
  }

  render() {
    return (
      <div className="x-example">
        <h1>Picker 演示</h1>

        <h2>选择器</h2>
        <Form onSubmit={(_e, sender) => Dialog.alert(JSON.stringify(sender.values))}>
          <Picker name="picker" data={this.sourceData} />
          <Button type="submit" theme="primary">提交</Button>
        </Form>

        <h2>动态默认项</h2>
        <Picker value={this.state.value} data={this.sourceData} />

        <h2>Picker 静态方法</h2>
        <Button
          theme="info"
          className="x-blank"
          onClick={() => Picker.show({
            data: this.sourceData,
            value: this.state.showValue,
            onOk: (res) => this.setState({ showValue: res.value })
          })}
        >Picker.show：{JSON.stringify(this.state.showValue)}</Button>

        <Button
          theme="info"
          className="x-blank"
          onClick={() => Picker.multiple({
            data: [this.sourceData, this.sourceData],
            value: this.state.multipleValue,
            onOk: (res, _senders) => this.setState({ multipleValue: res.map((item: any) => item.value) })
          })}
        >Picker.multiple：{JSON.stringify(this.state.multipleValue)}</Button>
      </div>
    )
  }


  sourceData = [
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
  ]
}

renderMobile(Example)