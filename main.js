import React from 'react'
import ReactDOM from 'react-dom'
import RunKit from './RunKit.jsx'

ReactDOM.render(<RunKit autoEval="true">console.log('hello world')</RunKit>, document.getElementById('app'));
