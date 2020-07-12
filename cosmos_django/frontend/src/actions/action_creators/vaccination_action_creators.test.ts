import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as vaccinationActionTypes from '../action_types/vaccination_action_types';
import * as patientApi from '../../api/patient_api';
import * as testModels from '../../fixtures/testModels';
import * as modelTypes from '../../types/modelTypes';
import * as vaccinationActionCreators from './vaccination_action_creators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('create an action to request adding a vaccination', () => {
    const expectedAction = {
        type: vaccinationActionTypes.REQUEST_ADD_VACCINATION,
    };
    expect(vaccinationActionCreators.requestAddVaccination()).toEqual(
        expectedAction
    );
});

test('create an action to receive adding a vaccination', () => {
    const expectedAction = {
        type: vaccinationActionTypes.RECEIVE_ADD_VACCINATION,
        vaccination: testModels.testVaccination,
    };
    expect(
        vaccinationActionCreators.receiveAddVaccination(
            testModels.testVaccination
        )
    ).toEqual(expectedAction);
});

test('adds vaccination and dispatches REQUEST and RECEIVE actions', () => {
    const newVaccination: modelTypes.VaccinationConstructor = {
        name: 'Covid',
        description: 'A vaccination.',
    };
    const response = {
        data: testModels.testVaccination,
    };

    // @ts-ignore
    patientApi.addVaccination = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
        { type: vaccinationActionTypes.REQUEST_ADD_VACCINATION },
        {
            type: vaccinationActionTypes.RECEIVE_ADD_VACCINATION,
            vaccination: testModels.testVaccination,
        },
    ];

    const store = mockStore({});

    return store
        .dispatch(vaccinationActionCreators.addVaccination(newVaccination))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});

test('create an action to request updating a vaccination', () => {
    const expectedAction = {
        type: vaccinationActionTypes.REQUEST_UPDATE_VACCINATION,
    };
    expect(vaccinationActionCreators.requestUpdateVaccination()).toEqual(
        expectedAction
    );
});

test('create an action to receive a updated vaccination', () => {
    const expectedAction = {
        type: vaccinationActionTypes.RECEIVE_UPDATE_VACCINATION,
        vaccination: testModels.testVaccination,
    };
    expect(
        vaccinationActionCreators.receiveUpdateVaccination(
            testModels.testVaccination
        )
    ).toEqual(expectedAction);
});

test('updates a vaccination and dispatches REQUEST and RECEIVE actions', () => {
    const response = {
        data: testModels.testVaccination,
    };

    // @ts-ignore
    patientApi.updateVaccination = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
        { type: vaccinationActionTypes.REQUEST_UPDATE_VACCINATION },
        {
            type: vaccinationActionTypes.RECEIVE_UPDATE_VACCINATION,
            vaccination: testModels.testVaccination,
        },
    ];

    const store = mockStore({});

    const updatedVaccination: modelTypes.VaccinationUpdate = {
        id: 4,
        name: 'Covid',
        description: 'A vaccination.',
    };
    return store
        .dispatch(
            vaccinationActionCreators.updateVaccination(updatedVaccination)
        )
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});

test('create an action to request deleting a vaccination', () => {
    const expectedAction = {
        type: vaccinationActionTypes.REQUEST_DELETE_VACCINATION,
    };
    expect(vaccinationActionCreators.requestDeleteVaccination()).toEqual(
        expectedAction
    );
});

test('create an action to receive deleted vaccination message', () => {
    const expectedAction = {
        type: vaccinationActionTypes.RECEIVE_DELETE_VACCINATION,
    };
    expect(vaccinationActionCreators.receiveDeleteVaccination()).toEqual(
        expectedAction
    );
});

test('deletes a vaccination and dispatches REQUEST and RECEIVE actions', () => {
    // @ts-ignore
    patientApi.deleteVaccination = jest.fn(() => Promise.resolve({}));
    const expectedActions = [
        { type: vaccinationActionTypes.REQUEST_DELETE_VACCINATION },
        { type: vaccinationActionTypes.RECEIVE_DELETE_VACCINATION },
    ];

    const store = mockStore({});

    return store
        .dispatch(vaccinationActionCreators.deleteVaccination(0))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});
