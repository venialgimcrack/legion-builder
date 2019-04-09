import {
    LOGIN_START,
    LOGIN_FINISH,
    LOGIN_ERROR,
    LOGOUT
} from '../actions/loginActions';

const INIT_STATE = {
    user: {},
    auth: false,
    loading: false,
    errors: {}
};

const user = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_START:
            return Object.assign({}, state, {
                user: {},
                auth: false,
                loading: true,
                errors: {}
            });
        
        case LOGIN_FINISH:
            return Object.assign({}, state, {
                user: action.payload,
                auth: true,
                loading: false,
                errors: {}
            });
        
        case LOGIN_ERROR:
            return Object.assign({}, state, {
                user: {},
                auth: false,
                loading: false,
                errors: { ...action.payload }
            });

        case LOGOUT:
            return INIT_STATE;

        default:
            return state;
    }
};

export default user;
