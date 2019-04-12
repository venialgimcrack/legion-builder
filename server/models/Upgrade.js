const mongoose = require('mongoose'),
    {
        UPGRADES,
        SURGES
    } = require('../config/constants'),
    Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    unique: {
        type: Boolean,
        default: false
    },
    weapon: {
        range: String,
        dice: [ String ],
        keywords: [
            {
                text: {
                    type: String,
                    required: true
                },
                value: Number,
                qualifiers: [
                    {
                        text: {
                            type: String,
                            required: true
                        },
                        value: Number
                    }
                ],
                perform: {
                    action: {
                        type: Boolean,
                        default: false
                    },
                    free: {
                        type: Boolean,
                        default: false
                    }
                }
            }
        ]
    },
    keywords: [
        {
            text: {
                type: String,
                required: true
            },
            value: Number,
            qualifiers: [
                {
                    text: {
                        type: String,
                        required: true
                    },
                    value: Number
                }
            ],
            perform: {
                action: {
                    type: Boolean,
                    default: false
                },
                free: {
                    type: Boolean,
                    default: false
                }
            },
            requires: [
                {
                    type: String,
                    enum: UPGRADES
                }
            ]
        }
    ],
    adds: [
        {
            upgrade: {
                type: String,
                required: true,
                enum: UPGRADES
            },
            requires: [
                {
                    type: String,
                    enum: UPGRADES
                }
            ]
        }
    ],
    surges: {
        attack: {
            type: String,
            enum: SURGES
        },
        defense: {
            type: String,
            enum: SURGES
        }
    },
    exhaust: {
        type: Boolean,
        default: false
    },
    requirements: [
        {
            field: {
                type: String,
                required: true
            },
            values: [ String ]
        }
    ],
    effects: [ String ],
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
