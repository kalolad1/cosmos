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
 * @param newDiagnosis - The new diagnosis to be added.
 *
 * @returns A function that when dispatched, adds a new Diagnosis object for the
 * patient.
 */
export function addDiagnosis(newDiagnosis: modelTypes.DiagnosisConstructor) {
    return function (dispatch) {
        dispatch(requestAddDiagnosis());

        return patientApi.addDiagnosis(newDiagnosis).then(function (response) {
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
 * Updates an Diagnosis object and dispatches request and receive actions.
 *
 * @param updatedDiagnosis - The updated diagnosis to be saved.
 *
 * @returns A function that when dispatched, updates a new Diagnosis object for
 * the patient.
 */
export function updateDiagnosis(updatedDiagnosis: modelTypes.DiagnosisUpdate) {
    return function (dispatch) {
        dispatch(requestUpdateDiagnosis());

        return patientApi
            .updateDiagnosis(updatedDiagnosis)
            .then(function (response) {
                dispatch(receiveUpdateDiagnosis(response.data));
            });
    };
}

/**
 * Creates a REQUEST_DELETE_DIAGNOSIS action.
 *
 * @returns An action with type REQUEST_DELETE_DIAGNOSIS.
 */
export function requestDeleteDiagnosis(): { type: string } {
    return {
        type: diagnosisActionTypes.REQUEST_DELETE_DIAGNOSIS,
    };
}

/**
 * Creates a RECEIVE_DELETE_DIAGNOSIS action.
 *
 * @returns An action with type RECEIVE_DELETE_DIAGNOSIS.
 */
export function receiveDeleteDiagnosis(): { type: string } {
    return {
        type: diagnosisActionTypes.RECEIVE_DELETE_DIAGNOSIS,
    };
}

/**
 * Deletes an Diagnosis object and dispatches request and receive actions.
 *
 * @param id - The id of the Diagnosis object.
 *
 * @returns A function that when dispatched, deletes an Diagnosis object for the
 * patient.
 */
export function deleteDiagnosis(id: number) {
    return function (dispatch) {
        dispatch(requestDeleteDiagnosis());

        return patientApi.deleteDiagnosis(id).then(function () {
            dispatch(receiveDeleteDiagnosis());
        });
    };
}
