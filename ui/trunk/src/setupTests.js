// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

const crypto = require('crypto') // for azure mocking

configure({ adapter: new Adapter() })


global.crypto = crypto

Object.defineProperty(global, 'crypto', {
// Object.defineProperty(global.self, 'crypto', {
    value: {
        getRandomValues: arr => crypto.randomBytes(arr.length)
    }
})
// Object.defineProperty(global.self, 'crypto', {
//     value: {
//         subtle: {
//             digest: '',
//         }
//     }
// })

global.window.open = jest.fn()
