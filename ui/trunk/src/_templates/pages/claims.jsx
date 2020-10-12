import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
import { Table, Col, Row, Button, Modal, ModalHeader,ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap'

import AppStore from 'stores/app.js'
import AppActions from 'actions/app.js'


export default class PageClaims extends Reflux.Component {
	constructor(props) {
		super(props)

		this.state = {
			claims: [],
			claims_status: '',
			showModal: false,
			title: '',
			description: '',
			claimCode: '',
			claimId: '',
			validTitle: true,
			validDescription: true,
			validClaimCode: true,
			newClaim: false,
			isSaving: false,
			isDeleting: false,
		}

		this.store = AppStore
		this.storeKeys = [
			'claims',
			'claims_status',
		]
 
		this.toggleModal = this.toggleModal.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleAddNew = this.handleAddNew.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleDoubleClick = this.handleDoubleClick.bind(this)
		this.getValidationResults = this.getValidationResults.bind(this)
	}

	componentDidMount() {
		AppActions.getClaims()
	}

	handleAddNew()  {
		this.setState({claimId: '', title:'', description: '', claimCode:'', validTitle: true,validDescription: true, validClaimCode: true, newClaim: true})

		this.toggleModal()
	}

	handleSave(event) {

		if (event.target !== null) {
			const hasErrors = this.getValidationResults(true)

			if(!hasErrors) {
				
				this.setState({ isSaving: true })
			
				if (this.state.newClaim) {
					AppActions.addClaim({
						claimId: !_.isNil(this.state.claimId) && !_.isEmpty(this.state.claimId) ? Number(this.state.claimId) : 0, 
						title: this.state.title, 
						description: this.state.description, 
						claimCode: this.state.claimCode,
						onSuccess: () => this.setState({
							isChanged: false,
							isSaving: false,
							showModal: !this.state.showModal,
						}),
					})
				} else {
					AppActions.updateClaim({
						claimId: (this.state.claimId),
						title: this.state.title, 
						description: this.state.description, 
						createdDate: this.state.createdDate,
						claimCode:   this.state.claimCode,
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

	handleDelete(event) {
		if (event.target !== null) {

			AppActions.deleteClaim({
				claimId: (this.state.claimId),
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

	handleIDChange = e => {
		this.setState({claimId: e.target.value}) 
	}

	handleTitleChange = e => {
		this.setState({title: e.target.value}) 
	}

	handeClaimCodeChange = e => {
		this.setState({claimCode: e.target.value}) 
	}

	handeDescriptionChange = e => {
		this.setState({description: e.target.value}) 
	}

	getValidationResults(formSubmitted) {

		if (formSubmitted === true) {
			this.setState({validDescription: true, validClaimCode: true, validTitle: true})

			if (!this.state.title) {
				this.setState({validTitle: false})
			}

			if (!this.state.description) {
				this.setState({validDescription: false})
			}

			if (!this.state.claimCode) {
				this.setState({validClaimCode: false})
			}

			return (!this.state.title || !this.state.description || !this.state.claimCode)
		}
	}

	handleDoubleClick(event) {

		if (event !== null) {
			this.setState({claimId: event.claimId, title:event.title, description: event.description, claimCode: event.claimCode, newClaim: false,showModal: !this.state.showModal})
		}
	}

	toggleModal() {
		this.setState({
		  showModal: !this.state.showModal
		})
	}

	render() {
		const {
			className
		  } = this.props;

		const status = this.state.claims_status

		const mappedClaims = !_.isNil(this.state.claims) 
			? this.state.claims.map(claims => (
					<tr key={claims.claimId} onClick={() => this.handleDoubleClick(claims)}>
						<td>{claims.claimId}</td>
						<td>{claims.title}</td>
						<td>{claims.description}</td>
						<td>{claims.claimCode}</td>
					</tr>
				))
			: [{}]

		return (
			<div>
				<Row className="justify-content-md-center">
					<h1><strong>Claims</strong></h1>
					<Button color="primary" size="sm" style={{ "margin": "10px", "borderRadius": 10, height: "min-content"}} onClick={this.handleAddNew}>Add</Button> 
				</Row>

				<Modal isOpen={this.state.showModal} toggle={this.toggleModal} className={className}>
					<ModalHeader toggle={this.toggleModal}><strong>Claims</strong></ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup row>
								<Label for="claimId" sm={2}>Claim ID</Label>
								<Col sm={10}>
								<Input type="textarea" name="claimID" id="claimId" disabled={true} value={this.state.claimId} placeholder="" rows={1}  onChange={this.handleIDChange}/>
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
								<Label for="claimCode" sm={2}>Claim Code</Label>
								<Col sm={10}>
								<Input type="textarea" name="claimCode" id="claimCode" value={this.state.claimCode}  placeholder="" rows={5} onChange={this.handeClaimCodeChange} invalid={!this.state.validClaimCode}/>
								</Col>
							</FormGroup>
						</Form>
						
					</ModalBody>
					<ModalFooter>
						<Button color="primary"  disabled={this.state.isSaving} onClick={this.handleSave}>Save</Button>{' '}
						{!this.state.newClaim && <div><Button color="danger" disabled={this.state.isDeleting} onClick={this.handleDelete}>Delete</Button>{' '}</div>}
						<Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
					</ModalFooter>
				</Modal>

				{
					status === 'LOADING' &&

					'Loading claims...'
				}
				{
					status === 'FAILURE' &&

					'Failed to load the claims!'
				}
				{
					status === 'SUCCESS' &&

					<Table striped>
						<thead>
							<tr>
								<th>ID</th>
								<th>Title</th>
								<th>Description</th>
                                <th>Claim Code</th>
							</tr>
						</thead>
						<tbody>
							{mappedClaims}
						</tbody>
					</Table>
				}

			</div>
		)
	}
}
