import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
import { Bar, Pie, Line } from 'react-chartjs-2'
import moment from 'moment'
import {Table, Button, ButtonGroup, Tooltip, Card, CardBody, CardTitle} from 'reactstrap'

import AppStore from 'stores/app.js'
//import AppActions from 'actions/app.js'
// npm install react-chartjs-2
export default class PagesCharts extends Reflux.Component {

    constructor(props){
        super(props)

        
        const colors = ['red','blue','green']
        const pieChartLabel1 = ['Students Passed','Faculty/Staff Passed','Visitors/Contractors/Vendors Passed']
        const pieChartLabel2 = ['Students Failed','Faculty/Staff Failed','Visitors/Contractors/Vendors Failed']


        this.state = {
            records: [],
            data_status: '',
            passedTallyView: true,
            showDaily: false,
            showBarChart: true,
            selectedDate: '',
            setToolTipOpen: false,
            colors: colors,
            pieChartLabel1: pieChartLabel1,
            pieChartLabel2: pieChartLabel2,
            chart: {
                labels:[],
                piePassedChart: [
                    {
                        label: pieChartLabel1,
                        datasets: [{
                            data:[],
                            backgroundColor:colors
                        }]
                    }
                ],
                pieFailedChart: [
                    {
                        label: pieChartLabel2,
                        datasets: [{
                            data:[],
                            backgroundColor:colors
                        }]
                    }
                ]
    
            }
        }

        this.store = AppStore
        this.storeKey = []


        this.togglePassFailView = this.togglePassFailView.bind(this)
        this.handleSelectHeader = this.handleSelectHeader.bind(this)
        this.toogleToolTipOpen = this.toogleToolTipOpen.bind(this)
        this.toggleCharts = this.toggleCharts.bind(this)
        this.getChartButtonText = this.getChartButtonText.bind(this)
    }

    componentDidMount() {
        //ApActions.GetTallies()

        this.setState({data_status: 'SUCCESS', records: [
			{date: '2020-09-09T08:43:15.2179507-04:00', student_pass: 10, student_fail: 6, faculty_pass: 16, faculty_fail: 3, visitor_pass: 12, visitor_fail: 5},
			{date: '2020-09-10T07:43:15.2179507-04:00', student_pass: 17, student_fail: 7, faculty_pass: 8, faculty_fail: 5, visitor_pass: 17, visitor_fail: 3},
			{date: '2020-09-11T06:43:15.2179507-04:00', student_pass: 15, student_fail: 4, faculty_pass: 8, faculty_fail: 4, visitor_pass: 15, visitor_fail: 2},
			{date: '2020-09-12T05:43:15.2179507-04:00', student_pass: 13, student_fail: 3, faculty_pass: 6, faculty_fail: 6, visitor_pass: 13, visitor_fail: 1},
            {date: '2020-09-13T04:43:15.2179507-04:00', student_pass: 18, student_fail: 5, faculty_pass: 8, faculty_fail: 7, visitor_pass: 15, visitor_fail: 3},
            {date: '2020-09-14T04:43:15.2179507-04:00', student_pass: 16, student_fail: 7, faculty_pass: 9, faculty_fail: 8, visitor_pass: 12, visitor_fail: 5},
            {date: '2020-09-15T04:43:15.2179507-04:00', student_pass: 17, student_fail: 8, faculty_pass: 11, faculty_fail: 3, visitor_pass: 18, visitor_fail: 8},
            {date: '2020-09-16T04:43:15.2179507-04:00', student_pass: 18, student_fail: 2, faculty_pass: 12, faculty_fail: 2, visitor_pass: 19, visitor_fail: 5},
            {date: '2020-09-17T04:43:15.2179507-04:00', student_pass: 13, student_fail: 4, faculty_pass: 6, faculty_fail: 6, visitor_pass: 15, visitor_fail: 1},
            {date: '2020-09-18T04:43:15.2179507-04:00', student_pass: 12, student_fail: 6, faculty_pass: 8, faculty_fail: 8, visitor_pass: 16, visitor_fail: 3},
            {date: '2020-09-19T04:43:15.2179507-04:00', student_pass: 19, student_fail: 3, faculty_pass: 9, faculty_fail: 2, visitor_pass: 17, visitor_fail: 5},
            {date: '2020-09-20T04:43:15.2179507-04:00', student_pass: 13, student_fail: 6, faculty_pass: 7, faculty_fail: 8, visitor_pass: 18, visitor_fail: 8},
            {date: '2020-09-21T04:43:15.2179507-04:00', student_pass: 16, student_fail: 8, faculty_pass: 6, faculty_fail: 2, visitor_pass: 19, visitor_fail: 3},
            {date: '2020-09-22T04:43:15.2179507-04:00', student_pass: 18, student_fail: 9, faculty_pass: 6, faculty_fail: 7, visitor_pass: 12, visitor_fail: 2},
        ]})
    }

