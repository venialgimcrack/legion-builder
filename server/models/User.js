const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    products: [ Schema.Types.ObjectId ]
});

module.exports = {
    schema,
    model: mongoose.model('users', schema)
};
