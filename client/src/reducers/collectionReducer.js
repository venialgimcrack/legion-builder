import {
    LOAD_COLLECTION_START,
    LOAD_COLLECTION_FINISH,
    LOAD_COLLECTION_ERROR,
    SAVE_COLLECTION_START,
    SAVE_COLLECTION_FINISH,
    SAVE_COLLECTION_ERROR,
    EDIT_COLLECTION
} from '../actions/collectionActions';

const EMPTY_COLLECTION = {
        products: [],
        units: [],
        upgrades: []
    },
    INIT_STATE = {
        saved: EMPTY_COLLECTION,
        draft: EMPTY_COLLECTION,
        loading: false,
        errors: {}
    };

const collection = (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOAD_COLLECTION_START:
            return Object.assign({}, state, {
                loading: true,
                saved: EMPTY_COLLECTION,
                draft: EMPTY_COLLECTION,
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
                saved: action.payload,
                draft: Object.assign({}, action.payload),
                errors: {}
            });

        case SAVE_COLLECTION_ERROR:
        case LOAD_COLLECTION_ERROR:
            return Object.assign({}, state, {
                loading: false,
                saved: EMPTY_COLLECTION,
                errors: { ...action.payload }
            });

        case EDIT_COLLECTION:
            return Object.assign({}, state, {
                draft: action.payload
            });

        default:
            return state;
    }
};

export default collection;
