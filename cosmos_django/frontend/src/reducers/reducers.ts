import * as actionTypes from '../actions/action_types';


const initialState = {
    isFetchingUser: true,
    isCreatingEncounter: false,
    user: {},
};

export function rootReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch (action.type) {
        case actionTypes.REQUEST_GET_USER:
            return Object.assign({}, state, {
                isFetchingUser: true,
            });
        case actionTypes.RECEIVE_GET_USER:
            return Object.assign({}, state, {
                user: action.user,
                isFetchingUser: false,
            });

        case actionTypes.REQUEST_ADD_ENCOUNTER:
            return Object.assign({}, state, {
                isCreatingEncounter: true,
            });
        case actionTypes.RECEIVE_ADD_ENCOUNTER:
            return Object.assign({}, state, {
                encounter: action.encounter,
                isCreatingEncounter: false,
            });
        default:
            return state;
    }
}