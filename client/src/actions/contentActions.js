import axios from 'axios';

export const GET_CONTENT_START = 'GET_CONTENT_START';
export const GET_CONTENT_FINISH = 'GET_CONTENT_FINISH';
export const GET_CONTENT_ERROR = 'GET_CONTENT_ERROR';

export const getContentStart = () => {
    return {
        type: GET_CONTENT_START
    };
};

export const getContentFinish = content => {
    return {
        type: GET_CONTENT_FINISH,
        payload: content
    }
};

export const getContentError = errors => {
    return {
        type: GET_CONTENT_ERROR,
        payload: errors
    }
};

export const getContent = () => {
    return dispatch => {
        dispatch(getContentStart());

        let content = {};

        axios.get('/api/content/units')
            .then(res => {
                content.units = res.data;

                return axios.get('/api/content/upgrades');
            })
            .then(res => {
                content.upgrades = res.data;

                dispatch(getContentFinish(content));
            })
            .catch(err => {
                dispatch(getContentError(err));
            });
    };
};
