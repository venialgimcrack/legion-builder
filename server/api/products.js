const passport = require('passport'),
    express = require('express'),
    router = express.Router();

const Product = require('../models/Product').model;

router.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
    return Product.find()
        .then(products => res.json(products));
});

module.exports = router;
