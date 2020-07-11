import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as allergyActionCreators from './allergy_action_creators';
import * as patientApi from '../../api/patient_api';
import * as allergyActionTypes from '../action_types/allergy_action_types';
import * as modelTypes from '../../types/modelTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const testAllergy: modelTypes.Allergy = {
    id: 4,
    name: 'Peanut Butter',
    description: 'Peanut butter description.',
    createdAt: 'Some date.',
    significanceGroup: 'low',
    significanceScore: 4,
};

test('create an action to request adding an allergy', () => {
    const expectedAction = {
        type: allergyActionTypes.REQUEST_ADD_ALLERGY,
    };
    expect(allergyActionCreators.requestAddAllergy()).toEqual(expectedAction);
});

test('create an action to receive adding an allergy', () => {
    const expectedAction = {
        type: allergyActionTypes.RECEIVE_ADD_ALLERGY,
        allergy: testAllergy,
    };
    expect(allergyActionCreators.receiveAddAllergy(testAllergy)).toEqual(
        expectedAction
    );
});

test('adds allergy and dispatches REQUEST and RECEIVE actions', () => {
    const newAllergy: modelTypes.AllergyConstructor = {
        name: 'Peanut butter',
        description: 'Lorem ipsum',
    };
    const response = {
        data: newAllergy,
    };

    // @ts-ignore
    patientApi.addAllergy = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
        { type: allergyActionTypes.REQUEST_ADD_ALLERGY },
        { type: allergyActionTypes.RECEIVE_ADD_ALLERGY, allergy: newAllergy },
    ];

    const store = mockStore({});

    return store
        .dispatch(allergyActionCreators.addAllergy(newAllergy))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});

test('create an action to request updating an allergy', () => {
    const expectedAction = {
        type: allergyActionTypes.REQUEST_UPDATE_ALLERGY,
    };
    expect(allergyActionCreators.requestUpdateAllergy()).toEqual(
        expectedAction
    );
});

test('create an action to receive an updated allergy', () => {
    const expectedAction = {
        type: allergyActionTypes.RECEIVE_UPDATE_ALLERGY,
        allergy: testAllergy,
    };
    expect(allergyActionCreators.receiveUpdateAllergy(testAllergy)).toEqual(
        expectedAction
    );
});

// test('updates an allergy and dispatches REQUEST and RECEIVE actions', () => {
//     const response = {
//         data: testAllergy,
//     };
//
//     // @ts-ignore
//     patientApi.updateAllergy = jest.fn(() => Promise.resolve(response));
//     const expectedActions = [
//         { type: allergyActionTypes.REQUEST_UPDATE_ALLERGY },
//         {
//             type: allergyActionTypes.RECEIVE_UPDATE_ALLERGY,
//             allergy: testAllergy,
//         },
//     ];
//
//     const store = mockStore({});
//
//     const updatedAllergy: modelTypes.AllergyUpdate = {
//         id: 4,
//         name: 'Peanut Butter',
//         description: 'Peanut butter description.',
//     };
//     return store
//         .dispatch(allergyActionCreators.updateAllergy(updatedAllergy))
//         .then(() => {
//             expect(store.getActions()).toEqual(expectedActions);
//         });
// });

test('create an action to request deleting an allergy', () => {
    const expectedAction = {
        type: allergyActionTypes.REQUEST_DELETE_ALLERGY,
    };
    expect(allergyActionCreators.requestDeleteAllergy()).toEqual(
        expectedAction
    );
});

test('create an action to receive deleted allergy message', () => {
    const expectedAction = {
        type: allergyActionTypes.RECEIVE_DELETE_ALLERGY,
    };
    expect(allergyActionCreators.receiveDeleteAllergy()).toEqual(
        expectedAction
    );
});

// test('deletes an allergy and dispatches REQUEST and RECEIVE actions', () => {
//     // @ts-ignore
//     patientApi.deleteAllergy = jest.fn(() => Promise.resolve({}));
//     const expectedActions = [
//         { type: allergyActionTypes.REQUEST_DELETE_ALLERGY },
//         { type: allergyActionTypes.RECEIVE_DELETE_ALLERGY },
//     ];
//
//     const store = mockStore({});
//
//     return store.dispatch(allergyActionCreators.deleteAllergy(0)).then(() => {
//         expect(store.getActions()).toEqual(expectedActions);
//     });
// });
