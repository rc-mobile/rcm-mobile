import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'

export const renderMobile = (Example: any) => {
  if (({ MOBILE: 1 })[process.env.RUN_ENV]) {
    function Render(App: any) {
      render(
        <App />,
        document.getElementById('app')
      )
    }

    Render(hot(module)(() => <Example />))
  }
  if (({ DOC: 1 })[process.env.RUN_ENV]) {
    window.system = {
      env: 'doc'
    }
  }
}