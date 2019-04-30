const mongoose = require('mongoose'),
    {
        FACTIONS
    } = require('../config/constants'),
    Schema = mongoose.Schema;

const schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    faction: {
        type: String,
        required: true,
        enum: FACTIONS
    },
    description: String,
    units: [
        {
            id: {
                type: String,
                required: true
            },
            upgrades: [
                {
                    id: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ]
});

module.exports = {
    schema,
    model: mongoose.model('lists', schema)
};