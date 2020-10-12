import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesAdminCards from './cards.jsx'

jest.unmock('./cards.jsx')


describe('', () => {
    it('PagesAdminCards should match snapshot', () => {
        const comp = renderToString(<PagesAdminCards />)

        expect(comp).toMatchSnapshot()
    })
})
