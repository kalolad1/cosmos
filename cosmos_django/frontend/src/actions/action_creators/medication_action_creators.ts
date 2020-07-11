/* Medication */
import * as medicationActionTypes from '../action_types/medication_action_types';
import * as patientApi from '../../api/patient_api';

export function requestAddMedication(): { type: string } {
    /**
     * Returns an action to notify that a POST medication request was made.
     */
    return {
        type: medicationActionTypes.REQUEST_ADD_MEDICATION,
    };
}

export function receiveAddMedication(medication) {
    /**
     * Returns an action to notify that a medication was added.
     */
    return {
        type: medicationActionTypes.RECEIVE_ADD_MEDICATION,
        medication: medication,
    };
}

export function addMedication(name: string, description: string) {
    /**
     * Adds a medication and saves it to the client store.
     */
    return function (dispatch) {
        dispatch(requestAddMedication());

        return patientApi
            .addMedication(name, description)
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
        type: medicationActionTypes.REQUEST_UPDATE_MEDICATION,
    };
}

export function receiveUpdateMedication(medication) {
    /**
     * Returns an action to notify that an medication was successfully updated.
     */
    return {
        type: medicationActionTypes.RECEIVE_UPDATE_MEDICATION,
        medication: medication,
    };
}

export function updateMedication(
    id: number,
    name: string,
    description: string
) {
    /**
     * Updates a medication and saves updated state to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateMedication());

        return patientApi
            .updateMedication(id, name, description)
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
        type: medicationActionTypes.REQUEST_DELETE_MEDICATION,
    };
}

export function receiveDeleteMedication() {
    /**
     * Returns an action to notify that a medication was successfully deleted.
     */
    return {
        type: medicationActionTypes.RECEIVE_DELETE_MEDICATION,
    };
}

export function deleteMedication(id: number) {
    /**
     * Deletes a medication.
     */
    return function (dispatch) {
        dispatch(requestDeleteMedication());

        return patientApi.deleteMedication(id).then(function () {
            dispatch(receiveDeleteMedication());
        });
    };
}
