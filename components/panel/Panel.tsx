import * as React from 'react'
import cls from 'classnames'
import { ListItem, List, tools } from 'rcm-mobile'
import './style/index.scss'

/**
 * @author sayll
 * @version 0.0.1
 */
export default class Panel extends React.PureComponent<PanelProps, any> {
  static defaultProps = {
    prefixCls: 'x-panel',
    collapsed: true,
    collapsable: true
  }

  refPanelBody: any = React.createRef()

  constructor(props: PanelProps) {
    super(props)
    this.state = {
      style: {},
      collapsed: props.collapsed,
      propsCollapsed: props.collapsed
    }
  }

  render() {
    const { collapsed } = this.state
    const {
      prefixCls, className, collapsed: _collapsed, collapsable,
      title, children, onClick, onCollapseChange, ...resetProps
    } = this.props
    const classNames = cls(prefixCls, className, {
      [`${prefixCls}-collapsed`]: this.state.collapsed
    })

    return (
      <List{...resetProps} className={classNames}>
        <ListItem className={`${prefixCls}-title`} title={title} arrow={collapsed ? 'right' : 'bottom'} onClick={this.handleClick} />
        <div ref={this.refPanelBody} className={`${prefixCls}-body`}>{children}</div>
      </List>
    )
  }

  componentDidMount(): void {
    if (this.state.collapsed) {
      this.handleToggleCollapse(false)
    }
  }

  static getDerivedStateFromProps(nextProps: PanelProps, prevState: any) {
    // 副本比较 及 内部状态比较
    if (nextProps.collapsed !== prevState.collapsed && nextProps.collapsed !== prevState.propsCollapsed) {
      return {
        collapsed: nextProps.collapsed,
        propsCollapsed: nextProps.collapsed
      }
    }
    return null
  }

  // @ts-ignore
  getSnapshotBeforeUpdate(prevProps: Readonly<PanelProps>, prevState: Readonly<any>): any | null {
    if (prevState.collapsed !== this.state.collapsed) {
      this.handleToggleCollapse()
    }
    return null
  }

  set collapsed(collapsed: boolean) {
    this.setState({ collapsed })
  }

  handleClick = (e: React.MouseEvent) => {
    const collapsed = !this.state.collapsed
    const { onClick, collapsable } = this.props

    if (collapsable) {
      this.setState({ collapsed })
    }
    onClick && onClick(e)
  }

  // 存在一个默认
  handleToggleCollapse = (hasAnimation: boolean = true) => {
    const { onCollapseChange } = this.props

    // @ts-ignore
    tools.dom.toggle(this.refPanelBody.current, hasAnimation ? 'height' : '')
    hasAnimation && onCollapseChange && onCollapseChange(this.state.collapsed, this)
  }
}

export interface PanelProps extends React.HTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;
  /**
   * 标题
   * */
  title?: any
  /**
   * 是否可折叠
   * @default true
   * */
  collapsable?: boolean
  /**
   * 是否已折叠
   * @default false
   * */
  collapsed?: boolean
  /**
   * 切换折叠事件
   * */
  onCollapseChange?: (isCollapsed: boolean, sender: Panel) => void
}