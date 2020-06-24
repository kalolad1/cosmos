import * as actionTypes from './action_types';
import * as patientApi from '../api/patient_api';


/* User */
export function requestGetUser() {
    return {
        type: actionTypes.REQUEST_GET_USER,
    }
}

export function receiveGetUser(user) {
    return {
        type: actionTypes.RECEIVE_GET_USER,
        user: user,
    }
}

export function fetchUser(history) {
    return function(dispatch) {
        dispatch(requestGetUser());

        return patientApi.getUser(history)
            .then(function (response) {
                dispatch(receiveGetUser(response.data));
            });
    }
}


/* Encounter */
export function requestAddEncounter() {
    return {
        type: actionTypes.REQUEST_ADD_ENCOUNTER,
    }
}

export function receiveAddEncounter(encounter) {
    return {
        type: actionTypes.RECEIVE_ADD_ENCOUNTER,
        encounter: encounter,
    }
}

export function addEncounter(encounterType: string, note: string, history) {
    return function(dispatch) {
        dispatch(requestAddEncounter());

        return patientApi.addEncounter(encounterType, note, history)
            .then(function (response) {
                dispatch(receiveAddEncounter(response.data));
            });
    }
}
