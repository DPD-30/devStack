import React from 'react'
import { renderToString } from 'react-dom/server'
import { mount } from 'enzyme'

import PagesAdminRoles from './roles.jsx'

jest.unmock('./roles.jsx')


describe('PagesAdminRoles', () => {
    it ('opens modal to add new', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().handleAddNew()

        expect(comp).toMatchSnapshot()
    })

    it ('can delete', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().handleDelete()

        expect(comp).toMatchSnapshot()
    })

    it ('can change the ID', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().handleIDChange({ target: { value: 23234 }})

        expect(comp).toMatchSnapshot()
    })

    it ('can change the title', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().handleRoleTitleChange ({ target: { value: 'new title' }})

        expect(comp).toMatchSnapshot()
    })

    it ('can change the description', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().handeDescriptionChange({ target: { value: 'the description' }})

        expect(comp).toMatchSnapshot()
    })

    it ('can test validation condition 1 (false)', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().getValidationResults(false)

        expect(comp).toMatchSnapshot()
    })

    it ('can test validation condition 1 (true)', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().getValidationResults(true)

        expect(comp).toMatchSnapshot()
    })

    it ('can test validation condition 2 (true)', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().setState({
            roleTitle: 'mock title',
            description: 'mock description',
        })
        comp.instance().getValidationResults(true)

        expect(comp).toMatchSnapshot()
    })

    it ('can handleSave with null event, and do nothing', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().handleSave({ target: null })

        expect(comp).toMatchSnapshot()
    })

    it ('can handleSave new', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().setState({
            roleTitle: 'mock title',
            description: 'mock description',
            newRole: true
        })
        comp.instance().handleSave({ target: { name: 'saveButton' } })

        expect(comp).toMatchSnapshot()
    })

    it ('can handleSave new and defaulted null id', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().setState({
            roleId: null,
            roleTitle: 'mock title',
            description: 'mock description',
            newRole: true
        })
        comp.instance().handleSave({ target: { name: 'saveButton' } })

        expect(comp).toMatchSnapshot()
    })

    it ('can handleSave new, failing validation', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().setState({
            roleTitle: '',
            description: 'mock description',
            newRole: true
        })
        comp.instance().handleSave({ target: { name: 'saveButton' } })

        expect(comp).toMatchSnapshot()
    })

    it ('can handleSave update', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().setState({
            roleTitle: 'mock title',
            description: 'mock description',
            newRole: false
        })
        comp.instance().handleSave({ target: { name: 'saveButton' } })

        expect(comp).toMatchSnapshot()
    })

    it ('can handleDoubleClick with null event', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().handleDoubleClick(null)

        expect(comp).toMatchSnapshot()
    })


    it ('can handleDoubleClick', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().handleDoubleClick({
            roleId: 1234234,
            createdDate: '2020-10-04T22:12.34235-5:00'
        })

        expect(comp).toMatchSnapshot()
    })

    it ('can show modified user info in the modal', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().handleDoubleClick({
            showModal: true,
            createdUser: 'Mock User 1',
            createdDate: '2020-10-04T22:12.34235-5:00',
            modifiedUser: 'Mock User 1',
            modifiedDate: '2020-10-04T22:12.34235-5:00',
            newRole: false,
        })

        expect(comp).toMatchSnapshot()
    })

    it ('can handle null created date (new / unsaved)', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().handleDoubleClick({
            showModal: true,
            createdUser: '',
            createdDate: null,
            newRole: false,
        })

        expect(comp).toMatchSnapshot()
    })

    it ('can match snapshot for LOADING', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().setState({ roles_status: 'LOADING' })

        expect(comp).toMatchSnapshot()
    })

    it ('can match snapshot for FAILURE', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().setState({ roles_status: 'FAILURE' })

        expect(comp).toMatchSnapshot()
    })

    it ('can match snapshot for SUCCESS', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().setState({ roles_status: 'SUCCESS' })

        expect(comp).toMatchSnapshot()
    })

    it ('can match snapshot for an array of roles', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().setState({
            roles: [
                { roleId: 1, roleTitle: 'title 1', description: 'description 1', modifiedDate: '2020-01-01T01:01:00000-5:00' },
                { roleId: 2, roleTitle: 'title 2', description: 'description 2', modifiedDate: '2020-02-02T02:02:00000-5:00' },
                { roleId: 3, roleTitle: 'title 3', description: 'description 3', modifiedDate: '2020-03-03T03:03:00000-5:00' },
            ]
        })

        expect(comp).toMatchSnapshot()
    })

    it ('can match snapshot for nil roles', () => {
        const comp = mount(<PagesAdminRoles />)

        comp.instance().setState({ roles: null })

        expect(comp).toMatchSnapshot()
    })
})
