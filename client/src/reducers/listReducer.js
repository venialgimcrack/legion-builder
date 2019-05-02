import {
    LOAD_LIST_START,
    LOAD_LIST_FINISH,
    LOAD_LIST_ERROR,
    SAVE_LIST_START,
    SAVE_LIST_FINISH,
    SAVE_LIST_ERROR,
    GET_LISTS_START,
    GET_LISTS_FINISH,
    GET_LISTS_ERROR
} from '../actions/listActions';

const EMPTY_LIST = [],
    INIT_STATE = {
    current: null,
    all: EMPTY_LIST,
    loading: false,
    errors: {}
};

const list = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_LIST_START:
            return Object.assign({}, state, {
                current: null,
                loading: true,
                errors: {}
            });
        
        case GET_LISTS_START:
            return Object.assign({}, state, {
                current: null,
                all: EMPTY_LIST,
                loading: true,
                errors: {}
            });

        case GET_LISTS_FINISH:
            return Object.assign({}, state, {
                all: action.payload,
                loading: false,
                errors: {}
            });

        case SAVE_LIST_START:
            return Object.assign({}, state, {
                loading: true,
                errors: {}
            });

        case LOAD_LIST_FINISH:
        case SAVE_LIST_FINISH:
            return Object.assign({}, state, {
                current: action.payload,
                loading: false,
                errors: {}
            });

        case GET_LISTS_ERROR:
        case LOAD_LIST_ERROR:
        case SAVE_LIST_ERROR:
            return Object.assign({}, state, {
                current: null,
                all: EMPTY_LIST,
                loading: false,
                errors: { ...action.payload }
            });

        default:
            return state;
    }
};

export default list;
