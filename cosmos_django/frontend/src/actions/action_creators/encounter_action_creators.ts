/* Contains Encounter Action Creators */
import * as encounterActionTypes from '../action_types/encounter_action_types';
import * as patientApi from '../../api/patient_api';
import * as modelTypes from '../../types/modelTypes';

/**
 * Creates a REQUEST_ADD_ENCOUNTER action.
 *
 * @returns An action with type REQUEST_ADD_ENCOUNTER.
 */
export function requestAddEncounter(): { type: string } {
    return {
        type: encounterActionTypes.REQUEST_ADD_ENCOUNTER,
    };
}

/**
 * Creates a RECEIVE_ADD_ENCOUNTER action.
 *
 * @param encounter - The newly added Encounter object, received from server.
 *
 * @returns An action with type RECEIVE_ADD_ENCOUNTER.
 */
export function receiveAddEncounter(
    encounter: modelTypes.Encounter
): { type: string; encounter: modelTypes.Encounter } {
    return {
        type: encounterActionTypes.RECEIVE_ADD_ENCOUNTER,
        encounter: encounter,
    };
}

/**
 * Adds a new Encounter object and dispatches request and receive actions.
 *
 * @param newEncounter - The new encounter to be added.
 *
 * @returns A function that when dispatched, adds a new Encounter object for the
 * patient.
 */
export function addEncounter(newEncounter: modelTypes.EncounterConstructor) {
    return function (dispatch) {
        dispatch(requestAddEncounter());

        return patientApi.addEncounter(newEncounter).then(function (response) {
            dispatch(receiveAddEncounter(response.data));
        });
    };
}

/**
 * Creates a REQUEST_UPDATE_ENCOUNTER action.
 *
 * @returns An action with type REQUEST_UPDATE_ENCOUNTER.
 */
export function requestUpdateEncounter(): { type: string } {
    return {
        type: encounterActionTypes.REQUEST_UPDATE_ENCOUNTER,
    };
}

/**
 * Creates a RECEIVE_UPDATE_ENCOUNTER action.
 *
 * @param encounter - The newly updated Encounter object, received from server.
 *
 * @returns An action with type RECEIVE_UPDATE_ENCOUNTER.
 */
export function receiveUpdateEncounter(
    encounter: modelTypes.Encounter
): { type: string; encounter: modelTypes.Encounter } {
    return {
        type: encounterActionTypes.RECEIVE_UPDATE_ENCOUNTER,
        encounter: encounter,
    };
}

/**
 * Updates an Encounter object and dispatches request and receive actions.
 *
 * @param updatedEncounter - An object representing an updated Encounter.
 *
 * @returns A function that when dispatched, updates a new Encounter object for
 * the patient.
 */
export function updateEncounter(updatedEncounter: modelTypes.EncounterUpdate) {
    return function (dispatch) {
        dispatch(requestUpdateEncounter());

        return patientApi
            .updateEncounter(updatedEncounter)
            .then(function (response) {
                dispatch(receiveUpdateEncounter(response.data));
            });
    };
}

/**
 * Creates a REQUEST_DELETE_ENCOUNTER action.
 *
 * @returns An action with type REQUEST_DELETE_ENCOUNTER.
 */
export function requestDeleteEncounter(): { type: string } {
    return {
        type: encounterActionTypes.REQUEST_DELETE_ENCOUNTER,
    };
}

/**
 * Creates a RECEIVE_DELETE_ENCOUNTER action.
 *
 * @returns An action with type RECEIVE_DELETE_ENCOUNTER.
 */
export function receiveDeleteEncounter() {
    return {
        type: encounterActionTypes.RECEIVE_DELETE_ENCOUNTER,
    };
}

/**
 * Deletes an Encounter object and dispatches request and receive actions.
 *
 * @param id - The id of the Encounter object.
 *
 * @returns A function that when dispatched, deletes an Encounter object for the
 * patient.
 */
export function deleteEncounter(id: number) {
    return function (dispatch) {
        dispatch(requestDeleteEncounter());

        return patientApi.deleteEncounter(id).then(function () {
            dispatch(receiveDeleteEncounter());
        });
    };
}
