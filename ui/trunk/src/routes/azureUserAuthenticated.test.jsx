import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderToString } from 'react-dom/server'


import RoutingAzureUserAuthenticated from './azureUserAuthenticated.jsx'

jest.unmock('./azureUserAuthenticated.jsx')


test('RoutingAzureUserAuthenticated matches snapshot', () => {
	const comp = renderToString(<Router><RoutingAzureUserAuthenticated /></Router>)

	expect(comp).toMatchSnapshot()
})
