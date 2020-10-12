import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderToString } from 'react-dom/server'


import RoutingPublic from './public.jsx'

jest.unmock('./public.jsx')


test('RoutingPublic matches snapshot', () => {
	const comp = renderToString(<Router><RoutingPublic /></Router>)

	expect(comp).toMatchSnapshot()
})
