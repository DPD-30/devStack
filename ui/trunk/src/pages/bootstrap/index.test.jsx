import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { renderToString } from 'react-dom/server'


import TemplateBootstrap from './index.jsx'

jest.unmock('./index.jsx')


test('TemplateBootstrap matches snapshot', () => {
	const comp = renderToString(<Router><TemplateBootstrap /></Router>)

	expect(comp).toMatchSnapshot()
})
