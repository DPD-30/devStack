import React from 'react'
import { renderToString } from 'react-dom/server'


import LayoutHeaderTransition from './transition.jsx'

jest.unmock('./transition.jsx')


test('LayoutHeaderTransition matches snapshot', () => {
	const comp = renderToString(<LayoutHeaderTransition />)

	expect(comp).toMatchSnapshot()
})
