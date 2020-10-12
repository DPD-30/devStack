import React from 'react'
import Reflux from 'reflux'
import {
	Route,
	withRouter,
    Switch,
    Redirect,
} from 'react-router-dom'
import { createHashHistory } from "history";

// KEEP
import PagesPublicHome from 'pages/public/home/index.jsx'
import PagesPublicRegister from 'pages/public/register/index.jsx'
import PagesPublicDashboard from 'templates/pages/dashboard.jsx'

import AppStore from 'stores/app.js'

import EasterEgg from  'pages/secret/easterEgg.jsx'

import TemplatesBootstrap from  'pages/bootstrap/index.jsx'


class RoutesPublic extends Reflux.Component {
    constructor(props){
        super(props)

        this.store = AppStore
        this.storeKeys = ['isAuthenticatedLocal']
    }

    render(){
        const location = createHashHistory({ basename: '' }).location

        return (
            <Switch location={location}>
                <Route path="/" exact={true}>
                    <PagesPublicHome />
                </Route>
                <Route path="/register" exact={true}>
                    {
                        (this.state.isAuthenticatedLocal === true)
                            ? <Redirect to="/local/home" />
                            : <PagesPublicRegister />
                    }
                </Route>
                <Route path="/dashboard" exact={true}>
                    <PagesPublicDashboard />
                </Route>

                <Route path="/easterEgg" exact={true}>
                    <EasterEgg />
                </Route>

                <Route path="/templates/bootstrap" exact={true}>
                    <TemplatesBootstrap />
                </Route>
            </Switch>
        )
    }
}


export default withRouter(RoutesPublic)
