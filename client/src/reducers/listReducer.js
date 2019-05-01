import {
    LOAD_LIST_START,
    LOAD_LIST_FINISH,
    LOAD_LIST_ERROR,
    SAVE_LIST_START,
    SAVE_LIST_FINISH,
    SAVE_LIST_ERROR
} from '../actions/listActions';

const INIT_STATE = {
    item: null,
    loading: false,
    errors: {}
};

const list = (state = INIT_STATE, action) => {
    switch (action.payload) {
        case LOAD_LIST_START:
            return Object.assign({}, state, {
                item: null,
                loading: true,
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
                item: action.payload,
                loading: false,
                errors: {}
            });

        case LOAD_LIST_ERROR:
        case SAVE_LIST_ERROR:
            return Object.assign({}, state, {
                item: null,
                loading: false,
                errors: { ...action.payload }
            });

        default:
            return state;
    }
};

export default list;
