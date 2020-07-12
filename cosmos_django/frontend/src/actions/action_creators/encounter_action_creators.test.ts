import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as encounterActionTypes from '../action_types/encounter_action_types';
import * as patientApi from '../../api/patient_api';
import * as encounterActionCreators from './encounter_action_creators';
import * as modelTypes from '../../types/modelTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const testEncounter: modelTypes.Encounter = {
    id: 4,
    patientProfile: 2,
    note: 'Patient encounter note.',
    encounterType: modelTypes.EncounterType.ILLNESS,
    createdAt: 'Some date.',
    updatedAt: 'Some other date',
    significanceGroup: modelTypes.SignificanceGroup.LOW,
    significanceScore: 4,
};

test('create an action to request adding an encounter', () => {
    const expectedAction = {
        type: encounterActionTypes.REQUEST_ADD_ENCOUNTER,
    };
    expect(encounterActionCreators.requestAddEncounter()).toEqual(
        expectedAction
    );
});

test('create an action to receive adding an encounter', () => {
    const expectedAction = {
        type: encounterActionTypes.RECEIVE_ADD_ENCOUNTER,
        encounter: testEncounter,
    };
    expect(encounterActionCreators.receiveAddEncounter(testEncounter)).toEqual(
        expectedAction
    );
});

test('adds encounter and dispatches REQUEST and RECEIVE actions', () => {
    const newEncounter: modelTypes.EncounterConstructor = {
        note: 'Patient encounter note.',
        encounterType: modelTypes.EncounterType.ILLNESS,
    };
    const response = {
        data: testEncounter,
    };

    // @ts-ignore
    patientApi.addEncounter = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
        { type: encounterActionTypes.REQUEST_ADD_ENCOUNTER },
        {
            type: encounterActionTypes.RECEIVE_ADD_ENCOUNTER,
            encounter: testEncounter,
        },
    ];

    const store = mockStore({});

    return store
        .dispatch(encounterActionCreators.addEncounter(newEncounter))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});

test('create an action to request updating an encounter', () => {
    const expectedAction = {
        type: encounterActionTypes.REQUEST_UPDATE_ENCOUNTER,
    };
    expect(encounterActionCreators.requestUpdateEncounter()).toEqual(
        expectedAction
    );
});

test('create an action to receive an updated encounter', () => {
    const expectedAction = {
        type: encounterActionTypes.RECEIVE_UPDATE_ENCOUNTER,
        encounter: testEncounter,
    };
    expect(
        encounterActionCreators.receiveUpdateEncounter(testEncounter)
    ).toEqual(expectedAction);
});

test('updates an encounter and dispatches REQUEST and RECEIVE actions', () => {
    const response = {
        data: testEncounter,
    };

    // @ts-ignore
    patientApi.updateEncounter = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
        { type: encounterActionTypes.REQUEST_UPDATE_ENCOUNTER },
        {
            type: encounterActionTypes.RECEIVE_UPDATE_ENCOUNTER,
            encounter: testEncounter,
        },
    ];

    const store = mockStore({});

    const updatedEncounter: modelTypes.EncounterUpdate = {
        id: 4,
        note: 'Patient encounter note.',
        encounterType: modelTypes.EncounterType.ILLNESS,
    };
    return store
        .dispatch(encounterActionCreators.updateEncounter(updatedEncounter))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});

test('create an action to request deleting an encounter', () => {
    const expectedAction = {
        type: encounterActionTypes.REQUEST_DELETE_ENCOUNTER,
    };
    expect(encounterActionCreators.requestDeleteEncounter()).toEqual(
        expectedAction
    );
});

test('create an action to receive deleted encounter message', () => {
    const expectedAction = {
        type: encounterActionTypes.RECEIVE_DELETE_ENCOUNTER,
    };
    expect(encounterActionCreators.receiveDeleteEncounter()).toEqual(
        expectedAction
    );
});

test('deletes an encounter and dispatches REQUEST and RECEIVE actions', () => {
    // @ts-ignore
    patientApi.deleteEncounter = jest.fn(() => Promise.resolve({}));
    const expectedActions = [
        { type: encounterActionTypes.REQUEST_DELETE_ENCOUNTER },
        { type: encounterActionTypes.RECEIVE_DELETE_ENCOUNTER },
    ];

    const store = mockStore({});

    return store
        .dispatch(encounterActionCreators.deleteEncounter(0))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});
