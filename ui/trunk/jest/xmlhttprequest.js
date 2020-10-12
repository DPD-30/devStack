export default function xmlhttprequest(){
    const mock = {
        open: jest.fn(),
        addEventListener: jest.fn(),
        setRequestHeader: jest.fn(),
        send: jest.fn(),
        getResponseHeader: jest.fn(),
        responseText: '{ "apiUrl": "https://caci-api-dev.azurewebsites.us/swagger/v1/swagger.json",  "appInsightKey": "4e8c525b-6bb4-f2dd-a32e-3a846ec98f4f"}',
        upload: {
            addEventListener: jest.fn(),
        },
    }
  
    window.XMLHttpRequest = jest.fn(() => mock)
  
    return mock
}
