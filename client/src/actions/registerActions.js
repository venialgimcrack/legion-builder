import axios from 'axios';
import _ from 'lodash';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_FINISH = 'REGISTER_FINISH';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const registerStart = () => ({
    type: REGISTER_START
});

export const registerFinish = () => ({
    type: REGISTER_FINISH
});

export const registerError = errors => ({
    type: REGISTER_ERROR,
    payload: errors
});

export const register = (userData, history) => {
    return dispatch => {
        dispatch(registerStart());

        axios.post('/api/users/register', userData)
            .then(() => {
                dispatch(registerFinish());

                history.push('/login');
            })
            .catch(err => {
                console.error(err);

                let errors = _.get(err, 'response.data', {});

                dispatch(registerError(errors));
            });
    };
};