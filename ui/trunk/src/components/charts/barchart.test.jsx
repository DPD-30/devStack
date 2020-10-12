import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesBarChart from './barchart.jsx'

jest.unmock('./barchart.jsx')


describe('', () => {
    it('PagesBarChart should match snapshot', () => {
        const comp = renderToString(<PagesBarChart />)

        expect(comp).toMatchSnapshot()
    })
})
