import React from "react";
import Reflux from "reflux";
import _ from "lodash";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";

import Header from 'components/tables/header.jsx'

import AppStore from "stores/app.js";
import AppActions from "actions/app.js";

export default class users extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      users_status: "",
      showModal: false, 
      userId: 0,
      roleId: 0,
      validFirstName: true,      
      validLastName: true, 
      validUserName: true,
      validRoleId: true,
      validEmail: true, 
      newUser: false,
      isSaving: false,
      isDeleting: false,
      createdUser: null,
      createdDate: null,
    };

    this.store = AppStore;
    this.storeKeys = ["users", "users_status","roles"];

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAddNew = this.handleAddNew.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.getValidationResults = this.getValidationResults.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this)
    this.getRoleName = this.getRoleName.bind(this)
  }

  componentDidMount() {
    AppActions.getUsers();
    AppActions.getRoles();
  }

  handleAddNew() {
    this.setState({
      userId: 0, 
      validFirstName: true,
      validEmail: true,
      validLastName: true, 
      validUserName: true,        
      newUser: true,
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
      userName: '',
      roleId: 0,
      createdUser: null,
      createdDate: null,

    });

    this.toggleModal();
  }

  getRoleName(roleId)
  {
    if (roleId > 0)
    {
      const role = _.filter(this.state.roles, {'roleId': roleId})
      if(role.length > 0)
      {
        return role[0].roleTitle
      }
    }else{
      return ''
    }
  }

  handleSave(event) {
    if (event.target !== null) {
      const hasErrors = this.getValidationResults(true);
  
      if (!hasErrors) {
        this.setState({ isSaving: true });
  
        if (this.state.newUser) {
  
          AppActions.addUser({
            userId: 0,
            firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            email: this.state.email,
            userName: this.state.userName,
            isActive: true,
            roleId: this.state.roleId,
            onSuccess: () =>
              this.setState({
                isChanged: false,
                isSaving: false,
                showModal: !this.state.showModal,
              }),
          });
        } else {
        AppActions.updateUser({
          userId: this.state.userId,
          firstName: this.state.firstName,
            middleName: this.state.middleName,
            lastName: this.state.lastName,
            email: this.state.email,
            userName: this.state.userName, 
            roleId: this.state.roleId,
            onSuccess: () =>
              this.setState({
                isChanged: false,
                isSaving: false,
                showModal: !this.state.showModal,
              }),
          });
        }
      }
    }
  }

  handleDelete(event) {
    AppActions.deleteUser({
      userId: this.state.userId,
      onSuccess: () =>
        this.setState({
          isChanged: false,
          isSaving: false,
        }),
    });
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  handleTextChange(x) {
    const dataObject = _.cloneDeep(this.state);
    dataObject[x.target.name] = x.target.value;
    this.setState(dataObject);
  }


  getValidationResults(formSubmitted) {
    if (formSubmitted === true) {
      this.setState({
        validFirstName: true,
        validLastName: true,
        validEmail: true,
        validUserName: true,
      });

      if (!this.state.firstName) {
        this.setState({ validFirstName: false });
      }

      if (!this.state.lastName) {
        this.setState({ validLastName: false });
      }

      if (!this.state.email) {
        this.setState({ validEmail: false });
      }

      if (!this.state.userName) {
        this.setState({ validUserName: false });
      }

    
      if (!this.state.roleId) {
        this.setState({ validRoleId: false });
      }
      return (
        !this.state.email || !this.state.firstName || !this.state.lastName || !this.state.lastName || !this.state.validRoleId
      )
    }
  }

  handleDoubleClick(event) {
    if (event !== null) {
      this.setState({
        userId: event.userId,
        firstName: event.firstName,
        middleName: event.middleName,
        lastName: event.lastName,
        email: event.email,
        userName: event.userName,
        roleId: event.roleId,
        newUser: false,
        showModal: !this.state.showModal,                
        createdUser: event.createdUser,
        createdDate: event.createdDate,
        modifiedUser: event.modifiedUser,
        modifiedDate: event.modifiedDate,
      });
    }
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  render() {
    
    const { className } = this.props;

    const status = this.state.users_status;

    const mappedUsers = !_.isNil(this.state.users)
      ? this.state.users.map((theUser) => (
          <tr
            className="clickableRow"
            key={theUser.userId}
            onClick={() => this.handleDoubleClick(theUser)}
          >
            <td>{theUser.userId}</td>
            <td>{theUser.firstName}</td>
            <td>{theUser.middleName}</td>
            <td>{theUser.lastName}</td>
            <td>{theUser.email}</td>
            <td>{theUser.userName}</td>
            <td>{this.getRoleName(theUser.roleId)}</td>
						<td>{theUser.modifiedDate.split('T')[0]}</td>
          </tr>
        ))
      : [{}];

      const mappedRoles = !_.isNil(this.state.roles)
      ? this.state.roles.map((theRole) => (
        <option value={Number(theRole.roleId)}>{theRole.roleTitle}</option> 
        ))
      : [{}];

    return (
      <div> 
        	<div>
			<Header headerText ={"User Management"}
				buttonText ={"Add a user"}
				buttonClick ={this.handleAddNew} />
				</div>
        

        <Modal
          isOpen={this.state.showModal}
          toggle={this.toggleModal}
          className={className}
        >
          <ModalHeader toggle={this.toggleModal}>
            <strong>User</strong>
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                  <Input
                    type="hidden"
                    name="userID"
                    id="userId"
                    disabled={true}
                    value={this.state.userId}
                    placeholder=""
                    rows={1}
                    onChange={this.handleTextChange}
                  /> 
              </FormGroup>
              <FormGroup>
                <Label for="title">
                  First Name
                </Label> 
                  <Input
                    type="textbox"
                    name="firstName"
                    id="firstName"
                    value={this.state.firstName}
                    placeholder=""
                    rows={1}
                    onChange={this.handleTextChange}
                    invalid={!this.state.validFirstName}
                  /> 
              </FormGroup>
              <FormGroup>
                <Label for="middleName">
                  Middle Name
                </Label> 
                  <Input
                    type="textbox"
                    name="middleName"
                    id="middleName"
                    value={this.state.middleName}
                    placeholder=""
                    rows={5}
                    onChange={this.handleTextChange} 
                  /> 
              </FormGroup>
              <FormGroup>
                <Label for="lastName">
                  Last Name
                </Label> 
                  <Input
                    type="textbox"
                    name="lastName"
                    id="lastName"
                    value={this.state.lastName}
                    placeholder=""
                    rows={5}
                    onChange={this.handleTextChange}
                    invalid={!this.state.validLastName}
                  /> 
              </FormGroup>
              <FormGroup>
                <Label for="email">
                  Email
                </Label> 
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.email}
                    placeholder=""
                    rows={5}
                    onChange={this.handleTextChange}
                    invalid={!this.state.validEmail}
                  /> 
              </FormGroup>
              <FormGroup>
                <Label for="userName">
                  User Name
                </Label> 
                  <Input
                    type="textbox"
                    name="userName"
                    id="userName"
                    value={this.state.userName}
                    placeholder=""
                    rows={5}
                    onChange={this.handleTextChange}
                    invalid={!this.state.validUserName}
                  /> 
              </FormGroup>
              <FormGroup>
                <Label for="roleId">
                  Role
                </Label> 
                <Input type="select" name="roleId" id="roleId" value={this.state.roleId} 
										onChange={this.handleTextChange} invalid={!this.state.validRoleId}>
                       <option value={Number(0)}>{"-------"}</option> 
								{mappedRoles}
								</Input> 
              </FormGroup>
              <FormGroup>
             
              <div>   
                {this.state.newUser === false &&
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
              {(!_.isNil(this.state.modifiedUser) && !_.isNil(this.state.modifiedDate))  && this.state.newUser === false &&
              <FormGroup>
                 
                    Modified<br />
                 
                 
                  {this.state.modifiedUser}<br />
                 
									{this.state.modifiedDate.split('T')[0]}<br />
									{this.state.modifiedDate.split('T')[1].split('.')}
              </FormGroup>
              } 
            </Form>
          </ModalBody>
          <ModalFooter>
          <Button color="link" onClick={this.toggleModal}>
              Cancel
            </Button>
           {" "}
            {!this.state.newUser && (
              <div>
                <Button
                  color="danger"
                  disabled={this.state.isDeleting}
                  onClick={this.handleDelete}
                >
                  Delete User
                </Button>{" "}
              </div>
            )}
             <Button
              color="primary"
              disabled={this.state.isSaving}
              onClick={this.handleSave}
            >
              Save User
            </Button>
         
          </ModalFooter>
        </Modal>

        {status === "LOADING" && "Loading users..."}
        {status === "FAILURE" && "Failed to load the users!"}
        {status === "SUCCESS" && (

        <Table striped responsive={true}>
            <thead>
              <tr>
                <th>ID</th>
                <th>First</th>                
                <th>Middle</th>
                <th>Last</th>
                <th>Email</th>
                <th>UserName</th>
                <th>Role</th>
                <th>Last Modified</th> 
              </tr>
            </thead>
            <tbody className="tableData">{mappedUsers}</tbody>
          </Table>
        )}
      </div>
    );
  }
}
