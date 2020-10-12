import React from 'react'
import Reflux from 'reflux'
import {
	NavItem,
	NavLink,
} from 'reactstrap'
import { Link } from 'react-router-dom'

import AppActions from 'actions/app.js'
import AppStore from 'stores/app.js'

// import styles from 'layout/menu/button.module.css'


export default class button extends Reflux.Component{
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
			
		const styling = {}

		styling.navItem = ''
		styling.navLink = ''

		// can't concatenate the "Active" on the end because styles.xx gets parsed to hash name already
		// if (this.state.activeMenuItem === this.props.name){
			// styling.navItem = styles.navItemCustomActive
			// styling.navLink = styles.navLinkCustomActive
		// }

		return (
            <NavItem className={styling.navItem}>
                <NavLink
                    tag={Link}
                    to={this.props.url}
                    onClick={AppActions.setActiveMenuItem}
                    name={this.props.name}
					className={styling.navLink}
                >
                    {this.props.label}
                </NavLink>
            </NavItem>
		)
	}
}
