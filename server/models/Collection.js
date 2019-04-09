const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    products: [ Schema.Types.ObjectId ]
});

module.exports = {
    schema,
    model: mongoose.model('collections', schema)
};
