import React from 'react'
import { renderToString } from 'react-dom/server'
import { mount } from 'enzyme'

import PagesAppSettingsRow from './row.jsx'

jest.unmock('./row.jsx')

const props = {
    name: 'mockname',
    id: 'mockid',
    value: ''
}

describe('PagesAppSettingsRow', () => {
    it('should match snapshot', () => {
        const comp = renderToString(<PagesAppSettingsRow {...props} />)

        expect(comp).toMatchSnapshot()
    })

    it ('handles normal flow to update', () => {
        const comp = mount(<PagesAppSettingsRow {...props} />)
        const inputField = comp.find('input')
        const btnUpdate = comp.find('button.btn.btn-secondary')

        inputField.simulate('change', { target: { name: 'value', value: '123' }})

        jest.runAllTimers()

        expect(comp.instance().state.value).toBe('123')

        btnUpdate.simulate('click')

        jest.runAllTimers()

        expect(inputField.getDOMNode()).toHaveProperty('disabled')
        expect(btnUpdate.getDOMNode()).toHaveProperty('disabled')
    })

    it ('handles normal flow to delete', () => {
        const comp = mount(<PagesAppSettingsRow {...props} />)
        const btnDelete = comp.find('button.btn.btn-warning')
        
        btnDelete.simulate('click')

        jest.runAllTimers()

        expect(comp.instance().state.isDeleting).toBe(true)
    })
})
