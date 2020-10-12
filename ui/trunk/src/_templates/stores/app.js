import React from 'react'
import _ from 'lodash'


export default class SwaggerStoreTemplate {
	constructor(){
		this.state = {
			matchCount: 0,
			startMatching: false,
			currentStep: 0,
			responses: [],
			questions: [],
			dossier: {},
		
			ApplicationsExpiredAndLate: {
				expiredApplications: [],
				expiringApplications: [],
			},
		}
	}

	setMatchCount(event){
		const matchCount = parseInt(event.target.value, 10)

		let responses = []
		for (let x=0; x < matchCount; x++){
			responses[x] = null
		}

		this.setState({
			responses,
			matchCount,
			currentStep: 1,
		})
	}

	answer(resp){
		const newState = _.cloneDeep(this.state)

		newState.responses[this.state.currentStep - 1] = parseInt(resp, 10)

		// advance step if not done yet
		// if ((this.state.currentStep) < this.state.matchCount){
		// 	newState.currentStep = this.state.currentStep + 1
		// }

		this.setState(newState)
	}

	getQuestions(count){
		console.log('getQuestions(', count, ')')

		const questions = []

		this.getByTagAndFunc({
			tag: 'Classification',
			func: 'get',
			onSuccess: (x) => {
				for (let y = 0; y < count; y++){
					questions.push(x.obj[0])
				}

				this.setState({ questions })
			}
		})
	}

	getVisitHistory(lastname, firstname){
		this.swaggerPost({
			tag: 'WhiteHouseVisits',
			func: 'get',
			dataKey: 'dossier',
			nested: `${lastname}${firstname}`,
			body: {
				
			}

		})
	}

	startMatching(){
		this.getQuestions(this.state.matchCount)

		this.setState({ startMatching: true })
	}
	
	goNext(){
		this.setState({ currentStep: parseInt(this.state.currentStep + 1, 10) })
	}
	
	goPrev(){
		this.setState({ currentStep: parseInt(this.state.currentStep - 1, 10) })
	}
	

	// ************************************************************
	// ************************************************************
	// APPLICATIONS
	// ************************************************************
	// ************************************************************
	getVisitors(params) {
		this.swaggerPost({
			tag: 'WhiteHouseVisits',
			func: 'post',
			dataKey:'whiteHouseVisitLog',
			body: {
				NameLast: params.lastName,
				NameFirst: params.firstName,
			},
			status: 'whiteHouseVisitLog_status',
		})
	}
	// ************************************************************
	// ************************************************************
	// APPLICATIONS
	// ************************************************************
	// ************************************************************

	getApplicationsExpiredAndLate() {
		console.log('getApplicationsExpiredAndLate()')

		this.getByTagAndFunc({
			tag: 'Application',
			func: 'get',
			nested: 'expiring',
			dataKey: 'ApplicationsExpiredAndLate',
		})
	}

	// ************************************************************
	// ************************************************************

	getAppSettings() {
		console.log('GET APP SETTINGS CALL')

		this.getByTagAndFunc({
			tag: 'Application',
			func: 'get_Application_expiring',
			dataKey: 'appSettings',
		})
	}

	addAppSetting(params){
		this.swaggerPost({
			tag: 'AppSettings',
			func: 'post',
			body: {
				appSettingId: 0,
				appSettingName: params.appSettingName,
				appSettingValue: params.appSettingValue,
			},
			status: 'appSettingsAdd_status',
			onSuccess: () => {
				params.onSuccess()
				this.getAppSettings()
			},
		})
	}

	updateAppSetting(params){
		this.swaggerPut({
			tag: 'AppSettings',
			func: 'put',
			body: {
                appSettingId: params.appSettingId,
                appSettingName: params.appSettingName,
                appSettingValue: params.appSettingValue,
			},
			onSuccess: params.onSuccess,
		})
	}

	deleteAppSetting(params){
		this.swaggerDelete({
			tag: 'AppSettings',
			func: 'delete_AppSettings__id_',
			id: params.id,
			onSuccess: params.onSuccess,
		})
	}

