/* Allergy */
import * as patientApi from '../../api/patient_api';
import * as allergyActionTypes from '../types/allergy_action_types';
import * as types from '../../types/types';

/**
 * Creates a REQUEST_ADD_ALLERGY action.
 *
 * @returns An action with type REQUEST_ADD_ALLERGY.
 */
export function requestAddAllergy(): { type: string } {
    return {
        type: allergyActionTypes.REQUEST_ADD_ALLERGY,
    };
}

/**
 * Creates a RECEIVE_ADD_ALLERGY action.
 *
 * @param allergy - The newly added Allergy object, received from the server.
 *
 * @returns An action with type RECEIVE_ADD_ALLERGY.
 */
export function receiveAddAllergy(
    allergy: types.Allergy
): {
    type: string;
    allergy: types.Allergy;
} {
    return {
        type: allergyActionTypes.RECEIVE_ADD_ALLERGY,
        allergy: allergy,
    };
}

/**
 * Adds a new Allergy object and dispatches request and receive actions.
 *
 * @param name - The name of the allergy.
 * @param description - The description of the allergy.
 * @param history - The history object of the invoking component.
 *
 * @returns A function that when dispatched, adds a new Allergy object for the
 * patient.
 */
export function addAllergy(name: string, description: string, history: any) {
    return function (dispatch) {
        dispatch(requestAddAllergy());

        return patientApi
            .addAllergy(name, description, history)
            .then(function (response) {
                dispatch(receiveAddAllergy(response.data));
            });
    };
}

/**
 * Creates a REQUEST_UPDATE_ALLERGY action.
 *
 * @returns An action with type REQUEST_UPDATE_ALLERGY.
 */
export function requestUpdateAllergy(): { type: string } {
    return {
        type: allergyActionTypes.REQUEST_UPDATE_ALLERGY,
    };
}

/**
 * Creates a RECEIVE_UPDATE_ALLERGY action.
 *
 * @param allergy - The newly updated Allergy object, received from the server.
 *
 * @returns An action with type RECEIVE_UPDATE_ALLERGY.
 */
export function receiveUpdateAllergy(
    allergy: types.Allergy
): { type: string; allergy: types.Allergy } {
    /**
     * Returns an action to notify that an allergy was successfully updated.
     */
    return {
        type: allergyActionTypes.RECEIVE_UPDATE_ALLERGY,
        allergy: allergy,
    };
}

/**
 * Updates an Allergy object and dispatches request and receive actions.
 *
 * @param id - The id of the Allergy object.
 * @param name - The name of the allergy.
 * @param description - The description of the allergy.
 * @param history - The history object of the invoking component.
 *
 * @returns A function that when dispatched, updates a new Allergy object for
 * the patient.
 */
export function updateAllergy(
    id: number,
    name: string,
    description: string,
    history: any
) {
    return function (dispatch) {
        dispatch(requestUpdateAllergy());

        return patientApi
            .updateAllergy(id, name, description, history)
            .then(function (response) {
                dispatch(receiveUpdateAllergy(response.data));
            });
    };
}

/**
 * Creates a REQUEST_DELETE_ALLERGY action.
 *
 * @returns An action with type REQUEST_DELETE_ALLERGY.
 */
export function requestDeleteAllergy(): { type: string } {
    return {
        type: allergyActionTypes.REQUEST_DELETE_ALLERGY,
    };
}

/**
 * Creates a RECEIVE_DELETE_ALLERGY action.
 *
 * @returns An action with type RECEIVE_DELETE_ALLERGY.
 */
export function receiveDeleteAllergy(): { type: string } {
    return {
        type: allergyActionTypes.RECEIVE_DELETE_ALLERGY,
    };
}

/**
 * Deletes an Allergy object and dispatches request and receive actions.
 *
 * @param id - The id of the Allergy object.
 * @param history - The history object of the invoking component.
 *
 * @returns A function that when dispatched, deletes an Allergy object for the
 * patient.
 */
export function deleteAllergy(id: number, history: any) {
    return function (dispatch) {
        dispatch(requestDeleteAllergy());

        return patientApi.deleteAllergy(id, history).then(function () {
            dispatch(receiveDeleteAllergy());
        });
    };
}
