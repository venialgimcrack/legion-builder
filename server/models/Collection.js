const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    products: [ String ],
    units: [ String ],
    upgrades: [ String ]
});

module.exports = {
    schema,
    model: mongoose.model('collections', schema)
};
