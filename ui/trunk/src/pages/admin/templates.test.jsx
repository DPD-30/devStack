import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesAdminTemplates from './templates.jsx'

jest.unmock('./templates.jsx')


describe('', () => {
    it('PagesAdminTemplates should match snapshot', () => {
        const comp = renderToString(<PagesAdminTemplates />)

        expect(comp).toMatchSnapshot()
    })
})
