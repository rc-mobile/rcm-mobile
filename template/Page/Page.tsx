import * as React from 'react'
import cls from 'classnames'
import './style/index.scss'

/**
 * @author __userName__
 * @version 0.0.1
 */
export default class __componentName__ extends React.PureComponent<__componentName__Props, any> {
  static defaultProps = {
    prefixCls: 'x-__className__'
  }

  constructor(props: __componentName__Props) {
    super(props)
    this.state = {}
  }

  componentDidMount(): void {}

  // static getDerivedStateFromProps(nextProps: __componentName__Props, prevState: any) {
  //   return null
  // }

  render() {
    const { prefixCls, className, ...resetProps } = this.props

    return (
      <div className={cls(prefixCls, className)} {...resetProps}>
        hello,word!
      </div>
    )
  }
}

export interface __componentName__Props extends React.HTMLAttributes<{}> {
  /**
   * 样式前缀
   * @ignore
   */
  prefixCls?: string;
}