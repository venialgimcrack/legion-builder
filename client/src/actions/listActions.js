import axios from 'axios';
import _ from 'lodash';

import { showSuccessSnackbar, showErrorSnackbar } from './snackbarActions';

export const SAVE_LIST_START = 'SAVE_LIST_START';
export const SAVE_LIST_FINISH = 'SAVE_LIST_FINISH';
export const SAVE_LIST_ERROR = 'SAVE_LIST_ERROR';

export const saveListStart = () => ({
    type: SAVE_LIST_START
});

export const saveListFinish = list => ({
    type: SAVE_LIST_FINISH,
    payload: list
});

export const saveListError = errors => ({
    type: SAVE_LIST_ERROR,
    payload: errors
});

export const saveList = list => {
    return dispatch => {
        dispatch(saveListStart());

        axios.post('/api/list/save', list)
            .then(res => {
                let saved = res.data;

                dispatch(saveListFinish(saved));
                dispatch(showSuccessSnackbar('Successfully saved list!'));
            })
            .catch(err => {
                console.error(err);

                let errors = _.get(err, 'response.data', {});

                dispatch(saveListError(errors));
                dispatch(showErrorSnackbar('Failed to save list.'));
            });
    };
};

export const LOAD_LIST_START = 'LOAD_LIST_START';
export const LOAD_LIST_FINISH = 'LOAD_LIST_FINISH';
export const LOAD_LIST_ERROR = 'LOAD_LIST_ERROR';

export const loadListStart = () => ({
    type: LOAD_LIST_START
});

export const loadListFinish = list => ({
    type: LOAD_LIST_FINISH,
    payload: list
});

export const loadListError = errors => ({
    type: LOAD_LIST_ERROR,
    payload: errors
});

export const loadList = () => {
    return dispatch => {
        dispatch(loadListStart());

        axios.get('/api/list/load')
            .then(res => {
                let list = res.data;

                dispatch(loadListFinish(list));
            })
            .catch(err => {
                console.error(err);

                let errors = _.get(err, 'response.data', {});

                dispatch(loadListError(errors));
                dispatch(showErrorSnackbar('Failed to load list.'));
            });
    };
};
