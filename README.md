# react-runkit-embed
Embed RunKit in your React apps

## For a demo
`npm i react-runkit-embed`

then

`npm start`

then go to http://localhost:8080

## How to use
`npm i react-runkit-embed`

then

`npm run build`

then

`import RunKit from 'react-runkit-embed/RunKit'`

then

`<RunKit param=val...>your code here</RunKit>`

### Parameters
- readOnly
- nodeVersion
- env
- title
- minHeight
- packageResolutionTimestamp
- preamble
- onLoad
- onURLChanged
- onEvaluate
- autoEval: automatically evaluate code if `'true'`

See https://runkit.com/docs/embed for documentation on the parameters.