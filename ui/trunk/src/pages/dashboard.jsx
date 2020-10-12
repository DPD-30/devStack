import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
import { Table,Pagination, PaginationItem,PaginationLink, Col, Row, Button, Modal, ModalHeader,ModalBody, ModalFooter, Input, Label, Form, FormGroup, Card, CardBody } from 'reactstrap'
import moment from 'moment'
import AppStore from 'stores/app.js'
import AppActions from 'actions/app.js'
 
// custom controls
import PieChart from 'templates/components/charts/piechart.jsx'
import StatCardRow from 'templates/components/charts/statcardrow.jsx'
import LineChart from 'templates/components/charts/linechart.jsx'
import BarChart from 'templates/components/charts/barchart.jsx'
 
//css
import 'css/dashboard.css'

export default class dashboard extends Reflux.Component {
	constructor(props) {
		super(props)

		this.state = {
			application: [],
			application_status: '',
			filterRecords: [],
            phase:[],
            showModal: false,
       
			rmf:[],
			

 
			newRecord: false,

			isSaving: false,
            isDeleting: false,
			ascending: false,
			pageItems: [],
			page: 0,
			pageSize: 6,
			mappedPhaseStatus: false,
			formSubmitted: false,

			recordField1: '', // leave blank for reserved for priorityId
			recordField2: '', // leave blank for id
			recordField3: '', // leave blank for string
			recordField4: '', // leave blank for string
			recordField5: '', // leave blank for string
			recordField6: '', // leave blank for string
			recordField7: '', // leave blank for id string
			recordField8: '', // leave blank for id string
			recordField9: '', // leave blank for date
			recordField10: '', // leave blank for extra
			faSortColumn1: '', //leave blank
			faSortColumn2: '', //leave blank
			faSortColumn3: '', //leave blank
			faSortColumn4: '', //leave blank
			faSortColumn5: '', //leave blank
			faSortColumn6: '', //leave blank
			faSortColumn7: '', //leave blank
			faSortColumn8: '', //leave blank
			faSortColumn9: '', //leave blank
			faSortColumn10: '', //leave blank
			columnHeader1: 'Priority', //Add header name
			columnHeader2: 'System ID', //Add header name
			columnHeader3: 'Name', //Add header name
			columnHeader4: 'System Owner', //Add header name
			columnHeader5: 'iMatrix Number', //Add header name
			columnHeader6: 'POC', //Add header name
			columnHeader7: 'Phase', //Add header name
			columnHeader8: 'Status', //Add header name
			columnHeader9: 'Expiration', //Add header name
			columnHeader10: 'Action', //Add header name
			columnPropertyName1: 'priority', //Add json property name
			columnPropertyName2: 'id', //Add json property name
			columnPropertyName3: 'applicationName', //Add json property name
			columnPropertyName4: 'systemOwner', //Add json property name
			columnPropertyName5: 'iMatrixNumber', //Add json property name
			columnPropertyName6: 'poc', //Add json property name
			columnPropertyName7: 'phase', //Add json property name
			columnPropertyName8: 'status', //Add json property name
			columnPropertyName9: 'expiration', //Add json property name
			columnPropertyName10: '', //Add json property name
			filterColText1: '', //leave blank
			filterColText2: '', //leave blank
			filterColText3: '', //leave blank
			filterColText4: '', //leave blank
			filterColText5: '', //leave blank
			filterColText6: '', //leave blank
			filterColText7: '', //leave blank
			filterColText8: '', //leave blank
			filterColText9: '', //leave blank
			filterColText10: '', //leave blank

			showAddButton: true,
			showPagination: true,
			showPriorityColumn: true,
			showTableFilter: true,
			showStatCards: true,
			showCharts: true,
			showLineChart: true,
			showBarChart: true,
		}
 


		this.store = AppStore
		this.storeKeys = [
			'application',
            'application_status',
			'phase',
			'rmf',
		]

        this.handleTextChange = this.handleTextChange.bind(this)
		this.toggleModal = this.toggleModal.bind(this)
		this.handleSaveModal = this.handleSaveModal.bind(this)
		this.handleAddNew = this.handleAddNew.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleDoubleClick = this.handleDoubleClick.bind(this)
        this.getStatusString = this.getStatusString.bind(this)
        this.getPhaseString = this.getPhaseString.bind(this)
		this.getFormattedDate = this.getFormattedDate.bind(this)
		this.getFormattedInputDateField = this.getFormattedInputDateField.bind(this)
		this.sortTable = this.sortTable.bind(this)
		//this.createLegend = this.createLegend.bind(this)
		this.getFormattedIcon = this.getFormattedIcon.bind(this)
		this.mapIdToText = this.mapIdToText.bind(this)

		this.handleFilterCol = this.handleFilterCol.bind(this)
		this.hasFilterString = this.hasFilterString.bind(this)
	}

	hasFilterString() {
		return !(!this.state.filterColText1 && !this.state.filterColText2 && !this.state.filterColText3 && !this.state.filterColText4 && !this.state.filterColText5 &&
			!this.state.filterColText6 && !this.state.filterColText7 && !this.state.filterColText8 && !this.state.filterColText9 && !this.state.filterColText10)
	}

