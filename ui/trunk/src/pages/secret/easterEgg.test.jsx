import React from 'react'
import { renderToString } from 'react-dom/server'

import EasterEgg from './easterEgg.jsx'

jest.unmock('./easterEgg.jsx')


describe('', () => {
    it('EasterEgg should match snapshot', () => {
        const comp = renderToString(<EasterEgg />)

        expect(comp).toMatchSnapshot()
    })
})
