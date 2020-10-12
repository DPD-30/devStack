import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { renderToString } from 'react-dom/server'


import ComponentAuthLoginButton from './loginButton.jsx'

jest.unmock('./loginButton.jsx')


test('ComponentAuthLoginButton matches snapshot', () => {
	const comp = renderToString(<Router><ComponentAuthLoginButton /></Router>)

	expect(comp).toMatchSnapshot()
})
