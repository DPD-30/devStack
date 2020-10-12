import Reflux from 'reflux'

const actions = Reflux.createActions([
  'getVisitHistory',

  'setMatchCount',
  'startMatching',
  'goPrev',
  'goNext',
  'answer',
  'getQuestions',

	'getApplicationsExpiredAndLate',

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

  'getApplication',
  'addApplication',
  'updateApplication',
  'deleteApplication',

  'getWeather',

  'universalGet',
  'universalSave',

  'getCases',
  'addCase',
  'updateCase',
  'deleteCase',

  'getRmf',
])

export default actions
