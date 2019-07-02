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
            _id: false,
            id: {
                type: String,
                required: true
            },
            count: {
                type: Number,
                default: 0
            }
        }
    ],
    units: [
        {
            _id: false,
            id: {
                type: String,
                required: true
            },
            modifier: {
                type: Number,
                default: 0
            }
        }
    ],
    upgrades: [
        {
            _id: false,
            id: {
                type: String,
                required: true
            },
            modifier: {
                type: Number,
                default: 0
            }
        }
    ]
});

module.exports = {
    schema,
    model: mongoose.model('collections', schema)
};
