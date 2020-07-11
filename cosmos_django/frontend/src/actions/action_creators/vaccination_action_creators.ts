/* Vaccination */
import * as vaccinationActionTypes from '../action_types/vaccination_action_types';
import * as patientApi from '../../api/patient_api';

export function requestAddVaccination(): { type: string } {
    /**
     * Returns an action to notify that a POST vaccination request was made.
     */
    return {
        type: vaccinationActionTypes.REQUEST_ADD_VACCINATION,
    };
}

export function receiveAddVaccination(vaccination) {
    /**
     * Returns an action to notify that a vaccination was added.
     */
    return {
        type: vaccinationActionTypes.RECEIVE_ADD_VACCINATION,
        vaccination: vaccination,
    };
}

export function addVaccination(name: string, description: string) {
    /**
     * Adds a vaccination and saves it to the client store.
     */
    return function (dispatch) {
        dispatch(requestAddVaccination());

        return patientApi
            .addVaccination(name, description)
            .then(function (response) {
                dispatch(receiveAddVaccination(response.data));
            });
    };
}

export function requestUpdateVaccination(): { type: string } {
    /**
     * Returns an action to notify that a PUT vaccination request was made.
     */
    return {
        type: vaccinationActionTypes.REQUEST_UPDATE_VACCINATION,
    };
}

export function receiveUpdateVaccination(vaccination) {
    /**
     * Returns an action to notify that an vaccination was successfully updated.
     */
    return {
        type: vaccinationActionTypes.RECEIVE_UPDATE_VACCINATION,
        vaccination: vaccination,
    };
}

export function updateVaccination(
    id: number,
    name: string,
    description: string
) {
    /**
     * Updates a vaccination and saves updated state to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateVaccination());

        return patientApi
            .updateVaccination(id, name, description)
            .then(function (response) {
                dispatch(receiveUpdateVaccination(response.data));
            });
    };
}

export function requestDeleteVaccination(): { type: string } {
    /**
     * Returns an action to notify that a DELETE vaccination request was made.
     */
    return {
        type: vaccinationActionTypes.REQUEST_DELETE_VACCINATION,
    };
}

export function receiveDeleteVaccination() {
    /**
     * Returns an action to notify that a vaccination was successfully deleted.
     */
    return {
        type: vaccinationActionTypes.RECEIVE_DELETE_VACCINATION,
    };
}

export function deleteVaccination(id: number) {
    /**
     * Deletes a vaccination.
     */
    return function (dispatch) {
        dispatch(requestDeleteVaccination());

        return patientApi.deleteVaccination(id).then(function () {
            dispatch(receiveDeleteVaccination());
        });
    };
}
