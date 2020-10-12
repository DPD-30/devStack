import React from 'react'
import { renderToString } from 'react-dom/server'

import PagesAppLogin from './login.jsx'

jest.unmock('./login.jsx')


describe('Azure Login ', () => {
    it('Unauthorized should match snapshot', () => {
        const comp = renderToString(<PagesAppLogin />)

        expect(comp).toMatchSnapshot()
    })
})
