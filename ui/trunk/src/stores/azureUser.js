// ********************************************************************************
// ********************************************************************************
// externalized for code separation
// ********************************************************************************
// ********************************************************************************
import { PublicClientApplication } from "@azure/msal-browser"
import { msalConfig, loginRequest } from '../utils/authConfig.js'

const isIE = () => {
    const ua = window.navigator.userAgent

    // console.log('\n\n\n\n\nmmmmmmmmmmmmmmmmmmmmmmmmmmm', window.navigator.userAgent)

    const msie = ua.indexOf("MSIE ") > -1
    const msie11 = ua.indexOf("Trident/") > -1

    // If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
    // const isEdge = ua.indexOf("Edge/") > -1

    return msie || msie11
}

// If you support IE, our recommendation is that you sign-in using Redirect flow
// const useRedirectFlow = isIE()

// console.log('\n\n\n\n\n\n\n\n\n\n\nPublicClientApplication: ', PublicClientApplication, '\n\n\n\n\n\n\n')

const msalApp = new PublicClientApplication(msalConfig)



// console.log(' *****************************************************************\n', msalApp)

export const azureState = {
    isAuthenticatedAzure: false,
    userAzureAccount: {
        environment: '',
        homeAccountId: '',
        name: '',
        tenantId: '',
        username: '',
    },
}


export function azureSignIn(store){
    const redirect = isIE()

    // console.log('\n\nazureSignIn')
    // console.log('\n\nmsalApp', msalApp)

    if (redirect) {
        // console.log('\n\nazureSignIn: redirect')
        return msalApp.loginRedirect(loginRequest)
    }

    // console.log('\n\n333333333333333333333333azureSignIn: NOT a redirect', msalApp.loginPopup)
    
    return msalApp.loginPopup(loginRequest)
        .then(
            response => {
                // console.log('\n\nloginPopup: promise then() response', response)
                // console.log('store >>>>>>>>>>,', store)
                if (response !== null) {
                    store.setState({
                        isAuthenticatedAzure: true,
                        userAzureAccount: response.account,
                    })
        
                    // close menu if it's opened
                    if (store.state.isMenuOpen === true){
                        // console.log('\n\nloginPopup: promise then(): togglemenu')
                        store.toggleMenu()
                    }
                } else {
                    // console.log('\n\nloginPopup: promise then(): getaccounts')
                    store.azureGetAccounts()
                }
            }
        )
        .catch(err => {
            // console.log('\n\nloginPopup: promise catch()\n\n', err)
            store.setState({error: err.errorMessage})
        })
}

export function azureGetAccounts(store) {
    // console.log('\n\n\n\n\n\n\n\n2222222222222222222: ', azureGetAccounts, '\n\n\n\n\n\n')
    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    const currentAccounts = msalApp.getAllAccounts()

    // console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n6666666666666666666666666: ', currentAccounts, '\n\n\n\n\n\n')
    
    if (currentAccounts === null) {
        // console.log('no accounts')
        return
    } else if (currentAccounts.length > 1) {
        // console.log('more than 1')
        // Add choose account code here
        store.setState({
            username: currentAccounts[0].username,
            account: msalApp.getAccountByUsername(currentAccounts[0].username),
            isAuthenticatedAzure: true,
        })
    } else if (currentAccounts.length === 1) {
        // console.log('exactly 1')
        store.setState({
            isAuthenticatedAzure: true,
            userAzureAccount: msalApp.getAccountByUsername(currentAccounts[0].username),
        })
    }
}

export async function azureSignOut(store){
    // console.log('\n\n\n\n\n\n\n99999999999999999999999', azureSignOut)
    
    const logoutRequest = {
        account: msalApp.getAccountByUsername(store.state.username),
    }
    
    // console.log('\n\n\n\n\n\n\n77777777777777777777', azureSignOut)

    return msalApp.logout(logoutRequest)
}
