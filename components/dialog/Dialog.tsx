import * as React from 'react'
import cls from 'classnames'
import { Popup, tools } from 'rcm-mobile'
import './style/index.scss'

let getUuid: () => string
let rootElement: Element
const dialogInstance: { [key: string]: any } = {}
/**
 * @author sayll
 * @version 0.0.1
 */
export default class Dialog extends React.PureComponent<DialogProps, any> {
  static defaultProps = {
    prefixCls: 'x-dialog'
  }

  render() {
    const {
      prefixCls, className, children, title, type, buttons,
      getSender, onBeforeOk, onOk, onCancel, ...resetProps
    } = this.props
    let operateButtons = []
    if (buttons) {
      for (const key in buttons) {
        if (buttons[key] === true) {
          operateButtons.push(<a key={key} className={`${prefixCls}-operate-ok`} href="javascript:;" onClick={() => this.handleOk()}>{key}</a>)
        }
        else {
          operateButtons.push(<a key={key} className={`${prefixCls}-operate-cancel`} href="javascript:;" onClick={() => {
            if (buttons[key]) {
              // @ts-ignore
              buttons[key](this)
              this.handleDestroy()
            }
            else {
              this.handleCancel()
            }
          }}>{key}</a>)
        }
      }
    }
    else {
      operateButtons.push(<a
        key="onOk"
        href="javascript:;"
        className={`${prefixCls}-operate-ok`}
        onClick={() => this.handleOk()}>确定</a>)
      type === 'confirm' && operateButtons.push(<a
        key="onCancel"
        href="javascript:;"
        className={`${prefixCls}-operate-cancel`}
        onClick={() => this.handleCancel()}>取消</a>)
    }

    return (
      <div className={cls(`${prefixCls}`, className)} {...resetProps}>
        <div className={`${prefixCls}-container`}>
          <div className={`${prefixCls}-content`}>
            {title ?
              <h2 className={`${prefixCls}-title`}>{title}</h2> : null}
            <div className={cls(`${prefixCls}-message`, { 'x-gray-3': !title })}>{children}</div>
          </div>
          <div className={`${prefixCls}-operate`}>{operateButtons}</div>
        </div>
      </div>
    )
  }

  handleDestroy() {
    this.props.getSender().destroy()
  }

  async handleOk() {
    const { onOk, onBeforeOk } = this.props
    if (onBeforeOk && await onBeforeOk(this) === false) return
    onOk && onOk(this)
    this.handleDestroy()
  }

  handleCancel() {
    const { onCancel } = this.props
    onCancel && onCancel(this)
    this.handleDestroy()
  }

  static async create(content: React.ReactNode, title?: string, callback?: () => void, options?: DialogProps) {
    if (!rootElement) {
      rootElement = document.createElement('div')
      rootElement.className = `${Dialog.defaultProps.prefixCls}-root`
      document.body.appendChild(rootElement)
    }
    getUuid = getUuid || tools.helper.getUuidFn(Dialog.defaultProps.prefixCls)

    const key = getUuid()
    const { title: _title, type, onBeforeOk, onOk, onCancel, buttons, ...resetProps } = options || {} as any
    if (options) {
      title = _title || title
      callback = onOk || callback
    }

    const sender = await Popup.create({
      content: () => <Dialog
        type={type}
        title={title}
        getSender={() => sender}
        buttons={buttons}
        onBeforeOk={onBeforeOk}
        onOk={callback}
        onCancel={onCancel}
      >{tools.helper.getReactNode(content)}</Dialog>,
      mask: true,
      ...resetProps,
      rootElement
    })

    return dialogInstance[key] = sender
  }

  /**
   * 消息框
   * @public
   * */
  static alert(content: React.ReactNode, title?: string, callback?: () => void, options?: DialogProps) {
    return Dialog.create(content, title, callback, { type: 'alert', ...options })
  }

  /**
   * 对话框
   * @public
   * */
  static confirm(content: React.ReactNode, title?: string, callback?: () => void, options?: DialogProps) {
    return Dialog.create(content, title, callback, { type: 'confirm', ...options })
  }

  /**
   * 卸载所有Dialog
   * @public
   * */
  static async destroy() {
    let sender
    for (let key in dialogInstance) {
      sender = await dialogInstance[key]
      sender.destroy()
      delete dialogInstance[key]
    }
  }
}

export interface DialogProps extends React.HTMLAttributes<{}> {
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