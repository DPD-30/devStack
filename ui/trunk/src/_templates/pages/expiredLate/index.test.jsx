import React from 'react'
import { renderToString } from 'react-dom/server'


import TestComponent from './index.jsx'

jest.unmock('./index.jsx')


test('Expired and Late report matches snapshot', () => {
	const comp = renderToString(<TestComponent />)

	expect(comp).toMatchSnapshot()
})
