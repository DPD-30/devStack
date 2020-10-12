import React from 'react'
import { renderToString } from 'react-dom/server'
import { HashRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'


import TestComponent from './index.jsx'

jest.unmock('./index.jsx')

 
describe('', () => {
    it('Login component matching snapshot', () => {
        const comp = renderToString(
            <Router>
                <TestComponent />
            </Router>
        )

        expect(comp).toMatchSnapshot()
    })
})

it ('resets', () => {
    const test = mount(
        <Router>
            <TestComponent />
        </Router>
    )
    const comp = test.find(TestComponent)
    const btnReset = comp.find('button.reset')

    btnReset.simulate('click')

    expect(comp.instance().state.loginEmail).toBe('')
    expect(comp.instance().state.loginPassword).toBe('')
    expect(comp.instance().state.formSubmitted).toBeFalsy()
})

it ('changes email field', () => {
    const test = mount(
        <Router>
            <TestComponent />
        </Router>
    )
    const comp = test.find(TestComponent)
    const inputField = comp.find('input[name="email"]')

    inputField.simulate('change', { target: { name: 'loginEmail', value: 'mock@test.com' }})

    expect(comp.instance().state.loginEmail).toBe('mock@test.com')
})

it ('calls log in function', () => {
    const test = mount(
        <Router>
            <TestComponent />
        </Router>
    )
    const comp = test.find(TestComponent)
    const btnLogin = comp.find('button.login')

    comp.setState({ email: 'mock@test.com', password: 'Test123!' })

    btnLogin.simulate('click')

    // expect(comp.instance().state.loginEmail).toBe('')
})

it ('calls log in function with blanks', () => {
    const test = mount(
        <Router>
            <TestComponent />
        </Router>
    )
    const comp = test.find(TestComponent)
    const btnLogin = comp.find('button.login')

    comp.setState({ email: '', password: '' })

    btnLogin.simulate('click')

    // expect(comp.instance().state.loginEmail).toBe('')
})

it ('show login failuire if failed', () => {
    const test = mount(
        <Router>
            <TestComponent />
        </Router>
    )
    const comp = test.find(TestComponent)

    comp.setState({ localUser_status: 'FAILURE' })

    // expect(comp.instance().state.loginEmail).toBe('')
})
