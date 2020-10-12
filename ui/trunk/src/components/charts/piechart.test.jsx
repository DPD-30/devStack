import React from 'react'
import { renderToString } from 'react-dom/server'
import { mount } from 'enzyme'
import PagesPieChart from './piechart.jsx'

jest.unmock('./piechart.jsx')


describe('', () => {
    it('PagesPieChart should match snapshot', () => {
        const comp = renderToString(<PagesPieChart isFail={false} isPass={false}/>)

        expect(comp).toMatchSnapshot()
    })

    it('match snapshot with populate state varaiables', () => {
        let component = mount(<PagesPieChart/>)
 
        expect(component).toMatchSnapshot()

        component = mount(<PagesPieChart 
            pieData={{}}
            datasets={{}}
        />)
 
        expect(component).toMatchSnapshot()

        component = mount(<PagesPieChart 
            pieData={{id:1}}
            datasets={{}}
        />)
 
        expect(component).toMatchSnapshot()
    })

})
