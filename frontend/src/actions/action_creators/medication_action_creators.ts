/* Medication Action Creators */
import * as medicationActionTypes from '../action_types/medication_action_types';
import * as patientApi from '../../api/patient_api';
import * as modelTypes from '../../types/modelTypes';

/**
 * Creates a REQUEST_ADD_MEDICATION action.
 *
 * @returns An action with type REQUEST_ADD_MEDICATION.
 */
export function requestAddMedication(): { type: string } {
    return {
        type: medicationActionTypes.REQUEST_ADD_MEDICATION,
    };
}

/**
 * Creates a RECEIVE_ADD_MEDICATION action.
 *
 * @param medication - The newly added Medication object, received from server.
 *
 * @returns An action with type RECEIVE_ADD_MEDICATION.
 */
export function receiveAddMedication(
    medication: modelTypes.Medication
): { type: string; medication: modelTypes.Medication } {
    return {
        type: medicationActionTypes.RECEIVE_ADD_MEDICATION,
        medication: medication,
    };
}

/**
 * Adds a new Medication object and dispatches request and receive actions.
 *
 * @param newMedication - The new medication to be added.
 *
 * @returns A function that when dispatched, adds a new Medication object for the
 * patient.
 */
export function addMedication(newMedication: modelTypes.MedicationConstructor) {
    return function (dispatch) {
        dispatch(requestAddMedication());

        return patientApi
            .addMedication(newMedication)
            .then(function (response) {
                dispatch(receiveAddMedication(response.data));
            });
    };
}

/**
 * Creates a REQUEST_UPDATE_MEDICATION action.
 *
 * @returns An action with type REQUEST_UPDATE_MEDICATION.
 */
export function requestUpdateMedication(): { type: string } {
    return {
        type: medicationActionTypes.REQUEST_UPDATE_MEDICATION,
    };
}

/**
 * Creates a RECEIVE_UPDATE_MEDICATION action.
 *
 * @param medication - The newly updated Medication object, received the server.
 *
 * @returns An action with type RECEIVE_UPDATE_MEDICATION.
 */
export function receiveUpdateMedication(
    medication: modelTypes.Medication
): { type: string; medication: modelTypes.Medication } {
    return {
        type: medicationActionTypes.RECEIVE_UPDATE_MEDICATION,
        medication: medication,
    };
}

/**
 * Updates an Medication object and dispatches request and receive actions.
 *
 * @param updatedMedication - The updated medication to be saved.
 *
 * @returns A function that when dispatched, updates a new Medication object for
 * the patient.
 */
export function updateMedication(
    updatedMedication: modelTypes.MedicationUpdate
) {
    /**
     * Updates a medication and saves updated state to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateMedication());

        return patientApi
            .updateMedication(updatedMedication)
            .then(function (response) {
                dispatch(receiveUpdateMedication(response.data));
            });
    };
}

/**
 * Creates a REQUEST_DELETE_MEDICATION action.
 *
 * @returns An action with type REQUEST_DELETE_MEDICATION.
 */
export function requestDeleteMedication(): { type: string } {
    return {
        type: medicationActionTypes.REQUEST_DELETE_MEDICATION,
    };
}

/**
 * Creates a RECEIVE_DELETE_MEDICATION action.
 *
 * @returns An action with type RECEIVE_DELETE_MEDICATION.
 */
export function receiveDeleteMedication(): { type: string } {
    return {
        type: medicationActionTypes.RECEIVE_DELETE_MEDICATION,
    };
}

/**
 * Deletes a medication and dispatches request and receive actions.
 *
 * @param id - The id of the Medication object.
 *
 * @returns A function that when dispatched, deletes an medication for the
 * patient.
 */
export function deleteMedication(id: number) {
    return function (dispatch) {
        dispatch(requestDeleteMedication());

        return patientApi.deleteMedication(id).then(function () {
            dispatch(receiveDeleteMedication());
        });
    };
}
