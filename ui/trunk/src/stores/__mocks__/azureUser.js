export const azureState = {
    userAzureAccount: {
        username: 'MockAzureUsername',
    }
}

export function azureGetAccounts(){ jest.fn() }
export function azureSignIn(){ jest.fn() }
export function azureSignOut(){ jest.fn() }
