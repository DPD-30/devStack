import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesCases from './cases.jsx'

jest.unmock('./cases.jsx')


describe('', () => {
    it('PagesCases should match snapshot', () => {
        const comp = renderToString(<PagesCases />)

        expect(comp).toMatchSnapshot()
    })
})
