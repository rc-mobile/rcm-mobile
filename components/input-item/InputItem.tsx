import * as React from 'react'
import { Input, ListItem, ListItemProps } from 'rcm-mobile'
import cls from 'classnames'
import './style/index.scss'

/**
 * @author sayll
 * @version 0.0.1
 *
 * 继承于 [Input](#/Components/Input) 组件
 */
export default class InputItem extends Input<InputItemProps> {
  static defaultProps: any = {
    ...Input.defaultProps,
    prefixCls: 'x-input-item'
  }
  state = {
    isWarn: false
  }

  render() {
    const { prefixCls, className, title, listOptions, hidden, ...resetProps } = this.props as any
    return (
      <div hidden={hidden} className={cls(prefixCls, className, { [`${prefixCls}-warn`]: this.state.isWarn })}>
        <ListItem title={title} arrow={null}>
          <Input hidden={hidden} {...resetProps} onBlur={this.handleOnBlur} ref={this.refInput} />
        </ListItem>
      </div>
    )
  }

  refInput: any = React.createRef()

  get elem() {
    return this.refInput.current.elem
  }

  /**
   * 重置当前输入域
   * @public
   * */
  reset() {
    this.value = ''
    this.refInput.current.setState({ value: '' })
  }

  handleOnBlur = (e: MouseEvent) => {
    const { onBlur } = this.props
    onBlur && onBlur(e)
    this.reportValidity()
  }
}

/**
 * 继承至 Input 组件
 * */
export interface InputItemProps {
  /**
   * 表单左侧标题
   */
  title?: string
  /**
   * Input组件配置项
   * */
  listOptions?: ListItemProps
}