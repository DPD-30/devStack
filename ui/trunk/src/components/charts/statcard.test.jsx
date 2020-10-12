import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesStatCard from './statcard.jsx'

jest.unmock('./statcard.jsx')


describe('', () => {
    it('PagesStatCard should match snapshot', () => {
        const comp = renderToString(<PagesStatCard isFail={false} isPass={false}/>)

        expect(comp).toMatchSnapshot()
    })
})
