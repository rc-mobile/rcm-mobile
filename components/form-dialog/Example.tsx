import React from 'react'
import { FormDialog, Button, InputItem, Toast } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * FormDialogExample 演示案例
 * @author sayll
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  render() {
    return (
      <div className="x-example">
        <h1>FormDialog 演示</h1>
        <div>
          <Button
            theme="info"
            className="x-blank"
            onClick={async () => {
              const sender:any = await FormDialog.alert(<div>
                <InputItem required title="姓名" name="name" />
                <InputItem required title="手机号" name="mobile" type="phone" />
                <div className="x-blank" />
                <Button className="x-blank" onClick={() => sender.destroy()}>利用返回实例关闭</Button>
                <Button onClick={() => FormDialog.destroy()}>利用卸载方式关闭</Button>
              </div>, '', sender => Toast.success(JSON.stringify(sender.form.values), 3000))
            }}
          >FormDialog.alert</Button>

          <Button
            theme="info"
            className="x-blank"
            onClick={() => {
              FormDialog.confirm(<div>
                <InputItem required title="姓名" name="name" />
                <InputItem required title="手机号" name="mobile" type="phone" />
              </div>, '', sender => Toast.success(JSON.stringify(sender.form.values), 3000))
            }}
          >FormDialog.confirm</Button>
        </div>
        <FormDialog />
      </div>
    )
  }
}

renderMobile(Example)