import * as React from 'react'
import cls from 'classnames'
import './style/index.scss'

/**
 * @author tongxiaokang
 * @version 0.0.1
 */
export default class ButtonGroup extends React.PureComponent<ButtonGroupProps, any> {
  static defaultProps = {
    prefixCls: 'x-button-group',
    inline: true
  }

  render() {
    const { prefixCls, className, children, theme, size, inline, radius, ...resetProps } = this.props

    const child = children.map((child: any, index: number) => {
      const props: any = { theme, size, inline, radius, key: index }
      const length = children.length

      if (length > 1) {
        if (index === 0) {
          props.className = cls(child.props.className, `${prefixCls}-first-child`)
        }
        else if (index === length - 1) {
          props.className = cls(child.props.className, `${prefixCls}-last-child`)
        }
        else {
          props.className = cls(child.props.className, `${prefixCls}-child`)
        }
      }

      return React.cloneElement(child, props)
    })

    return (
      <div
        className={cls(prefixCls, className, {
          [`${prefixCls}-inline`]: inline,
          [`${prefixCls}-block`]: !inline,
          [`${prefixCls}-radius`]: radius,
          [`${prefixCls}-${size}`]: size,
          [`${prefixCls}-theme`]: theme
        })}
        {...resetProps}
      >{child}</div>
    )
  }
}

export interface ButtonGroupProps extends React.HTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string

  /**
   * 子节点
   * @ignore
   * */
  children?: any

  /**
   * 按钮主题
   * @default "text"
   * */
  theme?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'text'

  /**
   * 按钮大小
   * */
  size?: 'small' | 'large'

  /**
   * 设置为行内按钮
   * @default true
   * */
  inline?: boolean

  /**
   * 按钮圆角
   * @default false
   * */
  radius?: boolean
}