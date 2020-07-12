import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as medicationActionTypes from '../action_types/medication_action_types';
import * as patientApi from '../../api/patient_api';
import * as testModels from '../../fixtures/testModels';
import * as medicationActionCreators from './medication_action_creators';
import * as modelTypes from '../../types/modelTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('create an action to request adding an medication', () => {
    const expectedAction = {
        type: medicationActionTypes.REQUEST_ADD_MEDICATION,
    };
    expect(medicationActionCreators.requestAddMedication()).toEqual(
        expectedAction
    );
});

test('create an action to receive adding an medication', () => {
    const expectedAction = {
        type: medicationActionTypes.RECEIVE_ADD_MEDICATION,
        medication: testModels.testMedication,
    };
    expect(
        medicationActionCreators.receiveAddMedication(testModels.testMedication)
    ).toEqual(expectedAction);
});

test('adds medication and dispatches REQUEST and RECEIVE actions', () => {
    const newMedication: modelTypes.MedicationConstructor = {
        name: 'Advil',
        description: 'A drug.',
    };
    const response = {
        data: testModels.testMedication,
    };

    // @ts-ignore
    patientApi.addMedication = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
        { type: medicationActionTypes.REQUEST_ADD_MEDICATION },
        {
            type: medicationActionTypes.RECEIVE_ADD_MEDICATION,
            medication: testModels.testMedication,
        },
    ];

    const store = mockStore({});

    return store
        .dispatch(medicationActionCreators.addMedication(newMedication))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});

test('create an action to request updating an medication', () => {
    const expectedAction = {
        type: medicationActionTypes.REQUEST_UPDATE_MEDICATION,
    };
    expect(medicationActionCreators.requestUpdateMedication()).toEqual(
        expectedAction
    );
});

test('create an action to receive an updated medication', () => {
    const expectedAction = {
        type: medicationActionTypes.RECEIVE_UPDATE_MEDICATION,
        medication: testModels.testMedication,
    };
    expect(
        medicationActionCreators.receiveUpdateMedication(
            testModels.testMedication
        )
    ).toEqual(expectedAction);
});

test('updates an medication and dispatches REQUEST and RECEIVE actions', () => {
    const response = {
        data: testModels.testMedication,
    };

    // @ts-ignore
    patientApi.updateMedication = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
        { type: medicationActionTypes.REQUEST_UPDATE_MEDICATION },
        {
            type: medicationActionTypes.RECEIVE_UPDATE_MEDICATION,
            medication: testModels.testMedication,
        },
    ];

    const store = mockStore({});

    const updatedMedication: modelTypes.MedicationUpdate = {
        id: 4,
        name: 'Advil',
        description: 'A drug.',
    };
    return store
        .dispatch(medicationActionCreators.updateMedication(updatedMedication))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});

test('create an action to request deleting an medication', () => {
    const expectedAction = {
        type: medicationActionTypes.REQUEST_DELETE_MEDICATION,
    };
    expect(medicationActionCreators.requestDeleteMedication()).toEqual(
        expectedAction
    );
});

test('create an action to receive deleted medication message', () => {
    const expectedAction = {
        type: medicationActionTypes.RECEIVE_DELETE_MEDICATION,
    };
    expect(medicationActionCreators.receiveDeleteMedication()).toEqual(
        expectedAction
    );
});

test('deletes an medication and dispatches REQUEST and RECEIVE actions', () => {
    // @ts-ignore
    patientApi.deleteMedication = jest.fn(() => Promise.resolve({}));
    const expectedActions = [
        { type: medicationActionTypes.REQUEST_DELETE_MEDICATION },
        { type: medicationActionTypes.RECEIVE_DELETE_MEDICATION },
    ];

    const store = mockStore({});

    return store
        .dispatch(medicationActionCreators.deleteMedication(0))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});
