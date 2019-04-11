const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'products'
        }
    ]
});

module.exports = {
    schema,
    model: mongoose.model('collections', schema)
};
