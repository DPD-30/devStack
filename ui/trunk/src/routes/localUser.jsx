import React from 'react'
import Reflux from 'reflux'
import { createHashHistory } from "history";
import {
	Route,
	withRouter,
	Switch
} from 'react-router-dom'

import AppStore from 'stores/app.js'

import PagesLocalLogin from 'pages/local/login.jsx' 
import PagesLocalLogout from 'pages/local/logout.jsx' 

import PagesLocalHome from 'pages/local/home.jsx'


class localUser extends Reflux.Component{
    constructor(props){
        super(props)

        this.store = AppStore
        this.storeKeys = ['isAuthenticatedLocal']
    }

    render(){
        const location = createHashHistory({ basename: '' }).location

        return (
            window.location.hash.substr(0, 7) === '#/local'
            || window.location.hash.substr(0, 7) === '#/login'
        )
            ? (this.state.isAuthenticatedLocal === false)
                ? <PagesLocalLogin />
                : (
                    <div>
                        <p style={{ textAlign: 'right' }}>
                            <PagesLocalLogout />
                        </p>
                        <Switch location={location}>
                            <Route path="/login" exact={true}>
                                <PagesLocalHome />
                            </Route>

                            <Route path="/local/home" exact={true}>
                                <PagesLocalHome />
                            </Route>
                            <Route path="/local" exact={true}>
                                <PagesLocalHome />
                            </Route>
                        </Switch>
                    </div>
                )
            : null
    }
}

export default withRouter(localUser)