	handleFilterCol(e) {

		if (!_.isEmpty(e.target.id)) {
			if(!_.isNil(e.target.value) && !_.isEmpty(e.target.value) && e.target.value !== '') {
				if(e.target.id === 'column1' && this.state.showPriorityColumn === true) {
					if (e.target.value !== '' && e.target.value !== '0') {
						const filterRecords = this.state.application.filter(s => String(s.priority).toLowerCase().includes(e.target.value.toLowerCase()))
						this.setState({filterColText1: e.target.value, filterRecords: filterRecords})
					} else {
						this.setState({filterRecords: [], 
							filterColText1:'', filterColText2:'', filterColText3:'', filterColText4:'',filterColText5:'',
							filterColText6:'', filterColText7:'', filterColText8:'', filterColText9:'',filterColText10:''}) 
					}
				} else if (e.target.id === 'column2') {
					const filterRecords = this.state.application.filter(s => String(s.applicationId).toLowerCase().includes(e.target.value.toLowerCase()))
					this.setState({filterColText2: e.target.value, filterRecords: filterRecords})
				} else if (e.target.id === 'column3') {
					const filterRecords = this.state.application.filter(s => String(s.applicationName).toLowerCase().includes(e.target.value.toLowerCase()))
					this.setState({filterColText3: e.target.value, filterRecords: filterRecords})
				} else if (e.target.id === 'column4') {
					const filterRecords = this.state.application.filter(s => String(s.systemOwner).toLowerCase().includes(e.target.value.toLowerCase()))
					this.setState({filterColText4: e.target.value, filterRecords: filterRecords})
				} else if (e.target.id === 'column5') {
					const filterRecords = this.state.application.filter(s => String(s.iMatrixNumber).toLowerCase().includes(e.target.value.toLowerCase()))
					this.setState({filterColText5: e.target.value, filterRecords: filterRecords})
				} else if (e.target.id === 'column6') {
					const filterRecords = this.state.application.filter(s => String(s.poc).toLowerCase().includes(e.target.value.toLowerCase()))
					this.setState({filterColText6: e.target.value, filterRecords: filterRecords})
				} else if (e.target.id === 'column7') {
					const filterRecords = this.state.application.filter(s => String(s.phase).toLowerCase().includes(e.target.value.toLowerCase()))
					this.setState({filterColText7: e.target.value, filterRecords: filterRecords})
				} else if (e.target.id === 'column8') {
					const filterRecords = this.state.application.filter(s => String(s.status).toLowerCase().includes(e.target.value.toLowerCase()))
					this.setState({filterColText8: e.target.value, filterRecords: filterRecords})
				} else if (e.target.id === 'column9') {
					const filterRecords = this.state.application.filter(s => String(s.expiration).toLowerCase().includes(e.target.value.toLowerCase()))
					this.setState({filterColText9: e.target.value, filterRecords: filterRecords})
				}  
			} else {
				this.setState({filterRecords: [], 
							filterColText1:'', filterColText2:'', filterColText3:'', filterColText4:'',filterColText5:'',
							filterColText6:'', filterColText7:'', filterColText8:'', filterColText9:'',filterColText10:''}) 
			}
        }
	}
 


	componentDidMount() {
		//AppActions.getApplications()
	}

	toggleModal() {
		this.setState({
		  showModal: !this.state.showModal
		})
	}

	handleAddNew()  {
        this.setState({
			recordField1: '',
			recordField2: '', 
			recordField3:'', 
			recordField4: '', 
			recordField5:'', 
			recordField6: '', 
			recordField7: 0,
			recordField8: '',
			recordField9: '',
                        newRecord: true})
		this.toggleModal()
	}
 
    
	handleSaveModal(event) {

		if (event.target !== null) {
			this.setState({formSubmitted: true})
			const hasErrors = ( !this.state.recordField6 || !this.state.recordField8 || 
								!this.state.recordField4 || !this.state.recordField3 
								|| !this.state.recordField5   || !this.state.recordField7)

			if(!hasErrors) {
 			
				this.setState({ isSaving: true })

				const record = {
						applicationId: !_.isNil(this.state.recordField2) && !_.isEmpty(this.state.recordField2) ? Number(this.state.recordField2) : 0, 
                        applicationName:this.state.recordField3, 
                        statusId: Number(this.state.recordField8), 
                        systemOwner:this.state.recordField4, 
                        iMatrixNumber: this.state.recordField5, 
                        phaseId: Number(this.state.recordField7),
                        poc: this.state.recordField6,
						expiration: this.state.recordField9,
						createdDate: new Date(),
						modifiedDate: new Date(),
						createdUser: 'User1',
						modifiedUser: 'User1',
						onSuccess: () => this.setState({
							isChanged: false,
							isSaving: false,
							showModal: !this.state.showModal,
						})
				}

				if (this.state.newRecord) {
					AppActions.addApplication(record)
				} else {
					AppActions.updateApplication(record)
				}
			}
		}
	}

	handleDelete(event) {
		if (event !== null && event.applicationId !== null && event.applicationId > 0) {

			AppActions.deleteApplication({
				applicationId: (event.applicationId),
				onSuccess: () => this.setState({
					isChanged: false,
					isSaving: false,
				}),
			})
		}
	}
 
	handleTextChange(x) {
		const dataObject = _.cloneDeep(this.state)
		dataObject[x.target.name] = x.target.value
		this.setState(dataObject)
	}

