import React from 'react'
import { shallow } from 'enzyme'
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

// import { renderToString } from 'react-dom/server'

import App from './App.js'
// import AppActions from 'actions/app.js'

import mockXMLHttpRequest from "jest/xmlhttprequest.js"

jest.unmock('./App.js')
jest.unmock('actions/app.js')
jest.unmock("jest/xmlhttprequest.js")

jest.mock('@microsoft/applicationinsights-web')
jest.mock('@microsoft/applicationinsights-react-js')
// test('App matches snapshot', () => {
//   const comp = renderToString(<App />)

//   expect(comp).toMatchSnapshot()
// })




const mockxmlhttp = mockXMLHttpRequest();
 

// Inside your general `Describe`
let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
});

it('should check `componentDidMount()`', () => {
  const instance = wrapper.instance(); // new instance
  window.XMLHttpRequest = mockxmlhttp
  // jest.spyOn(instance, AppActions.azureGetAccounts); // spy func

  mockxmlhttp.open()
  mockxmlhttp.send()

  instance.componentDidMount(); // have to call manually

  mockxmlhttp.status = 200
  mockxmlhttp.readyState = 4
  mockxmlhttp.onreadystatechange()


  mockxmlhttp.status = 400
  mockxmlhttp.readyState = 4
  mockxmlhttp.onreadystatechange()
  instance.setState({swagger:'test'})
  instance.render()
  instance.setState({swagger: null})
  instance.render()
  
  // expect(instance.randomFunction).toHaveBeenCalledTimes(1);
});
