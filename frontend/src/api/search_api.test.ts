import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as axiosMockUtil from '../fixtures/axiosMockUtil';
import * as searchApi from './search_api';

test('make search request', () => {
    const expectedResponse = {
        data: {
            items: {
                0: 'John Doe',
                1: 'Advil',
            },
        },
    };
    const mockClient = axiosMockUtil.getMockClient('post', expectedResponse);
    const query = 'John Doe';
    const expectedEndpoint = apiEndpointConstants.SEARCH + '?q=John%20Doe';
    const clientParams = [expectedEndpoint];
    return (
        searchApi
            // @ts-ignore
            .search(query, mockClient)
            .then(function (response) {
                expect(response).toEqual(expectedResponse);
                // @ts-ignore
                expect(mockClient.post).toHaveBeenCalledWith(...clientParams);
            })
    );
});
