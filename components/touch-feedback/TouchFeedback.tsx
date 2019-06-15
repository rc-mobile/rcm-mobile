import * as React from 'react'
import cls from 'classnames'
import './style/index.scss'

/**
 * @author tongxiaokang
 * @version 0.0.1
 *
 * 所有可点击的组件，都可嵌套该组件，为组件提供点击时的 class 与 style
 */
export default class TouchFeedback extends React.PureComponent<TouchFeedbackProps, any> {
  static defaultProps = {
    disabled: false,
    activeClassName: 'x-active'
  }
  state = {
    active: false
  }

  componentDidUpdate() {
    if (this.props.disabled && this.state.active) {
      this.setState({ active: false })
    }
  }

  triggerEvent(type: string, isActive: boolean, ev: React.MouseEvent | React.TouchEvent) {
    const eventType = `on${type}`
    const { children } = this.props

    if (children.props[eventType]) {
      children.props[eventType](ev)
    }
    if (isActive !== this.state.active) {
      this.setState({ active: isActive })
    }
  }

  onTouchStart = (e: React.TouchEvent) => {
    this.triggerEvent('TouchStart', true, e)
  }

  onTouchMove = (e: React.TouchEvent) => {
    this.triggerEvent('TouchMove', false, e)
  }

  onTouchEnd = (e: React.TouchEvent) => {
    this.triggerEvent('TouchEnd', false, e)
  }

  onTouchCancel = (e: React.TouchEvent) => {
    this.triggerEvent('TouchCancel', false, e)
  }

  onMouseDown = (e: React.MouseEvent) => {
    this.triggerEvent('MouseDown', true, e)
  }

  onMouseUp = (e: React.MouseEvent) => {
    this.triggerEvent('MouseUp', false, e)
  }

  onMouseLeave = (e: React.MouseEvent) => {
    this.triggerEvent('MouseLeave', false, e)
  }

  render() {
    const { children, disabled, activeClassName, activeStyle } = this.props

    const events = disabled ? undefined : {
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd,
      onTouchCancel: this.onTouchCancel,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onMouseLeave: this.onMouseLeave
    }

    const child = React.Children.only(children)

    if (!disabled && this.state.active) {
      let { style, className } = child.props

      if (activeStyle) {
        style = { ...style, ...activeStyle }
      }
      className = cls(className, activeClassName)

      return React.cloneElement(child, { className, style, ...events })
    }

    return React.cloneElement(child, events)
  }
}

export interface TouchFeedbackProps extends React.HTMLAttributes<{}> {
  /**
   * 子节点
   * */
  children?: any;
  /**
   * 禁用点击
   * */
  disabled?: boolean;
  /**
   * 点击反馈的自定义样式
   * @default ""
   * */
  activeStyle?: any;
  /**
   * 点击反馈的自定义类名
   * @default "x-active"
   * */
  activeClassName?: string;
}