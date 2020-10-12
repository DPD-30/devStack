import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesLocalLogout from 'pages/local/logout.jsx'

jest.unmock('pages/local/logout.jsx')


describe('', () => {
    it('PagesLocalLogout should match snapshot', () => {
        const comp = renderToString(<PagesLocalLogout />)

        expect(comp).toMatchSnapshot()
    })
})
