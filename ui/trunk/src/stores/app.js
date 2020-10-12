import Reflux from 'reflux'
import SwaggerClient from 'swagger-client'
import aggregation from 'aggregation'
import _ from 'lodash'

import TemplateAppStore from '_templates/stores/app.js'
import {
	localUserState,
}
from 'stores/localUser.js'
import {
	azureState,
	azureGetAccounts,
	azureSignIn,
	azureSignOut,
}
from 'stores/azureUser.js'

import AppActions from 'actions/app.js'



class app extends aggregation(
	Reflux.Store,
	TemplateAppStore,
 ) {
	createSwaggerClient(client){
		// get hooked up to swagger from api
		new SwaggerClient({
			// credentials: 'omit',
			withCredentials: true,
			mode: 'cors',  
			url: client.apiUrl,
			requestContentType: 'application/json',
		})
			.then(
				response => {
					// console.log('\n\n\n\n\nMOCKED CLIENT CREATE RESPONSE:', response)

					this.setState({
						swagger: response.apis,
					})
				}
			).catch(
				err => {
					this.setState({ swagger: 'ERROR' })
				}
			)
	}

	constructor(props) {
		super(props)

		this.state = _.merge(
			azureState,
			localUserState,
			{
				swagger: null,
				activeMenuItem: 'home',
				isMenuOpen: false,
			}
		)

		this.listenables = AppActions
	}
	
	// merge in the azure user functions
	azureSignIn = () => azureSignIn(this)
	azureSignOut = () => azureSignOut(this)
	azureGetAccounts = () => azureGetAccounts(this)


	// ************************************************************
	// ************************************************************
	// PRIVATE FUNCTION
	// ************************************************************
	// ************************************************************
	getByTagAndFunc(params) {
		const tag = params.tag || 'default'
		const func = params.func
		const nested = params.nested || null
		const dataKey = params.dataKey || ''
		const emptyFunc = () => {}
		const onSuccess = params.onSuccess || emptyFunc
		const onFailure = params.onFailure || emptyFunc

		const subTag = (nested !== null)
			? `${tag}_${nested}`
			: tag

		// console.info('APP STORE >>> getByTagAndFunc\n  tag:', tag,
		// 	'\n  func:', func,
		// 	'\n  dataKey:', dataKey,
		// 	'\n  onSuccess:', onSuccess,
		// 	'\n  onFailure:', onFailure,
		// 	'\n  func+tag:', `${func}_${subTag}`,
		// )

		const statusKey = `${dataKey}_status`
		const subtagKey = `${func}_${subTag}`

		this.setState({ [statusKey]: 'LOADING' }) 
		try {
			if (_.has(this.state.swagger, tag) === false){
				// find the tag first
				let keyList = ''

				_.forEach(_.keys(this.state.swagger), x => keyList += `\n${x}`)
				
				throw new Error(`The tag "${tag}" does not exist in the swagger client\n\nswagger tags:\n${keyList}\n\n`)
			} else if (_.has(this.state.swagger[tag], subtagKey) === false){
				// now find the function
				let funcList = ''

				_.forEach(_.keys(this.state.swagger[tag]), x => funcList += `\n${x}`)
				
				throw new Error(`The function "${subtagKey}" does not exist in swagger with the tag "${tag}" \n\nswagger functions in this tag:\n${funcList}\n\n`)
			}


			this.state.swagger[tag][subtagKey]()
				.then(x => {
					// force a 2 second delay for visible loading status
					onSuccess(x)

					this.setState({
						[statusKey]: 'SUCCESS',
						[dataKey]: x.obj,
					})
				})
				.catch(err => {
					console.error('APP STORE >>> caught error in promise from swagger\n\n', err)
	
					onFailure(err)
	
					this.setState({
						[statusKey]: 'FAILURE',
						[dataKey]: null,
					})
				})
		}
		catch (error) {
			console.error('APP STORE >>> swagger getByTagAndFunc failed\n\n', error)

			this.setState({ [statusKey]: 'FAILURE' })
		}
	}

	swaggerPost(params) {
		const tag = params.tag || 'default'
		const func = params.func
		const body = params.body || {}
		const emptyFunc = () => {}
		const onSuccess = params.onSuccess || emptyFunc
		const onFailure = params.onFailure || emptyFunc
		const status = params.status || null
  
		// console.log('APP STORE >>> swaggerAddEdit\n  tag:', tag,
		// 	'\n  func:', func,
		// 	'\n  body:', body,
		// 	'\n  status:', status,
		// 	'\n  onSuccess:', onSuccess,
		// 	'\n  onFailure:', onFailure
		// )

		this.setState({ [status]: 'LOADING' })

		try {
			this.state.swagger[tag][`${func}_${tag}`](
				{},
				{ requestBody: body },

			)
				.then(x => {
					// force a 2 second delay for visible loading status
					onSuccess(x)

					this.setState({
						[status]: 'SUCCESS',
						// [dataKey]: x.obj,
					})
				})
				.catch(err => {
					// console.log('APP STORE >>> caught error in promise from swagger\n\n', err)

					onFailure(err)

					this.setState({
						[status]: 'FAILURE',
						// [dataKey]: null,
					})
				})
		}
		catch (error) {
			// console.log('APP STORE >>> swaggerAddEdit failed', error)

			this.setState({ [status]: 'FAILURE' })
		}
	}

	// called API Post method with unique method name given by this.state.swagger
	swaggerUniquePost(params) {
		const tag = params.tag || 'default'
		const func = params.func
		const body = params.body || {}
		const emptyFunc = () => {}
		const onSuccess = params.onSuccess || emptyFunc
		const onFailure = params.onFailure || emptyFunc
		const status = params.status || null
  
		// console.log('APP STORE >>> swaggerAddEdit\n  tag:', tag,
		// 	'\n  func:', func,
		// 	'\n  body:', body,
		// 	'\n  status:', status,
		// 	'\n  onSuccess:', onSuccess,
		// 	'\n  onFailure:', onFailure
		// )

		this.setState({ [status]: 'LOADING' })

		try {

			// removed the tag at the end due to different swagger post name
			this.state.swagger[tag][func](
				{},
				{ requestBody: body },

			)
				.then(x => {
					// force a 2 second delay for visible loading status
					onSuccess(x)

					this.setState({
						[status]: 'SUCCESS',
						response: x.obj,
					})
				})
				.catch(err => {
					// console.log('APP STORE >>> caught error in promise from swagger\n\n', err)

					onFailure(err)

					this.setState({
						[status]: 'FAILURE',
						response: err.response,
					})
				})
		}
		catch (error) {
			// console.log('APP STORE >>> swaggerAddEdit failed', error)

			this.setState({ [status]: 'FAILURE' })
		}
	}


	swaggerPut(params){
		// pass through to the POST function
		this.swaggerPost(params)
	}

	swaggerDelete(params) {
		const tag = params.tag || 'default'
		const func = params.func
		const emptyFunc = () => {}
		const onSuccess = params.onSuccess || emptyFunc
		const onFailure = params.onFailure || emptyFunc
		const status = params.status || null
		const id = params.id

		// console.log('APP STORE >>> swaggerAddEdit\n  tag:', tag,
		// 	'\n  func:', func,
		// 	'\n  id:', id,
		// 	'\n  status:', status,
		// 	'\n  onSuccess:', onSuccess,
		// 	'\n  onFailure:', onFailure,
		// )

		
		this.setState({ [status]: 'LOADING' })

		try {
			this.state.swagger[tag][func](
				{ id },
				// { parameters: { id } },
			)
				.then(x => {
					// force a 2 second delay for visible loading status
					onSuccess(x)

					this.setState({
						[status]: 'SUCCESS',
						// [dataKey]: x.obj,
					})
				})
				.catch(err => {
					// console.log('APP STORE >>> caught error in promise from swagger\n\n', err)

					onFailure(err)

					this.setState({
						[status]: 'FAILURE',
						// [dataKey]: null,
					})
				})
		}
		catch (error) {
			// console.log('APP STORE >>> swaggerDelete failed, status:', status, '\n\nerror', error)

			this.setState({ [status]: 'FAILURE' })
		}
	}


	// ************************************************************
	// ************************************************************
	// PUBLIC FUNCTIONS
	// ************************************************************
	// ************************************************************
	toggleMenu(){
		this.setState({ isMenuOpen: !this.state.isMenuOpen })
	}

	setActiveMenuItem(e){
		this.setState({
			activeMenuItem: e.target.name,
			isMenuOpen: false,
		})
	}

	// ************************************************************
	// ************************************************************

	getRoles() {
		// console.log('APP STORE >>> GET Role CALL')

		this.getByTagAndFunc({
			tag: 'Role',
			func: 'get',
			dataKey: 'roles',
		})
	}

	addRole(params){
		// console.log('APP STORE >>> ADD Role CALL', params)

		this.swaggerPost({
			tag: 'Role',
			func: 'post',
			body: {
				RoleId: 0,
				RoleTitle: params.RoleTitle,
				Description: params.Description, 
				createdUser: this.state.userAzureAccount.username,
				
				modifiedUser: this.state.userAzureAccount.username,
			},
			status: 'post',
			onSuccess: () => {
				params.onSuccess()
				this.getRoles()
			},
		})
	}

	updateRole(params){
		// console.log('APP STORE >>> UPDATE Role CALL', params)
		this.swaggerPut({
			tag: 'Role',
			func: 'put',
			body: {
				RoleId: params.RoleId,
				RoleTitle: params.RoleTitle,
				Description: params.Description, 				
				modifiedUser: this.state.userAzureAccount.username,
			},
			onSuccess: () => {
				params.onSuccess()
				this.getRoles()
			},
		})
	}

	deleteRole(params){
		// console.log('APP STORE >>> DELETE CLAIM CALL', params)
		this.swaggerDelete({
			tag: 'Role',
			func: 'delete_Role__id_',
			id: params.roleId,	 
			onSuccess: () => {
				params.onSuccess()
				this.getRoles()
			} 
		})
	}

	// ************************************************************
	// ************************************************************

	getUsers() {
		// console.log('APP STORE >>> GET User CALL')

		this.getByTagAndFunc({
			tag: 'User',
			func: 'get',
			dataKey: 'users',
		})
	}

	addUser(params){
		// console.log('APP STORE >>> ADD User CALL', params)

		this.swaggerPost({
			tag: 'User',
			func: 'post',
			body: { 
				createdUser: this.state.userAzureAccount.username,
				UserId: params.userId,
				FirstName: params.firstName,
				MiddleName: params.middleName, 
				LastName: params.lastName,
				UserName: params.userName,
				Email: params.email,
				IsActive: params.isActive, 	
				IsApproved: params.isApproved,							
				modifiedUser: this.state.userAzureAccount.username,
				roleId: Number(params.roleId),
			},
			status: 'post',
			onSuccess: () => {
				params.onSuccess()
				this.getUsers()
			},
		})
	}

	updateUser(params){
		// console.log('APP STORE >>> UPDATE User CALL', params)
		this.swaggerPut({
			tag: 'User',
			func: 'put',
			body: {
				UserId: params.userId,
				FirstName: params.firstName,
				MiddleName: params.middleName, 
				LastName: params.lastName,
				UserName: params.userName,
				Email: params.email,
				IsActive: params.isActive, 	
				IsApproved: params.isApproved,							
				modifiedUser: this.state.userAzureAccount.username,
				roleId: Number(params.roleId),
			},
			onSuccess: () => {
				params.onSuccess()
				this.getUsers()
			},
		})
	}

	deleteUser(params){
		// console.log('APP STORE >>> DELETE USER CALL', params)
		this.swaggerDelete({
			tag: 'User',
			func: 'delete_User__id_',
			id: params.userId,	 
			onSuccess: () => {
				params.onSuccess()
				this.getUsers()
			} 
		})
	}

	// ************************************************************
	// ************************************************************

	localSignIn(params){ 
		this.swaggerUniquePost({
			tag: 'User',
			func: 'post_User_login',  
			body: {
				UserName: params.userName,
				Password: params.password,
			},
			status: 'post',
			onSuccess: (response) => {
				const user = response.obj
				
				this.setState({
					isAuthenticatedLocal: true,
					localUser: {
						firstName: user.firstName,
						middleName: user.middleName,
						lastName: user.lastName,
						email: user.email,
						userID: user.userId,
					},
					localUser_status: 'SUCCESS',
				})

				if (params.onSuccess){
					params.onSuccess()
				}
			},
			onFailure: (response) => {
				this.setState({
					localUser_status: 'FAILURE'
				})
			}
		})
	}

	localSignOut(){ 
		this.setState({
			isAuthenticatedLocal: false,
			localUser: {
				firstName: null,
				middleName: null,
				lastName: null,
				email: null,
				userID: 0,
			}
		})
	}

	register(params){ 
		// console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n........................register:', params)

		this.swaggerPost({
			tag: 'User',
			func: 'post',
			body: {
				FirstName: params.firstName,
				LastName: params.lastName,
				EmailAddress: params.emailAddress,
				UserName: params.userName,
				MiddleName: params.middle,
				CreatedUser: params.createdName,
				ModifiedUser: params.modifiedUser,
				Password: params.password,
				IsActive: params.isActive,
				ISApproved: params.iSApproved,
			},
			status: 'post',
			onSuccess: (response) => {
				// console.log('register onsuccess: \n\nresponse', response.obj, '\n\nparams:', {
				// 	userName: params.userName,
				// 	password: params.password,
				// })

				if (response.obj === true){
					AppActions.localSignIn({
						userName: params.userName,
						password: params.password,
					})
				} else if (response.obj === "Failed to post User"){
					this.status = 'FAILURE'
				}
			},
		})
	}

	// ************************************************************
	// ************************************************************
	
	universalGet(universalID)
	{
		const _function = `${universalID.toLowerCase()}_get1`

		this.getByTagAndFunc({
			tag: universalID,
			func: _function,
			dataKey: universalID.toLowerCase(),
		})
	}

	// ************************************************************
	// ************************************************************

	getAppSettings() {
		this.getByTagAndFunc({
			tag: 'AppSetting',
			func: 'get',
			dataKey: 'appSettings',
		})
	}

	addAppSetting(params){
		this.swaggerPost({
			tag: 'AppSetting',
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
			tag: 'AppSetting',
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
			tag: 'AppSetting',
			func: 'delete_AppSettings__id_',
			id: params.id,
			onSuccess: params.onSuccess,
		})
	}
}


app.id = 'app'

export default app
