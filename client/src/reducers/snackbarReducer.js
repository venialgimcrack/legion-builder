import {
    SHOW_SNACKBAR,
    HIDE_SNACKBAR
} from '../actions/snackbarActions';

const INIT_STATE = {
        show: false,
        message: '',
        variant: null
    };

const snackbar = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SHOW_SNACKBAR:
            return Object.assign({}, state, { show: true, ...action.payload });

        case HIDE_SNACKBAR:
            return Object.assign({}, state, { show: false });

        default:
            return state;
    }
};

export default snackbar;
