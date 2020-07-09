/* Diagnosis */
import * as actionTypes from '../action_types';
import * as patientApi from '../../api/patient_api';

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
