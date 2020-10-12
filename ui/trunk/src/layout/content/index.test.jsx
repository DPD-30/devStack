import React from 'react'
import { renderToString } from 'react-dom/server'
import { mount } from 'enzyme'


import LayoutContent from 'layout/content/index.jsx'

jest.unmock('layout/content/index.jsx')


test('LayoutContent matches snapshot', () => {
	const comp = renderToString(<LayoutContent />)

	expect(comp).toMatchSnapshot()
})

test ('LayoutContent shows error if swagger fails', () => {
    const comp = mount(<LayoutContent />)

	comp.setState({ swagger: 'ERROR' })

	comp.update()

	expect(comp.text().indexOf('Unable to connect to the API!') >= 0).toBeTruthy()
})
