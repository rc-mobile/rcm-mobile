import React from 'react'
import { Input, Button } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * InputExample 演示案例
 * @author sayll
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {
    inputControlValue: '可setState修改值',
    validateResult_1: {},
    validateResult_2: {},
    validateResult_3: {}
  }

  refInputFocus: any = React.createRef()
  refInputControl: any = React.createRef()
  refInputCheck_1: any = React.createRef()
  refInputCheck_2: any = React.createRef()
  refInputCheck_3: any = React.createRef()

  render() {
    return (
      <div className="x-example">
        <h1>Input 演示</h1>

        <h2>type 参数</h2>
        <div style={{padding: '1em'}}>
          <Input className="x-blank" type="digit" placeholder="请输入整数" />
          <Input className="x-blank" type="money" placeholder="请输入金额" />
          <Input className="x-blank" type="phone" placeholder="请输入手机号" />
          <Input className="x-blank" type="bankCard" placeholder="请输入银行卡号" />
          <Input type="textarea" autoSize maxLength={100} placeholder="长度超出，自动换行，最多100字" />
        </div>

        <h2>clearable 参数</h2>
        <div style={{padding: '1em'}}>
          <Input clearable defaultValue="点击清除按钮，清空值" />
        </div>

        <h2>focus & blur & reset 方法</h2>
        <div style={{padding: '1em'}}>
          <Input className="x-blank" defaultValue="默认内容" ref={this.refInputFocus} />
          <Button
            theme="info" className="x-blank"
            onClick={() => {
              this.refInputFocus.current.focus()
              setTimeout(() => this.refInputFocus.current.blur(), 3000)
            }}
          >自动聚焦，3秒失焦</Button>
          <Button theme="info" onClick={() => this.refInputFocus.current.reset()}>重置输入框</Button>
        </div>

        <h2>受控组件</h2>
        <div style={{padding: '1em'}}>
          <Input className="x-blank" value="无法输入框内修改" />
          <Input
            ref={this.refInputControl}
            value={this.state.inputControlValue}
            onChange={e => this.setState({ inputControlValue: e.target.value })}
          />
        </div>

        <h2>参数校验</h2>
        <div style={{padding: '1em'}}>
          <p className="x-blank">校验结果：{JSON.stringify(this.state.validateResult_1)}</p>
          <Input ref={this.refInputCheck_1} className="x-blank" type="phone" placeholder="请输入整数" />
          <Button
            theme="info" className="x-blank"
            onClick={() => this.setState({ validateResult_1: this.refInputCheck_1.current.checkValidity() })}
          >type=phone，校验是否符合手机格式</Button>

          <p className="x-blank">校验结果：{JSON.stringify(this.state.validateResult_2)}</p>
          <Input
            className="x-blank"
            pattern={/^[A-Za-z]*$/}
            placeholder="请输入符合正则：/^[A-Za-z]*$/ 的值"
            ref={this.refInputCheck_2}
          />
          <Button
            theme="info" className="x-blank"
            onClick={() => this.setState({ validateResult_2: this.refInputCheck_2.current.checkValidity() })}
          >校验是否符合自定义的 pattern</Button>

          <p className="x-blank">校验结果：{JSON.stringify(this.state.validateResult_3)}</p>
          <Input
            minLength={10}
            className="x-blank"
            placeholder="请输入长度最少为10的值"
            ref={this.refInputCheck_3}
          />
          <Button
            theme="info"
            onClick={() => this.setState({ validateResult_3: this.refInputCheck_3.current.checkValidity() })}
          >校验是否符合 minLength=10 的值</Button>
        </div>
      </div>
    )
  }
}

renderMobile(Example)