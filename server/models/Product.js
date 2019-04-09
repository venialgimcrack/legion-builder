const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [ 'core', 'expansion' ],
        required: true
    },
    contents: {
        units: [ Schema.Types.ObjectId ],
        upgrades: [ Schema.Types.ObjectId ],
        cmdCards: [ Schema.Types.ObjectId ]
    }
});

module.exports = {
    schema,
    model: mongoose.model('products', schema)
};
