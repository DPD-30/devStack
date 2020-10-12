import React from 'react'
import Reflux from 'reflux'
import _ from 'lodash'
import { Table, Button, Modal, ModalHeader,ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap'

import Header from 'components/tables/header.jsx'

import AppStore from 'stores/app.js'
import AppActions from 'actions/app.js'


export default class roles extends Reflux.Component {
	constructor(props) {
		super(props)

		this.state = {
			roles: [],
			roles_status: '',
			showModal: false,
			roleTitle: '',
			description: '', 
			roleId: 0,
			validRoleTitle: true,
			validDescription: true, 
			newRole: false,
			isSaving: false,
			isDeleting: false,
			createdUser: null,
			createdDate: null,
		}

		this.store = AppStore
		this.storeKeys = [
			'roles',
			'roles_status',
		]
 
		this.toggleModal = this.toggleModal.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleAddNew = this.handleAddNew.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleDoubleClick = this.handleDoubleClick.bind(this)
		this.getValidationResults = this.getValidationResults.bind(this)
	}

	componentDidMount() {
		AppActions.getRoles()
	}

	handleAddNew()  {
		this.setState({roleId: '', roleTitle:'', description: '', validRoleTitle: true,validDescription: true, newRole: true})

		this.toggleModal()
	}

	handleSave(event) {

		if (event.target !== null) {
			const hasErrors = this.getValidationResults(true)

			if(!hasErrors) {
				
				this.setState({ isSaving: true })
			
				if (this.state.newRole) {
					AppActions.addRole({
						RoleId: 0,
						RoleTitle: this.state.roleTitle, 
						Description: this.state.description,  
						onSuccess: () => this.setState({
							isChanged: false,
							isSaving: false,
							showModal: !this.state.showModal,
						}),
					})
				} else {
					AppActions.updateRole({
						RoleId: (this.state.roleId),
						RoleTitle: this.state.roleTitle, 
						Description: this.state.description, 
						CreatedDate: this.state.createdDate,
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

	handleDelete() {
		AppActions.deleteRole({
			roleId: (this.state.roleId),
			onSuccess: () => this.setState({
				isChanged: false,
				isSaving: false,
			}),
			onFailure: () => this.setState({
				isChanged: false,
				isSaving: false,
			}),
		})
		this.setState({
			showModal: !this.state.showModal
		})
	}

	handleIDChange = e => {
		this.setState({roleId: e.target.value}) 
	}

	handleRoleTitleChange = e => {
		this.setState({roleTitle: e.target.value}) 
	}
 
	handeDescriptionChange = e => {
		this.setState({description: e.target.value}) 
	}

	getValidationResults(formSubmitted) {

		if (formSubmitted === true) {
			this.setState({validDescription: true, validRoleTitle: true})

			if (!this.state.roleTitle) {
				this.setState({validRoleTitle: false})
			}

			if (!this.state.description) {
				this.setState({validDescription: false})
			}
 

			return (!this.state.roleTitle || !this.state.description)
		}
	}

	handleDoubleClick(event) {

		if (event !== null) {
			this.setState({roleId: event.roleId, roleTitle:event.roleTitle, description: event.description, newRole: false,showModal: !this.state.showModal,                
				createdUser: event.createdUser,
				createdDate: event.createdDate,
				modifiedUser: event.modifiedUser,
				modifiedDate: event.modifiedDate,})
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
		const status = this.state.roles_status

		const mappedRoles = !_.isNil(this.state.roles) 
			? this.state.roles.map(theRole => (
					<tr key={theRole.roleId} onClick={() => this.handleDoubleClick(theRole)}>
						<td>{theRole.roleId}</td>
						<td>{theRole.roleTitle}</td>
						<td>{theRole.description}</td> 						
						<td>{theRole.modifiedDate.split('T')[0]}</td>
					</tr>
				))
			: null

		return (
			<div>
				<div>
					<Header
						headerText ={"Role Management"}
						buttonText ={"Add a role"}
						buttonClick ={this.handleAddNew}
					/>
				</div>

				<Modal isOpen={this.state.showModal} toggle={this.toggleModal} className={className}>
					<ModalHeader toggle={this.toggleModal}><strong>Role</strong></ModalHeader>
					<ModalBody>
						<div>
						<Form>
						
							<FormGroup>
								<Label for="roleTitle">Title</Label>
								 
								<Input type="textarea" name="roleTitle" id="roleTitle" value={this.state.roleTitle}  placeholder="" rows={1} onChange={this.handleRoleTitleChange} invalid={!this.state.validRoleTitle}/>
							 
							</FormGroup>
							<FormGroup>
								<Label for="description">Description</Label>
							 
								<Input type="textarea" name="description" id="description" value={this.state.description}  placeholder="" rows={5} onChange={this.handeDescriptionChange} invalid={!this.state.validDescription}/>
							 
							</FormGroup> 
							<FormGroup>             
								<div>   
								{this.state.newRole === false &&
								<div>          
									Created<br />
									
									{this.state.createdUser}<br />
									
									{
										this.state.createdDate !== null &&

										<>
											{this.state.createdDate.split('T')[0]}<br />
											{this.state.createdDate.split('T')[1].split('.')}
										</>
									}
								</div>
								}
								</div>   
								</FormGroup>
								{(!_.isNil(this.state.modifiedUser) && !_.isNil(this.state.modifiedDate)) && this.state.newRole === false &&
								<FormGroup>
									
									Modified<br />
									
									{this.state.modifiedUser}<br />
									
									{this.state.modifiedDate.split('T')[0]}<br />
									{this.state.modifiedDate.split('T')[1].split('.')}
								</FormGroup>
							}
							<FormGroup> 
								<Input type="hidden" name="roleID" id="roleId" disabled={true} value={this.state.roleId} placeholder="" rows={1}  onChange={this.handleIDChange}/>
							 
							</FormGroup>
							
						</Form>
						</div>
					</ModalBody>
					<ModalFooter>
					<Button color="link" onClick={this.toggleModal}>Cancel</Button>{' '}
						{!this.state.newRole && <div><Button color="danger" disabled={this.state.isDeleting} onClick={this.handleDelete}>Delete Role</Button>{' '}</div>}
						<Button color="primary"  disabled={this.state.isSaving} onClick={this.handleSave}>Save Role</Button>
					
					</ModalFooter>
				</Modal>

				{
					status === 'LOADING' &&

					'Loading roles...'
				}
				{
					status === 'FAILURE' &&

					'Failed to load the roles!'
				}
				{
					status === 'SUCCESS' &&
						<Table striped responsive={true}>
						<thead>
							<tr>
								<th>ID</th>
								<th>Title</th>
								<th>Description</th>  
								<th>Modified</th> 
							</tr>
						</thead>
						<tbody>
							{mappedRoles}
						</tbody>
					</Table>

				}

			</div>
		)
	}
}
