import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { renderToString } from 'react-dom/server'


import RoutingTemplates from './templates.jsx'

jest.unmock('./templates.jsx')


test('RoutingTemplates matches snapshot', () => {
	const comp = renderToString(<Router><RoutingTemplates /></Router>)

	expect(comp).toMatchSnapshot()
})
