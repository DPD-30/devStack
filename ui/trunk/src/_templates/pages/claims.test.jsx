import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesClaims from './claims.jsx'

jest.unmock('./claims.jsx')


describe('', () => {
    it('PagesClaims should match snapshot', () => {
        const comp = renderToString(<PagesClaims />)

        expect(comp).toMatchSnapshot()
    })
})
