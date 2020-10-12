import React from 'react'
import { renderToString } from 'react-dom/server'


import NotFound from './notFound.jsx'

jest.unmock('./notFound.jsx')


test('Not found message', () => {
	const comp = renderToString(<NotFound />)

	expect(comp).toMatchSnapshot()
})
