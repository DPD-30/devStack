import React from 'react'
import Reflux from 'reflux'
import { Table, Button } from 'reactstrap'

import AppStore from 'stores/app.js'
import AppActions from 'actions/app.js'

import AppSettingRow from 'pages/admin/appSettings/row.jsx'


export default class index extends Reflux.Component {
	constructor(props) {
		super(props)

		this.state = {
			appSettings: [],
			appSettings_status: '',
			addDisabled: false,
		}

		this.store = AppStore
		this.storeKeys = [
			'appSettings',
			'appSettings_status',
			'appSettingsAdd_status',
		]
	}

	componentDidMount() {
		AppActions.getAppSettings({
			appSettingId: 0,
		})
	}

	render() {
		const status = this.state.appSettings_status
		const mappedSettings = (this.state.appSettings.length > 0)
			? this.state.appSettings.map(
				setting => (
					<AppSettingRow
						key={setting.appSettingId}
						id={setting.appSettingId}
						name={setting.appSettingName}
						value={setting.appSettingValue}
					/>
				)
			)
			: null

		return (
			<div>
				{
					status === 'LOADING' &&

					'Loading appSettings...'
				}
				{
					status === 'FAILURE' &&

					'Failed to load the appSettings!'
				}
				{
					status === 'SUCCESS' &&

					<div>
						<Table striped>
							<thead>
								<tr>
									<th>{'Setting'}</th>
									<th>{'Value'}</th>
									<th />
									<th />
								</tr>
							</thead>
							<tbody>
								{mappedSettings}
							</tbody>
						</Table>
						<p>
							<Button
								disabled={this.state.addDisabled}
								onClick={() => {
									this.setState({ addDisabled: true })

									AppActions.addAppSetting({
										appSettingName: 'newSetting',
										appSettingValue: '12345abcde',
										onSuccess: () => this.setState({ addDisabled: false })
									})
								}}
							>
								Add
							</Button>
						</p>
					</div>
				}
			</div>
		)
	}
}
