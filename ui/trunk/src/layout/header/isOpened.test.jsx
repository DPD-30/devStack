import React from 'react'
import { renderToString } from 'react-dom/server'


import LayoutHeaderIsOpened from './isOpened.jsx'

jest.unmock('./isOpened.jsx')


test('LayoutHeaderIsOpened matches snapshot', () => {
	const comp = renderToString(<LayoutHeaderIsOpened />)

	expect(comp).toMatchSnapshot()
})
