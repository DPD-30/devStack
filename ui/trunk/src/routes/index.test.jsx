import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderToString } from 'react-dom/server'


import RoutingIndex from './index.jsx'

jest.unmock('./index.jsx')


test('RoutingIndex matches snapshot', () => {
	const comp = renderToString(<Router><RoutingIndex /></Router>)

	expect(comp).toMatchSnapshot()
})
