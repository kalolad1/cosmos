import * as axiosConfig from '../configs/axios_config';
import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as tokenConstants from '../constants/token_constants';
import * as urlPathConstants from '../constants/url_path_constants';
import * as types from '../types/types';
import * as authUtil from '../util/auth_util';

async function makeAuthorizedRequestOrRedirectToLogin(request, history) {
    /**
     * Attempts an asynchronous server request and redirects to login if fails.
     */
    try {
        return await request();
    } catch (error) {
        try {
            const accessTokenResponse = await authUtil.refreshAccessToken();
            authUtil.setToken(
                tokenConstants.ACCESS_TOKEN,
                accessTokenResponse.data.access
            );
            return await request();
        } catch (error) {
            authUtil.clearTokens();
            history.replace(urlPathConstants.ROOT);
        }
    }
    return null;
}

export function getUser(history: any) {
    /**
     * Fetches user from the server.
     */
    function request() {
        return axiosConfig.axiosClient.get(
            apiEndpointConstants.USERS,
            authUtil.getAuthorizationRequestHeader()
        );
    }
    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

export function updateUser(user: types.User, history: any) {
    /**
     * Updates the user with the new user object.
     */
    function request() {
        return axiosConfig.axiosClient.put(
            apiEndpointConstants.USERS,
            { ...user },
            authUtil.getAuthorizationRequestHeader()
        );
    }
    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}

export function addEncounter(
    encounterType: string,
    note: string,
    history: any
) {
    /**
     * Adds an encounter.
     */
    function request() {
        return axiosConfig.axiosClient.post(
            apiEndpointConstants.ENCOUNTERS,
            {
                encounterType: encounterType,
                note: note,
            },
            authUtil.getAuthorizationRequestHeader()
        );
    }
    return makeAuthorizedRequestOrRedirectToLogin(request, history);
}
