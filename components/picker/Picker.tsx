import * as React from 'react'
import cls from 'classnames'
import { Popup, tools } from 'rcm-mobile'
import './style/index.scss'

let getUuid: () => string
let rootElement: Element
const pickerInstance: { [key: string]: any } = {}
/**
 * @author sayll
 * @version 0.0.1
 */
export default class Picker extends React.PureComponent<PickerProps, any> {
  static defaultProps = {
    prefixCls: 'x-picker',
    data: []
  }

  constructor(props: PickerProps) {
    super(props)
    this.state = { value: props.value }
  }

  componentDidMount(): void {
    const { refRoot, refIndicator } = this

    // popup 创建时，存在无法获取 itemHeight 高度问题, 延迟解决
    setTimeout(() => {
      // 注意此处计算包含 borderWidth + padding
      this.itemHeight = refIndicator.current.getBoundingClientRect().height

      // 设置是否禁用滚动条
      this.scrollHandler.setDisabled(this.props.disabled || this.props.readOnly)

      // 初始化滚动位置
      this.select(this.props.value)

      /**
       * 判断是否支持addEventListener的options.passive 禁用preventDefault优化滚动体验
       * 参考：http://www.cnblogs.com/ziyunfei/p/5545439.html
       * */
      const passiveSupported = this.passiveSupported()
      const willPreventDefault = passiveSupported ? { passive: false } : false
      const willNotPreventDefault = passiveSupported ? { passive: true } : false

      // 为root容器绑定touch&mouse监听事件
      Object.keys(this.scrollHandler).forEach(key => {
        if (key.indexOf('touch') === 0 || key.indexOf('mouse') === 0) {
          const options = key.indexOf('move') >= 0 ? willPreventDefault : willNotPreventDefault
          refRoot.current.addEventListener(key, this.scrollHandler[key], options)
        }
      })
    })
  }

  componentWillUnmount(): void {
    Object.keys(this.scrollHandler).forEach(key => {
      if (key.indexOf('touch') === 0 || key.indexOf('mouse') === 0) {
        this.refRoot.current.removeEventListener(key, this.scrollHandler[key])
      }
    })
  }

  render() {
    const { prefixCls, className, data, onChange, ...resetProps } = this.props

    return (
      <div className={cls(`${prefixCls}-col`, className)} ref={this.refRoot} {...resetProps}>
        <div className={cls(`${prefixCls}-col-indicator`)} ref={this.refIndicator} />
        <div className={cls(`${prefixCls}-col-content`)} ref={this.refContent}>
          {data.map((item: any) => <div key={item.label} className={cls(`${prefixCls}-col-item`)}>{item.label}</div>)}
        </div>
      </div>
    )
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<PickerProps>, _prevState: Readonly<any>): any | null {
    if (prevProps.value !== this.props.value) {
      this.select(this.props.value)
    }
    return null
  }

  itemHeight: number

  refRoot: any = React.createRef()

  refContent: any = React.createRef()

  refIndicator: any = React.createRef()

