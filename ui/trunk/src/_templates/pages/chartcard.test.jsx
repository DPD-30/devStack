import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesChartCard from './chartCard.jsx'

jest.unmock('./chartCard.jsx')


describe('', () => {
    it('PagesChartCard should match snapshot', () => {
        const comp = renderToString(<PagesChartCard />)

        expect(comp).toMatchSnapshot()
    })
})
