import {
    GET_CONTENT_START,
    GET_CONTENT_FINISH,
    GET_CONTENT_ERROR
} from '../actions/contentActions';

const EMPTY_LIST = [],
    INIT_STATE = {
        units: EMPTY_LIST,
        upgrades: EMPTY_LIST,
        loading: false,
        errors: {}
    };

const content = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_CONTENT_START:
            return Object.assign({}, state, {
                units: EMPTY_LIST,
                upgrades: EMPTY_LIST,
                loading: true,
                errors: {}
            });

        case GET_CONTENT_FINISH:
            let { units, upgrades } = action.payload;

            return Object.assign({}, state, {
                units,
                upgrades,
                loading: false,
                errors: {}
            });

        case GET_CONTENT_ERROR:
            return Object.assign({}, state, {
                units: EMPTY_LIST,
                upgrades: EMPTY_LIST,
                loading: false,
                errors: { ...action.payload }
            });

        default:
            return state;
    }
};

export default content;
