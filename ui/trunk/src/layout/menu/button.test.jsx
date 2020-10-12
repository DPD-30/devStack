import React from 'react'
import { renderToString } from 'react-dom/server'
import { HashRouter as Router } from 'react-router-dom'

import LayoutMenuButton from './button.jsx'

jest.unmock('./button.jsx')


describe('', () => {
    it('LayoutMenuButton should match snapshot', () => {
        const comp = renderToString(
            <Router>
                <LayoutMenuButton
                    label="MockLabel"
                    url="/mocked"
                    name="mockedMenuButton"
                />
            </Router>
        )

        expect(comp).toMatchSnapshot()
    })
    it('LayoutMenuButton should match snapshot for active item', () => {
        const comp = renderToString(
            <Router>
                <LayoutMenuButton
                    label="Home"
                    url="/home"
                    name="home"
                />
            </Router>
        )

        expect(comp).toMatchSnapshot()
    })
})
