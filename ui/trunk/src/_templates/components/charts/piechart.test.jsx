import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesPieChart from './piechart.jsx'

jest.unmock('./piechart.jsx')


describe('', () => {
    it('PagesPieChart should match snapshot', () => {
        const comp = renderToString(<PagesPieChart isFail={false} isPass={false}/>)

        expect(comp).toMatchSnapshot()
    })
})
