import * as userActionTypes from '../actions/action_types/user_action_types';
import * as reducers from './reducers';
import * as modelTypes from '../types/modelTypes';
import * as testModels from '../fixtures/testModels';
import { initialState } from './reducers';

test('return initial state', () => {
    // Expect reducer called with undefined, {}, to equal initial state
    expect(reducers.rootReducer(undefined, {})).toEqual(reducers.initialState);
});

test('REQUEST_GET_USER', () => {
    const action = {
        type: userActionTypes.REQUEST_GET_USER,
    };
    const expectedState = Object.assign({}, reducers.initialState, {
        isFetchingUser: true,
    });
    expect(reducers.rootReducer(reducers.initialState, action)).toEqual(
        expectedState
    );
});

test('RECEIVE_GET_USER', () => {
    const action = {
        type: userActionTypes.RECEIVE_GET_USER,
        user: testModels.testUser,
    };

    const expectedState = Object.assign({}, reducers.initialState, {
        user: action.user,
        isFetchingUser: false,
    });
    expect(reducers.rootReducer(reducers.initialState, action)).toEqual(
        expectedState
    );
});

test('REQUEST_UPDATE_USER', () => {
    const action = {
        type: userActionTypes.REQUEST_UPDATE_USER,
    };

    const expectedState = Object.assign({}, reducers.initialState, {
        isUpdatingUser: true,
    });
    expect(reducers.rootReducer(reducers.initialState, action)).toEqual(
        expectedState
    );
});

test('RECEIVE_UPDATE_USER', () => {
    const getUserAction = {
        type: userActionTypes.RECEIVE_GET_USER,
        user: testModels.testUser,
    };
    reducers.rootReducer(reducers.initialState, getUserAction);

    const updatedUser = Object.assign({}, testModels.testUser, {
        email: 'changed@gmail.com',
        patientProfile: {
            firstName: 'Alice',
        },
    });
    const updateUserAction = {
        type: userActionTypes.RECEIVE_UPDATE_USER,
        user: updatedUser,
        success: {
            userFacingMessage: 'Saved successfully!',
        },
    };

    const expectedState = Object.assign({}, reducers.initialState, {
        isUpdatingUser: false,
        user: updateUserAction.user,
        UIMessages: {
            successUpdateUser: updateUserAction.success,
        },
    });
    expect(
        reducers.rootReducer(reducers.initialState, updateUserAction)
    ).toEqual(expectedState);
});

test('FAILURE_UPDATE_USER', () => {
    const getUserAction = {
        type: userActionTypes.RECEIVE_GET_USER,
        user: testModels.testUser,
    };
    reducers.rootReducer(reducers.initialState, getUserAction);

    const updateUserAction = {
        type: userActionTypes.FAILURE_UPDATE_USER,
        error: {
            userFacingMessage: 'Another user has same email!',
        },
    };

    const expectedState = Object.assign({}, reducers.initialState, {
        isUpdatingUser: false,
        UIMessages: {
            ...initialState.UIMessages,
            errorUpdateUser: updateUserAction.error,
        },
    });
    expect(
        reducers.rootReducer(reducers.initialState, updateUserAction)
    ).toEqual(expectedState);
});
