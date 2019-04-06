import axios from 'axios';
import jwt_decode from 'jwt-decode';

import ActionTypes from './ActionTypes';
import setAuthToken from '../utils/setAuthToken';

const TOKEN_KEY = 'lb-jwt-token';

const loginSuccess = user => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: user
    };
};

const logoutSuccess = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    };
};

const loginFailure = errors => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        payload: errors
    }
};

export const login = userData => {
    return dispatch => {
        axios.post('/api/users/login', userData)
            .then(res => {
                const { token } = res.data;

                localStorage.setItem(TOKEN_KEY, token);
                setAuthToken(token);

                const decoded = jwt_decode(token);

                dispatch(loginSuccess(decoded));
            })
            .catch(err => {
                dispatch(loginFailure(err.response.data));
            });
    };
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem(TOKEN_KEY);
        setAuthToken(null);

        dispatch(logoutSuccess());
    };
};