  // 处理所有和滚动相关的任务
  private scrollHandler: any = (() => {
    let startY = 0 // 开始的点
    let lastY = 0 // 离开的点，避免第二次点击复位
    let scrollY = -1 // 滚动的距离
    let isMoving = false // 是否处于滚动
    let scrollDisabled = false // 禁用滚动

    const setTransform = (nodeStyle: CSSStyleDeclaration, value: any) => {
      nodeStyle.transform = nodeStyle.webkitTransform = value
    }
    const setTransition = (nodeStyle: CSSStyleDeclaration, value: any) => {
      nodeStyle.transition = nodeStyle.webkitTransition = value
    }

    /**
     * 滚动到目标位置
     * 触发onScrollingComplete回调
     * */
    const scrollTo = (y: number, time = .3) => {
      if (scrollY !== y) {
        scrollY = y
        if (time) {
          setTransition(this.refContent.current.style, `cubic-bezier(0,0,0.2,1.15) ${time}s`)
          setTimeout(() => {
            this.onScrollingComplete()
            this.refContent.current && setTransition(this.refContent.current.style, '')
          }, +time * 1000)
        }
        setTransform(this.refContent.current.style, `translate3d(0,${-y}px,0)`)
      }
    }

    // 一系列与快速滚动相关的速度计算
    const Velocity = ((minInterval = 30, maxInterval = 100) => {
      let _y = 0
      let _time = 0
      let _velocity = 0
      const recorder = {
        /**
         * @param {number} y 滚动的距离
         * */
        record: (y: number) => {
          const now = +new Date()
          _velocity = (y - _y) / (now - _time)
          if (now - _time >= minInterval) {
            _velocity = now - _time <= maxInterval ? _velocity : 0
            _y = y
            _time = now
          }
        },
        getVelocity: (y: number) => {
          if (y !== _y) {
            recorder.record(y)
          }
          return _velocity
        }
      }
      return recorder
    })()

    // 记录开始坐标，开启move状态，暂存最后一次的滚动距离
    const onStart = (y: number) => {
      if (scrollDisabled) return
      startY = y
      lastY = scrollY
      isMoving = true
    }

    /**
     * 记录滚动距离，速度信息
     * 调用setTransform，设置滚动的距离
     * 调用onScrollChange回调
     * */
    const onMove = (y: number) => {
      if (scrollDisabled || !isMoving) return
      // 滚动的距离,将lastY（复位信息）计算进去
      scrollY = lastY - y + startY

      // 记录当前速度信息
      Velocity.record(scrollY)

      setTransform(this.refContent.current.style, `translate3d(0,${-scrollY}px,0)`)
    }

    /**
     * 可能的话，启用快速滚动
     * 将滚动结果固定至有效位置
     * 调用onScrollChange回调
     * */
    const onFinish = () => {
      let time = .3
      let targetY = scrollY
      const height = (this.props.data.length - 1) * this.itemHeight
      const velocity = Velocity.getVelocity(targetY) * 4

      isMoving = false

      // 初始化加速度
      if (velocity) { // 过滤点击
        targetY = velocity * 40 + targetY
        time = Math.abs(velocity) * .1
      }

      // 固定滚动位置至有效位置
      if (targetY % this.itemHeight !== 0) {
        targetY = Math.round(targetY / this.itemHeight) * this.itemHeight
      }

      if (targetY < 0) {
        targetY = 0
      }
      else if (targetY > height) {
        targetY = height
      }

      scrollTo(targetY, time < .3 ? .3 : time)
    }
    return {
      scrollTo,
      mousedown: (evt: React.MouseEvent<HTMLDivElement>) => onStart(evt.screenY),
      mousemove: (evt: React.MouseEvent<HTMLDivElement>) => {
        evt.preventDefault()
        onMove(evt.screenY)
      },
      mouseup: () => onFinish(),
      touchstart: (evt: React.TouchEvent<HTMLDivElement>) => onStart(evt.touches[0].screenY),
      touchmove: (evt: React.TouchEvent<HTMLDivElement>) => {
        evt.preventDefault()
        onMove(evt.touches[0].screenY)
      },
      touchend: () => onFinish(),
      touchcancel: () => onFinish(),
      getValue: () => {
        const { data } = this.props
        let index = Math.round(scrollY / this.itemHeight)
        if (index < 0) {
          index = 0
        }
        else if (index > data.length - 1) {
          index = data.length - 1
        }
        return data[index]
      },
      setDisabled: (disabled: boolean = false) => {
        scrollDisabled = disabled
      }
    }
  })()

  get selectItem() {
    return this.scrollHandler.getValue()
  }

  get value() {
    return this.selectItem.value
  }

  set value(value) {
    this.setState({ value })
  }

  /**
   * 判断是否支持addEventListener的options.passive
   * 出处：https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
   * */
  passiveSupported() {
    let passiveSupported = false

    try {
      const options = Object.defineProperty({}, 'passive', {
        get: () => {
          passiveSupported = true
        }
      })
      window.addEventListener('test', null as any, options)
    }
    catch (err) {}
    return passiveSupported
  }

  // 滚动条定位到指定的默认值处
  select = (value: string) => {
    const data = this.props.data as PickerDataType[]
    let len = data.length

    while (len--) {
      if (data[len].value === value) {
        return this.scrollHandler.scrollTo(len * this.itemHeight, .3)
      }
    }
  }

  // 滚动结束后，触发onChange并更新state
  onScrollingComplete = () => {
    const { onChange } = this.props
    const value = this.scrollHandler.getValue()
    onChange && onChange(value, this)
  }

