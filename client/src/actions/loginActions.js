import axios from 'axios';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';

import setAuthToken from '../utils/setAuthToken';
import { JWT_TOKEN_KEY } from '../utils/constants';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_FINISH = 'LOGIN_FINISH';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

export const loginStart = () => ({
    type: LOGIN_START
});

export const loginFinish = user => ({
    type: LOGIN_FINISH,
    payload: user
});

export const loginError = errors => ({
    type: LOGIN_ERROR,
    payload: errors
});

export const login = userData => {
    return dispatch => {
        dispatch(loginStart());

        axios.post('/api/users/login', userData)
            .then(res => {
                const { token } = res.data;

                localStorage.setItem(JWT_TOKEN_KEY, token);
                setAuthToken(token);

                const decoded = jwt_decode(token);

                dispatch(loginFinish(decoded));
            })
            .catch(err => {
                console.error(err);

                let errors = _.get(err, 'response.data', {});

                dispatch(loginError(errors));
            });
    };
};

export const logout = () => ({
    type: LOGOUT
});
