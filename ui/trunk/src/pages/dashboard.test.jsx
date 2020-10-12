import React from 'react'
import { renderToString } from 'react-dom/server'
import { mount } from 'enzyme'

import TestComponent from './dashboard.jsx'

const mockedStore = require('stores/app.js')

jest.unmock('./dashboard.jsx')



describe('', () => {

    mockedStore.getApplications = () => {} 

    it('Dashboard should match snapshot', () => {
        const comp = renderToString(<TestComponent />)
        expect(comp).toMatchSnapshot()
    })

    // it('Dashboard should match snapshot', () => {
    //     const comp = mount(<TestComponent />)
        
    //     comp.setState({application:{  
    //             applicationId:1,
    //             applicationName:'IMS',
    //             createdDate:'2020-10-02T08:50:15.72',
    //             createdUser:'IMS',
    //             expiration:'2020-09-20T00:00:00',
    //             icon:'exclamation',
    //             iMatrixNumber:'1',
    //             isActive:true,
    //             isApproved:true,
    //             modifiedDate:'2020-10-02T08:50:15.72',
    //             modifiedUser:'IMS',
    //             phaseId:1,
    //             poc:'User1',
    //             statusId:1,
    //             systemOwner:'IMS',
    //         },
    //         {
    //             applicationId:2,
    //             applicationName:'IMS',
    //             createdDate:'2020-10-02T08:50:15.72',
    //             createdUser:'IMS',
    //             expiration:'2020-09-20T00:00:00',
    //             icon:'exclamation',
    //             iMatrixNumber:'1',
    //             isActive:true,
    //             isApproved:true,
    //             modifiedDate:'2020-10-02T08:50:15.72',
    //             modifiedUser:'IMS',
    //             phaseId:1,
    //             poc:'User1',
    //             statusId:1,
    //             systemOwner:'IMS',
    //         },

    //     })

    //     expect(comp).toMatchSnapshot()
    // })

    it('Dashboard should match snapshot', () => {
        const comp = mount(<TestComponent />)

        comp.setState({
            mappedPhaseStatus: false,
            application_status: 'SUCCESS',
            newRecord: true,
            showPagination: true,
            pageSize:2,
            columnHeader1: 'Priority', //Add header name
			columnHeader2: 'System ID', //Add header name
			columnHeader3: 'Name', //Add header name
			columnHeader4: 'System Owner', //Add header name
			columnHeader5: 'iMatrix Number', //Add header name
			columnHeader6: 'POC', //Add header name
			columnHeader7: 'Phase', //Add header name
			columnHeader8: 'Status', //Add header name
			columnHeader9: 'Expiration', //Add header name
			columnHeader10: 'Action',
            columnPropertyName1: 'test', columnPropertyName2: 'test',columnPropertyName3: 'test',
            columnPropertyName4: 'test',columnPropertyName5: 'test',columnPropertyName6: 'test',columnPropertyName7: 'test',
            columnPropertyName8: 'test',columnPropertyName9: 'test',columnPropertyName10: 'test',
        })
        expect(comp).toMatchSnapshot()

        comp.setState({
            mappedPhaseStatus: false,
            application_status: 'SUCCESS',
            newRecord: true,
            showPagination: true,
            pageSize:2,
            columnHeader1: 'Priority', //Add header name
			columnHeader2: 'System ID', //Add header name
			columnHeader3: 'Name', //Add header name
			columnHeader4: 'System Owner', //Add header name
			columnHeader5: 'iMatrix Number', //Add header name
			columnHeader6: 'POC', //Add header name
			columnHeader7: 'Phase', //Add header name
			columnHeader8: 'Status', //Add header name
			columnHeader9: 'Expiration', //Add header name
			columnHeader10: 'Action',
            columnPropertyName1: 'test', columnPropertyName2: 'test',columnPropertyName3: 'test',
            columnPropertyName4: 'test',columnPropertyName5: 'test',columnPropertyName6: 'test',columnPropertyName7: 'test',
            columnPropertyName8: 'test',columnPropertyName9: 'test',columnPropertyName10: 'test',
            filterRecords:[{  
                applicationId:1,
                applicationName:'IMS',
                createdDate:'2020-10-02T08:50:15.72',
                createdUser:'IMS',
                expiration:'2020-09-20T00:00:00',
                icon:'exclamation',
                iMatrixNumber:'1',
                isActive:true,
                isApproved:true,
                modifiedDate:'2020-10-02T08:50:15.72',
                modifiedUser:'IMS',
                phaseId:6,
                poc:'User1',
                statusId:1,
                systemOwner:'IMS',
            },
            {  
                applicationId:2,
                applicationName:'IMS',
                createdDate:'2020-10-02T08:50:15.72',
                createdUser:'IMS',
                expiration:'2020-09-20T00:00:00',
                icon:'exclamation',
                iMatrixNumber:'2',
                isActive:true,
                isApproved:true,
                modifiedDate:'2020-10-02T08:50:15.72',
                modifiedUser:'IMS',
                phaseId:2,
                poc:'User1',
                statusId:6,
                systemOwner:'IMS',
            },
            {  
                applicationId:1,
                applicationName:'IMS',
                createdDate:'2020-10-02T08:50:15.72',
                createdUser:'IMS',
                expiration:'2020-09-20T00:00:00',
                icon:'exclamation',
                iMatrixNumber:'3',
                isActive:true,
                isApproved:true,
                modifiedDate:'2020-10-02T08:50:15.72',
                modifiedUser:'IMS',
                phaseId:3,
                poc:'User1',
                statusId:6,
                systemOwner:'IMS',
            },]
        })
        expect(comp).toMatchSnapshot()


        comp.setState({
            mappedPhaseStatus: false,
            application_status: 'SUCCESS',
            newRecord: true,
            pageSize:1,
            columnHeader1: 'Priority', //Add header name
			columnHeader2: 'System ID', //Add header name
			columnHeader3: 'Name', //Add header name
			columnHeader4: 'System Owner', //Add header name
			columnHeader5: 'iMatrix Number', //Add header name
			columnHeader6: 'POC', //Add header name
			columnHeader7: 'Phase', //Add header name
			columnHeader8: 'Status', //Add header name
			columnHeader9: 'Expiration', //Add header name
			columnHeader10: 'Action',
            columnPropertyName1: 'test', columnPropertyName2: 'test',columnPropertyName3: 'test',
            columnPropertyName4: 'test',columnPropertyName5: 'test',columnPropertyName6: 'test',columnPropertyName7: 'test',
            columnPropertyName8: 'test',columnPropertyName9: 'test',columnPropertyName10: 'test',
            application:[{  
                applicationId:1,
                applicationName:'IMS',
                createdDate:'2020-10-02T08:50:15.72',
                createdUser:'IMS',
                expiration:'2020-09-20T00:00:00',
                icon:'exclamation',
                iMatrixNumber:'1',
                isActive:true,
                isApproved:true,
                modifiedDate:'2020-10-02T08:50:15.72',
                modifiedUser:'IMS',
                phaseId:1,
                poc:'User1',
                statusId:1,
                systemOwner:'IMS',
            },
            {  
                applicationId:2,
                applicationName:'IMS',
                createdDate:'2020-10-02T08:50:15.72',
                createdUser:'IMS',
                expiration:'2020-09-20T00:00:00',
                icon:'exclamation',
                iMatrixNumber:'2',
                isActive:true,
                isApproved:true,
                modifiedDate:'2020-10-02T08:50:15.72',
                modifiedUser:'IMS',
                phaseId:2,
                poc:'User1',
                statusId:2,
                systemOwner:'IMS',
            },
            {  
                applicationId:1,
                applicationName:'IMS',
                createdDate:'2020-10-02T08:50:15.72',
                createdUser:'IMS',
                expiration:'2020-09-20T00:00:00',
                icon:'exclamation',
                iMatrixNumber:'3',
                isActive:true,
                isApproved:true,
                modifiedDate:'2020-10-02T08:50:15.72',
                modifiedUser:'IMS',
                phaseId:3,
                poc:'User1',
                statusId:3,
                systemOwner:'IMS',
            },]
        })
        expect(comp).toMatchSnapshot()

        comp.setState({
            mappedPhaseStatus: false,
            application_status: 'SUCCESS',
            newRecord: true,
            columnHeader1: 'Priority', //Add header name
			columnHeader2: 'System ID', //Add header name
			columnHeader3: 'Name', //Add header name
			columnHeader4: 'System Owner', //Add header name
			columnHeader5: 'iMatrix Number', //Add header name
			columnHeader6: 'POC', //Add header name
			columnHeader7: 'Phase', //Add header name
			columnHeader8: 'Status', //Add header name
			columnHeader9: 'Expiration', //Add header name
			columnHeader10: 'Action',
            columnPropertyName1: 'test', columnPropertyName2: 'test',columnPropertyName3: 'test',
            columnPropertyName4: 'test',columnPropertyName5: 'test',columnPropertyName6: 'test',columnPropertyName7: 'test',
            columnPropertyName8: 'test',columnPropertyName9: 'test',columnPropertyName10: 'test',
            application:[{  
                applicationId:1,
                applicationName:'IMS',
                createdDate:'2020-10-02T08:50:15.72',
                createdUser:'IMS',
                expiration:'2020-09-20T00:00:00',
                icon:'exclamation',
                iMatrixNumber:'1',
                isActive:true,
                isApproved:true,
                modifiedDate:'2020-10-02T08:50:15.72',
                modifiedUser:'IMS',
                phaseId:1,
                poc:'User1',
                statusId:1,
                systemOwner:'IMS',
            },
            {  
                applicationId:2,
                applicationName:'IMS',
                createdDate:'2020-10-02T08:50:15.72',
                createdUser:'IMS',
                expiration:'2020-09-20T00:00:00',
                icon:'exclamation',
                iMatrixNumber:'2',
                isActive:true,
                isApproved:true,
                modifiedDate:'2020-10-02T08:50:15.72',
                modifiedUser:'IMS',
                phaseId:2,
                poc:'User1',
                statusId:2,
                systemOwner:'IMS',
            },
            {  
                applicationId:1,
                applicationName:'IMS',
                createdDate:'2020-10-02T08:50:15.72',
                createdUser:'IMS',
                expiration:'2020-09-20T00:00:00',
                icon:'exclamation',
                iMatrixNumber:'3',
                isActive:true,
                isApproved:true,
                modifiedDate:'2020-10-02T08:50:15.72',
                modifiedUser:'IMS',
                phaseId:3,
                poc:'User1',
                statusId:3,
                systemOwner:'IMS',
            },]
        })
    
        comp.setState({showAddButton: true,showPagination: true,showPriorityColumn: true,showTableFilter: true,
            showStatCards: true,showCharts: true,showLineChart: true,showBarChart: true,})
        comp.update()
        expect(comp).toMatchSnapshot()

        comp.setState({showAddButton: true,showPagination: true,showPriorityColumn: true,showTableFilter: true,
            showStatCards: true,showCharts: true,showLineChart: true,showBarChart: false,})
        comp.update()
        expect(comp).toMatchSnapshot()

        comp.setState({showAddButton: true,showPagination: true,showPriorityColumn: true,showTableFilter: true,
            showStatCards: true,showCharts: true,showLineChart: false,showBarChart: false,})
        comp.update()
        expect(comp).toMatchSnapshot()

        comp.setState({showAddButton: true,showPagination: true,showPriorityColumn: true,showTableFilter: true,
            showStatCards: true,showCharts: false,showLineChart: false,showBarChart: false,})
        comp.update()
        expect(comp).toMatchSnapshot()

        comp.setState({showAddButton: true,showPagination: true,showPriorityColumn: true,showTableFilter: true,
            showStatCards: false,showCharts: false,showLineChart: false,showBarChart: false,})
        comp.update()
        expect(comp).toMatchSnapshot()

        comp.setState({showAddButton: true,showPagination: true,showPriorityColumn: true,showTableFilter: false,
            showStatCards: false,showCharts: false,showLineChart: false,showBarChart: false,})
        comp.update()
        expect(comp).toMatchSnapshot()

        comp.setState({showAddButton: true,showPagination: true,showPriorityColumn: false,showTableFilter: false,
            showStatCards: false,showCharts: false,showLineChart: false,showBarChart: false,})
        comp.update()
        expect(comp).toMatchSnapshot()

        comp.setState({showAddButton: true,showPagination: false,showPriorityColumn: false,showTableFilter: false,
            showStatCards: false,showCharts: false,showLineChart: false,showBarChart: false,})
        comp.update()
        expect(comp).toMatchSnapshot()

        comp.setState({showAddButton: false,showPagination: false,showPriorityColumn: false,showTableFilter: false,
            showStatCards: false,showCharts: false,showLineChart: false,showBarChart: false,})
        comp.update()
        expect(comp).toMatchSnapshot()


        comp.instance().mapIdToText({applicationId: 'test', applicationName: 'test' }) 
        expect(comp.state().mappedPhaseStatus).toEqual(true)
    })

    it('test if componentDidMount is called', () => {
        const onDidMount = jest.fn()
        TestComponent.prototype.componentDidMount = onDidMount
        mount(<TestComponent/>)
        expect(onDidMount).toHaveBeenCalled()
    })

    it('match snapshot with populate state varaiables', () => {
        const component = mount(<TestComponent />)

        component.setState({columnHeader1: 'test', columnHeader2: 'test',columnHeader3: 'test',columnHeader4: 'test',
        columnHeader5: 'test',columnHeader6: 'test',columnHeader7: 'test',columnHeader8: 'test',columnHeader9: 'test',
        columnHeader10: 'test',columnPropertyName1: 'test', columnPropertyName2: 'test',columnPropertyName3: 'test',
        columnPropertyName4: 'test',columnPropertyName5: 'test',columnPropertyName6: 'test',columnPropertyName7: 'test',
        columnPropertyName8: 'test',columnPropertyName9: 'test',columnPropertyName10: 'test',})

        component.update()
        expect(component).toMatchSnapshot()
    })

    it('test hasFilterString method', () => {
        const component = mount(<TestComponent />) 
        expect(component.instance().hasFilterString()).toEqual(false)

        component.setState({filterColText1: 'test'})
        component.update()
        expect(component.instance().hasFilterString()).toEqual(true)

    })

    it('test toggleModal method', () => {
        const component = mount(<TestComponent />) 
        component.setState({showModal: true})
        component.update()
        component.instance().toggleModal() 
        component.update()
        expect(component.state().showModal).toEqual(false)

    })

    it('test handleFilterCol method', () => {
        const component = mount(<TestComponent />) 

        component.setState({showPriorityColumn: true})

        component.instance().handleFilterCol({target:{}}) 
        expect(component.state().filterColText1).toEqual("")

        component.instance().handleFilterCol({target: {id: '1', value: ''}}) 
        expect(component.state().filterColText1).toEqual("")

        component.instance().handleFilterCol({target: {id: 'column1', value: 'test' }}) 
        component.update()
        expect(component.state().filterColText1).toEqual('test')

        component.instance().handleFilterCol({target: {id: 'column1', value: '0' }}) 
        component.update()
        expect(component.state().filterColText1).toEqual('')

        component.instance().handleFilterCol({target: {id: 'column2', value: 'test' }}) 
        component.update()
        expect(component.state().filterColText2).toEqual('test')

        component.instance().handleFilterCol({target: {id: 'column3', value: 'test' }}) 
        component.update()
        expect(component.state().filterColText3).toEqual('test')

        component.instance().handleFilterCol({target: {id: 'column4', value: 'test' }}) 
        component.update()
        expect(component.state().filterColText4).toEqual('test')

        component.instance().handleFilterCol({target: {id: 'column5', value: 'test' }}) 
        component.update()
        expect(component.state().filterColText5).toEqual('test')

        component.instance().handleFilterCol({target: {id: 'column6', value: 'test' }}) 
        component.update()
        expect(component.state().filterColText6).toEqual('test')

        component.instance().handleFilterCol({target: {id: 'column7', value: 'test' }}) 
        component.update()
        expect(component.state().filterColText7).toEqual('test')

        component.instance().handleFilterCol({target: {id: 'column8', value: 'test' }}) 
        component.update()
        expect(component.state().filterColText8).toEqual('test')

        component.instance().handleFilterCol({target: {id: 'column9', value: 'test' }}) 
        component.update()
        expect(component.state().filterColText9).toEqual('test')

        component.instance().handleFilterCol({target: {id: 'column10', value: 'test' }}) 
        component.update()
        expect(component.state().filterColText9).toEqual('test')
    })

    it('test handleSaveModal method', () => {
        const component = mount(<TestComponent />) 
 
        component.instance().handleSaveModal({target: {}}) 
        expect(component.state().isSaving).toEqual(false)

        component.setState({recordField3:'test'})
        component.instance().handleSaveModal({target: {}}) 
        expect(component.state().isSaving).toEqual(false)

    })


    it('test handleAddNew method', () => {
        const component = mount(<TestComponent />) 
        component.instance().handleAddNew() 
        component.update()
        expect(component.state().recordField1).toEqual('')

    })

    it('test getStatusString method', () => {
        const component = mount(<TestComponent />) 
        expect(component.instance().getStatusString(1) ).toEqual("Never ATO'ed")
        expect(component.instance().getStatusString(2) ).toEqual("Good Standing")
        expect(component.instance().getStatusString(3) ).toEqual("Expired")
        expect(component.instance().getStatusString(4) ).toEqual("Never ATO'ed")
    })

    it('test handleDelete method', () => {
        const component = mount(<TestComponent />) 
        component.instance().handleDelete({target: {applicationId: 2}}) 
        expect(component.state().recordField1).toEqual('')

    })


    it('test handleTextChange method', () => {
        const component = mount(<TestComponent />) 
        component.instance().handleTextChange({target: {name: 'test', value: 'test' }}) 
        component.update()
        expect(component.state().test).toEqual('test')
    })

    it('test getPhaseString method', () => {
        const component = mount(<TestComponent />) 
        expect(component.instance().getPhaseString(1)).toEqual('RMF Step 1') 
        expect(component.instance().getPhaseString(2)).toEqual('RMF Step 2') 
        expect(component.instance().getPhaseString(3)).toEqual('RMF Step 3') 
        expect(component.instance().getPhaseString(4)).toEqual('RMF Step 4')
    })

    it('test getFormattedDate method', () => {
        const component = mount(<TestComponent />) 
        expect(component.instance().getFormattedDate()).toBeUndefined()
        expect(component.instance().getFormattedDate("2020-10-08THH:11:11:111111111")).toEqual('10/08/2020') 
 
    })

    it('test getFormattedInputDateField method', () => {
        const component = mount(<TestComponent />) 
        expect(component.instance().getFormattedInputDateField("2020-10-08THH:11:11:111111111")).toEqual('2020-10-08') 
 
    })

    it('test getFormattedIcon method', () => {
        const component = mount(<TestComponent />) 
        expect(component.instance().getFormattedIcon(true) ).not.toBeUndefined()
        expect(component.instance().getFormattedIcon(false) ).not.toBeUndefined()
    })

    it('test handleDoubleClick method', () => {
        const component = mount(<TestComponent />) 

        component.instance().handleDoubleClick()
        expect(component.state().recordField3).toEqual('')

        component.instance().handleDoubleClick({applicationId: 'test', applicationName: 'test' }) 
        component.update()
        expect(component.state().recordField3).toEqual('test')
    })



    // it('test createLegend method', () => {
    //     const component = mount(<TestComponent />) 
    //     expect(component.instance().createLegend(null) ).not.toBeUndefined()
    // })

    it('test mapIdToText method', () => {
        const component = mount(<TestComponent />) 
        component.instance().mapIdToText({applicationId: 'test', applicationName: 'test' }) 
        component.update()
        expect(component.state().mappedPhaseStatus).toEqual(true)
    })
 
    it('test sortTable method', () => {
        const component = mount(<TestComponent />) 

        component.setState({
            columnPropertyName1: 'priority',  
			columnPropertyName2: 'id',  
			columnPropertyName3: 'applicationName',  
			columnPropertyName4: 'systemOwner',  
			columnPropertyName5: 'iMatrixNumber',  
			columnPropertyName6: 'poc',  
			columnPropertyName7: 'phase',  
			columnPropertyName8: 'status',  
			columnPropertyName9: 'expiration'
        })

        component.instance().sortTable('priority', 'priority') 
        expect(component.state().faSortColumn1).toEqual('fa fa-sort-down')
        component.instance().sortTable('priority', 'priority') 
        expect(component.state().faSortColumn1).toEqual('fa fa-sort-up')

        component.instance().sortTable('id', 'id') 
        expect(component.state().faSortColumn2).toEqual('fa fa-sort-down')
        component.instance().sortTable('id', 'id') 
        expect(component.state().faSortColumn2).toEqual('fa fa-sort-up')

        component.instance().sortTable('applicationName', 'applicationName') 
        expect(component.state().faSortColumn3).toEqual('fa fa-sort-down')
        component.instance().sortTable('applicationName', 'applicationName') 
        expect(component.state().faSortColumn3).toEqual('fa fa-sort-up')

        component.instance().sortTable('systemOwner', 'systemOwner') 
        expect(component.state().faSortColumn4).toEqual('fa fa-sort-down')
        component.instance().sortTable('systemOwner', 'systemOwner') 
        expect(component.state().faSortColumn4).toEqual('fa fa-sort-up')

        component.instance().sortTable('iMatrixNumber', 'iMatrixNumber') 
        expect(component.state().faSortColumn5).toEqual('fa fa-sort-down')
        component.instance().sortTable('iMatrixNumber', 'iMatrixNumber') 
        expect(component.state().faSortColumn5).toEqual('fa fa-sort-up')

        component.instance().sortTable('poc', 'poc') 
        expect(component.state().faSortColumn6).toEqual('fa fa-sort-down')
        component.instance().sortTable('poc', 'poc') 
        expect(component.state().faSortColumn6).toEqual('fa fa-sort-up')

        component.instance().sortTable('phase', 'phase') 
        expect(component.state().faSortColumn7).toEqual('fa fa-sort-down')
        component.instance().sortTable('phase', 'phase') 
        expect(component.state().faSortColumn7).toEqual('fa fa-sort-up')

        component.instance().sortTable('status', 'status') 
        expect(component.state().faSortColumn8).toEqual('fa fa-sort-down')
        component.instance().sortTable('status', 'status') 
        expect(component.state().faSortColumn8).toEqual('fa fa-sort-up')

        component.instance().sortTable('expiration', 'expiration') 
        expect(component.state().faSortColumn9).toEqual('fa fa-sort-down')
        component.instance().sortTable('expiration', 'expiration') 
        expect(component.state().faSortColumn9).toEqual('fa fa-sort-up')
    })

})
