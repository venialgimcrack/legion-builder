import axios from 'axios';
import _ from 'lodash';

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
            .catch(err => {
                console.error(err);

                let errors = _.get(err, 'response.data', {});

                dispatch(registerFailure(errors));
            });
    };
};
