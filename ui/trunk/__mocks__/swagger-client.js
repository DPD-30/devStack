export default jest.mock("swagger-client", () => {
    return {
        SwaggerClient: jest.fn(
            Promise.resolve({ response: { apis: {} }})
        )
    }
})
