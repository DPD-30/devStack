import _ from 'lodash'
import Reflux from 'reflux'
import {
    azureState,
    azureSignIn,
    azureSignOut,
    azureGetAccounts,
} from 'stores/azureUser.js'

jest.unmock('stores/azureUser.js')


// jest.mock('@azure/msal-browser', () => class foo{ constructor(){ return 'foo' } })
jest.mock('@azure/msal-browser',
    () => ({
        get PublicClientApplication (){
            class fooClass {
                loginRedirect = jest.fn(
                    () => Promise.resolve()
                )
                loginPopup = jest.fn(
                    () => Promise.resolve({ account: { username: 'mockedUserName' }})
                )
                getAllAccounts = jest.fn(
                    () => [
                        { username: 'mockedUserName1' },
                        { username: 'mockedUserName2' },
                        { username: 'mockedUserName3' },
                    ]
                )
                getAccountByUsername = jest.fn(
                    () => Promise.resolve()
                )
                logout = jest.fn(
                    () => Promise.resolve()
                )
            }

            return fooClass
        }
    })
)

// const foo = jest.mock('@azure/msal-browser')
// const fooMock = jest.mock('@azure/msal-browser')
// let fooMock = require('@azure/msal-browser').PublicClientApplication

// foo.PublicClientApplication = () => console.log('12345')


// console.log('fooMockfooMockfooMockfooMockfooMockfooMock.........', fooMock)


// class fooClass {
//     loginRedirect = jest.fn(
//         () => Promise.resolve()
//     )
//     loginPopup = jest.fn(
//         () => Promise.resolve()
//     )
//     getAllAccounts = jest.fn(
//         () => Promise.resolve()
//     )
//     getAccountByUsername = jest.fn(
//         () => Promise.resolve()
//     )
//     logout = jest.fn(
//         () => Promise.resolve()
//     )
// }

// fooMock = fooClass
// fooMock.PublicClientApplication = fooClass


// console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n >> ', fooMock)



const fakeStore = {}

fakeStore.state = {
    isMenuOpen: false,
}
fakeStore.setState = (newState) => {
    // console.log('new state is ', newState)
}

// test('AzureStore azureState', () => {
//     expect(azureState).toHaveProperty('isAuthenticatedAzure')
//     expect(azureState).toHaveProperty('userAzureAccount')
// })

test('AzureStore azureSignIn: multiple accounts', async () => {
    // Reflux.initStore(fakeStore)

    // await azureSignIn(fakeStore)
    azureSignIn(fakeStore)
    // await azureGetAccounts(fakeStore)
     azureGetAccounts(fakeStore)
    await azureSignOut(fakeStore)
})

// test('AzureStore azureSignOut', () => {
//     Reflux.initStore(fakeStore)
//     azureSignOut(fakeStore)
// })
