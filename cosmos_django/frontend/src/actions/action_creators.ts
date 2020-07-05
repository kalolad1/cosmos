import * as actionTypes from './action_types';
import * as patientApi from '../api/patient_api';
import * as types from '../types/types';

/* User */
export function requestGetUser(): { type: string } {
    /**
     * Returns an action to notify that a GET user request was made.
     */
    return {
        type: actionTypes.REQUEST_GET_USER,
    };
}

export function receiveGetUser(
    user: types.User
): { type: string; user: types.User } {
    /**
     * Returns an action to notify that a user was received.
     */
    return {
        type: actionTypes.RECEIVE_GET_USER,
        user: user,
    };
}

export function fetchUser(history) {
    /**
     * Fetches a user and saves it to the client store.
     */
    return function (dispatch) {
        dispatch(requestGetUser());

        return patientApi.getUser(history).then(function (response) {
            dispatch(receiveGetUser(response.data));
        });
    };
}

export function requestUpdateUser(): { type: string } {
    /**
     * Returns an action to notify that a PUT user request was made.
     */
    return {
        type: actionTypes.REQUEST_UPDATE_USER,
    };
}

export function receiveUpdateUser(
    user: types.User
): { type: string; user: types.User } {
    /**
     * Returns an action to notify that a user was updated.
     */
    return {
        type: actionTypes.RECEIVE_UPDATE_USER,
        user: user,
    };
}

