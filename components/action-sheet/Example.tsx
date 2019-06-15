import React from 'react'
import { ActionSheet, Button, Toast } from 'rcm-mobile'
import { renderMobile } from 'example/utils/renderHelper'
import 'example/index.scss'

/**
 * ActionSheetExample 演示案例
 * @author sayll
 * @version 0.0.1
 */
export default class Example extends React.PureComponent {
  actions = [
    {
      text: 'QQ',
      data: 1,
      logo: <img src="https://gw.alipayobjects.com/zos/rmsportal/SxpunpETIwdxNjcJamwB.png" alt="" />,
      onClick: () => Toast.info('QQ')
    },
    {
      text: '微博',
      data: 2,
      logo: <img src="https://gw.alipayobjects.com/zos/rmsportal/wvEzCMiDZjthhAOcwTOu.png" alt="" />,
      onClick: () => Toast.info('微博')
    },
    {
      text: '生活圈',
      data: 3,
      disabled: true,
      logo: <img src="https://gw.alipayobjects.com/zos/rmsportal/cTTayShKtEIdQVEMuiWt.png" alt="" />,
      onClick: () => Toast.info('生活圈')
    },
    {
      text: '微信好友',
      data: 4,
      disabled: true,
      logo: <img src="https://gw.alipayobjects.com/zos/rmsportal/umnHwvEgSyQtXlZjNJTt.png" alt="" />,
      onClick: () => Toast.info('微信好友')
    },
    {
      text: '支付宝',
      data: 5,
      logo: <img src="https://gw.alipayobjects.com/zos/rmsportal/OpHiXAcYzmPQHcdlLFrc.png" alt="" />,
      onClick: () => Toast.info('支付宝')
    },
    {
      text: 'google',
      data: 6,
      logo: <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=539758193,20783679&fm=27&gp=0.jpg" alt="" />,
      onClick: () => Toast.info('google')
    }
  ]

  render() {
    return (
      <div className="x-example">
        <h1>ActionSheet 演示</h1>

        <div>
          <Button
            className="x-blank"
            onClick={() => ActionSheet.showAction(
              this.actions,
              '测试ActionSheet.showAction',
              action => setTimeout(() => Toast.success(`action附带参数data = ${action.data}`), 1000)
            )}
          >ActionSheet.showAction</Button>

          <Button
            onClick={() => ActionSheet.showActionShare(
              this.actions,
              '测试ActionSheet.showActionShare',
              action => setTimeout(() => Toast.success(`action附带参数data = ${action.data}`), 1000)
            )}
          >ActionSheet.showActionShare</Button>
        </div>
      </div>
    )
  }
}

renderMobile(Example)