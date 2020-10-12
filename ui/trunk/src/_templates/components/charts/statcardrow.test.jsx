import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesStatCard from './statcardrow.jsx'

jest.unmock('./statcardrow.jsx')


describe('', () => {
    it('PagesStatCard should match snapshotrow', () => {
        const comp = renderToString(<PagesStatCard isFail={false} isPass={false}/>)

        expect(comp).toMatchSnapshot()
    })
})
