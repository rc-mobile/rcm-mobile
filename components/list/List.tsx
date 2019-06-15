import * as React from 'react'
import cls from 'classnames'
import './style/index.scss'

/**
 * @author tongxiaokang
 * @version 0.0.1
 */
export default class List extends React.PureComponent<ListProps, any> {
  static defaultProps = {
    prefixCls: 'x-list'
  }

  render() {
    const {
      prefixCls, children, className, style,
      renderHeader, renderFooter, ...restProps
    } = this.props

    return (
      <div className={cls(prefixCls, className)} style={style} {...restProps}>
        {renderHeader ? (
          <div className={`${prefixCls}-header`}>
            {typeof renderHeader === 'function' ? renderHeader() : renderHeader}
          </div>
        ) : null}
        {children ? (
          <div className={`${prefixCls}-body`}>{children}</div>
        ) : null}
        {renderFooter ? (
          <div className={`${prefixCls}-footer`}>
            {typeof renderFooter === 'function' ? renderFooter() : renderFooter}
          </div>
        ) : null}
      </div>
    )
  }
}

export interface ListProps extends React.HTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;
  /**
   * 列表头部
   */
  renderHeader?: React.ReactNode
  /**
   * 列表底部
   */
  renderFooter?: React.ReactNode
}
