const Validator = require('validator'),
    isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = isEmpty(data.name) ? '' : data.name;
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password1 = isEmpty(data.password1) ? '' : data.password1;
    data.password2 = isEmpty(data.password2) ? '' : data.password2;

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.password1)) {
        errors.password = 'Password field is required';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password = 'Confirm password field is required';
    }

    if (!Validator.isLength(data.password1, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters and not more than 30';
    }

    if (!Validator.equals(data.password1, data.password2)) {
        errors.password = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
