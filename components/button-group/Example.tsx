import React from 'react'
import { Button, ButtonGroup } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * ButtonGroupExample 演示案例
 * @author tongxiaokang
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  render() {
    return (
      <div className="x-example">
        <h1>ButtonGroup 演示</h1>

        <h2>size 参数</h2>
        <div style={{ padding: '1em' }}>
          <ButtonGroup size="small">
            <Button>上</Button>
            <Button>下</Button>
            <Button>左</Button>
            <Button>右</Button>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <Button>上</Button>
            <Button>下</Button>
            <Button>左</Button>
            <Button>右</Button>
          </ButtonGroup>
          <br />
          <ButtonGroup size="large">
            <Button>上</Button>
            <Button>下</Button>
            <Button>左</Button>
            <Button>右</Button>
          </ButtonGroup>
        </div>


        <h2>radius 参数</h2>
        <div style={{ padding: '1em' }}>
          <ButtonGroup radius>
            <Button>上</Button>
            <Button>下</Button>
            <Button>左</Button>
            <Button>右</Button>
          </ButtonGroup>
        </div>

        <h2>radius 参数</h2>
        <div style={{ padding: '1em' }}>
          <ButtonGroup radius>
            <Button>上</Button>
            <Button>下</Button>
            <Button>左</Button>
            <Button>右</Button>
          </ButtonGroup>
        </div>

        <h2>radius 参数</h2>
        <div style={{ padding: '1em' }}>
          <ButtonGroup radius>
            <Button>上</Button>
            <Button>下</Button>
            <Button>左</Button>
            <Button>右</Button>
          </ButtonGroup>
        </div>

        <h2>theme=info 参数</h2>
        <div style={{ padding: '1em' }}>
          <ButtonGroup theme="info">
            <Button>上</Button>
            <Button>下</Button>
            <Button>左</Button>
            <Button>右</Button>
          </ButtonGroup>
        </div>

        <h2>inline=false 参数</h2>
        <div style={{ padding: '1em' }}>
          <ButtonGroup inline={false}>
            <Button>上</Button>
            <Button>下</Button>
            <Button>左</Button>
            <Button>右</Button>
          </ButtonGroup>
        </div>
      </div>
    )
  }
}

renderMobile(Example)