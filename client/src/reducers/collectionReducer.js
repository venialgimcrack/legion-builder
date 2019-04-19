import {
    LOAD_COLLECTION_START,
    LOAD_COLLECTION_FINISH,
    LOAD_COLLECTION_ERROR,
    SAVE_COLLECTION_START,
    SAVE_COLLECTION_FINISH,
    SAVE_COLLECTION_ERROR
} from '../actions/collectionActions';

const INIT_STATE = {
    item: {},
    loading: false,
    errors: {}
};

const collection = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_COLLECTION_START:
            return Object.assign({}, state, {
                loading: true,
                item: {},
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
                item: action.payload,
                errors: {}
            });

        case SAVE_COLLECTION_ERROR:
        case LOAD_COLLECTION_ERROR:
            return Object.assign({}, state, {
                loading: false,
                item: {},
                errors: { ...action.payload }
            });

        default:
            return state;
    }
};

export default collection;
