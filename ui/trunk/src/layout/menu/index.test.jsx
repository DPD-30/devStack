import React from 'react'
import { renderToString } from 'react-dom/server'

import LayoutMenuIndex from './index.jsx'

jest.unmock('./index.jsx')


describe('', () => {
    it('LayoutMenuIndex should match snapshot', () => {
        const comp = renderToString(<LayoutMenuIndex />)

        expect(comp).toMatchSnapshot()
    })
})
