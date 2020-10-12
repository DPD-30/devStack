import React from 'react'
import Reflux from 'reflux'
import { DropdownItem } from 'reactstrap'
import { Link } from 'react-router-dom'

import AppActions from 'actions/app.js'
import AppStore from 'stores/app.js'

// import styles from 'layout/menu/button.module.css'


export default class dropdownItem extends Reflux.Component{
	constructor(props){
		super(props)

		this.store = AppStore
		this.storeKeys = ['activeMenuItem']
	}

	render(){
		// const styling = {
		// 	navItem: styles.navItemCustom,
		// 	navLink: styles.navLinkCustom,
		// }

		// // can't concatenate the "Active" on the end because styles.xx gets parsed to hash name already
		// if (this.state.activeMenuItem === this.props.name){
		// 	styling.navItem = styles.navItemCustomActive
		// 	styling.navLink = styles.navLinkCustomActive
		// }

		return (
            <DropdownItem
                tag={Link}
                to={this.props.url}
                onClick={AppActions.setActiveMenuItem}
                name={this.props.name}
            >
                {this.props.label}
            </DropdownItem>

		)
	}
}
