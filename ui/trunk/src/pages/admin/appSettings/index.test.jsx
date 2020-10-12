import React from 'react'
import { renderToString } from 'react-dom/server'
import { mount } from 'enzyme'

import PagesAppSettings from './index.jsx'

jest.unmock('./index.jsx')


// need enzyme mount for it to call the componentDidMount() life cycle
test ('PagesAppSettings match snapshot', () => {
    const comp = mount(<PagesAppSettings />)

    expect(comp).toMatchSnapshot()
})


// need enzyme mount for it to call the componentDidMount() life cycle
test ('PagesAppSettings add new entry', () => {
    const comp = mount(<PagesAppSettings />)
    const addButton = comp.find('button')

    addButton.simulate('click')

	// expect()
})


test ('PagesAppSettings match snapshot', () => {
    const comp = mount(<PagesAppSettings />)

    comp.setState({ appSettings: [], appSettings_status: 'LOADING' })

	expect(comp.text().indexOf('Loading appSettings...') >= 0).toBeTruthy()
})


test ('PagesAppSettings match snapshot', () => {
    const comp = mount(<PagesAppSettings />)

    comp.setState({ appSettings: [], appSettings_status: 'FAILURE' })

	expect(comp.text().indexOf('Failed to load the appSettings!') >= 0).toBeTruthy()
})
