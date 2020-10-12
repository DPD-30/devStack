import React from 'react'
import {
	Route,
	withRouter,
	Switch
} from 'react-router-dom'
import { createHashHistory } from "history";

// KEEP
import PagesAzureHome from 'pages/azure/home.jsx'
import PagesAzureAdminCards from 'pages/admin/cards.jsx'
import PagesAzureAdminRoles from 'pages/admin/roles.jsx'
import PagesAzureAdminUsers from 'pages/admin/users.jsx'
import PagesAzureAdminAppSettings from 'pages/admin/appSettings/index.jsx'


class RoutesAzure extends React.Component{
    render(){
        const location = createHashHistory({ basename: '' }).location
        return (
            <Switch location={location}>
                <Route path="/azure/cards" exact={true}>
                    <PagesAzureAdminCards />
                </Route>
                <Route path="/azure/roles" exact={true}>
                    <PagesAzureAdminRoles />
                </Route>
                <Route path="/azure/users" exact={true}>
                    <PagesAzureAdminUsers />
                </Route>
                <Route path="/azure/appSettings" exact={true}>
                    <PagesAzureAdminAppSettings />
                </Route>
                <Route path="/azure" exact={true}>
                    <PagesAzureHome />
                </Route>
            </Switch>
        )
    }
}

export default withRouter(RoutesAzure)
