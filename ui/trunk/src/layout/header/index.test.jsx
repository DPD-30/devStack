import React from 'react'
import { renderToString } from 'react-dom/server'


import LayoutHeader from './index.jsx'

jest.unmock('./index.jsx')


test('LayoutHeader matches snapshot', () => {
	const comp = renderToString(<LayoutHeader />)

	expect(comp).toMatchSnapshot()
})
