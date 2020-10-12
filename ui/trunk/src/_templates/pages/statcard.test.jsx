import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesStatCard from 'pages/statcard.jsx'

jest.unmock('pages/statcard.jsx')


describe('', () => {
    it('PagesStatCard should match snapshot', () => {
        const comp = renderToString(<PagesStatCard isFail={false} isPass={false}/>)

        expect(comp).toMatchSnapshot()
    })
})
