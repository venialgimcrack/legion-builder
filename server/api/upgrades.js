const passport = require('passport'),
    express = require('express'),
    router = express.Router();

const Upgrade = require('../models/Upgrade').model;

router.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
    return Upgrade.find()
        .then(upgrades => res.json(upgrades));
});

module.exports = router;
