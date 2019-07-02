import {
    LOAD_LIST_START,
    LOAD_LIST_FINISH,
    LOAD_LIST_ERROR,
    SAVE_LIST_START,
    SAVE_LIST_FINISH,
    SAVE_LIST_ERROR,
    GET_LISTS_START,
    GET_LISTS_FINISH,
    GET_LISTS_ERROR,
    CREATE_NEW_LIST,
    RESET_LIST,
    EDIT_LIST
} from '../actions/listActions';

const EMPTY_ARRAY = [],
    // TODO may want better way to define "default" army size
    BLANK_LIST = {
        name: '',
        faction: '',
        size: 'standard',
        description: '',
        units: []
    },
    INIT_STATE = {
        saved: BLANK_LIST,
        draft: BLANK_LIST,
        all: EMPTY_ARRAY,
        loading: false,
        errors: {}
    };

const list = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_LIST_START:
            return Object.assign({}, state, {
                saved: BLANK_LIST,
                draft: BLANK_LIST,
                loading: true,
                errors: {}
            });
        
        case GET_LISTS_START:
            return Object.assign({}, state, {
                saved: BLANK_LIST,
                draft: BLANK_LIST,
                all: EMPTY_ARRAY,
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

        case EDIT_LIST:
            return Object.assign({}, state, {
                draft: action.payload
            });

        case CREATE_NEW_LIST:
            return Object.assign({}, state, {
                saved: BLANK_LIST,
                draft: action.payload
            });

        case LOAD_LIST_FINISH:
        case SAVE_LIST_FINISH:
            return Object.assign({}, state, {
                saved: action.payload,
                draft: Object.assign({}, action.payload),
                loading: false,
                errors: {}
            });

        case GET_LISTS_ERROR:
        case LOAD_LIST_ERROR:
        case SAVE_LIST_ERROR:
            return Object.assign({}, state, {
                saved: BLANK_LIST,
                all: EMPTY_ARRAY,
                loading: false,
                errors: { ...action.payload }
            });

        case RESET_LIST:
            return Object.assign({}, state, {
                draft: BLANK_LIST
            });

        default:
            return state;
    }
};

export default list;
