const mongoose = require('mongoose'),
    {
        ALIGNMENT,
        FACTIONS,
        RANKS,
        SURGES,
        TYPES,
        UPGRADES
    } = require('../config/constants'),
    Schema = mongoose.Schema;

const schema = new Schema({
    id: {
        type: String,
        required: true
    },
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
    align: {
        type: String,
        enum: ALIGNMENT,
        default: 'neutral'
    },
    points: {
        type: Number,
        required: true
    },
    upgrades: [
        {
            kind: {
                type: String,
                enum: UPGRADES,
                required: true
            },
            excludes: [
                {
                    type: String,
                    enum: UPGRADES
                }
            ]
        }
    ],
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
    types: [
        {
            type: String,
            enum: TYPES
        }
    ],
    defense: [ String ],
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
        defense: {
            type: String,
            enum: SURGES
        }
    },
    speed: {
        type: Number,
        required: true
    }
}, { id: false });

module.exports = {
    schema,
    model: mongoose.model('units', schema)
};
