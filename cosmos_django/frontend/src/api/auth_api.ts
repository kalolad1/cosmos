import * as axiosConfig from '../configs/axios_config';
import * as apiEndpointConstants from '../constants/api_endpoint_constants';
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

interface DateOfBirth {
    year: number;
    month: number;
    day: number;
}

export function signupRequest(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    date_of_birth: DateOfBirth,
    sex: string
) {
    /**
     * Sends a signup request to the server.
     */
    return axiosConfig.axiosClient.post(apiEndpointConstants.USERS, {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        date_of_birth: {
            year: date_of_birth.year,
            month: date_of_birth.month,
            day: date_of_birth.day,
        },
        sex: sex,
    });
}
