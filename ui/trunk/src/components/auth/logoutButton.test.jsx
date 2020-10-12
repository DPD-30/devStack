import React from 'react'
import { renderToString } from 'react-dom/server'


import ComponentAuthLogoutButton from './logoutButton.jsx'

jest.unmock('./logoutButton.jsx')


test('ComponentAuthLogoutButton matches snapshot', () => {
	const comp = renderToString(<ComponentAuthLogoutButton />)

	expect(comp).toMatchSnapshot()
})
