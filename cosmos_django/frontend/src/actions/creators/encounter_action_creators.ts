/* Encounter */
import * as actionTypes from '../action_types';
import * as patientApi from '../../api/patient_api';
import { receiveDeleteDiagnosis } from '../action_creators';

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
