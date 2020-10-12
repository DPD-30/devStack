import Reflux from 'reflux'
import _ from 'lodash'

import TemplateActions from 'templates/actions/app.js'

const refluxActions = [
  'createSwaggerClient',

  'toggleMenu',
  'setActiveMenuItem',

  'azureGetAccounts',
  'azureSignIn',
  'azureSignOut',
  // 'azureHandleResponse',

  'localSignIn',
  'localSignOut',

  'getApplications',
  
  'getAppSettings',
	'addAppSetting',
	'updateAppSetting',
	'deleteAppSetting',

  'getClaims',
  'addClaim',
  'updateClaim',
  'deleteClaim',

  'getRoles',
  'addRole',
  'updateRole',
  'deleteRole',

  
  'getUsers',
  'addUser',
  'updateUser',
  'deleteUser',

  'universalGet',

  'universalSave',
  
  'login',
  'register'
]

// merge in the template actions
_.forEach(TemplateActions, action => refluxActions.push(action))

const app = Reflux.createActions(refluxActions)


export default app
