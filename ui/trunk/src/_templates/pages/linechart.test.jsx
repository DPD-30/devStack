import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesLinechart from './linechart.jsx'

jest.unmock('./linechart.jsx')


describe('', () => {
    it('PagesLinechart should match snapshot', () => {
        const comp = renderToString(<PagesLinechart isFail={false} isPass={false}/>)

        expect(comp).toMatchSnapshot()
    })
})
