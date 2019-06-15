import * as React from 'react'
import cls from 'classnames'
import { Icon, TouchFeedback } from 'rcm-mobile'
import './style/index.scss'
import { RadioProps } from 'radio'

/**
 * @author tongxiaokang
 * @version 0.0.1
 */
export default class Input<T> extends React.PureComponent<InputProps & T, any> {
  static defaultProps = {
    prefixCls: 'x-input',
    className: '',
    rows: 2,
    type: 'text',
    disabled: false,
    clearable: true,
    noValidate: false,
    maxLength: -1,
    minLength: -1,
    requiredMessage: `该字段为必填项`,
    patternMessage: '该字段格式不正确',
    minLengthMessage: `该字段最少长度为 {bound}，缺少 {delta}`,
    maxLengthMessage: `该字段最大长度为 {bound}，超出 {delta}`
  }

  constructor(props: InputProps & T) {
    super(props)
    this.state = {
      isWarn: false, // 是否通过校验
      value: props.value || props.defaultValue || '',
      defaultValue: props.defaultValue
    }
  }

  componentDidMount(): void {
    this.value = this.state.value || ''
  }

  static getDerivedStateFromProps(nextProps: RadioProps, prevState: any) {
    if ('value' in nextProps && nextProps.value !== prevState.value) {
      return { value: nextProps.value }
    }
    else if ('defaultValue' in nextProps && nextProps.defaultValue !== prevState.defaultValue) {
      return { value: nextProps.defaultValue, defaultValue: nextProps.defaultValue }
    }
    return null
  }

  componentDidUpdate() {
    // 为 textarea 自动计算高度
    if (this.props.autoSize && this.props.type === 'textarea') {
      const textareaDom = this.elem
      const paddingHeight = parseInt(this.getStyleValue(textareaDom, 'padding-top')) + parseInt(this.getStyleValue(textareaDom, 'padding-bottom'))
      textareaDom.style.height = '' // fix：行数减少时，高度不发生变化的问题
      textareaDom.style.height = `${textareaDom.scrollHeight - paddingHeight}px`
    }
  }

  render() {
    const { value, isWarn } = this.state
    const {
      prefixCls, type, rows, className,
      disabled, clearable, onChange, requiredMessage,
      patternMessage, minLengthMessage, maxLengthMessage,
      autoSize, defaultValue, ...resetProps
    } = this.props
    const classNames = cls(prefixCls, {
      'x-disabled': disabled,
      [`${prefixCls}-warn`]: isWarn
    })
    const props = {
      ...resetProps,
      ref: this.refInput,
      value,
      className: classNames,
      disabled,
      onBlur: this.handleOnBlur,
      onChange: this.onInputChange
    }
    return (
      <div className={`${prefixCls}-wrap ${className}`}>
        {type === 'textarea'
          ? <textarea {...props} rows={rows} />
          : <input{...props} type={this.getInputType()} />
        }
        {clearable && value !== ''
          ? <TouchFeedback activeClassName={`${prefixCls}-clear`}>
            <Icon
              className={`${prefixCls}-clear x-icon-close-circle`}
              onClick={() => {
                this.reset()
                this.focus()
              }}
            />
          </TouchFeedback>
          : null}
      </div>
    )
  }

  refInput: any = React.createRef()

  get value() {
    let value = this.elem.value
    switch (this.props.type) {
      case 'phone':
      case 'bankCard':
        value = value.replace(/ /g, '')
        break
      default:
    }
    return this.props.trim ? value.trim() : value
  }

  set value(value) {
    this.elem.value = value
    this.setState({ value })
    this.onInputChange({ target: this.elem } as any)
  }

  get elem() {
    return this.refInput.current
  }

