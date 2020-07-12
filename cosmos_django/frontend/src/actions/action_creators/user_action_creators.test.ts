import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as userActionTypes from '../action_types/user_action_types';
import * as patientApi from '../../api/patient_api';
import * as modelTypes from '../../types/modelTypes';
import * as userActionCreators from './user_action_creators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const testUser: modelTypes.User = {
    id: 4,
    email: 'test123@gmail.com',
    patientProfile: {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1998-06-09',
        sex: modelTypes.Sex.MALE,
        age: 21,
        profilePicture: 'some profile picture',
        phoneNumber: '+18565209398',
        race: 'white',
        ethnicity: 'white',
        religion: 'hindu',
        insurance: 'aetna',
        pharmacy: 'walgreens',
        address: {
            addressLine: '1600 Penn Ave',
            city: 'Washington DC',
            state: 'Maryland',
            zipCode: '08550',
        },
        encounters: [],
        diagnoses: [],
        vaccinations: [],
        allergies: [],
        medications: [],
    },
};

test('create an action to request getting a user', () => {
    const expectedAction = {
        type: userActionTypes.REQUEST_GET_USER,
    };
    expect(userActionCreators.requestGetUser()).toEqual(expectedAction);
});

test('create an action to receive getting a user', () => {
    const expectedAction = {
        type: userActionTypes.RECEIVE_GET_USER,
        user: testUser,
    };
    expect(userActionCreators.receiveGetUser(testUser)).toEqual(expectedAction);
});

test('gets user and dispatches REQUEST and RECEIVE actions', () => {
    const response = {
        data: testUser,
    };

    // @ts-ignore
    patientApi.getUser = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
        { type: userActionTypes.REQUEST_GET_USER },
        {
            type: userActionTypes.RECEIVE_GET_USER,
            user: testUser,
        },
    ];

    const store = mockStore({});

    return store.dispatch(userActionCreators.getUser()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
    });
});

test('create an action to request updating a user', () => {
    const expectedAction = {
        type: userActionTypes.REQUEST_UPDATE_USER,
    };
    expect(userActionCreators.requestUpdateUser()).toEqual(expectedAction);
});

test('create an action to receive an updated user', () => {
    const expectedAction = {
        type: userActionTypes.RECEIVE_UPDATE_USER,
        user: testUser,
        success: {
            userFacingMessage: 'Saved successfully!',
        },
    };
    expect(userActionCreators.receiveUpdateUser(testUser)).toEqual(
        expectedAction
    );
});

test('updates a user and dispatches REQUEST and RECEIVE actions', () => {
    const response = {
        data: testUser,
    };

    // @ts-ignore
    patientApi.updateUser = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
        { type: userActionTypes.REQUEST_UPDATE_USER },
        {
            type: userActionTypes.RECEIVE_UPDATE_USER,
            user: testUser,
            success: {
                userFacingMessage: 'Saved successfully!',
            },
        },
    ];

    const store = mockStore({});

    const updatedUser: modelTypes.UserUpdate = {
        id: 4,
        email: '123@gmail.com',
        patientProfile: undefined,
        providerProfile: undefined,
    };
    return store
        .dispatch(userActionCreators.updateUser(updatedUser))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
});
