import React from 'react'
import { renderToString } from 'react-dom/server'


import TestComponent from './close.jsx'

jest.unmock('./close.jsx')


test('Status Close matches snapshot', () => {
	const comp = renderToString(<TestComponent />)

	expect(comp).toMatchSnapshot()
})
