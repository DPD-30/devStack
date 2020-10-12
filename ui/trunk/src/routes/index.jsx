import React from 'react'
import { withRouter } from 'react-router-dom'

// keep
import RoutesPublic from 'routes/public.jsx'
import RoutesAzure from 'routes/azureUser.jsx'
import RoutesLocal from 'routes/localUser.jsx'

// trash
import RoutesTemplates from 'templates/routes/templates.jsx'


function Routes(props) {
	return (
		<>
			<RoutesPublic />
			<RoutesAzure />
			<RoutesLocal />

			<RoutesTemplates />
		</>
	)
}

export default withRouter(Routes)
