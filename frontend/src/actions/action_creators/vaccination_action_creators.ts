/* Vaccination Action Creators */
import * as vaccinationActionTypes from '../action_types/vaccination_action_types';
import * as patientApi from '../../api/patient_api';
import * as modelTypes from '../../types/modelTypes';

/**
 * Creates a REQUEST_ADD_VACCINATION action.
 *
 * @returns An action with type REQUEST_ADD_VACCINATION.
 */
export function requestAddVaccination(): { type: string } {
    return {
        type: vaccinationActionTypes.REQUEST_ADD_VACCINATION,
    };
}

/**
 * Creates a RECEIVE_ADD_VACCINATION action.
 *
 * @param vaccination - The newly added Vaccination object, received from
 * the server.
 *
 * @returns An action with type RECEIVE_ADD_VACCINATION.
 */
export function receiveAddVaccination(
    vaccination: modelTypes.Vaccination
): { type: string; vaccination: modelTypes.Vaccination } {
    return {
        type: vaccinationActionTypes.RECEIVE_ADD_VACCINATION,
        vaccination: vaccination,
    };
}

/**
 * Adds a new Vaccination object and dispatches request and receive actions.
 *
 * @param newVaccination - The new vaccination to be added.
 *
 * @returns A function that when dispatched, adds a new Vaccination object for
 * the patient.
 */
export function addVaccination(
    newVaccination: modelTypes.VaccinationConstructor
) {
    return function (dispatch) {
        dispatch(requestAddVaccination());

        return patientApi
            .addVaccination(newVaccination)
            .then(function (response) {
                dispatch(receiveAddVaccination(response.data));
            });
    };
}

/**
 * Creates a REQUEST_UPDATE_VACCINATION action.
 *
 * @returns An action with type REQUEST_UPDATE_VACCINATION.
 */
export function requestUpdateVaccination(): { type: string } {
    return {
        type: vaccinationActionTypes.REQUEST_UPDATE_VACCINATION,
    };
}

/**
 * Creates a RECEIVE_UPDATE_VACCINATION action.
 *
 * @param vaccination - The newly updated Vaccination object, received form the
 * server.
 *
 * @returns An action with type RECEIVE_UPDATE_DIAGNOSIS.
 */
export function receiveUpdateVaccination(
    vaccination: modelTypes.Vaccination
): { type: string; vaccination: modelTypes.Vaccination } {
    return {
        type: vaccinationActionTypes.RECEIVE_UPDATE_VACCINATION,
        vaccination: vaccination,
    };
}

/**
 * Updates an Vaccination object and dispatches request and receive actions.
 *
 * @param updatedVaccination - The updated vaccination to be saved.
 *
 * @returns A function that when dispatched, updates a new Vaccination object for
 * the patient.
 */
export function updateVaccination(
    updatedVaccination: modelTypes.VaccinationUpdate
) {
    /**
     * Updates a vaccination and saves updated state to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateVaccination());

        return patientApi
            .updateVaccination(updatedVaccination)
            .then(function (response) {
                dispatch(receiveUpdateVaccination(response.data));
            });
    };
}

/**
 * Creates a REQUEST_DELETE_VACCINATION action.
 *
 * @returns An action with type REQUEST_DELETE_VACCINATION.
 */
export function requestDeleteVaccination(): { type: string } {
    return {
        type: vaccinationActionTypes.REQUEST_DELETE_VACCINATION,
    };
}

/**
 * Creates a RECEIVE_DELETE_VACCINATION action.
 *
 * @returns An action with type RECEIVE_DELETE_VACCINATION.
 */
export function receiveDeleteVaccination(): { type: string } {
    return {
        type: vaccinationActionTypes.RECEIVE_DELETE_VACCINATION,
    };
}

/**
 * Deletes an vaccination and dispatches request and receive actions.
 *
 * @param id - The id of the Vaccination object.
 *
 * @returns A function that when dispatched, deletes a vaccination for the
 * patient.
 */
export function deleteVaccination(id: number) {
    return function (dispatch) {
        dispatch(requestDeleteVaccination());

        return patientApi.deleteVaccination(id).then(function () {
            dispatch(receiveDeleteVaccination());
        });
    };
}
