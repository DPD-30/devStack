import Reflux from 'reflux'
import AppTestsStore from 'stores/app.js'
import 'actions/app.js'

jest.unmock('stores/app.js')
jest.unmock('actions/app.js')

const app = Reflux.initStore(AppTestsStore)


jest.mock(
    'swagger-client',
    () => 
        class mockSwagger{
            constructor(){
                return Promise.reject()
            }
        }
)


test('swagger create failed', () => {
    app.createSwaggerClient({
        apiUrl: 'http://foo.bar/',
    })
})
