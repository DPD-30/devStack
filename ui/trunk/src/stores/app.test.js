import Reflux from 'reflux'

import AppTestsStore from 'stores/app.js'
// import 'stores/azureUser.js'
import 'stores/localUser.js'

import 'actions/app.js'

jest.unmock('stores/app.js')
jest.unmock('actions/app.js')

// jest.unmock('stores/azureUser.js')
jest.unmock('stores/localUser.js')


const app = Reflux.initStore(AppTestsStore)



jest.mock(
    'swagger-client',
    () => 
        class mockSwagger{
            constructor(){
                return Promise.resolve({
                    response: {
                        apis: {
                            default: {},
                            AppSetting: {},
                            mockTag: {},
                            Role: {},
                            roles: {},
                        }
                    }
                })
            }
        }
)


test('AppStore', () => {
    
    
    
    // console.log('\n\n\n\n\n>>>>>>>>>>>>>>>>>>>>>>>', Reflux.getGlobalState(), '\n\n\n\n\n\n\n')
    
    
    
    expect(Reflux.getGlobalState().app.isMenuOpen).toBeFalsy()




    app.createSwaggerClient({
        apiURL: 'mock'
    })

    app.getByTagAndFunc({
        func: 'mock'
    })


    // app.updateCase({
    //     caseId: 23423,
    //     title: 'mock title',
    //     description: 'updating a case',
    //     statusID: 4,
    //     createdDate: '10/2/2020',
    //     onSuccess: () => {},
    // })

    app.azureSignIn()
    app.azureSignOut()
    app.azureGetAccounts()





    app.toggleMenu()
    
    app.setActiveMenuItem({ target: { name: 'mockMenuItemActive' }})





    app.getByTagAndFunc({
        tag: 'mockTag',
        func: 'mockFunc',
        nested: 'mockNested',
        dataKey: 'mockDataKeyForTagAndFunc',
        onSuccess: () => {},
        onFailure: () => {},
    })




    app.getRoles()

    app.addRole({
        RoleId: 73456,
        RoleTitle: 'Mock title',
        RoleDescription: 'Mock description',
        onSuccess: () => {},
    })

    app.updateRole({
        RoleId: 73456,
        RoleTitle: 'Mock title',
        RoleDescription: 'Mock description',
        onSuccess: () => {},
    })

    app.deleteRole({
        roleId: 73456,
        onSuccess: () => {},
    })




    app.localSignIn({
        emailAddress: 'mock@jest.com',
        password: 'mock123',
        onSuccess: () => {},
    })

    app.localSignOut()

    app.register({
        firstName: 'mockFirst',
        lastName: 'mockLast',
        email: 'mock@jest.com',
        password: 'mock123',
        onSuccess: () => { console.log('mock register onSuccess handler called') },
    })


    app.getAppSettings()

    app.addAppSetting({
        appSettingId: 0,
        appSettingName: 'mockSettingName',
        appSettingValue: 'mockSettingValue',
    })

    app.updateAppSetting({
        appSettingId: 4,
        appSettingName: 'mockSettingName',
        appSettingValue: 'mockSettingValue',
    })

    app.deleteAppSetting({
        id: 3245,
    })


    app.universalGet('roles')
})


test('AppStore fail to create swagger', () => {
    jest.mock('swagger-client', () => Promise.reject())

    app.createSwaggerClient({
        apiURL: 'mock'
    })
})

test('AppStore not have tag', () => {
    app.setState({ swagger: {} })
    app.getByTagAndFunc({
        tag: 'mockTag',
        func: 'mockFunc',
        nested: 'mockNested',
        dataKey: 'mockDataKeyForTagAndFunc',
        onSuccess: () => {},
        onFailure: () => {},
    })
})

test('AppStore not have func in tag', () => {
    app.setState({ swagger: { mockTag: {} } })

    app.getByTagAndFunc({
        tag: 'mockTag',
        func: 'mockFunc',
        nested: 'mockNested',
        dataKey: 'mockDataKeyForTagAndFunc',
        onSuccess: () => {},
        onFailure: () => {},
    })
})

test('AppStore getUsers', () => {
    app.getUsers()
})

test('AppStore addUser', () => {
    app.addUser({
        userId: 83,
        firstName: 'aljsf',
        middleName: 'oweru',
        lastName: 'oiuerwwr',
        userName: 'xcvbcvb',
        email: 'jskdf2@sdfj.coj',
        isActive: 1,
        isApproved: 1,
        roleId: 0,
		onSuccess: () => {},
    })
})

test('AppStore updateUser', () => {
    app.updateUser({
        userId: 83,
        firstName: 'aljsf',
        middleName: 'oweru',
        lastName: 'oiuerwwr',
        userName: 'xcvbcvb',
        email: 'jskdf2@sdfj.coj',
        isActive: 1,
        isApproved: 1,
        roleId: 0,
		onSuccess: () => {},
    })
})

test('AppStore deleteUser', () => {
    app.swaggerPost = (params) => { params.onSuccess(); Promise.resolve() }

    app.deleteUser({
        userId: 83,
		onSuccess: () => {},
    })
})
