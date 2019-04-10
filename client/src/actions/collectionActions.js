import axios from 'axios';

export const LOAD_COLLECTION_START = 'LOAD_COLLECTION_START';
export const LOAD_COLLECTION_FINISH = 'LOAD_COLLECTION_FINISH';
export const LOAD_COLLECTION_ERROR = 'LOAD_COLLECTION_ERROR';

export const loadCollectionStart = () => ({
    type: LOAD_COLLECTION_START
});

export const loadCollectionFinish = collection => ({
    type: LOAD_COLLECTION_FINISH,
    payload: collection
});

export const loadCollectionError = errors => ({
    type: LOAD_COLLECTION_ERROR,
    payload: errors
});

export const loadCollection = () => {
    return dispatch => {
        dispatch(loadCollectionStart());
        dispatch(loadCollectionFinish([]));
    };
};

export const SAVE_COLLECTION_START = 'SAVE_COLLECTION_START';
export const SAVE_COLLECTION_FINISH = 'SAVE_COLLECTION_FINISH';
export const SAVE_COLLECTION_ERROR = 'SAVE_COLLECTION_ERROR';