    togglePassFailView() {
        this.setState({passedTallyView: !this.state.passedTallyView, showDaily: false})
    }

    handleSelectHeader(event) {
        if (event != null && event.target != null) {
            this.setState({selectedDate: event.target.textContent, showDaily: true})
        }
    }

    toogleToolTipOpen() {
        this.setState({setToolTipOpen: !this.state.setToolTipOpen})
    }
    
    toggleCharts() {
        this.setState({showBarChart: !this.state.showBarChart})
    }

    getChartButtonText() {
        return this.state.showBarChart ? 'Show Line Chart' : 'Show Bar Chart'
    }

    render() {
        
        // const records = [
		// 	{date: '2020-09-09T08:43:15.2179507-04:00', student_pass: 10, student_fail: 6, faculty_pass: 16, faculty_fail: 3, visitor_pass: 12, visitor_fail: 5},
		// 	{date: '2020-09-10T07:43:15.2179507-04:00', student_pass: 17, student_fail: 7, faculty_pass: 8, faculty_fail: 5, visitor_pass: 17, visitor_fail: 3},
		// 	{date: '2020-09-11T06:43:15.2179507-04:00', student_pass: 15, student_fail: 4, faculty_pass: 8, faculty_fail: 4, visitor_pass: 15, visitor_fail: 2},
		// 	{date: '2020-09-12T05:43:15.2179507-04:00', student_pass: 13, student_fail: 3, faculty_pass: 6, faculty_fail: 6, visitor_pass: 13, visitor_fail: 1},
        //     {date: '2020-09-13T04:43:15.2179507-04:00', student_pass: 18, student_fail: 5, faculty_pass: 8, faculty_fail: 7, visitor_pass: 15, visitor_fail: 3},
        //     {date: '2020-09-14T04:43:15.2179507-04:00', student_pass: 16, student_fail: 7, faculty_pass: 9, faculty_fail: 8, visitor_pass: 12, visitor_fail: 5},
        //     {date: '2020-09-15T04:43:15.2179507-04:00', student_pass: 17, student_fail: 8, faculty_pass: 11, faculty_fail: 3, visitor_pass: 18, visitor_fail: 8},
        //     {date: '2020-09-16T04:43:15.2179507-04:00', student_pass: 18, student_fail: 2, faculty_pass: 12, faculty_fail: 2, visitor_pass: 19, visitor_fail: 5},
        //     {date: '2020-09-17T04:43:15.2179507-04:00', student_pass: 13, student_fail: 4, faculty_pass: 6, faculty_fail: 6, visitor_pass: 15, visitor_fail: 1},
        //     {date: '2020-09-18T04:43:15.2179507-04:00', student_pass: 12, student_fail: 6, faculty_pass: 8, faculty_fail: 8, visitor_pass: 16, visitor_fail: 3},
        //     {date: '2020-09-19T04:43:15.2179507-04:00', student_pass: 19, student_fail: 3, faculty_pass: 9, faculty_fail: 2, visitor_pass: 17, visitor_fail: 5},
        //     {date: '2020-09-20T04:43:15.2179507-04:00', student_pass: 13, student_fail: 6, faculty_pass: 7, faculty_fail: 8, visitor_pass: 18, visitor_fail: 8},
        //     {date: '2020-09-21T04:43:15.2179507-04:00', student_pass: 16, student_fail: 8, faculty_pass: 6, faculty_fail: 2, visitor_pass: 19, visitor_fail: 3},
        //     {date: '2020-09-22T04:43:15.2179507-04:00', student_pass: 18, student_fail: 9, faculty_pass: 6, faculty_fail: 7, visitor_pass: 12, visitor_fail: 2},
        // ]

        //**********************************************************************************************************************************
        //**********************************************************************************************************************************
        // LABEL CONSTANTS
        //**********************************************************************************************************************************
        //**********************************************************************************************************************************
        const status = this.state.data_status
        const pageTitle1 = 'Passed Tally Report'
        const pageTitle2 = 'Failed Tally Report'
        const buttonLabel1 = 'Passed Tally'
        const buttonLabel2 = 'Failed Tally'
        const barChartLabel1a = 'Students Passed' 
        const barChartLabel1b = 'Students Failed'
        const barChartLabel2a = 'Faculty/Staff Passed' 
        const barChartLabel2b = 'Faculty/Staff Failed'
        const barChartLabel3a = 'Visitors Passed' 
        const barChartLabel3b = 'Visitors Failed'




        //**********************************************************************************************************************************
        //**********************************************************************************************************************************
        // JSON DATA OBJECT MAPPING
        //**********************************************************************************************************************************
        //**********************************************************************************************************************************
        const mappedDates = this.state.records.map(m => moment(m.date, "YYYY-MM-DDTHH:mm:ss:SSSSSSSZZ").format("MM/DD"))
        const mappedStudentPass = this.state.records.map(m => m.student_pass)
        const mappedStudentFailed = this.state.records.map(m => m.student_fail)
        const mappedFacultyPass = this.state.records.map(m => m.faculty_pass)
        const mappedFacultyFailed = this.state.records.map(m => m.faculty_fail)
        const mappedVisitorPass = this.state.records.map(m => m.visitor_pass)
        const mappedVisitorFailed =this.state.records.map(m => m.visitor_fail)
 
        const mappedTableHeader = mappedDates.map((header, index) => (
            <th className="text-center" colSpan="2">
                <Button id={'header-'+index} color="link" data-toggle="tooltip" data-placement="top" title="Click to see daily pie chart" onClick={this.handleSelectHeader}> 
                    {header}
                </Button>
                <Tooltip placement='top' isOpen={this.state.setToolTipOpen} target={'header-'+index} toggle={this.toogleToolTipOpen}>
                    Click to see daily pie chart
                </Tooltip> 
            </th>
        ))

        const mappedGroupHeader = mappedDates.map(x => 
            <React.Fragment>
                <th>Pass</th><th>Fail</th>
            </React.Fragment> 
        )
        
        const mappedStudentRow = this.state.records.map(m => ( 
            <React.Fragment>
                <td>{m.student_pass}</td><td>{m.student_fail}</td>
            </React.Fragment>
        ))

        const mappedFacultyRow = this.state.records.map(m => (
            <React.Fragment>
                <td>{m.faculty_pass}</td><td>{m.student_fail}</td>
            </React.Fragment>
        ))

        const mappedVisitorRow = this.state.records.map(m => (
            <React.Fragment>
                <td>{m.visitor_pass}</td><td>{m.visitor_fail}</td>
            </React.Fragment>
        ))
  
        const  selectedRecord = this.state.records.filter(f => moment(f.date,"YYYY-MM-DDTHH:mm:ss:SSSSSSSZZ" ).format("MM/DD") === this.state.selectedDate)

        const studentPassed = !_.isEmpty(selectedRecord) && !_.isNil(selectedRecord) && !_.isNil(selectedRecord[0].student_pass) ? selectedRecord[0].student_pass : 0
        const facultyPassed = !_.isEmpty(selectedRecord) && !_.isNil(selectedRecord) && !_.isNil(selectedRecord[0].faculty_pass) ? selectedRecord[0].faculty_pass : 0
        const visitorPassed = !_.isEmpty(selectedRecord) && !_.isNil(selectedRecord) && !_.isNil(selectedRecord[0].visitor_pass) ? selectedRecord[0].visitor_pass : 0
 

        const studentFailed = !_.isEmpty(selectedRecord) && !_.isNil(selectedRecord) && !_.isNil(selectedRecord[0].student_fail) ? selectedRecord[0].student_fail : 0
        const facultyFailed = !_.isEmpty(selectedRecord) && !_.isNil(selectedRecord) && !_.isNil(selectedRecord[0].faculty_fail) ? selectedRecord[0].faculty_fail : 0
        const visitorFailed = !_.isEmpty(selectedRecord) && !_.isNil(selectedRecord) && !_.isNil(selectedRecord[0].visitor_fail) ? selectedRecord[0].visitor_fail : 0





        //**********************************************************************************************************************************
        //**********************************************************************************************************************************
        // CHART JS SETUP
        //**********************************************************************************************************************************
        //**********************************************************************************************************************************

        const piePassData = [{
            data: [studentPassed,facultyPassed,visitorPassed],
            backgroundColor: this.state.colors
        }]

        const pieFailedData = [{
                data: [studentFailed,facultyFailed,visitorFailed],
                backgroundColor: this.state.colors
            }]

        const barChartData= {
            labels: mappedDates,
            datasets: [
              {
                label: this.state.passedTallyView ? barChartLabel1a : barChartLabel1b,
                backgroundColor: 'rgba(255,0,0)',
                fill: false,
                borderColor: 'rgba(255,0,0)',
                borderWidth: 1,
 
                hoverBackgroundColor: 'rgba(255,0,0)',
                hoverBorderColor: 'rgba(255,0,0)',
                data: this.state.passedTallyView ? mappedStudentPass : mappedStudentFailed
              },
              {
                label:  this.state.passedTallyView ? barChartLabel2a : barChartLabel2b,
                backgroundColor: 'rgba(0,0,255)',
                fill: false,
                borderColor: 'rgba(0,0,255)',
                borderWidth: 1,
    
                hoverBackgroundColor: 'rgba(0,0,255)',
                hoverBorderColor: 'rgba(0,0,255)',
                data: this.state.passedTallyView ?  mappedFacultyPass : mappedFacultyFailed
              },
              {
                label:  this.state.passedTallyView ? barChartLabel3a : barChartLabel3b,
                backgroundColor: 'rgba(60,179,113)',
                fill: false,
                borderColor: 'rgba(60,179,113)',
                borderWidth: 1,
    
                hoverBackgroundColor: 'rgba(60,179,113)',
                hoverBorderColor: 'rgba(60,179,113)',
                data: this.state.passedTallyView ?  mappedVisitorPass : mappedVisitorFailed
              }
            ]
        }
      
        const chartOptions={
            responsive: true,
            legend:{
                display: true,
                position: 'top'
            },
            type:'bar'
        }
        
        return (
            <div>
        	{
				status === 'LOADING' &&

				'Loading ...'
			}
			{
				status === 'FAILURE' &&

                'Failed to load! ...'
			}
			{
				status === 'SUCCESS' &&
                <div>
                    <div className="row gx-2 gx-lg-3">
                      
                        <Col-md-12>
                            <Card>

                            </Card>
                        </Col-md-12>
                    </div>

                    <Card>   
                        <CardBody>
                    <ButtonGroup>
                        <Button color="primary" onClick={this.togglePassFailView} active={this.state.passedTallyView}>{buttonLabel1}</Button>
                        <Button color="primary" onClick={this.togglePassFailView} active={!this.state.passedTallyView}>{buttonLabel2}</Button>
                    </ButtonGroup>
          
                    <Button style={{float: 'right'}} color="primary" onClick={this.toggleCharts} active={this.state.showBarChart}>{this.getChartButtonText()}</Button>
                  
                    <br/>
                    {this.state.passedTallyView &&
                    <CardTitle> 
                        <div style={{'text-align': 'center'}}><h3><strong>{pageTitle1}</strong></h3></div>
                        </CardTitle>
                    }
                    {!this.state.passedTallyView &&
                    <CardTitle> 
                        <div style={{'text-align': 'center'}}><h3><strong>{pageTitle2}</strong></h3></div>
                        </CardTitle>
                    }

                    {!this.state.showDaily && this.state.showBarChart && 
                        <Bar
                            data={barChartData}
                            options={chartOptions}
                        />
                    }

                    {!this.state.showDaily && !this.state.showBarChart && 
                        <Line
                            data={barChartData}
                            options={
                                chartOptions
                            }
                        />
                    }

                    {this.state.showDaily &&
                        <div style={{width:'800px', margin:'auto', overflow:'auto'}}>
                            <div style={{width:'400px', float: 'left'}}>
                            <Pie data={{
                                labels: this.state.pieChartLabel1,
                                datasets: piePassData
                            }}/>
                            </div>
                            <div style={{width:'400px', float: 'right'}}>
                            <Pie data={{
                                labels: this.state.pieChartLabel2,
                                datasets: pieFailedData
                            }}/>   
                            </div>
                        </div>
                    
                    }
                    </CardBody>
                    </Card>  

                    <br/><br/><br/>
                    <div className="card bg-light mb-3">   
                        <div className="card-body">
                    <Table striped>
                        <thead style={{'background-color': 'rgb(248,248,255)'}}>
                            <tr>
                                {mappedTableHeader}
                            </tr>
                            <tr>
                                {mappedGroupHeader}
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{'color':'red'}}>
                                {mappedStudentRow}
                            </tr>
                            <tr style={{'color':'blue'}}>
                                {mappedFacultyRow}
                            </tr>
                            <tr style={{'color':'green'}}>
                                {mappedVisitorRow}
                            </tr>
                        </tbody>
                    </Table>
                    </div>
                    </div>  
                </div>
            }
            </div>

        )
    }
}