	// ************************************************************
	// ************************************************************

	getRoles() {
		console.log('GET Role CALL')

		this.getByTagAndFunc({
			tag: 'Role',
			func: 'get',
			dataKey: 'roles',
		})
	}

	addRole(params){
		console.log('ADD Role CALL', params)

		this.swaggerPost({
			tag: 'Role',
			func: 'post',
			body: {
				RoleId: 0,
				RoleTitle: params.RoleTitle,
				Description: params.Description, 
			},
			status: 'post',
			onSuccess: () => {
				params.onSuccess()
				this.getRoles()
			},
		})
	}

	updateRole(params){
		console.log('UPDATE Role CALL', params)
		this.swaggerPut({
			tag: 'Role',
			func: 'put',
			body: {
				RoleId: params.RoleId,
				RoleTitle: params.RoleTitle,
				Description: params.Description, 
			},
			onSuccess: () => {
				params.onSuccess()
				this.getRoles()
			},
		})
	}

	deleteRole(params){
		console.log('DELETE CLAIM CALL', params)
		this.swaggerDelete({
			tag: 'Role',
			func: 'delete_Roles__id_',
			id: params.roleId,
			onSuccess: () => {
				params.onSuccess()
				this.getRoles()
			},
		})
	}
		
	// ************************************************************
	// ************************************************************

	getClaims() {
		console.log('GET CLAIMS CALL')

		this.getByTagAndFunc({
			tag: 'Claims',
			func: 'get',
			dataKey: 'claims',
		})
	}

	addClaim(params){
		console.log('ADD CLAIM CALL', params)

		this.swaggerPost({
			tag: 'Claims',
			func: 'post',
			body: {
				claimId: 0,
				title: params.title,
				description: params.description,
				claimCode: params.claimCode,
			},
			status: 'post',
			onSuccess: () => {
				params.onSuccess()
				this.getClaims()
			},
		})
	}

	updateClaim(params){
		console.log('UPDATE CLAIM CALL', params)
		this.swaggerPut({
			tag: 'Claims',
			func: 'put',
			body: {
				claimId: params.claimId,
				title: params.title,
				description: params.description,
				claimCode: params.claimCode,
			},
			onSuccess: () => {
				params.onSuccess()
				this.getClaims()
			},
		})
	}

	deleteClaim(params){
		console.log('DELETE CLAIM CALL', params)
		this.swaggerDelete({
			tag: 'Claims',
			func: 'delete_Claims__id_',
			id: params.claimId,
			onSuccess: () => {
				params.onSuccess()
				this.getClaims()
			},
		})
	}

	 // ************************************************************
	// ************************************************************
	getRmf() { 
 
		this.getByTagAndFunc({
			tag: 'Rmf',
			func: 'get',
			dataKey: 'rmf',
		})
	} 

	// ************************************************************
	// ************************************************************
	
	getApplication() { 
 
		this.getByTagAndFunc({
			tag: 'Application',
			func: 'get',
			dataKey: 'application',
		})
	}

	addApplication(params){ 

		this.swaggerPost({
			tag: 'Application',
			func: 'post',
			body: {
				ApplicationName: params.applicationName,
				ApplicationId: 0,
				StatusId: params.statusId,
				SystemOwner: params.systemOwner,
				IMatrixNumber: params.iMatrixNumber,
				POC: params.poc,
				phaseId: params.phaseId,
				expiration: params.expiration,						
			},
			status: 'post',
			onSuccess: () => {
				params.onSuccess()
				this.getApplication()
			},
		})
	}

	updateApplication(params){ 
		this.swaggerPut({
			tag: 'Application',
			func: 'put',
			body: {
				ApplicationName: params.applicationName,
				ApplicationId: params.applicationId,
				StatusId: params.statusID,
				SystemOwner: params.systemOwner,
				IMatrixNumber: params.iMatriNumber,
				POC: params.poc, 
			},
			onSuccess: () => {
				params.onSuccess()
				this.getApplication()
			},
		})
	}

