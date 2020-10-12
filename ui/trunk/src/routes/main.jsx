import React from 'react'
import {
	Route,
	withRouter,
	Switch
} from 'react-router-dom'
import { createHashHistory } from "history";

// TRASH
import PagesCharts from  'templates/pages/charts.jsx'
import PagesDashboard from 'templates/pages/dashboard.jsx'

// KEEP
import PagesReports from 'pages/reports.jsx'


function RoutesMain() {
	const location = createHashHistory({ basename: '' }).location
	return (
		<React.Fragment>
			<Switch location={location}>
				<Route path="/reports" exact={true}>
					<PagesReports />
				</Route>

				<Route path="/charts" exact={true}>
					<PagesCharts />
				</Route>
				<Route path="/dashboard" exact={true}>
					<PagesDashboard/>
				</Route>
			</Switch>
		</React.Fragment>
	)
}


export default withRouter(RoutesMain)
