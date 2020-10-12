import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesAzureLogout from 'pages/azure/logout.jsx'

jest.unmock('pages/azure/logout.jsx')


describe('', () => {
    it('PagesAzureLogout should match snapshot', () => {
        const comp = renderToString(<PagesAzureLogout />)

        expect(comp).toMatchSnapshot()
    })
})
