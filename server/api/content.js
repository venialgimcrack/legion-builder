const passport = require('passport'),
    express = require('express'),
    router = express.Router();

const Unit = require('../models/Unit').model;

router.get('/units', passport.authenticate('jwt', { session: false }), (req, res) => {
    return Unit.find()
        .then(units => res.json(units));
});

const Upgrade = require('../models/Upgrade').model;

router.get('/upgrades', passport.authenticate('jwt', { session: false }), (req, res) => {
    return Upgrade.find()
        .then(upgrades => res.json(upgrades));
});

module.exports = router;
