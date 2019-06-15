import * as React from 'react'
import cls from 'classnames'
import { tools } from 'rcm-mobile'
import './style/index.scss'

/**
 * @author tongxiaokang
 * @version 0.0.1
 */
export default class Icon extends React.PureComponent<IconProps, any> {
  static defaultProps = {
    style: {},
    spin: false,
    rotate: 0
  }

  constructor(props: IconProps) {
    super(props)
    this.state = {
      spin: props.spin,
      rotate: props.rotate
    }
  }

  refIcon: any = React.createRef()

  render() {
    const { style, spin, className, children, ...restProps } = this.props
    return (
      <i
        style={style}
        ref={this.refIcon}
        className={cls('x-icon', className, { 'x-amt-spin': spin })}
        {...restProps}
      >
        {children}
      </i>
    )
  }

  componentDidMount(): void {
    this.initIconTransform()
  }

  static getDerivedStateFromProps(nextProps: IconProps, prevState: any) {
    if (nextProps.rotate !== prevState.rotate || nextProps.spin !== prevState.spin) {
      return nextProps
    }
    return null
  }

  componentDidUpdate(prevProps: Readonly<IconProps>): any | null {
    if (prevProps.rotate !== this.props.rotate) {
      this.initIconTransform()
    }
  }

  initIconTransform = () => {
    const { rotate } = this.state
    if (rotate) {
      tools.helper.setTransform(this.refIcon.current, `rotate(${rotate}deg)`)
    }
  }

  static getRotate(arrow: any) {
    let rotate = 0
    // 初始化箭头方向
    switch (arrow) {
      case 'left':
        rotate = 0
        break
      case 'top':
        rotate = 90
        break
      case 'bottom':
        rotate = 270
        break
      default:
        rotate = 180
    }
    return rotate
  }
}

export interface IconProps extends React.HTMLAttributes<{}> {
  /**
   * 设置图标样式，例如 fontSize 和 color
   */
  style?: object

  /**
   * 周期性旋转
   * @default false
   */
  spin?: boolean

  /**
   * 固定旋转角度
   * @default 0
   * */
  rotate?: number
}