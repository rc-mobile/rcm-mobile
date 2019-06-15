import * as React from 'react'
import cls from 'classnames'
import { Button, ButtonGroup, Popup, tools } from 'rcm-mobile'
import './style/index.scss'

let getUuid: () => string
let rootElement: Element
const actionSheetInstance: { [key: string]: any } = {}
/**
 * @author sayll
 * @version 0.0.1
 */
export default class ActionSheet extends React.PureComponent<ActionSheetProps, any> {
  static defaultProps = {
    prefixCls: 'x-action-sheet'
  }
  lock = false // 反正重复触发

  render() {
    const { prefixCls, className, title, actions, onBeforeOk, type, onOk, onCancel, ...resetProps } = this.props

    return (
      <div className={cls(prefixCls, className, { [`${prefixCls}-theme-${type}`]: type })} {...resetProps}>
        {title && <h2 className={cls(`${prefixCls}-title`)}>
          <div className="x-ellipsis" style={{ width: '18em', margin: '0 auto' }}>{title}</div>
        </h2>}

        <ButtonGroup size="large" inline={false} className={cls(`${prefixCls}-actions`)}>
          {(actions || [])
            .sort((i, k) => !i.disabled && !k.disabled ? 0 : i.disabled ? 1 : -1)
            .map((action, key) => (
              <Button
                key={`action-${key}`}
                className={cls(`${prefixCls}-actions-button`, { [`x-disabled`]: action.disabled })}
                style={action.style}
                onClick={async () => {
                  if (this.lock || action.disabled) return
                  if (onBeforeOk && await onBeforeOk(action) === false) return this.lock = false
                  this.lock = true
                  action.onClick && action.onClick(action)
                  onOk && onOk(action)
                }}
              >
                <span className={`${prefixCls}-actions-logo`}>{action.logo}</span>
                <div className={`${prefixCls}-actions-text`}>
                  <span>{action.text}</span>
                </div>
              </Button>
            ))}
        </ButtonGroup>

        <Button size="large" className={cls(`${prefixCls}-cancel`)} onClick={onCancel}>取消</Button>
      </div>
    )
  }

  static async create(actions?: Action[], title?: string, onOk?: (action: Action) => void, options?: ActionSheetProps) {
    if (!rootElement) {
      rootElement = document.createElement('div')
      rootElement.className = `${ActionSheet.defaultProps.prefixCls}-root`
      document.body.appendChild(rootElement)
    }
    getUuid = getUuid || tools.helper.getUuidFn(ActionSheet.defaultProps.prefixCls)

    const key = getUuid()
    const { title: _title, type, onBeforeOk, onOk: _onOk, onCancel, actions: _actions, ...resetProps } = options || {} as ActionSheetProps
    if (options) {
      actions = _actions || actions
      title = _title || title
      onOk = _onOk || onOk
    }

    const sender: any = await Popup.create({
      content: () => <ActionSheet
        type={type}
        title={title}
        actions={actions}
        onBeforeOk={onBeforeOk}
        onOk={action => {
          onOk && onOk(action)
          sender.destroy()
        }}
        onCancel={() => {
          onCancel && onCancel()
          sender.destroy()
        }}
      />,
      mask: true,
      onClickMask: () => sender.destroy(),
      animation: 'bottom',
      offset: {
        bottom: 0,
        left: 0,
        right: 0
      },
      ...resetProps,
      rootElement
    })

    return actionSheetInstance[key] = sender
  }

  static async showAction(actions?: Action[], title?: string, onOk?: (action: Action) => void, options?: ActionSheetProps) {
    return ActionSheet.create(actions, title, onOk, { type: 'action', ...options })
  }

  static async showActionShare(actions?: Action[], title?: string, onOk?: (action: Action) => void, options?: ActionSheetProps) {
    return ActionSheet.create(actions, title, onOk, { type: 'actionShare', ...options })
  }

  /**
   * 卸载所有ActionSheet
   * @public
   * */
  static async destroy() {
    let sender
    for (let key in actionSheetInstance) {
      sender = await actionSheetInstance[key]
      sender.destroy()
      delete actionSheetInstance[key]
    }
  }
}

export interface ActionSheetProps extends React.HTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;
  /**
   * actionSheet类型
   * @ignore
   */
  type?: 'action' | 'actionShare'
  /**
   * 标题
   * */
  title?: string
  /**
   * 操作列表
   * */
  actions?: Action[]
  /**
   * 选择前事件，return false 则不触发 action 与 onOk（允许Promise）
   * */
  onBeforeOk?: (action: Action) => boolean | Promise<boolean> | undefined
  /**
   * 选择事件
   * */
  onOk?: (action: Action) => void
  /**
   * 取消事件
   * */
  onCancel?: () => void
  /**
   * Action接口定义
   * */
  Action?: { text: React.ReactNode, style: React.CSSProperties, disabled?: boolean, onClick?: (action: Action) => void, [name: string]: any }
}

export interface Action {
  text: React.ReactNode
  style?: React.CSSProperties
  onClick?: (data: any) => void
  disabled?: boolean

  [name: string]: any
}