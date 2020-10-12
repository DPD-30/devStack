import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesAzureHome from 'pages/azure/home.jsx'

jest.unmock('pages/azure/home.jsx')


describe('', () => {
    it('PagesAzureHome should match snapshot', () => {
        const comp = renderToString(<PagesAzureHome />)

        expect(comp).toMatchSnapshot()
    })
})
