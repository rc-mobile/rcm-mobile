import * as React from 'react'
import cls from 'classnames'
import './style/index.scss'

/**
 * @author sayll
 * @version 0.0.1
 */
export default class Accordion extends React.PureComponent<AccordionProps, any> {
  static defaultProps = {
    prefixCls: 'x-accordion',
    multiply: false,
    selectedIndex: []
  }

  constructor(props: AccordionProps) {
    super(props)
    this.state = { selectedIndex: props.selectedIndex }
  }

  render() {
    const { prefixCls, className, children, multiply, selectedIndex, onCollapseChange, ...resetProps } = this.props

    return (
      <div className={cls(prefixCls, className)} {...resetProps}>
        {this.panels}
      </div>
    )
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<AccordionProps>): any | null {
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.selectedIndex = this.props.selectedIndex as number[]
    }
    return null
  }

  private refList: any[]

  get elem() {
    return this
  }

  /**
   * 选中的索引
   * */
  get selectedIndex() {
    return this._selectedIndex
  }

  set selectedIndex(index) {
    const { onCollapseChange } = this.props
    this._selectedIndex = index
    this.refList.forEach((ref, key) => {
      ref.current.collapsed = !~index.indexOf(key)
    })
    onCollapseChange && onCollapseChange(index, this)
  }

  private _selectedIndex: number[] = this.props.selectedIndex as number[]

  /**
   * 获取所有面板实例
   * */
  get panels() {
    const { children: cld } = this.props
    // 如果默认非 Panel 组件时，存在兼容问题，有待优化。
    this.refList = Array.isArray(cld) ? cld.map(() => React.createRef()) : []
    return this.cloneChildren(cld, this.refList)
  }

  // 处理children，为其赋值默认的提交事件，及保存所有 ref
  cloneChildren = (children: any, refs: any) => {
    return Array.isArray(children)
      ? children.map((ele: any, key: number) => ele
        ? React.cloneElement(ele, {
          key,
          ref: refs[key],
          collapsed: !~this.selectedIndex.indexOf(key),
          collapsable: false,
          onClick: (...props) => {
            if (!this.props.multiply) {
              this.selectedIndex = this.selectedIndex[0] === key ? [] : [key]
            }
            else {
              const index = this.selectedIndex.indexOf(key)
              const isActive = index > -1
              if (isActive) {
                this.selectedIndex.splice(index, 1)
              }
              else {
                this.selectedIndex.push(key)
              }
              this.selectedIndex = this.selectedIndex
            }
            ele.props.onClick && ele.props.onClick(...props)
          }
        })
        : ele)
      : [children]
  }
}

export interface AccordionProps extends React.HTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;
  /**
   * 是否允许同时开多个面板
   * @default false
   * */
  multiply?: boolean;
  /**
   * 默认展开项
   * @default []
   * */
  selectedIndex?: number[]
  /**
   * 切换折叠事件
   * */
  onCollapseChange?: (selectedIndex: number[], sender: Accordion) => void;
}