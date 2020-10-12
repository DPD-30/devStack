import React from 'react'
import { renderToString } from 'react-dom/server'


import TestComponent from './never.jsx'

jest.unmock('./never.jsx')


test('Status Never matches snapshot', () => {
	const comp = renderToString(<TestComponent />)

	expect(comp).toMatchSnapshot()
})
