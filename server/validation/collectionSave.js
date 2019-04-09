const Validator = require('validator'),
    isEmpty = require('is-empty');

module.exports = data => {
    let errors = {};

    data.owner = isEmpty(data.owner) ? '' : data.owner;
    data.products = isEmpty(data.products) ? [] : data.products;

    if (Validator.isEmpty(data.owner)) {
        errors.owner = 'Owner is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
