import * as actionTypes from './action_types';
import * as patientApi from '../api/patient_api';
import * as types from '../types/types';

/* User */
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

export function receiveUpdateUser(
    user: types.User
): { type: string; user: types.User } {
    /**
     * Returns an action to notify that a user was updated.
     */
    return {
        type: actionTypes.RECEIVE_UPDATE_USER,
        user: user,
    };
}

export function updateUser(user, history) {
    /**
     * Updates a user and saves the updated user to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateUser());

        return patientApi.updateUser(user, history).then(function (response) {
            dispatch(receiveUpdateUser(response.data));
        });
    };
}

/* Encounter */
export function requestAddEncounter(): { type: string } {
    /**
     * Returns an action to notify that a PUT encounter request was made.
     */
    return {
        type: actionTypes.REQUEST_ADD_ENCOUNTER,
    };
}

export function receiveAddEncounter(encounter) {
    /**
     * Returns an action to notify that an encounter was added.
     */
    return {
        type: actionTypes.RECEIVE_ADD_ENCOUNTER,
        encounter: encounter,
    };
}

export function addEncounter(encounterType: string, note: string, history) {
    /**
     * Adds an encounter and saves it to the client store.
     */
    return function (dispatch) {
        dispatch(requestAddEncounter());

        return patientApi
            .addEncounter(encounterType, note, history)
            .then(function (response) {
                dispatch(receiveAddEncounter(response.data));
            });
    };
}