export function updateUser(user, history) {
    /**
     * Updates a user and saves the updated user to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateUser());

        return patientApi.updateUser(user, history).then(function (response) {
            dispatch(receiveUpdateUser(response.data));
        });
    };
}

/* Encounter */
export function requestAddEncounter(): { type: string } {
    /**
     * Returns an action to notify that a POST encounter request was made.
     */
    return {
        type: actionTypes.REQUEST_ADD_ENCOUNTER,
    };
}

export function receiveAddEncounter(encounter) {
    /**
     * Returns an action to notify that an encounter was added.
     */
    return {
        type: actionTypes.RECEIVE_ADD_ENCOUNTER,
        encounter: encounter,
    };
}

export function addEncounter(encounterType: string, note: string, history) {
    /**
     * Adds an encounter and saves it to the client store.
     */
    return function (dispatch) {
        dispatch(requestAddEncounter());

        return patientApi
            .addEncounter(encounterType, note, history)
            .then(function (response) {
                dispatch(receiveAddEncounter(response.data));
            });
    };
}

export function requestUpdateEncounter(): { type: string } {
    /**
     * Returns an action to notify that a PUT encounter request was made.
     */
    return {
        type: actionTypes.REQUEST_UPDATE_USER,
    };
}

export function receiveUpdateEncounter(encounter) {
    /**
     * Returns an action to notify that an encounter was successfully updated.
     */
    return {
        type: actionTypes.RECEIVE_UPDATE_ENCOUNTER,
        encounter: encounter,
    };
}

export function updateEncounter(
    id: number,
    encounterType: string,
    note: string,
    history
) {
    /**
     * Updates an encounter and saves updated state to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateEncounter());

        return patientApi
            .updateEncounter(id, encounterType, note, history)
            .then(function (response) {
                dispatch(receiveUpdateEncounter(response.data));
            });
    };
}

export function requestDeleteEncounter(): { type: string } {
    /**
     * Returns an action to notify that a DELETE encounter request was made.
     */
    return {
        type: actionTypes.REQUEST_DELETE_ENCOUNTER,
    };
}

export function receiveDeleteEncounter() {
    /**
     * Returns an action to notify that an encounter was successfully deleted.
     */
    return {
        type: actionTypes.RECEIVE_UPDATE_ENCOUNTER,
    };
}

export function deleteEncounter(id: number, history: any) {
    /**
     * Deletes an encounter.
     */
    return function (dispatch) {
        dispatch(requestDeleteEncounter());

        return patientApi.deleteEncounter(id, history).then(function () {
            dispatch(receiveDeleteDiagnosis());
        });
    };
}

/* Diagnosis */
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

/* Medication */
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

/* Allergy */
export function requestAddAllergy(): { type: string } {
    /**
     * Returns an action to notify that a POST allergy request was made.
     */
    return {
        type: actionTypes.REQUEST_ADD_ALLERGY,
    };
}

export function receiveAddAllergy(allergy) {
    /**
     * Returns an action to notify that a allergy was added.
     */
    return {
        type: actionTypes.RECEIVE_ADD_ALLERGY,
        allergy: allergy,
    };
}

export function addAllergy(name: string, description: string, history) {
    /**
     * Adds a allergy and saves it to the client store.
     */
    return function (dispatch) {
        dispatch(requestAddAllergy());

        return patientApi
            .addAllergy(name, description, history)
            .then(function (response) {
                dispatch(receiveAddAllergy(response.data));
            });
    };
}

export function requestUpdateAllergy(): { type: string } {
    /**
     * Returns an action to notify that a PUT allergy request was made.
     */
    return {
        type: actionTypes.REQUEST_UPDATE_ALLERGY,
    };
}

export function receiveUpdateAllergy(allergy) {
    /**
     * Returns an action to notify that an allergy was successfully updated.
     */
    return {
        type: actionTypes.RECEIVE_UPDATE_ALLERGY,
        allergy: allergy,
    };
}

export function updateAllergy(
    id: number,
    name: string,
    description: string,
    history
) {
    /**
     * Updates a allergy and saves updated state to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateAllergy());

        return patientApi
            .updateAllergy(id, name, description, history)
            .then(function (response) {
                dispatch(receiveUpdateAllergy(response.data));
            });
    };
}

export function requestDeleteAllergy(): { type: string } {
    /**
     * Returns an action to notify that a DELETE allergy request was made.
     */
    return {
        type: actionTypes.REQUEST_DELETE_ALLERGY,
    };
}

export function receiveDeleteAllergy() {
    /**
     * Returns an action to notify that a allergy was successfully deleted.
     */
    return {
        type: actionTypes.RECEIVE_DELETE_ALLERGY,
    };
}

export function deleteAllergy(id: number, history: any) {
    /**
     * Deletes a allergy.
     */
    return function (dispatch) {
        dispatch(requestDeleteAllergy());

        return patientApi.deleteAllergy(id, history).then(function () {
            dispatch(receiveDeleteAllergy());
        });
    };
}

/* Vaccination */
export function requestAddVaccination(): { type: string } {
    /**
     * Returns an action to notify that a POST vaccination request was made.
     */
    return {
        type: actionTypes.REQUEST_ADD_VACCINATION,
    };
}

export function receiveAddVaccination(vaccination) {
    /**
     * Returns an action to notify that a vaccination was added.
     */
    return {
        type: actionTypes.RECEIVE_ADD_VACCINATION,
        vaccination: vaccination,
    };
}

export function addVaccination(name: string, description: string, history) {
    /**
     * Adds a vaccination and saves it to the client store.
     */
    return function (dispatch) {
        dispatch(requestAddVaccination());

        return patientApi
            .addVaccination(name, description, history)
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
        type: actionTypes.REQUEST_UPDATE_VACCINATION,
    };
}

export function receiveUpdateVaccination(vaccination) {
    /**
     * Returns an action to notify that an vaccination was successfully updated.
     */
    return {
        type: actionTypes.RECEIVE_UPDATE_VACCINATION,
        vaccination: vaccination,
    };
}

export function updateVaccination(
    id: number,
    name: string,
    description: string,
    history
) {
    /**
     * Updates a vaccination and saves updated state to the client store.
     */
    return function (dispatch) {
        dispatch(requestUpdateVaccination());

        return patientApi
            .updateVaccination(id, name, description, history)
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
        type: actionTypes.REQUEST_DELETE_VACCINATION,
    };
}

export function receiveDeleteVaccination() {
    /**
     * Returns an action to notify that a vaccination was successfully deleted.
     */
    return {
        type: actionTypes.RECEIVE_DELETE_VACCINATION,
    };
}

export function deleteVaccination(id: number, history: any) {
    /**
     * Deletes a vaccination.
     */
    return function (dispatch) {
        dispatch(requestDeleteVaccination());

        return patientApi.deleteVaccination(id, history).then(function () {
            dispatch(receiveDeleteVaccination());
        });
    };
}

