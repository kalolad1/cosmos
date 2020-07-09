/* Medication */
import * as actionTypes from '../action_types';
import * as patientApi from '../../api/patient_api';

export function requestAddMedication(): { type: string } {
    /**
     * Returns an action to notify that a POST medication request was made.
     */
    return {
        type: actionTypes.REQUEST_ADD_MEDICATION,
    };
}

export function receiveAddMedication(medication) {
    /**
     * Returns an action to notify that a medication was added.
     */
    return {
        type: actionTypes.RECEIVE_ADD_MEDICATION,
        medication: medication,
    };
}

export function addMedication(name: string, description: string, history) {
    /**
     * Adds a medication and saves it to the client store.
     */
    return function (dispatch) {
        dispatch(requestAddMedication());

        return patientApi
            .addMedication(name, description, history)
            .then(function (response) {
                dispatch(receiveAddMedication(response.data));
            });
    };
}

export function requestUpdateMedication(): { type: string } {
    /**
     * Returns an action to notify that a PUT medication request was made.
     */
    return {
        type: actionTypes.REQUEST_UPDATE_MEDICATION,
    };
}

export function receiveUpdateMedication(medication) {
    /**
     * Returns an action to notify that an medication was successfully updated.
     */
    return {
        type: actionTypes.RECEIVE_UPDATE_MEDICATION,
        medication: medication,
    };
}

export function updateMedication(
    id: number,
    name: string,
    description: string,
    history
) {
    /**
     * Updates a medication and saves updated state to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateMedication());

        return patientApi
            .updateMedication(id, name, description, history)
            .then(function (response) {
                dispatch(receiveUpdateMedication(response.data));
            });
    };
}

export function requestDeleteMedication(): { type: string } {
    /**
     * Returns an action to notify that a DELETE medication request was made.
     */
    return {
        type: actionTypes.REQUEST_DELETE_MEDICATION,
    };
}

export function receiveDeleteMedication() {
    /**
     * Returns an action to notify that a medication was successfully deleted.
     */
    return {
        type: actionTypes.RECEIVE_DELETE_MEDICATION,
    };
}

export function deleteMedication(id: number, history: any) {
    /**
     * Deletes a medication.
     */
    return function (dispatch) {
        dispatch(requestDeleteMedication());

        return patientApi.deleteMedication(id, history).then(function () {
            dispatch(receiveDeleteMedication());
        });
    };
}
