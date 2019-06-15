import * as React from 'react'
import { CheckBoxGroup, CheckBoxGroupProps } from 'rcm-mobile'
import cls from 'classnames'
import './style/index.scss'

/**
 * @author sayll
 * @version 0.0.1
 */
export default class CheckBox extends React.PureComponent<CheckBoxProps, any> {
  static defaultProps = {
    prefixCls: 'x-check-box',
    checked: false,
    disabled: false,
    readOnly: false
  }

  constructor(props: CheckBoxProps) {
    super(props)
    this.state = {
      checked: props.checked
    }
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<CheckBoxProps>, _prevState: Readonly<any>): any | null {
    if (prevProps.checked !== this.props.checked) {
      this.setState({ checked: this.props.checked })
    }
    return null
  }

  /**
   * CheckBoxGroup组件
   * @public
   * */
  static Group(props: CheckBoxGroupProps) {
    return <CheckBoxGroup {...props} />
  }

  render() {
    const { prefixCls, className, children, disabled, readOnly, onClick, ...resetProps } = this.props

    return (
      <label
        {...resetProps}
        className={cls(`${prefixCls}-wrapper`, className, {
          [`${prefixCls}-checked`]: this.state.checked,
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-readonly`]: readOnly
        })}
        onClick={e => this.handleClick(e)}
      >
        <span className={prefixCls} />
        {children}
      </label>
    )
  }

  get value() {
    return this.props.value
  }

  handleClick(e: React.MouseEvent) {
    const { onClick, disabled, readOnly } = this.props
    if (disabled || readOnly) return

    this.setState((state: any) => ({ checked: !state.checked }))
    onClick && onClick(e)
  }
}

export interface CheckBoxProps extends React.HTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;
  /**
   * 是否选中
   * */
  checked?: boolean
  /**
   * 值
   * */
  value?: any
  /**
   * 是否禁用
   * */
  disabled?: boolean
  /**
   * 是否只读
   * */
  readOnly?: boolean
}