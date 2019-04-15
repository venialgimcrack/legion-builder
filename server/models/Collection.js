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
            product_id: {
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
            unit_id: {
                type: Schema.Types.ObjectId,
                ref: 'units',
                required: true
            },
            count: {
                type: Number,
                default: 0
            }
        }
    ],
    upgrades: [
        {
            upgrade_id: {
                type: Schema.Types.ObjectId,
                ref: 'upgrades',
                required: true
            },
            count: {
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
