```jsx harmony
const QRCode = require('./assets/libs/qrCode').default

class App extends React.Component {
  componentDidMount() {
    const qrCode = new QRCode(null, {
    	text: `${window.location.origin}/mobile.html`,
    	width: 200,
    	height: 200,
    	correctLevel: 3,
    	colorDark: '#000000',
    	colorLight: '#ffffff'
    })
    setTimeout(() => {
      this.setState({imgSrc: qrCode._oDrawing._elImage.currentSrc})
    })
  }
  render() {
    return <div>
    	<div>{this.state && <img src={this.state.imgSrc} alt=""/>}</div>
    	<br/>
			<div>
				<a style={{fontSize: '16px', color: '#009688'}} href={`${window.location.origin}/mobile.html`} target="_blank">
					{`${window.location.origin}/mobile.html`}
				</a>
			</div>
		</div>
  }
}
;<App />
```