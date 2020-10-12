import React from 'react'
import Reflux from 'reflux'
import { Router } from 'react-router-dom'
import Header from 'layout/header/index.jsx'
import Menu from 'layout/menu/index.jsx'
import Content from 'layout/content/index.jsx'

import AppStore from 'stores/app.js'
import AppActions from 'actions/app.js'

// azure application insights 
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createHashHistory } from "history";


import 'css/bootstrap.cosmo.min.css'
import 'css/global.css'
import 'css/bootstrap.overrides.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'
import '../node_modules/animate.css/animate.css'

const browserHistory = createHashHistory({ basename: '' });


export default class App extends Reflux.Component {
  constructor(props) {
    super(props)

    this.store = AppStore
    this.storeKeys = ['swagger']
    const reactPlugin = new ReactPlugin();
    
    // get the settings.json from the server
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const appSettings = JSON.parse(this.responseText)
        
        AppActions.createSwaggerClient(appSettings)
        const appInsights = new ApplicationInsights({
          config: {
              instrumentationKey: appSettings.appInsightKey,
              endpointUrl: 'https://usgovvirginia-0.in.applicationinsights.azure.us/v2/track',
              EndpointSuffix: 'applicationinsights.us',
              extensions: [reactPlugin],
              extensionConfig: {
                [reactPlugin.identifier]: { history: browserHistory }
              }
          }
        });
        appInsights.loadAppInsights();
      }
    }

    xmlhttp.open('GET', 'appSettings.json', true)
    xmlhttp.send()
  }

  componentDidMount() {
    AppActions.azureGetAccounts()
  }

  render() {
    return (this.state.swagger !== null)
      ? (
        <Router history={browserHistory}>
          <div className="App">
            <Header />
            <Menu />
            <Content />
          </div>
        </Router>
      )
      : (
        <h3 style={{ padding: '1em' }}>
          Loading API...
        </h3>
      )
  }
}
