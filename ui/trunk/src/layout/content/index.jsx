import React from 'react'
import Reflux from 'reflux'
import { Alert } from 'reactstrap'

import AppStore from 'stores/app.js'
import Routes from 'routes/index.jsx'
import styles from 'layout/content/index.module.css'

export default class index extends Reflux.Component {
	constructor(props){
		super(props)

		this.store = AppStore
		this.storeKeys = ['swagger']
	}

	render(){
		return (
			<div className={styles.content}>
			{
				this.state.swagger !== 'ERROR' &&
				
				<Routes />
			}
			{
				this.state.swagger === 'ERROR' &&
				
				<div>
					<Alert color="danger">
						Unable to connect to the API!
					</Alert>
				<p>Details in console.</p>
				</div>
			}
			</div>
		)
	}
}
