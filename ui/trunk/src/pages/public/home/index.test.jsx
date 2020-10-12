import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesHome from 'pages/public/home/index.jsx'

jest.unmock('pages/public/home/index.jsx')


describe('', () => {
    it('PagesHome should match snapshot', () => {
        const comp = renderToString(<PagesHome />)

        expect(comp).toMatchSnapshot()
    })
})
