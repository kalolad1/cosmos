/* User Action Creators */
import * as userActionTypes from '../action_types/user_action_types';
import * as patientApi from '../../api/patient_api';
import * as errorTypes from '../../types/errorTypes';
import * as modelTypes from '../../types/modelTypes';

/**
 * Creates a REQUEST_GET_USER action.
 *
 * @returns An action with type REQUEST_GET_USER.
 */
export function requestGetUser(): { type: string } {
    return {
        type: userActionTypes.REQUEST_GET_USER,
    };
}

/**
 * Creates a RECEIVE_GET_USER action.
 *
 * @param user - The retrieved user object.
 *
 * @returns An action with type RECEIVE_GET_USER.
 */
export function receiveGetUser(
    user: modelTypes.User
): { type: string; user: modelTypes.User } {
    return {
        type: userActionTypes.RECEIVE_GET_USER,
        user: user,
    };
}

/**
 * Gets the user data and dispatches request and receive actions.
 *
 * @returns A function that when dispatched, gets the user data.
 */
export function getUser() {
    return function (dispatch) {
        dispatch(requestGetUser());

        return patientApi.getUser().then(function (response) {
            dispatch(receiveGetUser(response.data));
        });
    };
}

/**
 * Creates a REQUEST_UPDATE_USER action.
 *
 * @returns An action with type REQUEST_UPDATE_USER.
 */
export function requestUpdateUser(): { type: string } {
    return {
        type: userActionTypes.REQUEST_UPDATE_USER,
    };
}

/**
 * Creates a RECEIVE_UPDATE_USER action.
 *
 * @param user - The updated User object.
 *
 * @returns An action with type RECEIVE_UPDATE_USER.
 */
export function receiveUpdateUser(
    user: modelTypes.User
): {
    type: string;
    user: modelTypes.User;
    success: { userFacingMessage: string };
} {
    return {
        type: userActionTypes.RECEIVE_UPDATE_USER,
        user: user,
        success: { userFacingMessage: 'Saved successfully!' },
    };
}
/**
 * Creates a FAILURE_UPDATE_USER action.
 *
 * @param error - The error object specifying the failure.
 *
 * @returns An action with type FAILURE_UPDATE_USER.
 */
export function failureUpdateUser(
    error: errorTypes.error
): { type: string; error: errorTypes.error } {
    return {
        type: userActionTypes.FAILURE_UPDATE_USER,
        error: error,
    };
}

/**
 * Updates a user and dispatches request and receive actions.
 *
 * @param updatedUser - An object representing an updated user.
 *
 * @returns A function that when dispatched, updates user object.
 */
export function updateUser(updatedUser: modelTypes.UserUpdate) {
    return function (dispatch) {
        dispatch(requestUpdateUser());

        return patientApi
            .updateUser(updatedUser)
            .then(function (response) {
                dispatch(receiveUpdateUser(response.data));
            })
            .catch(function (error) {
                dispatch(failureUpdateUser(error.response.data));
            });
    };
}
