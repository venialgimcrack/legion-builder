import {
    GET_PRODUCTS_START,
    GET_PRODUCTS_FINISH,
    GET_PRODUCTS_ERROR
} from '../actions/productActions';

const INIT_STATE = {
    items: [],
    loading: false,
    errors: {}
};

const products = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCTS_START:
            return Object.assign({}, state, {
                loading: true,
                items: [],
                errors: {}
            });

        case GET_PRODUCTS_FINISH:
            return Object.assign({}, state, {
                loading: false,
                items: action.payload,
                errors: {}
            });

        case GET_PRODUCTS_ERROR:
            return Object.assign({}, state, {
                loading: false,
                items: [],
                errors: { ...action.payload }
            });

        default:
            return state;
    }
};

export default products;
