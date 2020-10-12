import React from 'react'
import Reflux from 'reflux'
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap';
import FontAwesome from 'react-fontawesome'

import AppActions from 'actions/app.js'
import AppStore from 'stores/app.js'

import MenuButton from 'layout/menu/button.jsx'
import Dropdown from 'layout/menu/dropdown.jsx'
import DropdownItem from 'layout/menu/dropdownItem.jsx'
import IsAuthenticatedAzure from 'security/isAuthenticatedAzure.jsx'


export default class index extends Reflux.Component{
	constructor(props){
		super(props)

		this.store = AppStore
		this.storeKeys = ['isMenuOpen', 'isAuthenticatedAzure', 'isAuthenticatedLocal']
	}

	render(){
		return (
			<Navbar color="dark" expand="md">
				<NavbarToggler onClick={AppActions.toggleMenu} className="mr-2">
					<FontAwesome
						name="bars"
					/>
				</NavbarToggler>

				<Collapse isOpen={this.state.isMenuOpen} navbar>
					<Nav navbar>
						<MenuButton
							name="home"
							label="Home"
							url="/"
						/>
						<MenuButton
							name="login"
							label="Login"
							url="/login"
						/>
						<IsAuthenticatedAzure check={false}>
							<MenuButton
					 			name="admin"
					 			label="Admin"
					 			url="/azure"
					 		/>
						</IsAuthenticatedAzure>
						<IsAuthenticatedAzure check={true}>
							<Dropdown label="Admin">
								<DropdownItem name="dashboard" url="/azure/dashboard" label="Dashboard" />
								<DropdownItem name="adminCards" url="/azure/cards" label="Cards" />
								<DropdownItem name="adminRoles" url="/azure/roles" label="Roles" />
								<DropdownItem name="adminUsers" url="/azure/users" label="Users" />
								<DropdownItem name="adminSettings" url="/azure/appSettings" label="Settings" />
							</Dropdown>
						</IsAuthenticatedAzure>
					</Nav>
				</Collapse>
			</Navbar>
		)
	}
}