  static async show({ data, value = '', onOk, options }: { data: PickerDataType[], value?: any, onOk?: (selectItem: PickerDataType, sender: Picker) => void, options?: PickerProps }) {
    if (!rootElement) {
      rootElement = document.createElement('div')
      rootElement.className = `${Picker.defaultProps.prefixCls}-root`
      document.body.appendChild(rootElement)
    }
    getUuid = getUuid || tools.helper.getUuidFn(Picker.defaultProps.prefixCls)

    const key = getUuid()
    const { data: _data, name, value: _value, onChange, ...resetProps } = options || {} as PickerProps
    data = _data || data
    value = _value || value

    const sender: any = await Popup.create({
      content: () => {
        const refPicker: any = React.createRef()
        return <div>
          <div className={`${Picker.defaultProps.prefixCls}-header`}>
            <a href="javascript:;" className="x-fl" onClick={() => sender.destroy()}>取消</a>
            <a href="javascript:;" className="x-fr" onClick={() => {
              onOk && onOk(refPicker.current.selectItem, refPicker.current)
              sender.destroy()
            }}>确定</a>
          </div>
          <Picker ref={refPicker} value={value} data={data} {...resetProps} />
        </div>
      },
      mask: true,
      onClickMask: () => sender.destroy(),
      animation: 'bottom',
      offset: {
        bottom: 0,
        left: 0,
        right: 0
      },
      rootElement
    })

    return pickerInstance[key] = sender
  }

  static async multiple({ data, value = [], onOk, options }: { data: PickerDataType[][], value?: any[], onOk?: (selectItem: PickerDataType[], sender: Picker[]) => void, options?: PickerProps }) {
    if (!rootElement) {
      rootElement = document.createElement('div')
      rootElement.className = `${Picker.defaultProps.prefixCls}-root`
      document.body.appendChild(rootElement)
    }
    getUuid = getUuid || tools.helper.getUuidFn(Picker.defaultProps.prefixCls)

    const key = getUuid()
    const { data: _data, name, value: _value, onChange, ...resetProps } = options || {} as PickerProps
    data = _data as any[] || data || []
    value = _value || value || []
    const cols = data.length
    if (!Array.isArray(data)) return console.error('Picker.multiple 数据源格式错误')

    const sender: any = await Popup.create({
      content: () => {
        const refPickers: any = new Array(cols).fill('').map(() => React.createRef())
        return <div className={`${Picker.defaultProps.prefixCls}-multiple`}>
          <div className={`${Picker.defaultProps.prefixCls}-header`}>
            <a href="javascript:;" className="x-fl" onClick={() => sender.destroy()}>取消</a>
            <a href="javascript:;" className="x-fr" onClick={() => {
              onOk && onOk(refPickers.map((refPicker: any) => refPicker.current.selectItem), refPickers.map((item: any) => item.current))
              sender.destroy()
            }}>确定</a>
          </div>
          <div className={`${Picker.defaultProps.prefixCls}-multiple-container`}>
            {data.map((item: any, index) => <Picker
              key={`${item.value}_${index}`}
              data={item}
              value={value[index]}
              ref={refPickers[index]}
              {...resetProps}
            />)}
          </div>
        </div>
      },
      mask: true,
      onClickMask: () => sender.destroy(),
      animation: 'bottom',
      offset: {
        bottom: 0,
        left: 0,
        right: 0
      },
      rootElement
    })

    return pickerInstance[key] = sender
  }

  /**
   * 卸载所有Picker
   * @public
   * */
  static async destroy() {
    let sender
    for (let key in pickerInstance) {
      sender = await pickerInstance[key]
      sender.destroy()
      delete pickerInstance[key]
    }
  }
}

// @ts-ignore
export interface PickerProps extends React.InputHTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;

  /**
   * 键名
   * */
  name?: string

  /**
   * 键值
   * */
  value?: any

  /**
   * 数据源, value为首要显示内容，无时取label
   * */
  data: PickerDataType[]

  /**
   * 是否禁用
   * */
  disabled?: boolean

  /**
   * 是否只读
   * */
  readOnly?: boolean

  /**
   * 滚动阶段，没到一个区间触发一次
   * */
  onChange?: (item: PickerDataType, sender: Picker) => void
}

// 数据源格式
export type PickerDataType = { label: any, value?: any, children?: PickerDataType[] }