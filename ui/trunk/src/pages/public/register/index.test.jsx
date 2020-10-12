import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesRegister from 'pages/public/register/index.jsx'

jest.unmock('pages/public/register/index.jsx')


describe('', () => {
    it('PagesRegister should match snapshot', () => {
        const comp = renderToString(<PagesRegister />)

        expect(comp).toMatchSnapshot()
    })
})
