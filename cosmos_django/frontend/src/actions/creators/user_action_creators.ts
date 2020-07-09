/* User */
import * as actionTypes from '../action_types';
import * as types from '../../types/types';
import * as patientApi from '../../api/patient_api';

export function requestGetUser(): { type: string } {
    /**
     * Returns an action to notify that a GET user request was made.
     */
    return {
        type: actionTypes.REQUEST_GET_USER,
    };
}

export function receiveGetUser(
    user: types.User
): { type: string; user: types.User } {
    /**
     * Returns an action to notify that a user was received.
     */
    return {
        type: actionTypes.RECEIVE_GET_USER,
        user: user,
    };
}

export function fetchUser(history) {
    /**
     * Fetches a user and saves it to the client store.
     */
    return function (dispatch) {
        dispatch(requestGetUser());

        return patientApi.getUser(history).then(function (response) {
            dispatch(receiveGetUser(response.data));
        });
    };
}

export function requestUpdateUser(): { type: string } {
    /**
     * Returns an action to notify that a PUT user request was made.
     */
    return {
        type: actionTypes.REQUEST_UPDATE_USER,
    };
}

export function receiveUpdateUser(user: types.User) {
    /**
     * Returns an action to notify that a user was updated.
     */
    return {
        type: actionTypes.RECEIVE_UPDATE_USER,
        user: user,
        success: { userFacingMessage: 'Saved successfully!' },
    };
}

export function failureUpdateUser(error) {
    return {
        type: actionTypes.FAILURE_UPDATE_USER,
        error: error,
    };
}

export function updateUser(user, history) {
    /**
     * Updates a user and saves the updated user to the client store.
     */
    console.log(user);
    return function (dispatch) {
        dispatch(requestUpdateUser());

        return patientApi
            .updateUser(user, history)
            .then(function (response) {
                dispatch(receiveUpdateUser(response.data));
            })
            .catch(function (error) {
                dispatch(failureUpdateUser(error.response.data));
            });
    };
}
