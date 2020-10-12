import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesReports from './reports.jsx'

jest.unmock('./reports.jsx')


describe('', () => {
    it('PagesReports should match snapshot', () => {
        const comp = renderToString(<PagesReports isFail={false} isPass={false}/>)

        expect(comp).toMatchSnapshot()
    })
})
