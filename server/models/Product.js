const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            'core',
            'expansion'
        ],
        required: true
    },
    contents: {
        units: [
            {
                type: Schema.Types.ObjectId,
                ref: 'units'
            }
        ],
        upgrades: [
            {
                type: Schema.Types.ObjectId,
                ref: 'upgrades'
            }
        ],
        cards: {
            battle: {
                objective: [
                    Schema.Types.ObjectId
                ],
                deployment: [
                    Schema.Types.ObjectId
                ],
                condition: [
                    Schema.Types.ObjectId
                ]
            },
            command: [
                Schema.Types.ObjectId
            ]
        }
    }
});

module.exports = {
    schema,
    model: mongoose.model('products', schema)
};
