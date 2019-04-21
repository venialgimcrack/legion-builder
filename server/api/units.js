const passport = require('passport'),
    express = require('express'),
    router = express.Router();

const Unit = require('../models/Unit').model;

router.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
    return Unit.find()
        .then(units => res.json(units));
});

module.exports = router;
