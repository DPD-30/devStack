import React from 'react'
import Reflux from 'reflux'
import {
	// Route,
	Redirect,
} from 'react-router-dom'

// other import
import Login from 'pages/local/login/index.jsx'

import AppStore from 'stores/app.js'


export default class login extends Reflux.Component{
    constructor(props){
        super(props)

        this.store = AppStore
        this.storeKeys = ['isAuthenticatedLocal']
    }

    render(){
        return (this.state.isAuthenticatedLocal === false)
            ? <Login/>
            : <Redirect to="/local/home" />
    }
}
