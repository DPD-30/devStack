import React from 'react'
import Reflux from 'reflux'

import AppStore from 'stores/app.js'

// import HeaderTransition from 'layout/header/transition.jsx'
// import HeaderOpened from 'layout/header/isOpened.jsx'
// import HeaderClosed from 'layout/header/isClosed.jsx'
// import HeaderBurger from 'layout/header/burger.jsx'

import HeaderImage from 'images/header.jpg'

// import LoginButton from 'components/auth/loginButton.jsx'
// import LogoutButton from 'components/auth/logoutButton.jsx'


export default class index extends Reflux.Component {
	constructor(props){
		super(props)

		this.store = AppStore
		this.storeKeys = ['isMenuOpen']
	}

			// <div style={{ position: 'relative' }}>
			// 	<HeaderTransition visible={this.state.isMenuOpen === true}>
			// 		<HeaderOpened />
			// 	</HeaderTransition>
			// 	<HeaderClosed />

			// 	<HeaderBurger />
			// </div>
	render(){
		return (
			<div style={{
				height: '134px',
				width: '100%',
				background: 'url(' + HeaderImage + ')',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover'
				// backgroundSize: '1920px 134px'
			}}>
				<div style={{ padding: '1.3em 1em', fontSize: '32px', fontWeight: 'bold', color: '#19476A' }}>
					Header
				</div>
			</div>
		)
	}
}
