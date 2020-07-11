import * as userActionTypes from '../actions/action_types/user_action_types';
import * as encounterActionTypes from '../actions/action_types/encounter_action_types';
import * as diagnosisActionTypes from '../actions/action_types/diagnosis_action_types';
import * as medicationActionTypes from '../actions/action_types/medication_action_types';
import * as allergyActionTypes from '../actions/action_types/allergy_action_types';
import * as vaccinationActionTypes from '../actions/action_types/vaccination_action_types';

import * as authUtil from '../util/auth_util';
import * as tokenConstants from '../constants/token_constants';
import * as urlPathConstants from '../constants/url_path_constants';
import * as baseUrlConstants from '../constants/base_url_constant';

const initialState = {
    isFetchingUser: true,
    isCreatingEncounter: false,
    isUpdatingUser: false,
    UIMessages: {
        errorUpdateUser: {},
        successUpdateUser: {},
    },
    user: {},
};

async function getFreshTokensOrRedirectToLogin() {
    // Checks for fresh access token. If not, it tries to refresh it. If the
    // refresh token is expired, then it redirects to login.

    // Check for fresh access token.
    const currentTimeInMillisecond = new Date().getTime();
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

    // Both tokens have expired, clear tokens and return to login.
    authUtil.clearTokens();
    window.location.replace(baseUrlConstants.BASE_URL + urlPathConstants.LOGIN);
    return false;
}

export function rootReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
        case userActionTypes.REQUEST_GET_USER:
            return Object.assign({}, state, {
                isFetchingUser: true,
            });
        case userActionTypes.RECEIVE_GET_USER:
            return Object.assign({}, state, {
                user: action.user,
                isFetchingUser: false,
            });

        case userActionTypes.REQUEST_UPDATE_USER:
            return Object.assign({}, state, {
                isUpdatingUser: true,
                UIMessages: {
                    ...state.UIMessages,
                    successUpdateUser: {},
                    errorUpdateUser: {},
                },
            });
        case userActionTypes.RECEIVE_UPDATE_USER:
            return Object.assign({}, state, {
                user: action.user,
                isUpdatingUser: false,
                UIMessages: {
                    ...state.UIMessages,
                    successUpdateUser: action.success,
                },
            });
        case userActionTypes.FAILURE_UPDATE_USER:
            return Object.assign({}, state, {
                isUpdatingUser: false,
                UIMessages: {
                    ...state.UIMessages,
                    errorUpdateUser: action.error,
                },
            });

        case encounterActionTypes.REQUEST_ADD_ENCOUNTER:
            return Object.assign({}, state, {
                isCreatingEncounter: true,
            });
        case encounterActionTypes.RECEIVE_ADD_ENCOUNTER:
            return Object.assign({}, state, {
                encounter: action.encounter,
                isCreatingEncounter: false,
            });
        default:
            return state;
    }
}
