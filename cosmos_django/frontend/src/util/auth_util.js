/* Contains authentication utility functions */

import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as axiosConfig from "../configs/axios_config";
import * as tokenConstants from '../constants/token_constants';


export function sendLoginRequest(email, password) {
    return axiosConfig.axiosClient.post(apiEndpointConstants.GET_TOKEN, {
        email: email,
        password: password
        })
        .then(function (response) {
            setToken(tokenConstants.ACCESS_TOKEN, response.data.access);
            setToken(tokenConstants.REFRESH_TOKEN, response.data.refresh);
            return response;
        })
}

export function getAccountInformationWithAccessToken() {
    return axiosConfig.axiosClient.get(apiEndpointConstants.ACCOUNTS,
        getRequestHeaderWithAuthorization())
}

export function refreshAccessToken() {
    return axiosConfig.axiosClient.post(apiEndpointConstants.REFRESH_TOKEN, {
        'refresh': localStorage.getItem(tokenConstants.REFRESH_TOKEN)
        })
        .then(function (response) {
            return response;
        });
}

export function getRequestHeaderWithAuthorization() {
    return {
        headers: {
            'Authorization': 'Bearer ' + getToken(tokenConstants.ACCESS_TOKEN)
        }
    }
}

export function getToken(token) {
    return localStorage.getItem(token);
}

export function setToken(token, value) {
    localStorage.setItem(token, value);
}

export function hasTokens() {
    return (
        localStorage.getItem(tokenConstants.ACCESS_TOKEN) !== null &&
        localStorage.getItem(tokenConstants.REFRESH_TOKEN) !== null
    );
}

export function clearTokens() {
    localStorage.removeItem(tokenConstants.ACCESS_TOKEN);
    localStorage.removeItem(tokenConstants.REFRESH_TOKEN);
}

