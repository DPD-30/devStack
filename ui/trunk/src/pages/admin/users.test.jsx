import React from 'react'
import { renderToString } from 'react-dom/server'
import { mount } from 'enzyme'

import PagesAdminUsers from './users.jsx'

jest.unmock('./users.jsx')


describe('PagesAdminUsers', () => {
    it ('matches default snapshot', () => {
        const comp = mount(<PagesAdminUsers />)

        expect(comp).toMatchSnapshot()
    })

    it ('toggles the modal open and closed', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().toggleModal()

        expect(comp).toMatchSnapshot()

        comp.instance().toggleModal()

        expect(comp).toMatchSnapshot()
    })


    it ('call handleAddNew', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().handleAddNew()

        expect(comp).toMatchSnapshot()
    })

    it ('can delete', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().handleDelete()

        expect(comp).toMatchSnapshot()
    })

    it ('can change the handleTextChange', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().handleTextChange({ target: { name: 'firstName', value: 'bob' }})

        expect(comp).toMatchSnapshot()
    })

    it ('can test validation condition 1 (false)', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().getValidationResults(false)

        expect(comp).toMatchSnapshot()
    })

    it ('can test validation condition 1 (true)', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().getValidationResults(true)

        expect(comp).toMatchSnapshot()
    })

    it ('can handleSave with null event, and do nothing', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().handleSave({ target: null })

        expect(comp).toMatchSnapshot()
    })

    it ('can handleSave new', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().setState({
            newUser: true,
            firstName: 'bob',
            lastName: 'tester',
            email: 'bob@jest.com',
            userName: 'bob',
            roleId: 892374,
        })
        comp.instance().handleSave({ target: { name: 'saveButton' } })

        expect(comp).toMatchSnapshot()
    })

    it ('can handleSave update', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().setState({
            newUser: false,
            firstName: 'bob',
            lastName: 'tester',
            email: 'bob@jest.com',
            userName: 'bob',
            roleId: 892374,
        })
        comp.instance().handleSave({ target: { name: 'saveButton' } })

        expect(comp).toMatchSnapshot()
    })

    it ('can handleDoubleClick with null event', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().handleDoubleClick(null)

        expect(comp).toMatchSnapshot()
    })


    it ('can handleDoubleClick', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().handleDoubleClick({
            userId: 1,
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            userName: '',
            roleId: 1,
            createdUser: '',
            createdDate: '2020-10-04T22:12.34235-5:00',
            modifiedUser: '',
            modifiedDate: '2020-10-04T22:12.34235-5:00',
        })

        expect(comp).toMatchSnapshot()
    })

    it ('can match snapshot for LOADING', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().setState({ users_status: 'LOADING' })

        expect(comp).toMatchSnapshot()
    })

    it ('can match snapshot for FAILURE', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().setState({ users_status: 'FAILURE' })

        expect(comp).toMatchSnapshot()
    })

    it ('can click the first table row', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.setState({
            users_status: 'SUCCESS',
            users: [
                {
                    userId: 1,
                    firstName: 'first 1',
                    middleName: 'middle 1',
                    lastName: 'last 1',
                    email: 'user1@jest.com',
                    userName: 'user1',
                    roleId: 1,
                    createdDate: '2020-01-01T01:01:00000-5:00',
                    modifiedDate: '2020-01-01T01:01:00000-5:00',
                }
            ]
        })

        console.log('\n\n\n\n\n\n', comp.html())

        const tbody = comp.find('tbody')
        const firstRow = tbody.find('tr.clickableRow')

        firstRow.simulate('click')
    })

    it ('can get a role from the array', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().setState({
            roles: [
                { roleId: 1, roleTitle: 'title 1', description: 'description 1', modifiedDate: '2020-01-01T01:01:00000-5:00' },
                { roleId: 2, roleTitle: 'title 2', description: 'description 2', modifiedDate: '2020-02-02T02:02:00000-5:00' },
                { roleId: 3, roleTitle: 'title 3', description: 'description 3', modifiedDate: '2020-03-03T03:03:00000-5:00' },
            ]
        })

        comp.instance().getRoleName(1)

        expect(comp).toMatchSnapshot()
    })

    it ('can get a blank role if not loaded yet', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().setState({
            roles: []
        })

        comp.instance().getRoleName(0)

        expect(comp).toMatchSnapshot()
    })

    it ('can match snapshot for an array of users', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().setState({
            users: [
                {
                    userId: 1,
                    firstName: 'first 1',
                    middleName: 'middle 1',
                    lastName: 'last 1',
                    email: 'user1@jest.com',
                    userName: 'user1',
                    roleId: 1,
                    modifiedDate: '2020-01-01T01:01:00000-5:00',
                }
            ]
        })

        expect(comp).toMatchSnapshot()
    })

    it ('can match snapshot for nil users', () => {
        const comp = mount(<PagesAdminUsers />)

        comp.instance().setState({ users: null })

        expect(comp).toMatchSnapshot()
    })
})
