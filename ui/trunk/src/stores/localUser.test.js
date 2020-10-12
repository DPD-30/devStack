import _ from 'lodash'
import {
    localUserStore,
    localSignIn,
    localSignOut,
} from 'stores/localUser.js'

jest.unmock('stores/localUser.js')


test('AzureStore azureState', async () => {
    await localSignIn()
    await localSignOut()

    expect(typeof localUserStore).not.toBeUndefined()
    expect(typeof localSignIn).toBe('function')
    expect(typeof localSignOut).toBe('function')
})
