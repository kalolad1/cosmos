import * as authApi from './auth_api';
import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as modelTypes from '../types/modelTypes';

test('send a login request', () => {
    const expectedResponse = {
        data: {
            access: 'ldfksmdklfms',
            refresh: 'elkdkmsf',
        },
    };
    const mockClient = {
        post: jest.fn(() => {
            return Promise.resolve(expectedResponse);
        }),
    };
    const loginParams = [
        apiEndpointConstants.GET_TOKEN,
        {
            email: 'test@gmail.com',
            password: 'test',
        },
    ];
    return (
        authApi
            // @ts-ignore
            .loginRequest('test@gmail.com', 'test', mockClient)
            .then(function (response) {
                expect(response).toEqual(expectedResponse);
                expect(mockClient.post).toHaveBeenCalledWith(...loginParams);
            })
    );
});

test('send a signup request', () => {
    const expectedResponse = {
        data: {
            user: {
                email: 'test@gmail.com',
            },
        },
    };
    const mockClient = {
        post: jest.fn(() => {
            return Promise.resolve(expectedResponse);
        }),
    };
    const newUser: modelTypes.UserConstructor = {
        email: 'test@gmail.com',
        password: 'test123',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1998-06-08',
        sex: 'male',
        isProvider: true,
    };
    // @ts-ignore
    return authApi.signupRequest(newUser, mockClient).then((response) => {
        expect(response).toEqual(expectedResponse);
        expect(mockClient.post).toHaveBeenCalledWith(
            apiEndpointConstants.USERS,
            {
                ...newUser,
            }
        );
    });
});
