import * as authUtil from "../util/auth_util";
import * as tokenConstants from "../constants/token_constants";
import * as urlPathConstants from "../constants/url_path_constants";
import * as axiosConfig from "../configs/axios_config";
import * as apiEndpointConstants from "../constants/api_endpoint_constants";


async function makeAuthorizedRequestOrRedirectToLogin(request, history) {
    try {
        return await request();
    } catch (error) {
        try {
            const accessTokenResponse = await authUtil.refreshAccessToken();
            authUtil.setToken(
                tokenConstants.ACCESS_TOKEN,
                accessTokenResponse.data.access);
            return await request();
        } catch (error) {
            authUtil.clearTokens();
            // TODO: allow users to Login and resume their.
            history.replace(urlPathConstants.ROOT);
        }
    }
    return null;
}


export function getUser(history: any) {
    function request() {
        return axiosConfig.axiosClient.get(
            apiEndpointConstants.USERS,
            authUtil.getAuthorizationRequestHeader());
    }
    return makeAuthorizedRequestOrRedirectToLogin(request, history)
}

export function addEncounter(encounter_type: string, note: string, history: any) {
    function request() {
        return axiosConfig.axiosClient.post(
            apiEndpointConstants.ENCOUNTERS,
            {
                encounterType: encounter_type,
                note: note,
            },
            authUtil.getAuthorizationRequestHeader())
    }
    return makeAuthorizedRequestOrRedirectToLogin(request, history)
}