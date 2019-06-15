import * as React from 'react'
import cls from 'classnames'
import { Icon } from 'rcm-mobile'
import './style/index.scss'

/**
 * @author sayll
 * @version 0.0.1
 */
export default class Switch extends React.PureComponent<SwitchProps, any> {
  static defaultProps = {
    prefixCls: 'x-switch',
    size: 1.5,
    color: '#4dd865',
    loading: false,
    disabled: false,
    readOnly: false,
    checkLabel: '',
    unCheckLabel: '',
    defaultValue: false
  }

  constructor(props: SwitchProps) {
    super(props)
    this.state = {
      loading: false,
      value: props.defaultValue || props.value
    }
  }

  render() {
    const { value: checked } = this.state
    const {
      prefixCls, className, loading, checkLabel, unCheckLabel,
      size, defaultValue, value, color, readOnly, disabled,
      onBeforeChange, onChange, onClick, ...resetProps
    } = this.props

    const iconStyle = { fontSize: `${size as number / 1.5}rem` }
    const innerStyle = { width: `${size}rem`, height: `${size}rem` }
    const switchStyle = { width: `${size as number * 2}rem`, height: `${size as number * 1.1}rem` }

    return (
      <div
        {...resetProps}
        style={{ backgroundColor: color, ...switchStyle }}
        className={cls(prefixCls, className, { [`${prefixCls}-off`]: !checked, 'x-disabled': disabled || this.state.loading })}
        onClick={(e) => this.handleClick(e)}
      >
        <span style={innerStyle} className={cls(`${prefixCls}-inner`)}>
          {this.state.loading
            ? <Icon style={iconStyle} spin className="x-icon-loading" />
            : <i style={iconStyle} className="x-icon">&nbsp;</i>}
        </span>
        <span style={iconStyle} className={`${prefixCls}-innerText`}>{checked ? checkLabel : unCheckLabel}</span>
      </div>
    )
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<SwitchProps>, prevState: Readonly<any>): any | null {
    if (prevProps.value !== this.props.value && this.props.value !== prevState.value) {
      this.setState({ value: this.props.value })
    }
    return null
  }

  get value() {
    return this.state.value
  }

  async handleClick(e: React.MouseEvent) {
    const value = !this.state.value
    const { disabled, readOnly, onClick, onBeforeChange, onChange, loading } = this.props

    // 进入等待
    if (loading && !this.state.loading) this.setState({ loading: true })
    // 完成等待
    if (disabled || readOnly || onBeforeChange && await onBeforeChange(value) === false) {
      return this.setState({ loading: false })
    }

    this.setState({ value, loading: false }, () => {
      onClick && onClick(e, this)
      onChange && onChange(value)
    })
  }
}

// @ts-ignore
export interface SwitchProps extends React.HTMLAttributes<{}> {
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
   * 是否禁用
   * */
  disabled?: boolean
  /**
   * 是否只读
   * */
  readOnly?: boolean
  /**
   * 初始值
   * */
  defaultValue?: boolean | number
  /**
   * 当前值
   * */
  value?: boolean | number
  /**
   * 选中的Label
   * */
  checkLabel?: React.ReactNode
  /**
   * 非选中的Label
   * */
  unCheckLabel?: React.ReactNode
  /**
   * 切换中的状态
   * */
  loading?: boolean
  /**
   * 切换按钮大小 单位em
   * */
  size?: number
  /**
   * 主题色
   * */
  color?: string
  /**
   * 切换前的事件 return false 则不切换（允许Promise）
   * */
  onBeforeChange?: (value: boolean) => boolean | Promise<boolean> | undefined
  /**
   * 切换后的时间
   * */
  onChange?: (value: boolean) => void
  /**
   * 点击事件
   * */
  onClick?: (e: React.MouseEvent, sender: Switch) => void
}