import Reflux from 'reflux'


export default class SwaggerStore extends Reflux.Store {
	constructor(props) {
		super(props)

		this.state = {
			isAuthenticatedAzure: true, // most things will test for true, default as true for mocking
			isAuthenticatedLocal: true, // most things will test for true, default as true for mocking
			swagger: {
				default: {},
				AppSetting: {},
				mockTag: {},
				Role: {},
				roles: {},
			},
			delayLoading: false,
			activeMenuItem: 'home',
			isMenuOpen: false,
			userAzureAccount: {
				environment: '',
				homeAccountId: '',
				name: '',
				tenantId: '',
				username: '',
			},

			appSettings_status: 'SUCCESS',
			appSettings: [
				{"appSettingId":1,"appSettingName":"newSetting","appSettingValue":"12345abcde"},
				{"appSettingId":2,"appSettingName":"newSetting","appSettingValue":"123"},
				{"appSettingId":3,"appSettingName":"newSetting","appSettingValue":"ABC"}
			],

			roles_status: 'SUCCESS',
			roles: [
				{"roleId":4,"roleTitle":"Test title 1","description":"Description 1","modifiedUser":"andersonjb","createdUser":"andersonjb","createdDate":"2020-10-04T00:00:00","modifiedDate":"2020-10-04T00:00:00"},
				{"roleId":7,"roleTitle":"Test title 2","description":"Description 2","modifiedUser":"andersonjb","createdUser":"andersonjb","createdDate":"2020-10-03T00:00:00","modifiedDate":"2020-10-03T00:00:00"},
			],
		}

		this.listenables = null//AppActions

		this.msalApp = null//new PublicClientApplication(msalConfig);
		this.useRedirectFlow = false
	}
}
