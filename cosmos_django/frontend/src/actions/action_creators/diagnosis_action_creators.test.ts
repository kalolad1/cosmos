import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as diagnosisActionCreators from './diagnosis_action_creators';
import * as patientApi from '../../api/patient_api';
import * as diagnosisActionTypes from '../action_types/diagnosis_action_types';
import * as modelTypes from '../../types/modelTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const testDiagnosis: modelTypes.Diagnosis = {
    id: 4,
    name: 'Flu',
    description: 'Virus.',
    createdAt: 'Some date.',
    significanceGroup: modelTypes.SignificanceGroup.LOW,
    significanceScore: 4,
};

test('create an action to request adding a diagnosis', () => {
    const expectedAction = {
        type: diagnosisActionTypes.REQUEST_ADD_DIAGNOSIS,
    };
    expect(diagnosisActionCreators.requestAddDiagnosis()).toEqual(
        expectedAction
    );
});

test('create an action to receive adding an diagnosis', () => {
    const expectedAction = {
        type: diagnosisActionTypes.RECEIVE_ADD_DIAGNOSIS,
        diagnosis: testDiagnosis,
    };
    expect(diagnosisActionCreators.receiveAddDiagnosis(testDiagnosis)).toEqual(
        expectedAction
    );
});

test('adds diagnosis and dispatches REQUEST and RECEIVE actions', () => {
    const newDiagnosis: modelTypes.DiagnosisConstructor = {
        name: 'Flu',
        description: 'Virus.',
    };
    const response = {
        data: testDiagnosis,
    };

    // @ts-ignore
    patientApi.addDiagnosis = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
        { type: diagnosisActionTypes.REQUEST_ADD_DIAGNOSIS },
        {
            type: diagnosisActionTypes.RECEIVE_ADD_DIAGNOSIS,
            diagnosis: testDiagnosis,
        },
    ];

    const store = mockStore({});

    return store
        .dispatch(diagnosisActionCreators.addDiagnosis(newDiagnosis))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});

test('create an action to request updating an diagnosis', () => {
    const expectedAction = {
        type: diagnosisActionTypes.REQUEST_UPDATE_DIAGNOSIS,
    };
    expect(diagnosisActionCreators.requestUpdateDiagnosis()).toEqual(
        expectedAction
    );
});

test('create an action to receive an updated diagnosis', () => {
    const expectedAction = {
        type: diagnosisActionTypes.RECEIVE_UPDATE_DIAGNOSIS,
        diagnosis: testDiagnosis,
    };
    expect(
        diagnosisActionCreators.receiveUpdateDiagnosis(testDiagnosis)
    ).toEqual(expectedAction);
});

test('updates an diagnosis and dispatches REQUEST and RECEIVE actions', () => {
    const response = {
        data: testDiagnosis,
    };

    // @ts-ignore
    patientApi.updateDiagnosis = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
        { type: diagnosisActionTypes.REQUEST_UPDATE_DIAGNOSIS },
        {
            type: diagnosisActionTypes.RECEIVE_UPDATE_DIAGNOSIS,
            diagnosis: testDiagnosis,
        },
    ];

    const store = mockStore({});

    const updatedDiagnosis: modelTypes.DiagnosisUpdate = {
        id: 4,
        name: 'Flu',
        description: 'Virus',
    };
    return store
        .dispatch(diagnosisActionCreators.updateDiagnosis(updatedDiagnosis))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});

test('create an action to request deleting an diagnosis', () => {
    const expectedAction = {
        type: diagnosisActionTypes.REQUEST_DELETE_DIAGNOSIS,
    };
    expect(diagnosisActionCreators.requestDeleteDiagnosis()).toEqual(
        expectedAction
    );
});

test('create an action to receive deleted diagnosis message', () => {
    const expectedAction = {
        type: diagnosisActionTypes.RECEIVE_DELETE_DIAGNOSIS,
    };
    expect(diagnosisActionCreators.receiveDeleteDiagnosis()).toEqual(
        expectedAction
    );
});

test('deletes an diagnosis and dispatches REQUEST and RECEIVE actions', () => {
    // @ts-ignore
    patientApi.deleteDiagnosis = jest.fn(() => Promise.resolve({}));
    const expectedActions = [
        { type: diagnosisActionTypes.REQUEST_DELETE_DIAGNOSIS },
        { type: diagnosisActionTypes.RECEIVE_DELETE_DIAGNOSIS },
    ];

    const store = mockStore({});

    return store
        .dispatch(diagnosisActionCreators.deleteDiagnosis(0))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});
