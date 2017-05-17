import React from 'react'

class RunKit extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    const script = document.createElement('script')
    script.src = 'https://embed.runkit.com'
    document.head.appendChild(script)
  }

  render() {
    let runComponentDidMount2 = true
    if(this.myNB !== undefined) {
      if(
        this.state.readOnly !== this.props.readOnly ||
        this.state.nodeVersion !== this.props.nodeVersion ||
        this.state.env !== this.props.env ||
        this.state.title !== this.props.title ||
        this.state.minHeight !== (this.props.minHeight || '130') ||
        this.state.packageResolutionTimestamp !== this.props.packageResolutionTimestamp ||
        this.state.onLoad !== this.props.onLoad ||
        this.state.onURLChanged !== this.props.onURLChanged ||
        this.state.onEvaluate !== this.props.onEvaluate ||
        this.state.autoEval !== this.props.autoEval === 'true'
      ) this.myDiv.innerHTML = ''
      else runComponentDidMount2 = false
    }
    this.state.source = this.props.children
    this.state.readOnly = this.props.readOnly
    this.state.nodeVersion = this.props.nodeVersion
    this.state.env = this.props.env
    this.state.title = this.props.title
    this.state.minHeight = this.props.minHeight || '130'
    this.state.packageResolutionTimestamp = this.props.packageResolutionTimestamp
    this.state.preamble = this.props.preamble || ''
    this.state.onLoad = this.props.onLoad
    this.state.onURLChanged = this.props.onURLChanged
    this.state.onEvaluate = this.props.onEvaluate
    this.state.autoEval = this.props.autoEval === 'true'
    if(runComponentDidMount2) this.componentDidMount2()
    else {
      this.myNB.setSource(this.state.source)
      this.myNB.setPreamble(this.state.preamble)
      if(this.state.autoEval) this.myNB.evaluate()
    }
    return (
      <div ref={(div) => this.myDiv = div}/>
    )
  }

  componentDidMount2(param) {
    // This hack exists because, for some reason, window.RunKit doesn't exist
    // when componentDidMount gets called. I don't know why.
    // FIXME
    if(param === undefined) param = this
    if(param === undefined) {
      setTimeout(this.componentDidMount2, 100, this)
    } else if(window.RunKit === undefined) {
      setTimeout(param.componentDidMount2, 100, param)
    }
    else {
      param.myNB = window.RunKit.createNotebook({
        element: param.myDiv,
        source: param.state.source,
        readOnly: param.state.readOnly,
        nodeVersion: param.state.nodeVersion,
        env: param.state.env,
        title: param.state.title,
        minHeight: param.state.minHeight,
        packageResolutionTimestamp: param.state.packageResolutionTimestamp,
        preamble: param.state.preamble,
        onLoad: param.state.autoEval ? (nb) => {
          nb.evaluate()
          param.state.onLoad(nb)
        } : (nb) => param.state.onLoad(nb),
        onURLChanged: (nb) => param.state.onURLChanged(nb),
        onEvaluate: (nb) => param.state.onEvaluate(nb)
      })
    }
  }
}

export default RunKit
