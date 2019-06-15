import React from 'react'
import { Button, Icon } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * ButtonExample 演示案例
 * @author tongxiaokang
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  render() {
    return (
      <div className="x-example">
        <h1>Button 演示</h1>

        <h2>theme 参数</h2>
        <div style={{padding: '1em'}}>
          <Button>text</Button>
          <br />
          <Button theme="info">info</Button>
          <br />
          <Button theme="primary">primary</Button>
          <br />
          <Button theme="success">success</Button>
          <br />
          <Button theme="warning">warning</Button>
          <br />
          <Button theme="error">error</Button>
        </div>

        <h2>size 参数</h2>
        <div style={{padding: '1em'}}>
          <Button size="small">small</Button>
          <br />
          <Button>default</Button>
          <br />
          <Button size="large">large</Button>
        </div>

        <h2>inline 参数</h2>
        <div style={{padding: '1em'}}>
          <Button inline size="small" style={{ marginRight: '20px' }}>small</Button>
          <Button inline style={{ marginRight: '20px' }}>default</Button>
          <Button inline size="large">large</Button>
        </div>

        <h2>radius 参数</h2>
        <div style={{padding: '1em'}}>
          <Button radius>radius</Button>
        </div>

        <h2>disabled 参数</h2>
        <div style={{padding: '1em'}}>
          <Button href="http://baidu.com" disabled>disabled</Button>
        </div>

        <h2>loading & loadingIcon 参数</h2>
        <div style={{padding: '1em'}}>
          <Button loading>loading</Button>
          <br />
          <Button
            loading
            loadingIcon={<Icon spin className="x-icon-close-circle" style={{ marginRight: '.5rem' }} />}
          >loadingIcon</Button>
        </div>

        <h2>activeClassName & activeStyle 参数</h2>
        <div style={{padding: '1em'}}>
          <Button activeClassName={'activeClassName'}>activeClassName</Button>
          <br />
          <Button activeStyle={{ color: 'green' }}>activeStyle</Button>
        </div>
      </div>
    )
  }
}

renderMobile(Example)