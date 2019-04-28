export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';

const showSnackbar = (message, variant) => ({
    type: SHOW_SNACKBAR,
    payload: {
        message,
        variant
    }
});

export const hideSnackbar = () => ({
    type: HIDE_SNACKBAR
});

export const showSuccessSnackbar = message => showSnackbar(message, 'success');
export const showErrorSnackbar = message => showSnackbar(message, 'error');
