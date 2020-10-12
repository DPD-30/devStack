import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesLocalHome from 'pages/local/home.jsx'

jest.unmock('pages/local/home.jsx')


describe('', () => {
    it('PagesLocalHome should match snapshot', () => {
        const comp = renderToString(<PagesLocalHome />)

        expect(comp).toMatchSnapshot()
    })
})
