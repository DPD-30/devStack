import React from 'react'
import { mount } from 'enzyme'


import RoutingAzureUser from './azureUser.jsx'

jest.unmock('./azureUser.jsx')



test('RoutingAzureUser be null if not an azure based route', () => {
	global.window.location.hash = '#/register'

	const comp = mount(
		<RoutingAzureUser>
			authenticated content
		</RoutingAzureUser>
	)

	expect(comp.html()).toBeNull()
})

test('RoutingAzureUser force login if not authenticated', () => {
	global.window.location.hash = '#/azure/home'

	const comp = mount(
		<RoutingAzureUser>
			authenticated content
		</RoutingAzureUser>
	)

	comp.update()

	comp.setState({ isAuthenticatedAzure: false })

	comp.update()

	expect(comp.text().indexOf('mock pages azure login') >= 0).toBeTruthy()
})
