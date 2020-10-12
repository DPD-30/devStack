import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesBarChart from 'pages/barchart.jsx'

jest.unmock('pages/barchart.jsx')


describe('', () => {
    it('PagesBarChart should match snapshot', () => {
        const comp = renderToString(<PagesBarChart />)

        expect(comp).toMatchSnapshot()
    })
})
