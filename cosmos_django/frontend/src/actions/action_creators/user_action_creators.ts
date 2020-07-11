/* User */
import * as userActionTypes from '../action_types/user_action_types';
import * as modelTypes from '../../types/modelTypes';
import * as patientApi from '../../api/patient_api';

export function requestGetUser(): { type: string } {
    /**
     * Returns an action to notify that a GET user request was made.
     */
    return {
        type: userActionTypes.REQUEST_GET_USER,
    };
}

export function receiveGetUser(
    user: modelTypes.User
): { type: string; user: modelTypes.User } {
    /**
     * Returns an action to notify that a user was received.
     */
    return {
        type: userActionTypes.RECEIVE_GET_USER,
        user: user,
    };
}

export function getUser() {
    /**
     * Fetches a user and saves it to the client store.
     */
    return function (dispatch) {
        dispatch(requestGetUser());

        return patientApi.getUser().then(function (response) {
            dispatch(receiveGetUser(response.data));
        });
    };
}

export function requestUpdateUser(): { type: string } {
    /**
     * Returns an action to notify that a PUT user request was made.
     */
    return {
        type: userActionTypes.REQUEST_UPDATE_USER,
    };
}

export function receiveUpdateUser(user: modelTypes.User) {
    /**
     * Returns an action to notify that a user was updated.
     */
    return {
        type: userActionTypes.RECEIVE_UPDATE_USER,
        user: user,
        success: { userFacingMessage: 'Saved successfully!' },
    };
}

export function failureUpdateUser(error) {
    return {
        type: userActionTypes.FAILURE_UPDATE_USER,
        error: error,
    };
}

export function updateUser(user) {
    /**
     * Updates a user and saves the updated user to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateUser());

        return patientApi
            .updateUser(user)
            .then(function (response) {
                dispatch(receiveUpdateUser(response.data));
            })
            .catch(function (error) {
                dispatch(failureUpdateUser(error.response.data));
            });
    };
}
