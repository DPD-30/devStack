import React from 'react'
import { renderToString } from 'react-dom/server'


import TestComponent from './overdue.jsx'

jest.unmock('./overdue.jsx')


test('Status Overdue matches snapshot', () => {
	const comp = renderToString(<TestComponent />)

	expect(comp).toMatchSnapshot()
})
