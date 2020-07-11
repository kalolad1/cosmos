/* Encounter */
import * as encounterActionTypes from '../action_types/encounter_action_types';
import * as patientApi from '../../api/patient_api';

export function requestAddEncounter(): { type: string } {
    /**
     * Returns an action to notify that a POST encounter request was made.
     */
    return {
        type: encounterActionTypes.REQUEST_ADD_ENCOUNTER,
    };
}

export function receiveAddEncounter(encounter) {
    /**
     * Returns an action to notify that an encounter was added.
     */
    return {
        type: encounterActionTypes.RECEIVE_ADD_ENCOUNTER,
        encounter: encounter,
    };
}

export function addEncounter(encounterType: string, note: string) {
    /**
     * Adds an encounter and saves it to the client store.
     */
    return function (dispatch) {
        dispatch(requestAddEncounter());

        return patientApi
            .addEncounter(encounterType, note)
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
        type: encounterActionTypes.REQUEST_UPDATE_ENCOUNTER,
    };
}

export function receiveUpdateEncounter(encounter) {
    /**
     * Returns an action to notify that an encounter was successfully updated.
     */
    return {
        type: encounterActionTypes.RECEIVE_UPDATE_ENCOUNTER,
        encounter: encounter,
    };
}

export function updateEncounter(
    id: number,
    encounterType: string,
    note: string
) {
    /**
     * Updates an encounter and saves updated state to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateEncounter());

        return patientApi
            .updateEncounter(id, encounterType, note)
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
        type: encounterActionTypes.REQUEST_DELETE_ENCOUNTER,
    };
}

export function receiveDeleteEncounter() {
    /**
     * Returns an action to notify that an encounter was successfully deleted.
     */
    return {
        type: encounterActionTypes.RECEIVE_UPDATE_ENCOUNTER,
    };
}

export function deleteEncounter(id: number) {
    /**
     * Deletes an encounter.
     */
    return function (dispatch) {
        dispatch(requestDeleteEncounter());

        return patientApi.deleteEncounter(id).then(function () {
            dispatch(receiveDeleteEncounter());
        });
    };
}
