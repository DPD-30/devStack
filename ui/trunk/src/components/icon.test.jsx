import React from 'react'
import { renderToString } from 'react-dom/server'


import TestComponent from './icon.jsx'

jest.unmock('./icon.jsx')


test('Font Awesome Icon matches snapshot for generic', () => {
	const comp = renderToString(<TestComponent name="foo" />)

	expect(comp).toMatchSnapshot()
})
test('Font Awesome Icon matches snapshot for special case hour-glass-half - f252', () => {
	const comp = renderToString(<TestComponent name="hour-glass-half - f252" />)

	expect(comp).toMatchSnapshot()
})
test('Font Awesome Icon matches snapshot for special case exclamation point - f12a', () => {
	const comp = renderToString(<TestComponent name="exclamation point - f12a" />)

	expect(comp).toMatchSnapshot()
})
