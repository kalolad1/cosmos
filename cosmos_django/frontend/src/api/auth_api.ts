import * as axiosConfig from "../configs/axios_config";
import * as apiEndpointConstants from "../constants/api_endpoint_constants";
import * as tokenConstants from "../constants/token_constants";
import * as authUtil from "../util/auth_util";


export function loginRequest(email: string, password: string) {
    return axiosConfig.axiosClient.post(apiEndpointConstants.GET_TOKEN, {
        email: email,
        password: password
    })
        .then(function (response) {
            authUtil.setToken(
                tokenConstants.ACCESS_TOKEN, response.data.access);
            authUtil.setToken(
                tokenConstants.REFRESH_TOKEN, response.data.refresh);
            return response;
        })
}

interface DateOfBirth {
    year: number,
    month: number,
    day: number,
}

export function signupRequest(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: DateOfBirth,
    sex: string) {
    return axiosConfig.axiosClient.post(apiEndpointConstants.USERS, {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: {
            year: dateOfBirth.year,
            month: dateOfBirth.month,
            day: dateOfBirth.day,
        },
        sex: sex
    })
}
