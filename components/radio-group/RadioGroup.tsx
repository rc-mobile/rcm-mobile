import * as React from 'react'
import cls from 'classnames'
import './style/index.scss'

/**
 * @author sayll
 * @version 0.0.1
 */
export default class RadioGroup extends React.PureComponent<RadioGroupProps, any> {
  static defaultProps = {
    prefixCls: 'x-radio-group'
  }

  constructor(props: RadioGroupProps) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  render() {
    const { prefixCls, className, children: cld, disabled, readOnly, ...resetProps } = this.props
    const children = this.handleCloneChildren(cld)

    return (
      <div
        className={cls(prefixCls, className, {
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-readOnly`]: readOnly
        })}
        {...resetProps}
      >{children}</div>
    )
  }

  get value() {
    return this.state.value
  }

  handleCloneChildren(children: any): any {
    const { disabled, readOnly } = this.props
    return Array.isArray(children)
      ? children.map((radio: any) => this.handleCloneChildren(radio))
      : React.cloneElement(children, {
        key: children.key || `__${Math.random()}__`,
        checked: this.state.value === children.props.value,
        disabled: disabled || children.props.disabled,
        readOnly: readOnly || children.props.readOnly,
        onClick: () => children.props.disabled || children.props.readOnly || this.setState({ value: children.props.value })
      })
  }
}

export interface RadioGroupProps extends React.InputHTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;
  /**
   * 字段名
   * */
  name?: string
  /**
   * 字段值
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