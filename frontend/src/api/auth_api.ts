/* API methods for authentication. */
import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as axiosConfig from '../configs/axios_config';
import * as modelTypes from '../types/modelTypes';

/**
 * Sends a login request to the server.
 *
 * @remarks
 * If successful, sets auth tokens in local storage.
 *
 * @param email - Email of the user.
 * @param password - Password of the user.
 * @param client - Axios instance used to make request.
 * @returns A Promise to the login request.
 */
export function loginRequest(
    email: string,
    password: string,
    client = axiosConfig.axiosClient
) {
    return client.post(apiEndpointConstants.GET_TOKEN, {
        email: email,
        password: password,
    });
}

/**
 * Sends a sign up request to the server.
 *
 * @param newUser - An object containing data to create a new user.
 * @param client - Axios instance used to make request.
 *
 * @returns A Promise to the signup request.
 */
export function signupRequest(
    newUser: modelTypes.UserConstructor,
    client = axiosConfig.axiosClient
) {
    console.log('Sending signup with user: ');
    console.log(newUser);
    return client.post(apiEndpointConstants.USERS, {
        ...newUser,
    });
}
