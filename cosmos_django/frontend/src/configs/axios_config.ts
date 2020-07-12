/* Configures the axios client. */
import axios from 'axios';

import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as baseUrlConstants from '../constants/base_url_constant';
import * as tokenConstants from '../constants/token_constants';
import * as authUtil from '../util/auth_util';

export const axiosClient = setUpAxiosClient();

/**
 * Checks if tokens are fresh.
 *
 * @remarks
 * If access token is not fresh, will try to refresh with refresh token. If both
 * tokens are not fresh, returns false.
 *
 * @param now - The current time.
 */
export async function areTokensFresh(now = new Date()) {
    // Check for fresh access token.
    const currentTimeInMillisecond = now.getTime();
    if (
        currentTimeInMillisecond <
        authUtil.getTokenExpiry(tokenConstants.ACCESS_TOKEN)
    ) {
        return true;
    }
    // Check for fresh refresh token.
    if (
        currentTimeInMillisecond <
        authUtil.getTokenExpiry(tokenConstants.REFRESH_TOKEN)
    ) {
        const accessTokenResponse = await authUtil.refreshAccessToken();
        authUtil.setToken(
            tokenConstants.ACCESS_TOKEN,
            accessTokenResponse.data.access
        );
        return true;
    }
    return false;
}

function setUpAxiosClient() {
    const instance = axios.create({
        baseURL: apiEndpointConstants.API_URL,
    });
    instance.interceptors.request.use(async function (config) {
        // If sign up, login, or refresh token request, don't check for tokens
        // freshness.
        if (
            config.method == 'post' &&
            (config.url === apiEndpointConstants.GET_TOKEN ||
                config.url === apiEndpointConstants.USERS ||
                config.url === apiEndpointConstants.REFRESH_TOKEN)
        ) {
            return config;
        }
        config.headers.Authorization = authUtil.getBearerToken();

        if (!(await areTokensFresh())) {
            // Both tokens have expired, clear tokens and return to landing.
            authUtil.clearTokens();
            window.location.replace(baseUrlConstants.BASE_URL);
        }
        return config;
    });
    return instance;
}
