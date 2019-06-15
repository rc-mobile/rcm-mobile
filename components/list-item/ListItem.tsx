import * as React from 'react'
import cls from 'classnames'
import { Icon, TouchFeedback } from 'rcm-mobile'
import './style/index.scss'

// 偷懒了～～，extra API被移除，改用children,配合表单的children查询

/**
 * @author tongxiaokang
 * @version 0.0.1
 *
 * 实现了 [TouchFeedback](#/Components/TouchFeedback) 组件的所有API。
 */
export default class ListItem extends React.PureComponent<ListItemProps, any> {
  static defaultProps = {
    wrap: false,
    arrow: '',
    disabled: false,
    prefixCls: 'x-list-item',
    activeClassName: 'x-active'
  }

  constructor(props: ListItemProps) {
    super(props)

    this.state = { rotate: Icon.getRotate(props.arrow) }
  }

  render() {
    const {
      className, activeStyle, activeClassName, wrap, disabled, title, children,
      thumb, arrow, onClick, prefixCls, ...restProps
    } = this.props
    return (
      <TouchFeedback
        disabled={disabled}
        activeStyle={activeStyle}
        activeClassName={activeClassName}
      >
        <div{...restProps} onClick={this.handleClick} className={cls(`${prefixCls}`, className, { 'x-disabled': disabled })}>
          {thumb ? (
            <div className={`${prefixCls}-thumb`}>
              {typeof thumb === 'string' ? <img className={`${prefixCls}-thumb-img`} src={thumb} /> : thumb}
            </div>
          ) : null}

          <div className={cls(`${prefixCls}-line`, { [`${prefixCls}-line-wrap`]: wrap })}>
            {title
              ? <div className={`${prefixCls}-line-content`}>
                {title}
              </div>
              : null}

            {children !== undefined && <div className={`${prefixCls}-line-extra`}>{children}</div>}

            {arrow && (
              <div className={`${prefixCls}-line-arrow`}>
                <Icon rotate={this.state.rotate} className="x-icon-arrow-left" />
              </div>
            )}
          </div>
        </div>
      </TouchFeedback>
    )
  }

  static getDerivedStateFromProps(nextProps: ListItemProps, prevState: any) {
    if (nextProps.arrow !== prevState.arrow) {
      return { rotate: Icon.getRotate(nextProps.arrow) }
    }
    return null
  }

  /**
   * 辅助说明
   * */
  static Brief(props?: any) {
    const prefixCls = ListItem.defaultProps.prefixCls
    if (!props.children) return null
    return <div className={`${prefixCls}-brief`}>{props.children}</div>
  }

  handleClick = (e: React.MouseEvent) => {
    const { onClick, disabled } = this.props
    if (!disabled && onClick) {
      onClick(e)
    }
  }
}

// @ts-ignore
export interface ListItemProps extends React.HTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * 左侧内容，可以是icon地址
   */
  thumb?: React.ReactNode;
  /**
   * 标题内容
   */
  title?: React.ReactNode;
  /**
   * 右侧-箭头
   * @default right
   */
  arrow?: 'left' | 'right' | 'top' | 'bottom' | null;
  /**
   * 是否换行
   * @default false
   */
  wrap?: boolean;
  /**
   * 点击反馈的自定义类名
   * @default "x-active"
   * */
  activeClassName?: string
  /**
   * 点击反馈的自定义样式
   */
  activeStyle?: any
}