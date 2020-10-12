import React from 'react'
import { mount } from 'enzyme'


import SecurityIsAuthenticatedLocal from './isAuthenticatedLocal.jsx'

jest.unmock('./isAuthenticatedLocal.jsx')


test('SecurityIsAuthenticatedLocal null if not authenticated and testing true', () => {
    const comp = mount(
		<SecurityIsAuthenticatedLocal check={true}>
			authenticated content
		</SecurityIsAuthenticatedLocal>
	)

	comp.setState({ isAuthenticatedLocal: false })

	comp.update()

	expect(comp.text().indexOf('authenticated content') === -1).toBeTruthy()
})

test ('SecurityIsAuthenticatedLocal return content if authenticated and testing true', () => {
    const comp = mount(
		<SecurityIsAuthenticatedLocal check={true}>
			authenticated content
		</SecurityIsAuthenticatedLocal>
	)

	comp.setState({ isAuthenticatedLocal: true })

	comp.update()

	expect(comp.text().indexOf('authenticated content') >= 0).toBeTruthy()
})
