const passport = require('passport'),
    express = require('express'),
    router = express.Router(),
    List = require('../models/List').model;

router.post('/save', passport.authenticate('jwt', { session: false }), (req, res) => {
    const owner = req.user._id,
        { _id, name, faction, size, description, units } = req.body;

    List.findById(_id)
        .then(list => {
            if (_id && !list) {
                return res.status(400).json({ invalid: 'Unknown id' });
            }

            // TODO should validate list belongs to owner

            if (!list) {
                list = new List({ owner, faction });
            }

            list.set('name', name);
            list.set('size', size);
            list.set('description', description);

            // TODO should we do anything if changing army size?

            if (list.get('faction') !== faction) {
                // Clear unit list if we're changing factions
                list.set('faction', faction);
                list.set('units', []);

            } else {
                list.set('units', units);
            }

            return list.save()
                .then(result => res.json(result));
        })
        .catch(err => {
            console.error(err);
            return res.status(500)
                .json({ internal: 'Internal server error' });
        });
});

router.get('/load', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ invalid: 'Missing id' });
    }

    List.findById(id)
        .then(list => {
            if (!list) {
                return res.status(400).json({ invalid: 'Unknown id' });
            }

            // TODO should validate list belongs to owner

            return res.json(list);
        })
        .catch(err => {
            console.error(err);
            return res.status(500)
                .json({ internal: 'Internal server error' });
        });
});

router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
    const owner = req.user._id;

    return List.find({ owner })
        .then(lists => res.json(lists));
});

module.exports = router;
