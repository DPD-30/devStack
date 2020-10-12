import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'

import PagesLocalLogin from 'pages/local/login.jsx'

jest.unmock('pages/local/login.jsx')


describe('PagesLocalLogin', () => {
    it('should match snapshot authenticated', () => {
        const test = mount(
            <Router>
                <PagesLocalLogin />
            </Router>
        )
        const comp = test.find(PagesLocalLogin)
    
        comp.setState({ isAuthenticatedLocal: true })

        expect(comp).toMatchSnapshot()
    })

    it('should match snapshot not authenticated', () => {
        const test = mount(
            <Router>
                <PagesLocalLogin />
            </Router>
        )
        const comp = test.find(PagesLocalLogin)
    
        comp.setState({ isAuthenticatedLocal: false })

        expect(comp).toMatchSnapshot()
    })
})
