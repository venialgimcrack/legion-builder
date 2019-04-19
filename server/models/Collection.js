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
