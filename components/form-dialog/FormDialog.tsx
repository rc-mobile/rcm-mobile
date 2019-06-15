import * as React from 'react'
import cls from 'classnames'
import { Dialog, Form, tools } from 'rcm-mobile'
import './style/index.scss'

let getUuid: () => string
let rootElement: Element
const formDialogInstance: { [key: string]: any } = {}
/**
 * @author sayll
 * @version 0.0.1
 */
export default class FormDialog extends React.PureComponent<FormDialogProps, any> {
  static defaultProps = {
    prefixCls: 'x-form-dialog'
  }

  refForm: any = React.createRef()

  get form() {
    return this.refForm.current
  }

  render() {
    const { prefixCls, className, children } = this.props

    return <Form ref={this.refForm} className={cls(prefixCls, className)}>{children}</Form>
  }

  static create(content: React.ReactNode, title?: string, callback?: (form: any) => void, options?: FormDialogProps) {
    getUuid = getUuid || tools.helper.getUuidFn(FormDialog.defaultProps.prefixCls)
    if (!rootElement) {
      rootElement = document.createElement('div')
      rootElement.className = `${FormDialog.defaultProps.prefixCls}-root`
      document.body.appendChild(rootElement)
    }

    const key = getUuid()
    const refFormDialog: any = React.createRef()
    const sender = Dialog.create(
      <FormDialog ref={refFormDialog}>{content}</FormDialog>,
      title,
      undefined,
      {
        onOk: () => callback && callback(refFormDialog.current),
        onBeforeOk: () => refFormDialog.current.form.reportValidity().every((item: any) => item.valid),
        ...options
      }
    )

    return formDialogInstance[key] = sender
  }

  /**
   * 消息框
   * @public
   * */
  static alert(content: React.ReactNode, title?: string, callback?: (form: any) => void, options?: FormDialogProps) {
    return FormDialog.create(content, title, callback, { type: 'alert', ...options })
  }

  /**
   * 对话框
   * @public
   * */
  static confirm(content: React.ReactNode, title?: string, callback?: (form: any) => void, options?: FormDialogProps) {
    return FormDialog.create(content, title, callback, { type: 'confirm', ...options })
  }

  /**
   * 卸载所有FormDialog
   * @public
   * */
  static async destroy() {
    let sender
    for (let key in formDialogInstance) {
      sender = await formDialogInstance[key]
      sender.destroy()
      delete formDialogInstance[key]
    }
  }
}

export interface FormDialogProps extends React.HTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;
  /**
   * 获取实例对象
   * @ignore
   */
  getSender?: any;
  /**
   * 对话框类型
   * @ignore
   */
  type?: 'alert' | 'confirm';
  /**
   * 标题
   * */
  title?: string;
  /**
   * 自定义操作栏，value为true时，则为确定按钮
   * */
  buttons?: { [content: string]: boolean | (() => void) }
  /**
   * 确定对话框事件
   * */
  onOk?: (sender: Dialog) => void
  /**
   * 即将确定对话框事件，return false 则点击无效（允许Promise）
   * */
  onBeforeOk?: (sender: Dialog) => boolean | Promise<boolean> | undefined
  /**
   * 取消对话框事件
   * */
  onCancel?: (sender: Dialog) => void
  /**
   * 打开对话框事件
   * */
  onOpen?: () => void
  /**
   * 关闭对话框事件
   * */
  onClose?: () => void
}