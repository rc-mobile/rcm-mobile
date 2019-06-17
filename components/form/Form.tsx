import * as React from 'react'
import { Toast, tools } from 'rcm-mobile'
import cls from 'classnames'
import './style/index.scss'

const scroll = tools.scroll

/**
 * @author sayll
 * @version 0.0.1
 */
export default class Form extends React.PureComponent<FormProps, any> {
  static defaultProps = {
    prefixCls: 'x-form',
    noValidate: false
  }

  render() {
    this.refKey = 0
    const { prefixCls, className, children: cld, onReset, onSubmit, ...resetProps } = this.props
    const children = this.handleCloneChildren(cld)

    return (
      <div className={cls(prefixCls, className)} {...resetProps}>{children}</div>
    )
  }

  refKey = 0
  private refList: any[] = []

  /**
   * 所有含 name & !disabled 字段实例
   * */
  get inputs() {
    return this.refList
      .map((item: any) => item.current)
      .filter((input: any) => input && input.props && input.props.name && !input.props.disabled)
  }

  /**
   * 表单值
   * */
  get values() {
    return this.inputs.reduce((values, input) => {
      values[input.props.name] = input.value
      return values
    }, {})
  }

  /**
   * 重置所有表单
   * @public
   * */
  reset() {
    this.inputs.forEach(input => input.reset())
  }

  /**
   * 获取当前表单内所有输入域的校验结果
   * @public
   * */
  checkValidity() {
    return this.inputs.map(input => input.checkValidity
      ? { ...input.reportValidity(), vNode: input }
      : { valid: true }
    )
  }

  /**
   * 报告当前表单内所有输入域
   * @public
   * */
  reportValidity() {
    return this.inputs.map(input => input.reportValidity
      ? { ...input.reportValidity(), vNode: input }
      : { valid: true }
    )
  }

  handleSubmit(e: MouseEvent, sender: Form) {
    const { onSubmit } = this.props
    if (this.reportValidity().every(validity => {
      // 是否通过提交表单的校验，否则抛出提示信息
      if (!validity.valid) {
        Toast.warning(validity.message)
        // 滚动至错误的表单空间
        if(validity.vNode) {
          let elem = validity.vNode.elem
          let scrollable = scroll.scrollParent(elem)
          while (scrollable.nodeType !== 9 || !scroll.isScrollIntoView(scroll.scrollParent(scrollable))) {
            scrollable = scroll.scrollParent(scrollable)
          }
          scroll.scrollIntoViewIfNeeded(elem, scrollable)
        }
      }
      return validity.valid
    })) {
      onSubmit && onSubmit(e, sender)
    }
  }

  handleReset(e: MouseEvent, sender: Form) {
    const { onReset } = this.props
    sender.reset()
    onReset && onReset(e, sender)
  }

  handleCloneChildren(children: any): any {
    // 遍历处理子节点
    if (Array.isArray(children)) {
      return children.map((cld: any) => this.handleCloneChildren(cld))
    }

    if (children && children.props) {
      // 子节点非表单节点，并存在更深层的节点，递归处理
      if ((React.isValidElement(children.props.children) || Array.isArray(children.props.children)) && !children.props.name) {
        return React.cloneElement(children, { key: children.key || `__${Math.random()}__`, children: this.handleCloneChildren(children.props.children) })
      }

      // 单一节点进入有效表单节点队列
      this.refList[this.refKey] = React.createRef()
      const vNode = React.cloneElement(children, {
        key: children.key || `__${this.refKey}__`,
        ref: this.refList[this.refKey],
        noValidate: children.props.noValidate || this.props.noValidate,
        onClick: children.props.type === 'submit'
          ? (e: MouseEvent) => this.handleSubmit(e, this)
          : (children.props.type === 'reset' ? (e: MouseEvent) => this.handleReset(e, this) : children.props.onClick)
      })
      this.refKey++
      return vNode
    }
    return children
  }
}

// @ts-ignore
export interface FormProps extends React.FormHTMLAttributes<any> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;
  /**
   * 不自动校验，由使用者自行校验
   * */
  noValidate?: boolean
  /**
   * 重置表单
   * */
  onReset?: (e: MouseEvent, sender: Form) => void;
  /**
   * 提交表单，只能校验通过触发，可通过 sender.values 拿到所有参数列表
   * */
  onSubmit?: (e: MouseEvent, sender: Form) => void;
}