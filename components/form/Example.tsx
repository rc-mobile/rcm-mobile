import React from 'react'
import { Form, InputItem, Button, Dialog } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * FormExample 演示案例
 * @author sayll
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {}
  refForm: any = React.createRef()

  render() {
    return (
      <div className="x-example">
        <h1>Form 演示</h1>

        <div style={{ padding: '1em' }}>
          <Form ref={this.refForm} onSubmit={(_e, sender) => Dialog.alert(JSON.stringify(sender.values), '表单参数')}>
            <InputItem title="整数" name="digit" type="digit" defaultValue={12} required placeholder="请输入整数" />
            <InputItem title="金额" name="money" type="money" defaultValue={10000} required placeholder="请输入金额" />
            <InputItem title="手机号" name="phone" type="phone" defaultValue={18888888888} required placeholder="请输入手机号" />
            <InputItem title="银行卡号" name="bankCard" type="bankCard" required placeholder="请输入银行卡号" />
            <InputItem
              autoSize required title="备注"
              name="remark" type="textarea"
              maxLength={100} className="x-blank"
              placeholder="长度超出，自动换行，最多100字"
            />
            <Button className="x-blank" type="submit" theme="primary">提交表单</Button>
            <Button theme="info" type="reset">重置表单</Button>
          </Form>
        </div>
      </div>
    )
  }
}

renderMobile(Example)