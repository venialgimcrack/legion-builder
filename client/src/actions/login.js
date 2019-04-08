import axios from 'axios';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';

import ActionTypes from './ActionTypes';
import setAuthToken from '../utils/setAuthToken';
import { JWT_TOKEN_KEY } from '../utils/constants';

export const loginSuccess = user => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: user
    };
};

export const logoutSuccess = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    };
};

export const loginFailure = errors => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        payload: errors
    }
};

export const clearErrors = () => {
    return {
        type: ActionTypes.CLEAR_ERRORS,
        payload: [ 'login', 'register' ]
    }
};

export const login = userData => {
    return dispatch => {
        axios.post('/api/users/login', userData)
            .then(res => {
                const { token } = res.data;

                localStorage.setItem(JWT_TOKEN_KEY, token);
                setAuthToken(token);

                const decoded = jwt_decode(token);

                dispatch(loginSuccess(decoded));
                dispatch(clearErrors());
            })
            .catch(err => {
                console.error(err);

                let errors = _.get(err, 'response.data', {});

                dispatch(loginFailure(errors));
            });
    };
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem(JWT_TOKEN_KEY);
        setAuthToken(null);

        dispatch(logoutSuccess());
        dispatch(clearErrors());
    };
};
