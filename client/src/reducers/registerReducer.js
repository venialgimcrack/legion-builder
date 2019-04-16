import {
    REGISTER_START,
    REGISTER_FINISH,
    REGISTER_ERROR,
    REGISTER_CLEAR
} from '../actions/registerActions';

const INIT_STATE = {
    loading: false,
    errors: {}
};

const register = (state = INIT_STATE, action) => {
    switch (action.type) {
        case REGISTER_START:
            return Object.assign({}, state, {
                loading: true,
                errors: {}
            });

        case REGISTER_CLEAR:
        case REGISTER_FINISH:
            return INIT_STATE;

        case REGISTER_ERROR:
            return Object.assign({}, state, {
                loading: false,
                errors: { ...action.payload }
            });

        default:
            return state;
    }
};

export default register;
