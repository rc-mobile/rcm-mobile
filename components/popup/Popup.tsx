import * as React from 'react'
import * as ReactDOM from 'react-dom'
import cls from 'classnames'
import { tools } from 'rcm-mobile'
import './style/index.scss'

const { dom } = tools

// 当存在遮罩时，限制滚动，记录恢复的状态
const windowOverflow = window.getComputedStyle(document.documentElement).overflow

/**
 * @author sayll
 * @version 0.0.1
 */
export default class Popup extends React.PureComponent<PopupProps, any> {
  static defaultProps = {
    prefixCls: 'x-popup',
    animation: 'opacity',
    offset: { top: '30%', left: 0, right: 0 },
    visible: true,
    mask: false
  }

  constructor(props: PopupProps) {
    super(props)
    this.state = {
      visible: props.visible
    }
  }

  componentDidMount(): void {
    this.handleToggleVisible()
  }

  static getDerivedStateFromProps(nextProps: PopupProps, prevState: any) {
    if (nextProps.visible !== prevState.visible) {
      return { visible: nextProps.visible }
    }
    return null
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<PopupProps>): any | null {
    if (prevProps.visible !== this.props.visible) {
      this.handleToggleVisible()
    }
    return null
  }

  render() {
    const { prefixCls, className, children, visible, mask, onClickMask, offset: _offset, ...resetProps } = this.props
    const offset = _offset || {}
    return (
      <div className={cls(prefixCls, className, { [`${prefixCls}-visible`]: visible })} {...resetProps}>
        <div
          ref={this.refPopupModal}
          className={`${prefixCls}-modal`}
          style={{
            top: offset.top !== undefined ? offset.top : 'auto',
            left: offset.left !== undefined ? offset.left : 'auto',
            right: offset.right !== undefined ? offset.right : 'auto',
            bottom: offset.bottom !== undefined ? offset.bottom : 'auto'
          }}
        >{children}</div>
        {mask ? <div ref={this.refPopupMask} onClick={onClickMask} className={`${prefixCls}-mask`} /> : null}
      </div>
    )
  }

  refPopupMask: any = React.createRef()
  refPopupModal: any = React.createRef()

  handleOpen() {
    const { onOpen } = this.props
    onOpen && onOpen()
  }

  handleClose() {
    const { onClose } = this.props
    onClose && onClose()
  }

  // 参数形式给销毁时使用，有待优化
  handleToggleVisible(visible: boolean | null = null, callback?: () => void) {
    return new Promise((resolve: any) => {
      const { mask } = this.props
      if (visible === null) {
        visible = this.state.visible as boolean
      }

      dom.toggle(this.refPopupModal.current, visible, this.props.animation, () => {
        resolve(visible ? this.handleOpen() : this.handleClose())
        callback && callback()
      })

      if (mask) {
        dom.toggle(this.refPopupMask.current, visible, 'opacity')
        if (visible) {
          document.body.style.overflow = document.documentElement.style.overflow = 'hidden'
        }
        else {
          document.body.style.overflow = document.documentElement.style.overflow = windowOverflow
        }
      }
    })
  }

  /**
   * 创建一个弹窗
   * @public
   * */
  static create(
    options: PopupProps & { content: React.ReactNode, rootElement?: Element | null },
    callback?: (args: { destroy: () => void, ref: React.ReactNode }) => void
  ) {
    return new Promise(resolve => {
      const { content, rootElement, onBeforeClose, ...props } = options
      const div = document.createElement('div')
      rootElement ? rootElement.appendChild(div) : document.body.appendChild(div)

      let loaded = false
      let destroyed = false
      ReactDOM.render(<Popup {...props} ref={(ref: Popup) => {
        if (loaded) return // 避免重复初始化
        loaded = true
        const sender = {
          ref,
          async destroy() {
            if (destroyed) return // 避免重复卸载组件
            if (onBeforeClose && await onBeforeClose() === false) return // 满足条件才允许关闭
            destroyed = true
            await ref.handleToggleVisible(false)
            ReactDOM.unmountComponentAtNode(div)
            ;(div as any).parentNode.removeChild(div)
          }
        }
        resolve(sender)
        callback && callback(sender)
      }}>{tools.helper.getReactNode(content)}</Popup>, div)
    })
  }
}

export interface PopupProps extends React.HTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;
  /**
   * 控制组件的显隐
   * */
  visible?: boolean
  /**
   * 是否显示遮罩，防止点击穿透
   * */
  mask?: boolean
  /**
   * Modal坐标 - 定位信息top,bottom,left,right
   * */
  offset?: { left?: any, right?: any, top?: any, bottom?: any }
  /**
   * 弹层的进入场动画
   */
  animation?: 'opacity' | 'height' | 'width' | 'top' | 'bottom' | 'left' | 'right' | 'scale' | 'scaleX' | 'scaleY' | 'slideDown' | 'slideRight' | 'slideUp' | 'slideLeft' | 'zoomIn' | 'zoomOut' | 'rotate'
  /**
   * 打开窗口回调
   * */
  onOpen?: () => void
  /**
   * 关闭窗口回调
   * */
  onClose?: () => void
  /**
   * 即将关闭事件，return false 则不关闭（允许Promise）
   * */
  onBeforeClose?: () => boolean | Promise<boolean> | undefined
  /**
   * 点击遮罩回调
   * */
  onClickMask?: () => void
}