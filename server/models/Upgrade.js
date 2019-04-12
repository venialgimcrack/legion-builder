const mongoose = require('mongoose'),
    { UPGRADES } = require('../config/constants'),
    Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    weapon: {
        range: String,
        dice: [ String ]
    },
    exhaust: {
        type: Boolean,
        default: false
    },
    restriction: [
        {
            field: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }
    ],
    effect: [
        String
    ],
    kind: {
        type: String,
        required: true,
        enum: UPGRADES
    },
    points: {
        type: Number,
        required: true
    }
});

module.exports = {
    schema,
    model: mongoose.model('upgrades', schema)
};
