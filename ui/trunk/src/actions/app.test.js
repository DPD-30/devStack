import React from 'react'
import { renderToString } from 'react-dom/server'


import AppActions from './app.js'

jest.unmock('./app.js')


test('AppActions has an array of actions with the baseline keys', () => {
    expect(AppActions).toHaveProperty('createSwaggerClient')
    expect(AppActions).toHaveProperty('toggleMenu')
    expect(AppActions).toHaveProperty('setActiveMenuItem')
    expect(AppActions).toHaveProperty('azureSignIn')
    expect(AppActions).toHaveProperty('azureSignOut')
    expect(AppActions).toHaveProperty('azureGetAccounts')
    expect(AppActions).toHaveProperty('login')
    expect(AppActions).toHaveProperty('register')


    // 'getVisitHistory',
    // 'getApplicationsExpiredAndLate',
    // 'getAppSettings',
    // 'addAppSetting',
    // 'updateAppSetting',
    // 'deleteAppSetting',
    // 'getClaims',
    // 'addClaim',
    // 'updateClaim',
    // 'deleteClaim',
    // 'getRoles',
    // 'addRole',
    // 'updateRole',
    // 'deleteRole',
    // 'getApplication',
    // 'addApplication',
    // 'updateApplication',
    // 'deleteApplication',
    // 'getWeather',
    // 'universalGet',
    // 'universalSave',
    // 'getCases',
    // 'addCase',
    // 'updateCase',
    // 'deleteCase',
    // 'getRmf',
})
