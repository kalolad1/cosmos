export function getMockClient(method, expectedResponse) {
    return {
        [method]: jest.fn(() => {
            return Promise.resolve(expectedResponse);
        }),
    };
}
