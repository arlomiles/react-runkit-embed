import React from 'react'

class RunKit extends React.Component {

  componentWillMount() {
    const script = document.createElement('script')
    script.src = 'https://embed.runkit.com'
    document.head.appendChild(script)
  }

  defaultFunction(v, d) {
    if(v === undefined) return d
    else return v
  }

  render() {
    this.myParams = {}
    this.myParams.source = this.props.children
    this.myParams.readOnly = this.props.readOnly
    this.myParams.nodeVersion = this.props.nodeVersion
    this.myParams.env = this.props.env // TODO check that this gives an array
    this.myParams.title = this.props.title
    this.myParams.minHeight = parseInt(this.defaultFunction(this.props.minHeight, '130')) // FIXME this doesn't work for some reason; most likely a problem with RunKit's library
    this.myParams.packageResolutionTimestamp = this.props.packageResolutionTimestamp
    this.myParams.preamble = this.props.preamble
    this.myParams.onLoad = this.props.onLoad
    this.myParams.onURLChanged = this.props.onURLChanged
    this.myParams.onEvaluate = this.props.onEvaluate
    return (
      <div ref={(div) => this.myDiv = div}/>
    )
  }

  componentDidMount(param) {
    // This hack exists because, for some reason, window.RunKit doesn't exist
    // when componentDidMount gets called. I don't know why.
    // FIXME
    if(param === undefined) param = this
    if(param === undefined) {
      setTimeout(this.componentDidMount, 100, this)
    } else if(window.RunKit === undefined) {
      setTimeout(param.componentDidMount, 100, param)
    }
    else {
      console.log(param.myParams.readOnly)
      window.RunKit.createNotebook({
        element: param.myDiv,
        source: param.myParams.source,
        readOnly: param.myParams.readOnly,
        nodeVersion: param.myParams.nodeVersion,
        env: param.myParams.env,
        title: param.myParams.title,
        minHeight: param.myParams.minHeight,
        packageResolutionTimestamp: param.myParams.packageResolutionTimestamp,
        preamble: param.myParams.preamble
        // The following have been removed temporarily, because I don't know
        // whether they will work properly in React.
        // FIXME
        /*onLoad:
        onURLChanged:
        onEvaluate: */
      })
    }
  }
}

export default RunKit
