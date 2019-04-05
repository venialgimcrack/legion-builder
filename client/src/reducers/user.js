import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {
    isAuthenticated: false
};

const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return { isAuthenticated: true };
        case ActionTypes.LOGIN_FAILURE:
        case ActionTypes.LOGOUT_SUCCESS:
        case ActionTypes.LOGOUT_FAILURE:
            return { isAuthenticated: false };
        default:
            return state;
    }
};

export default user;
