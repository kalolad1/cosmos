import * as userActionTypes from '../actions/action_types/user_action_types';

export const initialState = {
    isFetchingUser: true,
    isUpdatingUser: false,
    UIMessages: {
        errorUpdateUser: {},
        successUpdateUser: {},
    },
    user: {},
};

export function rootReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
        case userActionTypes.REQUEST_GET_USER:
            return Object.assign({}, state, {
                isFetchingUser: true,
            });
        case userActionTypes.RECEIVE_GET_USER:
            return Object.assign({}, state, {
                user: action.user,
                isFetchingUser: false,
            });

        case userActionTypes.REQUEST_UPDATE_USER:
            return Object.assign({}, state, {
                isUpdatingUser: true,
                UIMessages: {
                    successUpdateUser: {},
                    errorUpdateUser: {},
                },
            });
        case userActionTypes.RECEIVE_UPDATE_USER:
            return Object.assign({}, state, {
                user: action.user,
                isUpdatingUser: false,
                UIMessages: {
                    successUpdateUser: action.success,
                },
            });
        case userActionTypes.FAILURE_UPDATE_USER:
            return Object.assign({}, state, {
                isUpdatingUser: false,
                UIMessages: {
                    ...state.UIMessages,
                    errorUpdateUser: action.error,
                },
            });
        default:
            return state;
    }
}
