import {
    LOAD_COLLECTION_START,
    LOAD_COLLECTION_FINISH,
    LOAD_COLLECTION_ERROR,
    SAVE_COLLECTION_START,
    SAVE_COLLECTION_FINISH,
    SAVE_COLLECTION_ERROR
} from '../actions/collectionActions';

const INIT_STATE = {
    items: [],
    loading: false,
    errors: {}
};

const collection = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_COLLECTION_START:
            return Object.assign({}, state, {
                loading: true,
                items: [],
                errors: {}
            });

        case SAVE_COLLECTION_START:
            return Object.assign({}, state, {
                loading: true,
                errors: {}
            });

        case SAVE_COLLECTION_FINISH:
        case LOAD_COLLECTION_FINISH:
            return Object.assign({}, state, {
                loading: false,
                items: action.payload,
                errors: {}
            });

        case SAVE_COLLECTION_ERROR:
        case LOAD_COLLECTION_ERROR:
            return Object.assign({}, state, {
                loading: false,
                items: [],
                errors: { ...action.payload }
            });

        default:
            return state;
    }
};

export default collection;