	getStatusString(id) {
		const value = id === 1 ? "Never ATO'ed" :
            id === 2 ? 'Good Standing' :
            id === 3 ? 'Expired' : "Never ATO'ed"
    
		return value
    }
    
    getPhaseString(id) {

			const value = id === 1 ? 'RMF Step 1' :
            id === 2 ? 'RMF Step 2' :
            id === 3 ? 'RMF Step 3' :
            id === 4 ? 'RMF Step 4' : 
            id === 4 ? 'RMF Step 5' :'RMF Step 6'

		return value
    }

    getFormattedDate(date) {
        if (!_.isNil(date) && !_.isEmpty(date)) { 
            return moment(date,"YYYY-MM-DDTHH:mm:ss:SSSSSSSZZ").format("MM/DD/YYYY")
        }
	}
	
	getFormattedInputDateField(date) {
        if (!_.isNil(date) && !_.isEmpty(date)) { 
            return moment(date,"YYYY-MM-DDTHH:mm:ss:SSSSSSSZZ").format("YYYY-MM-DD")
        }
	}
  
	handleDoubleClick(event) {
		if (!_.isNil(event)) {
            this.setState({applicationId: event.applicationId, 
                 
                recordField3: event.applicationName,
				recordField4:event.systemOwner,
				recordField5: event.poc,
                recordField6: event.iMatrixNumber,				
				recordField7: event.phaseId,
				recordField8: event.statusId, 
                recordField9: this.getFormattedInputDateField(event.expiration),
				newRecord: false,
				showModal: !this.state.showModal})
		}
	}
 
	

    sortTable(event, sortKey) {
		this.setState({faSortColumn1: '',
		faSortColumn2: '',
		faSortColumn3: '',
		faSortColumn4: '',
		faSortColumn5: '',
		faSortColumn6: '',
		faSortColumn7: '',
		faSortColumn8: '',
		faSortColumn9: '',
		faSortColumn10: '',})

        if (!this.state.ascending) {
            this.state.application.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
			this.setState({ascending: true}) 
		} else {
			this.state.application.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
			this.setState({ascending: false}) 

		}
		if(sortKey === this.state.columnPropertyName1) {
			this.setState({faSortColumn1: this.state.ascending ? 'fa fa-sort-down' : 'fa fa-sort-up'})

		} 
		else if(sortKey === this.state.columnPropertyName2) {
			this.setState({faSortColumn2: this.state.ascending ? 'fa fa-sort-down' : 'fa fa-sort-up'})
			
		} 
		else if(sortKey === this.state.columnPropertyName3) {
			this.setState({faSortColumn3: this.state.ascending ? 'fa fa-sort-down' : 'fa fa-sort-up'})
		} 
		else if (sortKey === this.state.columnPropertyName4) {
			this.setState({faSortColumn4: this.state.ascending ? 'fa fa-sort-down' : 'fa fa-sort-up'})
		} 
		else if (sortKey === this.state.columnPropertyName5) {
			this.setState({faSortColumn5: this.state.ascending ? 'fa fa-sort-down' : 'fa fa-sort-up'})
		}
		else if (sortKey === this.state.columnPropertyName6) {
			this.setState({faSortColumn6: this.state.ascending ? 'fa fa-sort-down' : 'fa fa-sort-up'})
		}
		else if (sortKey === this.state.columnPropertyName7) {
			this.setState({faSortColumn7: this.state.ascending ? 'fa fa-sort-down' : 'fa fa-sort-up'})
		}
		else if (sortKey === this.state.columnPropertyName8) {
			this.setState({faSortColumn8: this.state.ascending ? 'fa fa-sort-down' : 'fa fa-sort-up'})
		} 
		else if (sortKey === this.state.columnPropertyName9) {
			this.setState({faSortColumn9: this.state.ascending ? 'fa fa-sort-down' : 'fa fa-sort-up'})
		}  
        this.setState({application: this.state.application})
    }

	getFormattedIcon(isCompleted) {
		return isCompleted 
			? <i className="fa fa-check"/> 
			:  <i className="fa fa-ban"/>
	}

	// createLegend(json) {
	// 	var legend = [];
	// 	if (!_.isNil(json)) {
	// 	for (var i = 0; i < json["names"].length; i++) {
	// 	  var type = "fa fa-circle text-" + json["types"][i];
	// 	  legend.push(<span className="legends"><i style={{"margin-left":"10px"}} className={type} key={i} /></span>);
	// 	  legend.push(" ");
	// 	  legend.push(json["names"][i]);
	// 	}
	// }
	// 	return legend;
	//   }

	  mapIdToText() {
		
		const records = this.state.application
        const mappedRecords = records.map(item => {
			return {...item, 'priority': item.applicationId, 'id': String(item.applicationId),'phase': this.getPhaseString(item.applicationId, item.phaseId),  'status': this.getStatusString(item.statusId)}
		})
 
 		this.setState({application: mappedRecords, mappedPhaseStatus: true}) 

	}

