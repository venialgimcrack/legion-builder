const mongoose = require('mongoose'),
    { CATEGORIES, FACTIONS } = require('../config/constants'),
    Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: CATEGORIES,
        required: true
    },
    wave: Number,
    faction: {
        type: String,
        enum: FACTIONS
    }
});

module.exports = {
    schema,
    model: mongoose.model('products', schema)
};