  // 以下格式化函数剽窃于 ant 😄
  getInputType() {
    let inputType: any = this.props.type || 'text'
    switch (inputType) {
      case 'phone':
      case 'bankCard':
        return 'tel'
      case 'digit':
        return 'number'
      case 'money':
        return 'text'
      default:
        return inputType
    }
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const el = e.target
    const { value: rawVal, selectionEnd: prePos } = el
    const { value: preCtrlVal = '' } = this.state
    const { type } = this.props
    let ctrlValue = rawVal

    switch (type) {
      case 'number':
        ctrlValue = rawVal.replace(/\D/g, '')
        break
      case 'money':
        ctrlValue = rawVal.replace(/[^\d.]/g, '')
        break
      case 'phone':
        ctrlValue = rawVal.replace(/\D/g, '').substring(0, 11)
        const valueLen = ctrlValue.length
        if (valueLen > 3 && valueLen < 8) {
          ctrlValue = `${ctrlValue.substr(0, 3)} ${ctrlValue.substr(3)}`
        }
        else if (valueLen >= 8) {
          ctrlValue = `${ctrlValue.substr(0, 3)} ${ctrlValue.substr(3, 4)} ${ctrlValue.substr(
            7
          )}`
        }
        break
      case 'bankCard':
        ctrlValue = rawVal.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ')
        break
      default:
    }

    this.handleOnChange(ctrlValue, e, () => {
      switch (type) {
        case 'bankCard':
        case 'phone':
          // 受控输入类型需要调整插入符号的位置
          try {
            // 设置选择可能会抛出错误 (https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange)
            let pos = this.calcPos(prePos || 0, preCtrlVal, rawVal, ctrlValue, [' '], /\D/g)
            if ((type === 'phone' && (pos === 4 || pos === 9)) || (type === 'bankCard' && (pos > 0 && pos % 5 === 0))) {
              pos -= 1
            }
            el.selectionStart = el.selectionEnd = pos
          }
          catch (error) {
            console.warn('Set selection error:', error)
          }
          break
        default:
      }
    })
  }

  // 计算插入符号的位置
  calcPos = (prePos: number, preCtrlVal: string, rawVal: string, ctrlVal: string, placeholderChars: Array<string>, maskReg: RegExp) => {
    const editLength = rawVal.length - preCtrlVal.length
    const isAddition = editLength > 0
    let pos = prePos
    if (isAddition) {
      const additionStr = rawVal.substr(pos - editLength, editLength)
      let ctrlCharCount = additionStr.replace(maskReg, '').length
      pos -= (editLength - ctrlCharCount)
      let placeholderCharCount = 0
      while (ctrlCharCount > 0) {
        if (placeholderChars.indexOf(ctrlVal.charAt(pos - ctrlCharCount + placeholderCharCount)) === -1) {
          ctrlCharCount--
        }
        else {
          placeholderCharCount++
        }
      }
      pos += placeholderCharCount
    }
    return pos
  }

  handleOnChange = (value: any, event: React.ChangeEvent, adjustPos: Function) => {
    const { onChange } = this.props

    // 受控组件的一些限制操作
    if (('value' in this.props)) {
      this.setState({ value: this.props.value })
    }
    else {
      this.setState({ value })
    }

    // 修复光标错位问题
    setTimeout(() => {
      adjustPos()
    })
    onChange && onChange(event, this)
  }

  handleOnBlur = (e: any) => {
    const { onBlur } = this.props
    onBlur && onBlur(e)
    this.reportValidity()
  }

  /**
   * 重置当前输入域
   * @public
   * */
  reset() {
    this.value = ''
  }

  /**
   * 令当前控件获得焦点
   * @public
   * */
  focus() {
    this.elem.focus()
  }

  /**
   * 令当前控件失去焦点
   * @public
   * */
  blur() {
    this.elem.blur()
  }

