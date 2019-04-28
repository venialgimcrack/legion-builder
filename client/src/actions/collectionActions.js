import axios from 'axios';
import _ from 'lodash';

import { showSuccessSnackbar, showErrorSnackbar } from './snackbarActions';

export const SAVE_COLLECTION_START = 'SAVE_COLLECTION_START';
export const SAVE_COLLECTION_FINISH = 'SAVE_COLLECTION_FINISH';
export const SAVE_COLLECTION_ERROR = 'SAVE_COLLECTION_ERROR';

export const saveCollectionStart = () => ({
    type: SAVE_COLLECTION_START
});

export const saveCollectionFinish = saved => ({
    type: SAVE_COLLECTION_FINISH,
    payload: saved
});

export const saveCollectionError = errors => ({
    type: SAVE_COLLECTION_ERROR,
    payload: errors
});

export const saveCollection = collection => {
    return dispatch => {
        dispatch(saveCollectionStart());

        axios.post('/api/collection/save', collection)
            .then(res => {
                let saved = res.data;

                dispatch(saveCollectionFinish(saved));
                dispatch(showSuccessSnackbar('Successfully saved collection!'));
            })
            .catch(err => {
                console.error(err);

                let errors = _.get(err, 'response.data', {});

                dispatch(saveCollectionError(errors));
                dispatch(showErrorSnackbar('Failed to save collection.'));
            });
    };
};

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

        axios.get('/api/collection/load')
            .then(res => {
                let collection = res.data;

                dispatch(loadCollectionFinish(collection));
            })
            .catch(err => {
                console.error(err);

                let errors = _.get(err, 'response.data', {});

                dispatch(loadCollectionError(errors));
            });
    };
};
