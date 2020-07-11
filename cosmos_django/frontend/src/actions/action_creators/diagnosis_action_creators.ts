/* Contains Diagnosis Action Creators */
import * as patientApi from '../../api/patient_api';
import * as diagnosisActionTypes from '../action_types/diagnosis_action_types';
import * as modelTypes from '../../types/modelTypes';

/**
 * Creates a REQUEST_ADD_DIAGNOSIS action.
 *
 * @returns An action with type REQUEST_ADD_DIAGNOSIS.
 */
export function requestAddDiagnosis(): { type: string } {
    return {
        type: diagnosisActionTypes.REQUEST_ADD_DIAGNOSIS,
    };
}

/**
 * Creates a RECEIVE_ADD_DIAGNOSIS action.
 *
 * @param diagnosis - The newly added Diagnosis object, received from server.
 *
 * @returns An action with type RECEIVE_ADD_DIAGNOSIS.
 */
export function receiveAddDiagnosis(
    diagnosis: modelTypes.Diagnosis
): { type: string; diagnosis: modelTypes.Diagnosis } {
    return {
        type: diagnosisActionTypes.RECEIVE_ADD_DIAGNOSIS,
        diagnosis: diagnosis,
    };
}

/**
 * Adds a new Diagnosis object and dispatches request and receive actions.
 *
 * @param name - The name of the diagnosis.
 * @param description - The description of the diagnosis.
 *
 * @returns A function that when dispatched, adds a new Diagnosis object for the
 * patient.
 */
export function addDiagnosis(name: string, description: string) {
    return function (dispatch) {
        dispatch(requestAddDiagnosis());

        return patientApi
            .addDiagnosis(name, description)
            .then(function (response) {
                dispatch(receiveAddDiagnosis(response.data));
            });
    };
}

/**
 * Creates a REQUEST_UPDATE_DIAGNOSIS action.
 *
 * @returns An action with type REQUEST_UPDATE_DIAGNOSIS.
 */
export function requestUpdateDiagnosis(): { type: string } {
    return {
        type: diagnosisActionTypes.REQUEST_UPDATE_DIAGNOSIS,
    };
}

/**
 * Creates a RECEIVE_UPDATE_DIAGNOSIS action.
 *
 * @param diagnosis - The newly updated Diagnosis object, received the server.
 *
 * @returns An action with type RECEIVE_UPDATE_DIAGNOSIS.
 */
export function receiveUpdateDiagnosis(
    diagnosis: modelTypes.Diagnosis
): { type: string; diagnosis: modelTypes.Diagnosis } {
    return {
        type: diagnosisActionTypes.RECEIVE_UPDATE_DIAGNOSIS,
        diagnosis: diagnosis,
    };
}

/**
 * Updates an Allergy object and dispatches request and receive actions.
 *
 * @param id - The id of the Allergy object.
 * @param name - The name of the allergy.
 * @param description - The description of the allergy.
 *
 * @returns A function that when dispatched, updates a new Allergy object for
 * the patient.
 */
export function updateDiagnosis(id: number, name: string, description: string) {
    /**
     * Updates a diagnosis and saves updated state to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateDiagnosis());

        return patientApi
            .updateDiagnosis(id, name, description)
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
        type: diagnosisActionTypes.REQUEST_DELETE_DIAGNOSIS,
    };
}

export function receiveDeleteDiagnosis() {
    /**
     * Returns an action to notify that a diagnosis was successfully deleted.
     */
    return {
        type: diagnosisActionTypes.RECEIVE_UPDATE_DIAGNOSIS,
    };
}

export function deleteDiagnosis(id: number) {
    /**
     * Deletes a diagnosis.
     */
    return function (dispatch) {
        dispatch(requestDeleteDiagnosis());

        return patientApi.deleteDiagnosis(id).then(function () {
            dispatch(receiveDeleteDiagnosis());
        });
    };
}
