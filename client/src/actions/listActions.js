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

export const saveList = () => {
    return (dispatch, getState) => {
        const { list } = getState();

        dispatch(saveListStart());

        axios.post('/api/list/save', list.draft)
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

export const loadList = listId => {
    return dispatch => {
        dispatch(loadListStart());

        axios.get(`/api/list/load?id=${listId}`)
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

export const GET_LISTS_START = 'GET_LISTS_START';
export const GET_LISTS_FINISH = 'GET_LISTS_FINISH';
export const GET_LISTS_ERROR = 'GET_LISTS_ERROR';

export const getListsStart = () => ({
    type: GET_LISTS_START
});

export const getListsFinish = lists => ({
    type: GET_LISTS_FINISH,
    payload: lists
});

export const getListsError = errors => ({
    type: GET_LISTS_ERROR,
    payload: errors
});

export const getLists = () => {
    return dispatch => {
        dispatch(getListsStart());

        axios.get('/api/list/all')
            .then(res => {
                let lists = res.data;

                dispatch(getListsFinish(lists));
            })
            .catch(err => {
                console.error(err);

                let errors = _.get(err, 'response.data', {});

                dispatch(getListsError(errors));
                dispatch(showErrorSnackbar('Failed to get lists.'));
            });
    };
};

export const CREATE_NEW_LIST = 'CREATE_NEW_LIST';

export const createNewList = metadata => ({
    type: CREATE_NEW_LIST,
    payload: metadata
});

export const RESET_LIST = 'RESET_LIST';

export const resetList = () => ({
    type: RESET_LIST
});

export const EDIT_LIST = 'EDIT_LIST';

export const editList = list => ({
    type: EDIT_LIST,
    payload: list
});
