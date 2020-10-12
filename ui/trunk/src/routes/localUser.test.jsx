import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'


import RoutingLocalUser from './localUser.jsx'

jest.unmock('./localUser.jsx')



test('RoutingLocalUser should login if path is #/login', () => {
	global.window.location.hash = '#/login'

	const comp = mount(
<Router>
		<RoutingLocalUser>
			authenticated content
		</RoutingLocalUser>
</Router>
	)
	// const instance = comp.instance()

	comp.setState({ isAuthenticatedLocal: false })
	comp.render()

	// expect(instance.html().indexOf('mock pages local login') >= 0).toBeTruthy()
})

test('RoutingLocalUser should login if path is #/local', () => {
	global.window.location.hash = '#/local'

	const comp = mount(
		<Router>
<RoutingLocalUser>
			authenticated content
		</RoutingLocalUser>
		</Router>
)

	comp.update()

	comp.setState({ isAuthenticatedLocal: false })

	comp.update()

	// expect(comp.text().indexOf('mock pages local login') >= 0).toBeTruthy()
})

test('RoutingLocalUser be null if not an local based route', () => {
	global.window.location.hash = '#/register'

	const comp = mount(
		<Router>
		<RoutingLocalUser>
			authenticated content
		</RoutingLocalUser>
		</Router>
	)

	// expect(comp.html()).toBeNull()
})
