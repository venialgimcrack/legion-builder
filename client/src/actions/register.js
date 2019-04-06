import axios from 'axios';

import ActionTypes from './ActionTypes';

export const registerSuccess = () => {
    return {
        type: ActionTypes.REGISTER_SUCCESS
    };
};

export const registerFailure = errors => {
    return {
        type: ActionTypes.REGISTER_FAILURE,
        payload: errors
    };
};

export const register = (userData, history) => {
    return dispatch => {
        axios.post('/api/users/register', userData)
            .then(() => {
                dispatch(registerSuccess());
                history.push('/login');
            })
            .catch(err => dispatch(registerFailure(err.response.data)));
    };
};
