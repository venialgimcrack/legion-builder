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

    const owner = req.body.owner,
        products = req.body.products;

    Collection.findOne({ owner })
        .then(collection => {
            if (!collection) {
                console.log(`Creating new Collection for ${owner}`);
                collection = new Collection({ owner });
            }

            collection.products = products;

            return collection.save()
                .then(result => {
                    res.json(result);
                });
        })
        .catch(err => {
            console.error(err);
            return res.status(500)
                .json({ internal: 'Internal server error' });
        });
});

module.exports = router;
