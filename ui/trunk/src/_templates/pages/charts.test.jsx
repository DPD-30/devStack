import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesAdminCharts from './charts.jsx'

jest.unmock('./charts.jsx')


describe('', () => {
    it('PagesAdminCharts should match snapshot', () => {
        const comp = renderToString(<PagesAdminCharts />)

        expect(comp).toMatchSnapshot()
    })
})
