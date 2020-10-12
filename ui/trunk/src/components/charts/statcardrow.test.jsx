import React from 'react'
import { renderToString } from 'react-dom/server'
import { mount } from 'enzyme'
import PagesStatCard from './statcardrow.jsx'

jest.unmock('./statcardrow.jsx')


describe('', () => {
    it('PagesStatCard should match snapshotrow', () => {
        const comp = renderToString(<PagesStatCard isFail={false} isPass={false}/>)

        expect(comp).toMatchSnapshot()
    })

    it('match snapshot with populate state varaiables', () => {
        let component = mount(<PagesStatCard/>)
 
        expect(component).toMatchSnapshot()

        component = mount(<PagesStatCard 
            iconColor1="#FFF"
            iconColor2="#FFF"
            iconColor3="#FFF"
            iconColor4="#FFF"
            iconName1="test"
            iconName2="test"
            iconName3="test"
            iconName4="test"
            statsText1="test"
            statsText2="test"
            statsText3="test"
            statsText4="test"
            statsValue1="test"
            statsValue2="test"
            statsValue3="test"
            statsValue4="test"
            statsIcon1="test"
            statsIcon2="test"
            statsIcon3="test"
            statsIcon4="test"
            statsIconText1="test"
            statsIconText2="test"
            statsIconText3="test"
            statsIconText4="test"
        />)
 
        expect(component).toMatchSnapshot()
    })

})

 