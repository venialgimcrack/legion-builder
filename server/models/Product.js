const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = {
    schema,
    model: mongoose.model('products', schema)
};
