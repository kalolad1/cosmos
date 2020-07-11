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

export function getBearerToken() {
    return 'Bearer ' + getToken(tokenConstants.ACCESS_TOKEN);
}

export function getToken(tokenType: string): string | null {
    return localStorage.getItem(tokenType);
}

export function getTokenExpiry(tokenType: string): number {
    let expiry;
    if (tokenType == tokenConstants.ACCESS_TOKEN) {
        expiry = Number(
            localStorage.getItem(tokenConstants.ACCESS_TOKEN_EXPIRY_KEY)
        );
    } else if (tokenType == tokenConstants.REFRESH_TOKEN) {
        expiry = Number(
            localStorage.getItem(tokenConstants.REFRESH_TOKEN_EXPIRY_KEY)
        );
    } else {
        throw 'Invalid token type.';
    }
    return expiry;
}

export function setAuthTokens(tokens: { access: string; refresh: string }) {
    setToken(tokenConstants.ACCESS_TOKEN, tokens.access);
    setToken(tokenConstants.REFRESH_TOKEN, tokens.refresh);
}

export function setToken(tokenType: string, value: string): void {
    // Set expiration times for access tokens.
    const currentTimeInMillisecond = new Date().getTime();
    if (tokenType == tokenConstants.ACCESS_TOKEN) {
        const accessTokenExpiration =
            currentTimeInMillisecond + tokenConstants.ACCESS_TOKEN_LIFETIME;
        localStorage.setItem(
            tokenConstants.ACCESS_TOKEN_EXPIRY_KEY,
            accessTokenExpiration.toString()
        );
    } else if (tokenType == tokenConstants.REFRESH_TOKEN) {
        const refreshTokenExpiration =
            currentTimeInMillisecond + tokenConstants.REFRESH_TOKEN_LIFETIME;
        localStorage.setItem(
            tokenConstants.REFRESH_TOKEN_EXPIRY_KEY,
            refreshTokenExpiration.toString()
        );
    }
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
