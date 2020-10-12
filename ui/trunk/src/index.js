import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import App from './App.js'
// import AppContainer from 'containers/appContainer.jsx'
import * as serviceWorker from './serviceWorker.js'
// import './node_modules/font-awesome/css/font-awesome.min.css'

// div element create needed for JEST to pass
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') || document.createElement('div'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
