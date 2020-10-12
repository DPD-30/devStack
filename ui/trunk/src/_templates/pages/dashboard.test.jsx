import React from 'react'
import { renderToString } from 'react-dom/server'

import TestComponent from './dashboard.jsx'

jest.unmock('./dashboard.jsx')


describe('', () => {
    it('Dashboard should match snapshot', () => {
        const comp = renderToString(<TestComponent />)

        expect(comp).toMatchSnapshot()
    })
})
