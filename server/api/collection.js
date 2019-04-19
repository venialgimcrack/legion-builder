const passport = require('passport'),
    express = require('express'),
    router = express.Router();

const validateSave = require('../validation/collectionSave'),
    Collection = require('../models/Collection').model;

router.post('/save', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateSave(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const owner = req.user._id,
        { products, units, upgrades } = req.body;

    Collection.findOne({ owner })
        .then(collection => {
            if (!collection) {
                collection = new Collection({ owner });
            }

            collection.set('products', products);
            collection.set('units', units);
            collection.set('upgrades', upgrades);

            return collection.save()
                .then(result => res.json(result));
        })
        .catch(err => {
            console.error(err);
            return res.status(500)
                .json({ internal: 'Internal server error' });
        });
});

router.get('/load', passport.authenticate('jwt', { session: false }), (req, res) => {
    const owner = req.user._id;

    Collection.findOne({ owner })
        .then(collection => {
            if (!collection) {
                return new Collection({ owner }).save();
            }

            return Promise.resolve(collection);
        })
        .then(owned => {
            return res.json(owned);
        })
        .catch(err => {
            console.error(err);
            return res.status(500)
                .json({ internal: 'Internal server error' });
        });
});

module.exports = router;
