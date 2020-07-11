/* Configures the axios client. */
import axios from 'axios';
import * as authUtil from '../util/auth_util';

import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as tokenConstants from '../constants/token_constants';
import * as baseUrlConstants from '../constants/base_url_constant';

export const axiosClient = setUpAxiosClient();

async function getFreshTokensOrRedirectToLogin() {
    // Checks for fresh access token. If not, it tries to refresh it. If the
    // refresh token is expired, then it redirects to login.
    console.log('Checking tokens!');

    // Check for fresh access token.
    const currentTimeInMillisecond = new Date().getTime();
    if (
        currentTimeInMillisecond <
        authUtil.getTokenExpiry(tokenConstants.ACCESS_TOKEN)
    ) {
        return;
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
        return;
    }

    // Both tokens have expired, clear tokens and return to landing page.
    authUtil.clearTokens();
    window.location.replace(baseUrlConstants.BASE_URL);
    return;
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
        await getFreshTokensOrRedirectToLogin();
        config.headers.Authorization = authUtil.getBearerToken();
        return config;
    });
    return instance;
}