	deleteApplication(params){ 

		this.swaggerDelete({
			tag: 'Application',
			func: 'delete_Application__id_',
			id: params.applicationId,
			onSuccess: () => {
				params.onSuccess()
				this.getApplication()
			},
		})
	}

	// ************************************************************
	// ************************************************************


	// ************************************************************
	// ************************************************************
	
	getCases() {
		console.log('GET CASES CALL')

		this.getByTagAndFunc({
			tag: 'Cases',
			func: 'get',
			dataKey: 'cases',
		})
	}

	addCase(params){
		console.log('ADD CASE CALL', params)

		this.swaggerPost({
			tag: 'Cases',
			func: 'post',
			body: {
				caseId: 0,
				title: params.title,
				description: params.description,
				statusID: params.statusID,
			},
			status: 'post',
			onSuccess: () => {
				params.onSuccess()
				this.getCases()
			},
		})
	}

	addResult(params){ 
		this.swaggerPost({
			tag: 'Questionnaire',
			func: 'post',
			body: {
				EmailAddress: params.EmailAddress,
				IsApproved: params.isApproved,
				AccountTypeID: params.accountTypeID, 
			},
			status: 'post',
			onSuccess: () => {
				params.onSuccess() 
			},
		})
	}


	updateCase(params){
		console.log('UPDATE CASE CALL', params)
		this.swaggerPut({
			tag: 'Cases',
			func: 'put',
			body: {
				caseId: params.caseId,
				title: params.title,
				description: params.description,
				statusID: params.statusID,
				createdDate: params.createdDate,
			},
			onSuccess: () => {
				params.onSuccess()
				this.getCases()
			},
		})
	}

	deleteCase(params){
		console.log('DELETE APP SETTINGS CALL', params)

		this.swaggerDelete({
			tag: 'Cases',
			func: 'delete_Cases__id_',
			id: params.caseId,
			onSuccess: () => {
				params.onSuccess()
				this.getCases()
			},
		})
	}

	// ************************************************************
	// ************************************************************
 
	login(params){ 
		this.swaggerUniquePost({
			tag: 'User',
			func: 'post_User_login', // get this from this.state.swagger
			body: {
				FirstName: ' ',
				LastName:  ' ',
				EmailAddress: params.emailAddress,
				UserName: params.emailAddress,
				MiddleName: ' ',
				CreatedUser: 'User1',
				ModifiedUser: 'User1',
				Password: params.password,
				IsActive: true,
				ISApproved: true,

			},
			status: 'post',
			onSuccess: () => {
				params.onSuccess() 
			},
		})
	}

	register(params){ 
		this.swaggerPost({
			tag: 'User',
			func: 'post',
			body: {
				FirstName: params.firstName,
				LastName: params.lastName,
				EmailAddress: params.emailAddress,
				UserName: params.emailAddress,
				MiddleName: ' ',
				CreatedUser: 'User1',
				ModifiedUser: 'User1',
				Password: params.password,
				IsActive: true,
				ISApproved: true,

			},
			status: 'post',
			onSuccess: () => {
				params.onSuccess() 
			},
		})
	}

	// ************************************************************
	// ************************************************************
	
	getWeather() {
		console.log('GET WEATHER CALL')

		this.getByTagAndFunc({
			tag: 'WeatherForecast',
			func: 'get',
			dataKey: 'weather',
		})
	}

	getAccount() {
		console.log('GET WEATHER CALL')

		this.getByTagAndFunc({
			tag: 'Account',
			func: 'get',
			dataKey: 'account',
		})
	}


	universalGet(universalID)
	{
		const _function = `${universalID.toLowerCase()}_get1`

		console.log(this)
		console.log(universalID,_function)

		this.getByTagAndFunc({
			tag: universalID,
			func: _function,
			dataKey: universalID.toLowerCase(),
		})
	}
}
