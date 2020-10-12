import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
import { Table, Col, Row, Button, Modal, ModalHeader,ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap'

import AppStore from 'stores/app.js'
import AppActions from 'actions/app.js'


export default class PageCases extends Reflux.Component {
	constructor(props) {
		super(props)

		this.state = {
			cases: [],
			cases_status: '',
			showModal: false,
			title: '',
			description: '',
			statusID: '',
			caseId: '',
			validTitle: true,
			validDescription: true,
			validStatus: true,
			newCase: false,
			isSaving: false,
			isDeleting: false,
		}

		this.store = AppStore
		this.storeKeys = [
			'cases',
			'cases_status',
		]

		this.toggleModal = this.toggleModal.bind(this)
		this.handleSaveModal = this.handleSaveModal.bind(this)
		this.handleAddNewCase = this.handleAddNewCase.bind(this)
		this.handleDeleteCase = this.handleDeleteCase.bind(this)
		this.handleDoubleClick = this.handleDoubleClick.bind(this)
		this.getValidationResults = this.getValidationResults.bind(this)
		this.getStatusString = this.getStatusString.bind(this)
		//this.handleTextChange = this.handleTextChange.bind(this)
	}

	componentDidMount() {
		AppActions.getCases()
	}

	toggleModal() {
		this.setState({
		  showModal: !this.state.showModal
		})
	}

	handleAddNewCase()  {
		this.setState({caseId: '', title:'', description: '', status:'', validTitle: true, validDescription:true,validStatus: true, newCase: true})
		this.toggleModal()
	}

	handleSaveModal(event) {

		if (event.target !== null) {
			const hasErrors = this.getValidationResults(true)

			if(!hasErrors) {
				
				this.setState({ isSaving: true })

				if (this.state.newCase) {
					AppActions.addCase({
						caseId: !_.isNil(this.state.caseId) && !_.isEmpty(this.state.caseId) ? Number(this.state.caseId) : 0, 
						title: this.state.title, 
						description: this.state.description, 
						statusID: Number(this.state.statusID),
						onSuccess: () => this.setState({
							isChanged: false,
							isSaving: false,
							showModal: !this.state.showModal,
						}),
					})
				} else {
					AppActions.updateCase({
						caseId: (this.state.caseId),
						title: this.state.title, 
						description: this.state.description, 
						createdDate: this.state.createdDate,
						statusID:   Number(this.state.statusID),
						onSuccess: () => this.setState({
							isChanged: false,
							isSaving: false,
							showModal: !this.state.showModal,
						}),
					})
				}
			}
		}
	}

	handleDeleteCase(event) {
		if (event.target !== null) {

			AppActions.deleteCase({
				caseId: (this.state.caseId),
				onSuccess: () => this.setState({
					isChanged: false,
					isSaving: false,
				}),
			})
			this.setState({
				showModal: !this.state.showModal
			})
		}
	}
 
	// handleTextChange(x) {
	// 	const dataObject = _.cloneDeep(this.state)
	// 	dataObject.case[x.target.name] = x.target.value
	// 	this.setState({dataObject})
	// }

	handleIDChange = e => {
		this.setState({caseId: e.target.value}) 
	}

	handleTitleChange = e => {
		this.setState({title: e.target.value}) 
	}

	handeStatusChange = e => {
		this.setState({statusID: e.target.value}) 
	}

	handeDescriptionChange = e => {
		this.setState({description: e.target.value}) 
	}

	getStatusString(statusID) {
		const status = statusID === 1 ? 'Received' :
						statusID === 2 ? 'Open' :
						statusID === 3 ? 'Processing' :
						statusID === 4 ? 'Approved' : 'Closed'
 
		return status
	}
 
	getValidationResults(formSubmitted) {

		if (formSubmitted === true) {
			this.setState({validDescription: true, validStatus: true, validTitle: true})

			if (!this.state.title) {
				this.setState({validTitle: false})
			}

			if (!this.state.description) {
				this.setState({validDescription: false})
			}

			if (!this.state.statusID) {
				this.setState({validStatus: false})
			}
			return ( !this.state.title || !this.state.description || !this.state.statusID)
		}
	}

	handleDoubleClick(event) {

		if (event !== null) {
			this.setState({caseId: event.caseId, title:event.title, description: event.description, statusID: event.statusID, createdDate: event.createdDate, newCase: false,showModal: !this.state.showModal})
		}
	}
 

	render() {
		const {
			className
		  } = this.props;
 
        const status = this.state.cases_status  
		const mappedCases = !_.isNil(this.state.cases) 
			? this.state.cases.map(cases => (
				<tr key={cases.caseId} onClick={() => this.handleDoubleClick(cases)}>
					<td>{cases.createdDate.substr(0, 10)}</td>
					<td>{cases.caseId}</td>
					<td>{cases.title}</td>
					<td>{cases.description}</td>
					<td>{this.getStatusString(cases.statusID)}</td>
				</tr>
				))
			: [{}]
	 
		return (
			<div>
 
				<Row className="justify-content-md-center">
					 <h1><strong>Cases</strong></h1>
					 <Button color="primary" size="sm" style={{ "margin": "10px", "borderRadius": 10, height: "min-content"}} onClick={this.handleAddNewCase}>Add</Button> 
				</Row>
		 

				<Modal isOpen={this.state.showModal} toggle={this.toggleModal} className={className}>
					<ModalHeader toggle={this.toggleModal}><strong>Case</strong></ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup row>
								<Label for="caseID" sm={2}>Case ID</Label>
								<Col sm={10}>
								<Input type="textarea" name="caseID" id="caseID" disabled={true} value={this.state.caseId} placeholder="" rows={1}  onChange={this.handleIDChange}/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="title" sm={2}>Title</Label>
								<Col sm={10}>
								<Input type="textarea" name="title" id="title" value={this.state.title}  placeholder="" rows={1} onChange={this.handleTitleChange} invalid={!this.state.validTitle}/>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label for="description" sm={2}>Description</Label>
								<Col sm={10}>
								<Input type="textarea" name="description" id="description" value={this.state.description}  placeholder="" rows={5} onChange={this.handeDescriptionChange} invalid={!this.state.validDescription}/>
								</Col>
							</FormGroup>
							<FormGroup row>
							<Label for="statusDropDown" sm={2}>Status</Label>
								<Col sm={10}>
								<Input type="select" name="select" id="statusDropDown" value={this.state.statusID} 
										onChange={this.handeStatusChange} invalid={!this.state.validStatus}>
									<option value={0}>Select</option>
									<option value={1}>Received</option>
									<option value={2}>Open</option>
									<option value={3}>Processing</option>
									<option value={4}>Approved</option>
									<option value={5}>Closed</option>
								</Input>
								</Col>
      						</FormGroup>
						</Form>
						 
					</ModalBody>
					<ModalFooter>
						<Button color="primary"  disabled={this.state.isSaving} onClick={this.handleSaveModal}>Save</Button>{' '}
						{!this.state.newCase && <div><Button color="danger" disabled={this.state.isDeleting} onClick={this.handleDeleteCase}>Delete</Button>{' '}</div>}
						<Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
					</ModalFooter>
				</Modal>

				{
					status === 'LOADING' &&

					'Loading cases...'
				}
				{
					status === 'FAILURE' &&

					'Failed to load the cases!'
				}
				{
					status === 'SUCCESS' &&

					<Table striped>
						<thead>
							<tr>
								<th>Date</th>
								<th>ID</th>
								<th>Title</th>
								<th>Description</th>
                                <th>Status</th>
							</tr>
						</thead>
						<tbody>
							{mappedCases}
						</tbody>
					</Table>
				}
			</div>
		)
	}
}
