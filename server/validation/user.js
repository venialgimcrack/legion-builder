const Validator = require('validator'),
    isEmpty = require('is-empty');

module.exports = function validateSaveInput(data) {
    let errors = {};

    data.userId = isEmpty(data.userId) ? '' : data.userId;
    data.products = isEmpty(data.products) ? [] : data.products;

    if (Validator.isEmpty(data.userId)) {
        errors.userId = 'User ID is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
