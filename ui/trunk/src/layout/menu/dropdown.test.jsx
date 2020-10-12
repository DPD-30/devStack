import React from 'react'
import { renderToString } from 'react-dom/server'

import LayoutMenuDropdown from './dropdown.jsx'

jest.unmock('./dropdown.jsx')


describe('', () => {
    it('LayoutMenuDropdown should match snapshot', () => {
        const comp = renderToString(
            <LayoutMenuDropdown
                label="Mock label"
            >
                mock children
            </LayoutMenuDropdown>
        )

        expect(comp).toMatchSnapshot()
    })
})
