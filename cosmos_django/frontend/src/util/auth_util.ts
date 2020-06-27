/* Contains authentication utility functions */
import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as tokenConstants from '../constants/token_constants';
import * as axiosConfig from '../configs/axios_config';

export function refreshAccessToken() {
    return axiosConfig.axiosClient
        .post(apiEndpointConstants.REFRESH_TOKEN, {
            refresh: localStorage.getItem(tokenConstants.REFRESH_TOKEN),
        })
        .then(function (response) {
            return response;
        });
}

export function getAuthorizationRequestHeader() {
    return {
        headers: {
            Authorization: 'Bearer ' + getToken(tokenConstants.ACCESS_TOKEN),
        },
    };
}

export function getToken(tokenType: string): string | null {
    return localStorage.getItem(tokenType);
}

export function setToken(tokenType: string, value: string): void {
    localStorage.setItem(tokenType, value);
}

export function hasTokens(): boolean {
    return (
        localStorage.getItem(tokenConstants.ACCESS_TOKEN) !== null &&
        localStorage.getItem(tokenConstants.REFRESH_TOKEN) !== null
    );
}

export function clearTokens(): void {
    localStorage.removeItem(tokenConstants.ACCESS_TOKEN);
    localStorage.removeItem(tokenConstants.REFRESH_TOKEN);
}
