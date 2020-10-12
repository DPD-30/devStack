import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderToString } from 'react-dom/server'


import RoutingMain from './main.jsx'

jest.unmock('./main.jsx')


test('RoutingMain matches snapshot', () => {
	const comp = renderToString(<Router><RoutingMain /></Router>)

	expect(comp).toMatchSnapshot()
})
