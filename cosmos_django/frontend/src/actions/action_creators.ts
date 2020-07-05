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
     * Returns an action to notify that a POST encounter request was made.
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

export function requestUpdateEncounter(): { type: string } {
    /**
     * Returns an action to notify that a PUT encounter request was made.
     */
    return {
        type: actionTypes.REQUEST_UPDATE_USER,
    };
}

export function receiveUpdateEncounter(encounter) {
    /**
     * Returns an action to notify that an encounter was successfully updated.
     */
    return {
        type: actionTypes.RECEIVE_UPDATE_ENCOUNTER,
        encounter: encounter,
    };
}

export function updateEncounter(
    id: number,
    encounterType: string,
    note: string,
    history
) {
    /**
     * Updates an encounter and saves updated state to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateEncounter());

        return patientApi
            .updateEncounter(id, encounterType, note, history)
            .then(function (response) {
                dispatch(receiveUpdateEncounter(response.data));
            });
    };
}

export function requestDeleteEncounter(): { type: string } {
    /**
     * Returns an action to notify that a DELETE encounter request was made.
     */
    return {
        type: actionTypes.REQUEST_DELETE_ENCOUNTER,
    };
}

export function receiveDeleteEncounter() {
    /**
     * Returns an action to notify that an encounter was successfully deleted.
     */
    return {
        type: actionTypes.RECEIVE_UPDATE_ENCOUNTER,
    };
}

export function deleteEncounter(id: number, history: any) {
    /**
     * Deletes an encounter.
     */
    return function (dispatch) {
        dispatch(requestDeleteEncounter());

        return patientApi.deleteEncounter(id, history).then(function () {
            dispatch(receiveDeleteDiagnosis());
        });
    };
}

/* Diagnosis */
export function requestAddDiagnosis(): { type: string } {
    /**
     * Returns an action to notify that a POST diagnosis request was made.
     */
    return {
        type: actionTypes.REQUEST_ADD_DIAGNOSIS,
    };
}

export function receiveAddDiagnosis(diagnosis) {
    /**
     * Returns an action to notify that a diagnosis was added.
     */
    return {
        type: actionTypes.RECEIVE_ADD_DIAGNOSIS,
        diagnosis: diagnosis,
    };
}

export function addDiagnosis(name: string, description: string, history) {
    /**
     * Adds a diagnosis and saves it to the client store.
     */
    return function (dispatch) {
        dispatch(requestAddDiagnosis());

        return patientApi
            .addDiagnosis(name, description, history)
            .then(function (response) {
                dispatch(receiveAddDiagnosis(response.data));
            });
    };
}

export function requestUpdateDiagnosis(): { type: string } {
    /**
     * Returns an action to notify that a PUT diagnosis request was made.
     */
    return {
        type: actionTypes.REQUEST_UPDATE_DIAGNOSIS,
    };
}

export function receiveUpdateDiagnosis(diagnosis) {
    /**
     * Returns an action to notify that an diagnosis was successfully updated.
     */
    return {
        type: actionTypes.RECEIVE_UPDATE_DIAGNOSIS,
        diagnosis: diagnosis,
    };
}

export function updateDiagnosis(
    id: number,
    name: string,
    description: string,
    history
) {
    /**
     * Updates a diagnosis and saves updated state to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateDiagnosis());

        return patientApi
            .updateDiagnosis(id, name, description, history)
            .then(function (response) {
                dispatch(receiveUpdateDiagnosis(response.data));
            });
    };
}

export function requestDeleteDiagnosis(): { type: string } {
    /**
     * Returns an action to notify that a DELETE diagnosis request was made.
     */
    return {
        type: actionTypes.REQUEST_DELETE_DIAGNOSIS,
    };
}

export function receiveDeleteDiagnosis() {
    /**
     * Returns an action to notify that a diagnosis was successfully deleted.
     */
    return {
        type: actionTypes.RECEIVE_UPDATE_DIAGNOSIS,
    };
}

export function deleteDiagnosis(id: number, history: any) {
    /**
     * Deletes a diagnosis.
     */
    return function (dispatch) {
        dispatch(requestDeleteDiagnosis());

        return patientApi.deleteDiagnosis(id, history).then(function () {
            dispatch(receiveDeleteDiagnosis());
        });
    };
}
