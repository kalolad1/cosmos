import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as axiosConfig from '../configs/axios_config';
import * as tokenConstants from '../constants/token_constants';
import * as authUtil from '../util/auth_util';

export function loginRequest(email: string, password: string) {
    /**
     * Sends a login request to the server and sets auth tokens if successful.
     */
    return axiosConfig.axiosClient
        .post(apiEndpointConstants.GET_TOKEN, {
            email: email,
            password: password,
        })
        .then(function (response) {
            authUtil.setToken(
                tokenConstants.ACCESS_TOKEN,
                response.data.access
            );
            authUtil.setToken(
                tokenConstants.REFRESH_TOKEN,
                response.data.refresh
            );
            return response;
        });
}

export function signupRequest(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    sex: string,
    isProvider: boolean
) {
    /**
     * Sends a signup request to the server.
     */
    return axiosConfig.axiosClient.post(apiEndpointConstants.USERS, {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        sex: sex,
        isProvider: isProvider,
    });
}
