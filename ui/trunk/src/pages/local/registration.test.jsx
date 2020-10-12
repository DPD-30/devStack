import React from 'react'
import { mount } from 'enzyme'
import { HashRouter as Router } from 'react-router-dom'

import TestComponent from './registration.jsx'

jest.unmock('./registration.jsx')


describe('Registration', () => {
    it('should match snapshot', () => {
        const test = mount(<Router><TestComponent /></Router>)
        const comp = test.find(TestComponent)

        expect(comp).toMatchSnapshot()
    })

    it('click reset button', () => {
        const test = mount(<Router><TestComponent /></Router>)
        const comp = test.find(TestComponent)
        const testButton = comp.find('button.reset')

        testButton.simulate('click')

        expect(comp).toMatchSnapshot()
    })

    it('click register button', () => {
        const test = mount(<Router><TestComponent /></Router>)
        const comp = test.find(TestComponent)
        const testButton = comp.find('button.register')

        testButton.simulate('click')

        expect(comp).toMatchSnapshot()
    })

    it('can change confirm password field as good', () => {
        const test = mount(<Router><TestComponent /></Router>)
        const comp = test.find(TestComponent)
        const testInputField = comp.find('input[name="confirmPassword"]')

        testInputField.simulate('change', { target: { name: 'confirmPassword', value: 'Test123!' }})

        expect(comp).toMatchSnapshot()
    })

    it('can change confirm password field as bad', () => {
        const test = mount(<Router><TestComponent /></Router>)
        const comp = test.find(TestComponent)
        const testInputField = comp.find('input[name="confirmPassword"]')

        testInputField.simulate('change', { target: { name: 'confirmPassword', value: 'abc!' }})

        expect(comp).toMatchSnapshot()
    })

    it('can change confirm password field as bad (no lowers)', () => {
        const test = mount(<Router><TestComponent /></Router>)
        const comp = test.find(TestComponent)
        const testInputField = comp.find('input[name="confirmPassword"]')

        testInputField.simulate('change', { target: { name: 'confirmPassword', value: '123!' }})

        expect(comp).toMatchSnapshot()
    })

    it('can change confirm password field as bad (no digits)', () => {
        const test = mount(<Router><TestComponent /></Router>)
        const comp = test.find(TestComponent)
        const testInputField = comp.find('input[name="confirmPassword"]')

        testInputField.simulate('change', { target: { name: 'confirmPassword', value: 'AA!' }})

        expect(comp).toMatchSnapshot()
    })

    it('can change confirm password field as bad (no special chars)', () => {
        const test = mount(<Router><TestComponent /></Router>)
        const comp = test.find(TestComponent)

        comp.instance().handlePassword({ target: { name: 'confirmPassword', value: 'aaaa' }})

        expect(comp).toMatchSnapshot()
    })

    it('can change confirm password field as bad (no special chars)', () => {
        const test = mount(<Router><TestComponent /></Router>)
        const comp = test.find(TestComponent)

        comp.setState({
            firstName: 'MockFirst',
            lastName: 'MockLast',
            email: 'mock@jest.com',
            password: 'Test123!',
            confirmPassword: 'Test123!',
            validPassword: true,
            mismatch: true,
        })

        comp.instance().onClickRegister()

        expect(comp).toMatchSnapshot()
    })

    it('can change confirm password field as good and register', () => {
        const test = mount(<Router><TestComponent /></Router>)
        const comp = test.find(TestComponent)

        comp.setState({
            firstName: 'MockFirst',
            lastName: 'MockLast',
            email: 'mock@jest.com',
            password: 'Test123!',
            confirmPassword: 'Test123!',
            validPassword: false,
            mismatch: false,
        })

        comp.instance().onClickRegister()

        expect(comp).toMatchSnapshot()
    })

    it('can handle text change', () => {
        const test = mount(<Router><TestComponent /></Router>)
        const comp = test.find(TestComponent)
        
        comp.instance().handleTextChange({ target: { name: 'firstName', value: 'MockFirst' }})

        expect(comp.instance().state.firstName).toEqual('MockFirst')
    })

    it('can validate if everything is good', () => {
        const test = mount(<Router><TestComponent /></Router>)
        const comp = test.find(TestComponent)

        comp.setState({
            firstName: 'MockFirst',
            lastName: 'MockLast',
            email: 'mock@jest.com',
            password: 'Test123!',
            confirmPassword: 'Test123!',
        })

        expect(comp).toMatchSnapshot()
    })
})
