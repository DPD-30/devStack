// stubbed out for jest testing
// the store itself gets tested, this doesn't need to be functional too; mock is preferred
export function listen(){}


function getAppSettings(){}
function addAppSetting(params){ params.onSuccess() }
function updateAppSetting(params){ params.onSuccess() }
function deleteAppSetting(params){ params.onSuccess() }

function getRoles(){}
function addRole(params){ params.onSuccess() }
function updateRole(params){ params.onSuccess() }
function deleteRole(params){
    params.onSuccess() // fake the success callback
    params.onFailure() // fake the failure call too, for easier testing
}

function getUsers(){}
function addUser(params){ params.onSuccess() }
function updateUser(params){ params.onSuccess() }
function deleteUser(params){ params.onSuccess() }

function register(){}
function localSignIn(){}


export default {
    getAppSettings,
    addAppSetting,
    updateAppSetting,
    deleteAppSetting,

    getRoles,
    deleteRole,
    addRole,
    updateRole,

    getUsers,
    addUser,
    updateUser,
    deleteUser,

    register,
    localSignIn,
}