  /**
   * 验证当前输入框
   * @public
   * */
  checkValidity(): ValidityResult {
    const {
      type, pattern, patternMessage, noValidate, onValidate, required,
      minLength, requiredMessage, minLengthMessage, maxLength, maxLengthMessage
    } = this.props
    let valid = true, message = patternMessage, value = this.value

    // 自定义校验
    if (onValidate) return onValidate(value, this)

    // 无需校验
    if (noValidate) return { valid: true, message: null }

    // 必填字段校验
    if (value == null || value.length === 0 && (Array.isArray(value) || typeof value === 'string')) {
      return required ? { valid: false, message: requiredMessage } : { valid: true, message: null }
    }

    // 长度校验
    const length = value.length
    if (minLength && minLength !== -1 && length < minLength) {
      return {
        valid: false,
        // @ts-ignore
        message: (minLengthMessage || '').replace('{bound}', minLength as any).replace('{delta}', (minLength - length) as any)
      }
    }
    else if (maxLength && maxLength !== -1 && length > maxLength) {
      return {
        valid: false,
        // @ts-ignore
        message: (maxLengthMessage || '').replace('{bound}', maxLength).replace('{delta}', (length - maxLength) as any)
      }
    }

    // 格式校验
    switch (type) {
      case 'phone':
        valid = /^1\d{10}$/.test(value)
        break
      case 'money':
        valid = /^(0|[1-9]\d*)(\.\d\d?)?$/.test(value)
        break
      case 'digit':
        valid = /^\d*$/.test(value)
        break
      case 'email':
        valid = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
        break
      case 'chineseId':
        valid = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/.test(value)
        break
      default:
        if (pattern as any instanceof RegExp) {
          valid = pattern.test(value)
        }
    }

    return { valid, message: valid ? null : message }
  }

  /**
   * 提示校验失败的情况
   * */
  reportValidity = () => {
    const report = this.checkValidity()
    this.setState({ isWarn: !report.valid })
    return report
  }

  getStyleValue = (dom: HTMLElement, style: string) => window.getComputedStyle(dom).getPropertyValue(style)
}

// @ts-ignore
export interface InputProps extends React.InputHTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string
  /**
   * 表单类型，特殊类型自带文本格式化
   * 可选自带格式化的类型：'bankCard' | 'phone' | 'money' | 'digit' | email | chineseId
   * @default text
   * */
  type?: string
  /**
   * 表单名称
   * */
  name?: string
  /**
   * 默认值
   * */
  defaultValue?: any
  /**
   * 值
   * */
  value?: any
  /**
   * 是否删除输入框的值左右无效内容
   * @default false
   * */
  trim?: boolean
  /**
   * 是否只读
   * @default false
   * */
  readOnly?: boolean
  /**
   * 是否禁用
   * */
  disabled?: boolean
  /**
   * 是否可清空
   * */
  clearable?: boolean
  /**
   * 禁用验证
   * @default false
   * */
  noValidate?: boolean
  /**
   * 字段是否必填
   * @default false
   * */
  required?: boolean
  /**
   * 字段不满足必填时的提示文案。
   * @default '该字段为必填项'
   */
  requiredMessage?: string,
  /**
   * 匹配格式的正则表达式。
   * */
  pattern?: any
  /**
   * 字段不满足格式时的提示文案。
   * @default `该字段格式不正确`
   * */
  patternMessage?: string
  /**
   * 最大长度。-1 表示不限制。
   * @default -1
   * */
  maxLength?: number
  /**
   * 字段不满足最大长度时的提示文案。
   * @default `该字段最大长度为 {bound}，超出 {delta}`
   * */
  maxLengthMessage?: string
  /**
   * 最小长度。-1 表示不限制。
   * @default -1
   * */
  minLength?: number
  /**
   * 字段不满足最大长度时的提示文案。
   * @default `该字段最少长度为 {bound}，缺少 {delta}`
   * */
  minLengthMessage?: string
  /**
   *
   * */
  onChange?: (e: any, sender: any) => void
  /**
   * 聚焦时回调
   * */
  onFocus?: (e: any) => void
  /**
   * 失焦时回调
   * */
  onBlur?: (e: any) => void
  /**
   * 自定义校验方法
   * */
  onValidate?: (value: any, sender: Input<any>) => ValidityResult

  // ———————————————————textarea配置项
  /**
   * 文本行数，只对 type="textarea" 生效
   * @default 2
   * */
  rows?: number
  /**
   * 自适应高度，只对 type="textarea" 生效
   * @default false
   * */
  autoSize?: boolean
}

export interface ValidityResult {
  valid: boolean
  message: string | null | undefined
}