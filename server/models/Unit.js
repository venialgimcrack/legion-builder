const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    faction: {
        type: String,
        required: true,
        enum: [
            'rebel',
            'empire',
            'republic',
            'separatist'
        ]
    },
    points: {
        type: Number,
        required: true
    },
    upgrades: [
        {
            type: String,
            enum: [
                'armament',
                'command',
                'comms',
                'crew',
                'force',
                'gear',
                'generator',
                'grenades',
                'hardpoint',
                'heavy',
                'personnel',
                'pilot',
                'training'
            ]
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
        enum: [
            'commander',
            'operative',
            'corps',
            'special',
            'support',
            'heavy'
        ]
    },
    minis: {
        type: Number,
        default: 1
    },
    defense: [ String ],
    types: [
        {
            type: String,
            enum: [
                'trooper',
                'ground',
                'repulsor',
                'emplacement',
                'vehicle'
            ]
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
            enum: [
                'hit',
                'crit'
            ]
        },
        block: {
            type: String,
            enum: [
                'hit',
                'crit'
            ]
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
