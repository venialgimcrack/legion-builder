import axios from 'axios';

export const GET_PRODUCTS_START = 'GET_PRODUCTS_START';
export const GET_PRODUCTS_FINISH = 'GET_PRODUCTS_FINISH';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';

export const getProductsStart = () => {
    return {
        type: GET_PRODUCTS_START
    };
};

export const getProductsFinish = products => {
    return {
        type: GET_PRODUCTS_FINISH,
        payload: products
    }
};

export const getProductsError = errors => {
    return {
        type: GET_PRODUCTS_ERROR,
        payload: errors
    }
};

export const getProducts = () => {
    return dispatch => {
        dispatch(getProductsStart());

        axios.get('/api/products/list')
            .then(res => {
                let products = res.data;

                dispatch(getProductsFinish(products));
            })
            .catch(err => {
                dispatch(getProductsError(err));
            });
    };
};
