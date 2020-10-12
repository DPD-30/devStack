import React from 'react'
import { renderToString } from 'react-dom/server'


import LayoutHeaderIsClosed from './isClosed.jsx'

jest.unmock('./isClosed.jsx')


test('LayoutHeaderIsClosed matches snapshot', () => {
	const comp = renderToString(<LayoutHeaderIsClosed />)

	expect(comp).toMatchSnapshot()
})
