import React from 'react'
import { mount } from 'enzyme'


import SecurityIsAuthenticatedAzure from './isAuthenticatedAzure.jsx'

jest.unmock('./isAuthenticatedAzure.jsx')


test('SecurityIsAuthenticatedAzure null if not authenticated and testing true', () => {
    const comp = mount(
		<SecurityIsAuthenticatedAzure check={true}>
			authenticated content
		</SecurityIsAuthenticatedAzure>
	)

	comp.setState({ isAuthenticatedAzure: false })

	comp.update()

	expect(comp.text().indexOf('authenticated content') === -1).toBeTruthy()
})

test ('SecurityIsAuthenticatedAzure return content if authenticated and testing true', () => {
    const comp = mount(
		<SecurityIsAuthenticatedAzure check={true}>
			authenticated content
		</SecurityIsAuthenticatedAzure>
	)

	comp.setState({ isAuthenticatedAzure: true })

	comp.update()

	expect(comp.text().indexOf('authenticated content') >= 0).toBeTruthy()
})
