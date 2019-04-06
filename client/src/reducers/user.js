import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {
    isAuthenticated: false,
    user: {}
};

const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: !!action.payload,
                user: action.payload
            });

        case ActionTypes.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: false,
                user: {}
            });

        default:
            return state;
    }
};

export default user;
