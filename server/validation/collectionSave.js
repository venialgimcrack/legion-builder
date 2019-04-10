const isEmpty = require('is-empty');

module.exports = data => {
    let errors = {};

    data.products = isEmpty(data.products) ? [] : data.products;

    if (!Array.isArray(data.products)) {
        data.products = [ data.products ];
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
