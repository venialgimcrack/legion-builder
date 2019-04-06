import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {};

const errors = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_FAILURE:
        case ActionTypes.REGISTER_FAILURE:
            return action.payload;

        default:
            return state;
    }
};

export default errors;
