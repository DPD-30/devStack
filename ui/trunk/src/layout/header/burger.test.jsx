import React from 'react'
import { renderToString } from 'react-dom/server'


import LayoutBurger from './burger.jsx'

jest.unmock('./burger.jsx')


test('LayoutBurger matches snapshot', () => {
	const comp = renderToString(<LayoutBurger />)

	expect(comp).toMatchSnapshot()
})
