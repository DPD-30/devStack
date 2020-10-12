import React from 'react'
import Reflux from 'reflux'
import { Card, CardBody } from 'reactstrap'

import AppStore from 'stores/app.js'

import RoutesAzureAuthorized from 'routes/azureUserAuthenticated.jsx'
import PagesAzureLogin from 'pages/azure/login.jsx'
import PagesAzureLogout from 'pages/azure/logout.jsx'


export default class azureUser extends Reflux.Component{
    constructor(props){
        super(props)
        
        this.store = AppStore
        this.storeKeys = ['isAuthenticatedAzure']
    }

    render(){
        return (window.location.hash.substr(0, 7) === '#/azure')
            ? (this.state.isAuthenticatedAzure === false)
                ? (
                    <div>
                        <Card>
                            <CardBody>
                                <p style={{ textAlign: 'center' }}>
                                    To access the administrative portion of this application, you will need to log in first.
                                </p>
                            </CardBody>

                            <p style={{ textAlign: 'center' }}>
                                <PagesAzureLogin />
                            </p>
                        </Card>
                    </div>
                )
                : (
                    <div>
                        <p style={{ textAlign: 'right' }}>
                            <PagesAzureLogout />
                        </p>
                        <RoutesAzureAuthorized />
                    </div>
                )
            : null
    }
}