	render() {
		const {
			className
		  } = this.props;
 
		const status = this.state.application_status  

		if(status === 'SUCCESS' && this.state.mappedPhaseStatus === false) {
		   this.mapIdToText()
		}
 


		const mappedRecords = this.hasFilterString()
			? this.state.filterRecords
				.slice (
					this.state.page * this.state.pageSize,
					this.state.page * this.state.pageSize + this.state.pageSize
				)
				.map(filterRecords => (
					<tr key={filterRecords.applicationId} >
						{ this.state.showPriorityColumn && !_.isEmpty(this.state.columnHeader1) &&
							<td className="alignCentered"> 
								{filterRecords.applicationId === 1 ? <i className="fa fa-exclamation-circle"/> 
								: filterRecords.applicationId === 2 ? <i className="fa fa-dot-circle"/> : <i className="fa fa-arrow-alt-circle-down"/>}
							</td>
						}
				 		{ !_.isEmpty(this.state.columnHeader2) &&
							<td className="alignCentered">{filterRecords.applicationId}</td>
						}
						{ !_.isEmpty(this.state.columnHeader3) &&
							<td className="alignCentered">{filterRecords.applicationName}</td>
						}
						{  !_.isEmpty(this.state.columnHeader4) &&
							<td className="alignCentered">{filterRecords.systemOwner}</td>
						}
						{  !_.isEmpty(this.state.columnHeader5) &&
							<td className="alignCentered">{filterRecords.iMatrixNumber}</td>
						}
						{  !_.isEmpty(this.state.columnHeader6) &&
							<td className="alignCentered">{filterRecords.poc}</td>
						}
						{  !_.isEmpty(this.state.columnHeader7) &&
							<td className="alignCentered">{!_.isNil(filterRecords.phase) ? filterRecords.phase : ''}</td>
						}
						{  !_.isEmpty(this.state.columnHeader8) &&
							<td className="alignCentered">{!_.isNil(filterRecords.status) ? filterRecords.status : ''}</td>
						}
						{  !_.isEmpty(this.state.columnHeader9) &&
							<td className="alignCentered">{this.getFormattedDate(filterRecords.expiration)}</td>
						}
						{  !_.isEmpty(this.state.columnHeader10) &&
							<td className="justified-content-center">
								<span className="editIcon"><i className="fa fa-edit" onClick={() => this.handleDoubleClick(filterRecords)}/></span>
								<span className="deleteIcon"><i className="fa fa-trash" onClick={() => this.handleDelete(filterRecords)}/></span>
							</td>
						}
					</tr>
				))
			: !_.isNil(this.state.application) 			
				? this.state.application
					.slice (
						this.state.page * this.state.pageSize,
						this.state.page * this.state.pageSize + this.state.pageSize
					)
					.map(application => (
						<tr key={application.applicationId} >
							{ this.state.showPriorityColumn && !_.isEmpty(this.state.columnHeader1) &&
								<td className="alignCentered"> 
									{application.applicationId === 1 ? <i className="fa fa-exclamation-circle"/> 
									: application.applicationId === 2 ? <i className="fa fa-dot-circle"/> : <i className="fa fa-arrow-alt-circle-down"/>}
								</td>
							}
							{  !_.isEmpty(this.state.columnHeader2) &&
								<td className="alignCentered">{application.applicationId}</td>
							}
							{  !_.isEmpty(this.state.columnHeader3) &&
								<td className="alignCentered">{application.applicationName}</td>
							}
							{  !_.isEmpty(this.state.columnHeader4) &&
								<td className="alignCentered">{application.systemOwner}</td>
							}
							{  !_.isEmpty(this.state.columnHeader5) &&
								<td className="alignCentered">{application.iMatrixNumber}</td>
							}
							{  !_.isEmpty(this.state.columnHeader6) &&
								<td className="alignCentered">{application.poc}</td>
							}
							{  !_.isEmpty(this.state.columnHeader7) &&
								<td className="alignCentered">{!_.isNil(application.phase) ? application.phase : ''}</td>
							}
							{  !_.isEmpty(this.state.columnHeader8) &&
								<td className="alignCentered">{!_.isNil(application.status) ? application.status : ''}</td>
							}
							{  !_.isEmpty(this.state.columnHeader9) &&
								<td className="alignCentered">{this.getFormattedDate(application.expiration)}</td>
							}
							{  !_.isEmpty(this.state.columnHeader10) &&
								<td className="justified-content-center">
									<span className="editIcon"><i className="fa fa-edit" onClick={() => this.handleDoubleClick(application)}/></span>
									<span className="deleteIcon"><i className="fa fa-trash" onClick={() => this.handleDelete(application)}/></span>
								</td>
							}
						</tr>
					))

			: [{}]
 

		//*********************************************************************************************************************		
		// constants
		//*********************************************************************************************************************	
	 
		const applicationName = 'Systems'
  
		const chartTitle1= applicationName + ' Progress'
		const chartTitleSubTitle1='24 Hours Performance'
		
		const chartTitle2= applicationName + ' Stats'
		const chartTitleSubTitle2='Lastest Performance'


		const statusColor1 = "#19476A"
		const statusColor2 = "#F86612"
		const statusColor3 = "#FF4A55"
		const statusColor4 = "#009DD6"

		const barChartColor1 = "#309EF9"



		//*********************************************************************************************************************		
		// get stat card count
		//*********************************************************************************************************************	
		const statCard1Name = "Never ATO'ed" // OPEN
		const statCard2Name = 'Good Standing' // COMPLETED
		const statCard3Name = 'Expired' // ALERTS
		const statCard4Name = 'Total ' + applicationName // COUNT OF RECORDS

		const statsIcon1="fa fa-refresh"
		const statsIcon2="fa fa-calendar-o"
		const statsIcon3="fa fa-clock-o" 
		const statsIcon4="fa fa-refresh"

		const statsIconText1="Updated now"
		const statsIconText2="Last day"
		const statsIconText3="In the last hour"
		const statsIconText4="Updated now"

		const faInbox = "fa fa-inbox"
		// const faFile = "fa fa-file"
		const faArchive = "fa fa-archive"
		// const faSignal = "fa fa-signal"
		const faError = "fa fa-exclamation-triangle"
		// const faUser = "fa fa-user"
		const faCalendar = 'fa fa-calendar-alt'
		
		const statCardValue1 = (!_.isNil(this.state.application)) ? this.state.application.filter(m => m.statusId === 1).length : 0
		const statCardValue2 = (!_.isNil(this.state.application)) ? this.state.application.filter(m => m.statusId === 2).length : 0
		const statCardValue3 = (!_.isNil(this.state.application)) ? this.state.application.filter(m => m.statusId === 3).length : 0
		const statCardValue4= (!_.isNil(mappedRecords)) ? mappedRecords.length : 0

		//*********************************************************************************************************************		
		// pagination
		//*********************************************************************************************************************	
		const pages = (!_.isNil(this.state.application) && this.state.application.length > 0) 
							? Math.ceil(this.state.application.length/this.state.pageSize) 
							: 1
		const paginationItems = (pages > 1) 
							? Array(pages).fill('').map((i, index) => (
									<PaginationItem active={this.state.page === index}>
										<PaginationLink tag="button" onClick={() => this.setState({page: index })}>{index+1}</PaginationLink>
									</PaginationItem>
								))
							: pages
 		//*********************************************************************************************************************		
		// get pie chart
		//*********************************************************************************************************************		
		const statusList = ["Never ATO'ed", "Good Standing", "Expired"]
		const pieChartLabel1 = statusList
		const pieChartValue1 = (!_.isNil(mappedRecords) && mappedRecords.length > 0) ? (statCardValue1/mappedRecords.length)*100 : 0
		const pieChartValue2 = (!_.isNil(this.state.application) && mappedRecords.length > 0) ? (statCardValue2/mappedRecords.length)*100 : 0
		const pieChartValue3 = (!_.isNil(this.state.application) && mappedRecords.length > 0) ? (statCardValue3/mappedRecords.length)*100 : 0

		const pieChartColor1 = '#309EF9'
		const pieChartColor2 = '#1AFAB0'
		const pieChartColor3 = '#FA401A'
		// const pieChartColor4 = '#FFD966'
		
		var legends = {
			names: statusList,
			types: ["warning", "success", "danger"]
		};	
		const dataPie = (pieChartValue1 === 0 && pieChartValue2 === 0 && pieChartValue3 === 0) 
				? null
				:  [pieChartValue1, pieChartValue2, pieChartValue3]



		 //*********************************************************************************************************************	
		 // Bar Chart
		 //*********************************************************************************************************************
 
		const chartLabels = ["RMF Step 1", "RMF Step 2", "RMF Step 3", "RMF Step 4", "RMF Step 5", "RMF Step 6"]
		const chartDataSet1 = (!_.isNil(this.state.application)) ? this.state.application.filter(m => m.phaseId === 1).length : 0
		const chartDataSet2 = (!_.isNil(this.state.application)) ? this.state.application.filter(m => m.phaseId === 2).length : 0
		const chartDataSet3 = (!_.isNil(this.state.application)) ? this.state.application.filter(m => m.phaseId === 3).length : 0
		const chartDataSet4 = (!_.isNil(this.state.application)) ? this.state.application.filter(m => m.phaseId === 4).length : 0
		const chartDataSet5 = (!_.isNil(this.state.application)) ? this.state.application.filter(m => m.phaseId === 5).length : 0
		const chartDataSet6 = (!_.isNil(this.state.application)) ? this.state.application.filter(m => m.phaseId === 6).length : 0

		const xAxesBarChartLabel = "X Axes Label"
		const yAxesBarChartLabel = "Y Axes Label"

		const barChartData= {
            labels: chartLabels,
            datasets: [
              {
                label: 'RMF Step 1-6',
                backgroundColor: barChartColor1,
                fill: false,
                borderColor: barChartColor1,
                borderWidth: 1,
 
                hoverBackgroundColor: barChartColor1,
                hoverBorderColor: barChartColor1,
                data: [chartDataSet1,chartDataSet2,chartDataSet3,chartDataSet4,chartDataSet5,chartDataSet6]
              }]
            //   {
            //     label:  chartLabels[1],
            //     backgroundColor: 'rgba(0,0,255)',
            //     fill: false,
            //     borderColor: 'rgba(0,0,255)',
            //     borderWidth: 1,
    
            //     hoverBackgroundColor: 'rgba(0,0,255)',
            //     hoverBorderColor: 'rgba(0,0,255)',
            //     data:  [chartDataSet2]
            //   },
            //   {
            //     label:  chartLabels[2],
            //     backgroundColor: 'rgba(60,179,113)',
            //     fill: false,
            //     borderColor: 'rgba(60,179,113)',
            //     borderWidth: 1,
    
            //     hoverBackgroundColor: 'rgba(60,179,113)',
            //     hoverBorderColor: 'rgba(60,179,113)',
            //     data:  [chartDataSet3]
			//   },
            //   {
            //     label:  chartLabels[3],
            //     backgroundColor: 'rgba(60,179,113)',
            //     fill: false,
            //     borderColor: 'rgba(60,179,113)',
            //     borderWidth: 1,
    
            //     hoverBackgroundColor: 'rgba(60,179,113)',
            //     hoverBorderColor: 'rgba(60,179,113)',
            //     data:  [chartDataSet4]
            //   },
            //   {
            //     label:  chartLabels[4],
            //     backgroundColor: 'rgba(60,179,113)',
            //     fill: false,
            //     borderColor: 'rgba(60,179,113)',
            //     borderWidth: 1,
    
            //     hoverBackgroundColor: 'rgba(60,179,113)',
            //     hoverBorderColor: 'rgba(60,179,113)',
            //     data:  [chartDataSet5]
            //   }
            // ]
		}
		

		 //*********************************************************************************************************************	
		 // Line Chart
		 //*********************************************************************************************************************
		 const lineDataSet1 =  [287, 385, 490, 492, 554, 586, 698, 695]
		 const lineDataSet2 = [67, 152, 143, 240, 287, 335, 435, 437]
		 const lineDataSet3 = [23, 113, 67, 108, 190, 239, 307, 308]
		 const lineDataSet4 = [15,25,12,13,11,52]
		 const lineDataSet5 = [15,23,15,62,15,44]
		 const lineDataSet6 = [25,25,12,55,41,25]
		 
		 const lineChartyLabel = 'X Axes Label'
		 const lineChartxLabel = 'Y Axes Label'

		  const lineData = {
			labels: chartLabels,
			datasets: [
			  {
				label: chartLabels[0],
				data: lineDataSet1,
				fill: false,
				borderColor: "#ff7518"
			  },
			  {
				label: chartLabels[1],
				data: lineDataSet2,
				fill: false,
				borderColor: "#ff0039"
			  },
			  {
				label: chartLabels[2],
				data: lineDataSet3,
				fill: false,
				borderColor: "#3fb618"
			  },
			  {
				label: chartLabels[3],
				data: lineDataSet4,
				fill: false,
				borderColor: "#309EF9"
			  },
			  {
				label: chartLabels[4],
				data: lineDataSet5,
				fill: false,
				borderColor: "#1AFAB0"
			  },
			  {
				label: chartLabels[5],
				data: lineDataSet6,
				fill: false,
				borderColor: "#19476A"
			  }
			]
		  };
 
 		
		return (
			<div>
				{ this.state.showStatCards &&
					<StatCardRow 
						iconColor1={statusColor1}
						iconColor2={statusColor2}
						iconColor3={statusColor3}
						iconColor4={statusColor4}
						iconName1={faInbox}
						iconName2={faCalendar}
						iconName3={faError}
						iconName4={faArchive}
						statsText1={statCard1Name}
						statsText2={statCard2Name}
						statsText3={statCard3Name}
						statsText4={statCard4Name}
						statsValue1={statCardValue1}
						statsValue2={statCardValue2}
						statsValue3={statCardValue3}
						statsValue4={statCardValue4}
						statsIcon1={statsIcon1}
						statsIcon2={statsIcon2}
						statsIcon3={statsIcon3}
						statsIcon4={statsIcon4}
						statsIconText1={statsIconText1}
						statsIconText2={statsIconText2}
						statsIconText3={statsIconText3}
						statsIconText4={statsIconText4}
					/>
				}
				
				<Row><br/></Row>
				{ this.state.showCharts && 
				<Row>
					<Col md={6}>
						{  this.state.showBarChart && 
							<BarChart title={chartTitle2}
								subTitle={chartTitleSubTitle2}
								label={pieChartLabel1}
								pieData={!_.isNil(dataPie) ? dataPie : {}}
								labels={chartLabels}
								datasets={barChartData}
								xAxesLabel={xAxesBarChartLabel}
								yAxesLabel={yAxesBarChartLabel}						/> 
						}
						{  this.state.showLineChart && 
							< LineChart
								title={chartTitle1}
								subTitle={chartTitleSubTitle1}
								labels={chartLabels}
								datagroups={lineData}
								yLabel={lineChartyLabel}
								xLabel={lineChartxLabel}
								legends={legends}
							/> 
						}
					</Col>
					<Col md={6}>
						<PieChart title={chartTitle2}
							subTitle={chartTitleSubTitle2}
							label={pieChartLabel1}
							datasets={dataPie}
							pieData={!_.isNil(dataPie) ? dataPie : {}}
							pieColors={[pieChartColor1,pieChartColor2,pieChartColor3]}
						/>
					</Col>
				</Row>

				}

				<Modal isOpen={this.state.showModal} toggle={this.toggleModal} className={className}>
					<ModalHeader toggle={this.toggleModal}><strong>{applicationName}</strong></ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup row>
								<Col md={4}>
									<Label for="recordField2">{this.state.columnHeader2}</Label>
								</Col>
								<Col md={8}>
									<Input type="textarea" name="recordField2" id="recordField2" disabled={true} value={this.state.recordField2} placeholder="" rows={1}  onChange={this.handleIDChange}/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Col md={4}>
									<Label for="recordField3">{this.state.columnHeader3}</Label>
								</Col>
								<Col md={8}>
									<Input type="textarea" name="recordField3" id="recordField3" value={this.state.recordField3}  placeholder="" rows={1} onChange={this.handleTextChange} invalid={this.state.formSubmitted && !this.state.recordField3}/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Col md={4}>
									<Label for="recordField4">{this.state.columnHeader4}</Label>
								</Col>
								<Col md={8}>
									<Input type="textarea" name="recordField4" id="recordField4" value={this.state.recordField4}  placeholder="" rows={1} onChange={this.handleTextChange} invalid={this.state.formSubmitted && !this.state.recordField4}/>
								</Col>
							</FormGroup>
                            <FormGroup row>
								<Col md={4}>
									<Label for="recordField6">{this.state.columnHeader6}</Label>
								</Col>
								<Col md={8}>
									<Input type="textarea" name="recordField6" id="recordField6" value={this.state.recordField6}  placeholder="" rows={1} onChange={this.handleTextChange} invalid={this.state.formSubmitted && !this.state.recordField6}/>
								</Col>
							</FormGroup>
                            <FormGroup row>
								<Col md={4}>
									<Label for="recordField5">{this.state.columnHeader5}</Label>
								</Col>
								<Col md={8}>
									<Input type="textarea" name="recordField5" id="recordField5" value={this.state.recordField5}  placeholder="" rows={1} onChange={this.handleTextChange} invalid={this.state.formSubmitted && !this.state.recordField5}/>
								</Col>
							</FormGroup>
                            <FormGroup row>
								<Col md={4}>
									<Label for="recordField9">{this.state.columnHeader9}</Label>
								</Col>
								<Col md={8}>
									<Input type="date" name="recordField9" id="recordField9" value={this.state.recordField9}  placeholder="" rows={1} onChange={this.handleTextChange} invalid={this.state.formSubmitted && !this.state.recordField9}/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Col md={4}>
                            		<Label for="recordField7">{this.state.columnHeader7}</Label>
								</Col>
								<Col md={8}>
									<Input type="select" name="recordField7" id="recordField7" value={this.state.recordField7} 
											onChange={this.handleTextChange} invalid={this.state.formSubmitted && !this.state.recordField7}>
										<option value={0}>Select</option>
										<option value={1}>Phase 1</option>
										<option value={2}>Phase 2</option>
										<option value={3}>Phase 3</option>
										<option value={4}>Phase 4</option>
										<option value={5}>Phase 5</option>
										<option value={5}>Phase 6</option>
									</Input>
								</Col>
                            </FormGroup>
                            <FormGroup row>
								<Col md={4}>
									<Label for="recordField8">{this.state.columnHeader8}</Label>
								</Col>
								<Col md={8}>
									<Input type="select" name="recordField8" id="recordField8" value={this.state.recordField8} 
											onChange={this.handleTextChange} invalid={this.state.formSubmitted && !this.state.recordField8}>
										<option value={0}>Select</option>
										<option value={1}>Never ATO'ed</option>
										<option value={2}>Good Standing</option>
									</Input>
								</Col>
      						</FormGroup>
						</Form>
						 
					</ModalBody>
					<ModalFooter>
						<Button color="primary"    onClick={this.handleSaveModal}>Save</Button>{' '}
						<Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
					</ModalFooter>
				</Modal>

				{
					status === 'LOADING' &&

					'Loading ' + applicationName +  "..."
				}
				{
					status === 'FAILURE' &&

					'Failed to load the ' + applicationName + '!'
				}
				{
					status === 'SUCCESS' &&
					
					<div>
						<Row><br/></Row>
						<Row>
							<Col>
							<Card>
								<Row>
									<Col md={2}> 
										<h1 className="header">
											<strong>{applicationName}</strong>
										</h1> 
									</Col>
									{ this.state.showAddButton &&
										<Col md={10} className="addButtonPadding"> 
											<Button color="primary" size="sm" className="addButton" 
												onClick={this.handleAddNew}>
												<i className="fa fa-plus"> Add New {applicationName}</i> 
											</Button>  
										</Col>
									}
								</Row>
								<CardBody>
									<Table striped bordered responsive={true}>
										<thead>
											<tr>
												{ this.state.showPriorityColumn && !_.isEmpty(this.state.columnHeader1) &&
													<th className="tableHeader" onClick={e=> this.sortTable(e, this.state.columnPropertyName1)}>
														<button id="faSortColumn1Button" className="tableHeaderButton">
															{this.state.columnHeader1}<i className={this.state.faSortColumn1}/>
														</button>
													</th>
												}
												{  !_.isEmpty(this.state.columnHeader2) && 
													<th className="tableHeader" onClick={e=> this.sortTable(e, this.state.columnPropertyName2)}>
														<button className="tableHeaderButton">
															{this.state.columnHeader2}<i className={this.state.faSortColumn2}/>
														</button>
													</th>
												}
												{  !_.isEmpty(this.state.columnHeader3) && 
													<th className="tableHeader" onClick={e=> this.sortTable(e, this.state.columnPropertyName3)}>
														<button className="tableHeaderButton">
														 	{this.state.columnHeader3}<i className={this.state.faSortColumn3}/>
														</button>
													</th>
												}
												{  !_.isEmpty(this.state.columnHeader4) && 
													<th className="tableHeader" onClick={e=> this.sortTable(e, this.state.columnPropertyName4)}>
														<button className="tableHeaderButton">
														 	{this.state.columnHeader4}<i className={this.state.faSortColumn4}/>
														</button>
													</th>
												}
												{  !_.isEmpty(this.state.columnHeader5) && 
													<th className="tableHeader" onClick={e=> this.sortTable(e, this.state.columnPropertyName5)}>
														<button className="tableHeaderButton">
														 	{this.state.columnHeader5}<i className={this.state.faSortColumn5}/>
														 </button>
													</th>
												}
												{  !_.isEmpty(this.state.columnHeader6) && 
													<th className="tableHeader" onClick={e=> this.sortTable(e, this.state.columnPropertyName6)}>
														<button className="tableHeaderButton">
															{this.state.columnHeader6}<i className={this.state.faSortColumn6}/>
														</button>
													</th>
												}
												{  !_.isEmpty(this.state.columnHeader7) && 
													<th className="tableHeader" onClick={e=> this.sortTable(e, this.state.columnPropertyName7)}>
														<button className="tableHeaderButton">
															{this.state.columnHeader7}<i className={this.state.faSortColumn7}/>
														</button>
													</th>
												}
												{  !_.isEmpty(this.state.columnHeader8) && 
													<th className="tableHeader" onClick={e=> this.sortTable(e,this.state.columnPropertyName8)}>
														<button className="tableHeaderButton">
															{this.state.columnHeader8}<i className={this.state.faSortColumn8}/>
														</button>
													</th>
												}
												{  !_.isEmpty(this.state.columnHeader9) && 
													<th className="tableHeader" onClick={e=> this.sortTable(e,this.state.columnPropertyName9)}>
														<button className="tableHeaderButton">
															{this.state.columnHeader9}<i className={this.state.faSortColumn9}/>
														</button>
													</th>
												}
												{  !_.isEmpty(this.state.columnHeader10) && 
													<th className="tableHeader">
														<button className="tableHeaderButton">
															{this.state.columnHeader10}
														</button>
													</th>
												}
											</tr>
											{ this.state.showTableFilter &&
												<tr>
													{ this.state.showPriorityColumn && !_.isEmpty(this.state.columnHeader1) &&
														<th><Input type="select" name="column1" id="column1" value={this.state.filterColText1} onChange={this.handleFilterCol} >
																<option value={0}>All</option>
																<option value={1}>High</option>
																<option value={2}>Medium</option>
																<option value={3}>Low</option>
															</Input>
														</th>
													}
													{ !_.isEmpty(this.state.columnHeader2) &&
														<th><Input type="text" name="column2" id="column2" value={this.state.filterColText2} onChange={this.handleFilterCol} /></th>
													}
													{ !_.isEmpty(this.state.columnHeader3) &&
														<th><Input type="text" name="column3" id="column3" value={this.state.filterColText3} onChange={this.handleFilterCol} /></th>
													}
													{ !_.isEmpty(this.state.columnHeader4) &&
														<th><Input type="text" name="column4" id="column4" value={this.state.filterColText4} onChange={this.handleFilterCol} /></th>
													}
													{ !_.isEmpty(this.state.columnHeader5) &&
														<th><Input type="text" name="column5" id="column5" value={this.state.filterColText5} onChange={this.handleFilterCol} /></th>
													}
													{ !_.isEmpty(this.state.columnHeader6) &&
														<th><Input type="text" name="column6" id="column6" value={this.state.filterColText6} onChange={this.handleFilterCol} /></th>
													}
													{ !_.isEmpty(this.state.columnHeader7) &&
														<th><Input type="text" name="column7" id="column7" value={this.state.filterColText7} onChange={this.handleFilterCol} /></th>
													}
													{ !_.isEmpty(this.state.columnHeader8) &&
														<th><Input type="text" name="column8" id="column8" value={this.state.filterColText8} onChange={this.handleFilterCol} /></th>
													}
													{ !_.isEmpty(this.state.columnHeader9) &&
														<th><Input type="date" name="column9" id="column9" value={this.state.filterColText9} onChange={this.handleFilterCol} /></th>
													}
													{ !_.isEmpty(this.state.columnHeader10) &&
														<th></th>
													}
												</tr>
											}
										</thead>
										<tbody>
											{mappedRecords}
										</tbody>
									</Table>
									{ this.state.showPagination && this.state.pageSize > 1 &&
										<nav>
											<Pagination>
												<PaginationItem onClick={() => this.setState(prev => ({page: prev.page -1}))}>
													<PaginationLink>Back</PaginationLink>
												</PaginationItem>
												{paginationItems}
												<PaginationItem onClick={() => this.setState(prev => ({page: prev.page + 1}))}>
												<PaginationLink next tag="button">Next
											</PaginationLink>
												</PaginationItem>
											</Pagination>
										</nav>
									}
									{ this.state.showPriorityColumn &&
										<React.Fragment>
											<Row><br/></Row>
											<Row className="justify-content-start">
												<Col sm={1}>
													<i className="fa fa-exclamation-circle">High</i>
												</Col>
												<Col sm={1}>
													<i className="fa fa-dot-circle">Medium</i>
												</Col>
												<Col sm={1}>
													<i className="fa fa-arrow-alt-circle-down">Low</i>
												</Col>
												<Col sm={8}/>
											</Row>
										</React.Fragment>
									}
								</CardBody>
							</Card>
							</Col>
						</Row>
					</div>
				}
			</div>
		)
	}
}
 
  