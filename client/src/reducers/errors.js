import _ from 'lodash';

import ActionTypes from '../actions/ActionTypes';

const INITIAL_STATE = {};

const errors = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_FAILURE:
            return Object.assign({}, state, { login: action.payload });

        case ActionTypes.REGISTER_FAILURE:
            return Object.assign({}, state, { register: action.payload });

        case ActionTypes.CLEAR_ERRORS:
            let category = action.payload;
            return category ? _.omit(state, category) : state;

        default:
            return state;
    }
};

export default errors;
