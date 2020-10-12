import React from 'react'
import { renderToString } from 'react-dom/server'
import { HashRouter as Router } from 'react-router-dom'


import TestComponent from './header.jsx'

jest.unmock('./header.jsx')


test('TableHeader matches snapshot without subheadertext', () => {
	const comp = renderToString(
        <Router>
            <TestComponent headerText="Mock Header Text" buttonText="Mock Button Text" buttonLink="/mockURL" />
        </Router>
    )

	expect(comp).toMatchSnapshot()
})

test('TableHeader matches snapshot with subheadertext', () => {
	const comp = renderToString(
        <Router>
            <TestComponent headerText="Mock Header Text" headerSubText="And more" buttonText="Mock Button Text" buttonLink="/mockURL" />
        </Router>
    )

	expect(comp).toMatchSnapshot()
})

test('TableHeader matches snapshot with a click handler', () => {
	const comp = renderToString(
        <Router>
            <TestComponent headerText="Mock Header Text" buttonText="Mock Button Text" buttonClick={jest.fn()} />
        </Router>
    )

	expect(comp).toMatchSnapshot()
})
