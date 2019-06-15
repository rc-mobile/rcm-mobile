import React from 'react'
import { InputItem } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * InputItemExample 演示案例
 * @author sayll
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  render() {
    return (
      <div className="x-example">
        <h1>InputItem 演示</h1>

        <h2>title 参数</h2>
        <div style={{padding: '1em'}}>
          <InputItem title="整数" type="digit" placeholder="请输入整数" />
          <InputItem title="金额" type="money" placeholder="请输入金额" />
          <InputItem title="手机号" type="phone" placeholder="请输入手机号" />
          <InputItem title="银行卡号" type="bankCard" placeholder="请输入银行卡号" />
          <InputItem title="备注" type="textarea" autoSize maxLength={100} placeholder="长度超出，自动换行，最多100字" />
        </div>
      </div>
    )
  }
}

renderMobile(Example)