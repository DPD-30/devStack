import React from 'react'
import { renderToString } from 'react-dom/server'
import { HashRouter as Router } from 'react-router-dom'

import LayoutMenuDropdownItem from './dropdownItem.jsx'

jest.unmock('./dropdownItem.jsx')


describe('', () => {
    it('LayoutMenuDropdownItem should match snapshot', () => {
        const comp = renderToString(
            <Router>
                <LayoutMenuDropdownItem name="mockname" url="/mock" label="Mock Link" />
            </Router>
        )

        expect(comp).toMatchSnapshot()
    })
})
