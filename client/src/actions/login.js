import ActionTypes from './ActionTypes';

function loginSuccess () {
    return {
        type: ActionTypes.LOGIN_SUCCESS
    };
}

function logoutSuccess () {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    };
}

export const login = () => {
    return dispatch => {
        dispatch(loginSuccess());
    };
};

export const logout = () => {
    return dispatch => {
        dispatch(logoutSuccess());
    };
};
