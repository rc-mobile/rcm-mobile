import * as React from 'react'
import cls from 'classnames'
import { Icon, Popup, PopupProps, tools } from 'rcm-mobile'
import './style/index.scss'

let getUuid: () => string
let rootElement: Element
const toastInstance: { [key: string]: any } = {}

/**
 * @author sayll
 * @version 0.0.1
 */
export default class Toast extends React.PureComponent<ToastProps, any> {
  static defaultProps = {
    prefixCls: 'x-toast'
  }

  render() {
    const { prefixCls, className, children, ...resetProps } = this.props

    return (
      <div className={cls(`${prefixCls}`, className)} {...resetProps}>
        {children}
      </div>
    )
  }

  // @ts-ignore
  static async create(content: React.ReactNode, duration?: number = 1500, callback?: (sender: any) => any, options?: PopupProps) {
    if (!getUuid) {
      getUuid = tools.helper.getUuidFn(Toast.defaultProps.prefixCls)
    }
    if (!rootElement) {
      rootElement = document.createElement('div')
      rootElement.className = `${Toast.defaultProps.prefixCls}-root`
      document.body.appendChild(rootElement)
    }
    const key = getUuid()
    const sender = await Popup.create({
      content: <Toast>{content}</Toast>,
      mask: true,
      animation: 'zoomOut',
      ...options,
      rootElement
    }, callback)
    toastInstance[key] = sender

    if (duration) {
      setTimeout(() => {
        toastInstance[key].destroy()
        delete toastInstance[key]
      }, duration)
    }
    return sender
  }

  /**
   * 普通信息提示
   * @public
   * */
  // @ts-ignore
  static async info(content: React.ReactNode, duration?: number = 1500, callback?: (sender: any) => any, options?: PopupProps) {
    return Toast.create(<div>{content}</div>, duration, callback, options)
  }

  /**
   * 错误信息提示
   * @public
   * */
  // @ts-ignore
  static error(content: React.ReactNode, duration?: number = 1500, callback?: (sender: any) => any, options?: PopupProps) {
    return Toast.create(<div>
      <div style={{ textAlign: 'center' }}><Icon className="x-icon-close-circle-o" /></div>
      {content}
    </div>, duration, callback, options)
  }

  /**
   * 警告信息提示
   * @public
   * */
  // @ts-ignore
  static warning(content: React.ReactNode, duration?: number = 1500, callback?: (sender: any) => any, options?: PopupProps) {
    return Toast.create(<div>
      <div style={{ textAlign: 'center' }}><Icon className="x-icon-warm" /></div>
      {content}
    </div>, duration, callback, options)
  }

  /**
   * 成功信息提示
   * @public
   * */
  // @ts-ignore
  static success(content: React.ReactNode, duration?: number = 1500, callback?: (sender: any) => any, options?: PopupProps) {
    return Toast.create(<div>
      <div style={{ textAlign: 'center' }}><Icon className="x-icon-check-circle-o" /></div>
      {content}
    </div>, duration, callback, options)
  }

  /**
   * 加载信息提示
   * @public
   * */
  // @ts-ignore
  static loading(content?: React.ReactNode = '加载中...', duration?: number = 0, callback?: (sender: any) => any, options?: PopupProps) {
    return Toast.create(<div>
      <div style={{ textAlign: 'center' }}><Icon spin className="x-icon-loading" /></div>
      {content}
    </div>, duration, callback, options)
  }

  /**
   * 卸载所有Toast
   * @public
   * */
  static async destroy() {
    let sender
    for (let key in toastInstance) {
      sender = await toastInstance[key]
      sender.destroy()
      delete toastInstance[key]
    }
  }
}

export interface ToastProps extends React.HTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;
}