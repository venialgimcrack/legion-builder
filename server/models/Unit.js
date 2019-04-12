const mongoose = require('mongoose'),
    {
        FACTIONS,
        RANKS,
        SURGES,
        TYPES,
        UPGRADES
    } = require('../config/constants'),
    Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    subtitle: String,
    unique: {
        type: Boolean,
        default: false
    },
    faction: {
        type: String,
        required: true,
        enum: FACTIONS
    },
    points: {
        type: Number,
        required: true
    },
    upgrades: [
        {
            type: String,
            enum: UPGRADES
        }
    ],
    keywords: [ String ],
    weapons: [
        {
            name: {
                type: String,
                required: true
            },
            range: {
                type: String,
                required: true
            },
            dice: [ String ],
            keywords: [ String ]
        }
    ],
    rank: {
        type: String,
        required: true,
        enum: RANKS
    },
    minis: {
        type: Number,
        default: 1
    },
    defense: [ String ],
    types: [
        {
            type: String,
            enum: TYPES
        }
    ],
    wounds: {
        type: Number,
        required: true
    },
    resilience: {
        type: Number,
        required: true
    },
    surges: {
        attack: {
            type: String,
            enum: SURGES
        },
        block: {
            type: String,
            enum: SURGES
        }
    },
    speed: {
        type: Number,
        required: true
    }
});

module.exports = {
    schema,
    model: mongoose.model('units', schema)
};
