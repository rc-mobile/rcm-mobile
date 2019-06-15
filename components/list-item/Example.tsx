import React from 'react'
import { ListItem, Icon } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * ListItemExample 演示案例
 * @author tongxiaokang
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  state = {
    arrow: 'right' as any
  }

  render() {
    return (
      <div className="x-example">
        <h1>ListItem 演示</h1>

        <h2>普通使用</h2>
        <span>
          <ListItem title="选择器">请选择</ListItem>
        </span>

        <h2>arrow 参数</h2>
        <span>
          <ListItem title="left" arrow="left" />
          <ListItem title="right" arrow="right" />
          <ListItem title="top" arrow="top" />
          <ListItem title="bottom" arrow="bottom" />
          <ListItem
            title="点击改变箭头方向"
            arrow={this.state.arrow}
            onClick={() => this.setState((state: any) => ({ arrow: state.arrow === 'bottom' ? 'right' : 'bottom' }))}
          />
        </span>

        <h2>ListItem.Brief 静态方法</h2>
        <span>
          <ListItem title={<div>标题
            <ListItem.Brief>追加描述内容</ListItem.Brief>
          </div>}>
            请选择
          </ListItem>
        </span>

        <h2>disabled 参数</h2>
        <span>
          <ListItem title="禁用点击事件" disabled onClick={() => alert('点击事件')} />
        </span>

        <h2>thumb 参数</h2>
        <span>
          <ListItem title="为左侧添加 Icon" thumb={<Icon className="x-icon-check-circle-o" />} />
          <ListItem title="为左侧添加 Img 的 icon" thumb="//wds.weidai.com.cn/images/logo/wei.svg" />
        </span>

        <h2>wrap 参数</h2>
        <span>
          <ListItem title="很长的文案会被省略哦，很长很长很长很长很长很长很长很长很长很长" arrow="right" />
          <ListItem title="设置 wrap 属性，很长的文案会被换行显示哦，很长很长很长很长很长" wrap arrow="right" />
        </span>

        <h2>activeStyle & activeClassName 参数</h2>
        <span>
          <ListItem title="activeClassName: 'x-test-active'" activeClassName="x-test-active" />
          <ListItem title="background: 'green'" activeStyle={{ background: 'green' }} />
        </span>
      </div>
    )
  }
}

renderMobile(Example)