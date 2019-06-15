import * as React from 'react'
import cls from 'classnames'
import { RadioGroup, RadioGroupProps } from 'rcm-mobile'
import './style/index.scss'

/**
 * @author sayll
 * @version 0.0.1
 */
export default class Radio extends React.PureComponent<RadioProps, any> {
  static defaultProps = {
    prefixCls: 'x-radio',
    checked: true,
    disabled: false,
    readOnly: false
  }

  constructor(props: RadioProps) {
    super(props)
    this.state = {
      checked: props.checked
    }
  }

  render() {
    const { prefixCls, className, children, disabled, readOnly, onClick, ...resetProps } = this.props

    return (
      <label
        className={cls(`${prefixCls}-wrapper`, className, {
          [`${prefixCls}-checked`]: this.state.checked,
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-readonly`]: readOnly
        })}
        onClick={e => this.handleClick(e)}
        {...resetProps}
      >
        <span className={prefixCls} />
        {children}
      </label>
    )
  }

  static getDerivedStateFromProps(nextProps: RadioProps, prevState: any) {
    if (nextProps.checked !== prevState.checked) {
      return { checked: nextProps.checked }
    }
    return null
  }

  /**
   * RadioGroup组件
   * @public
   * */
  static Group(props: RadioGroupProps) {
    return <RadioGroup {...props} />
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

export interface RadioProps extends React.HTMLAttributes<{}> {
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