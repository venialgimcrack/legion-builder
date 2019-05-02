const passport = require('passport'),
    express = require('express'),
    router = express.Router(),
    List = require('../models/List').model;

router.post('/save', passport.authenticate('jwt', { session: false }), (req, res) => {
    const owner = req.user._id,
        { id, name, faction, description, units } = req.body;

    List.findById(id)
        .then(list => {
            if (id && !list) {
                return res.status(400).json({ invalid: 'Unknown id' });
            }

            if (!list) {
                list = new List({ owner, faction });
            }

            list.set('name', name);
            list.set('description', description);
            list.set('units', units);

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

            return res.json(list);
        })
        .catch(err => {
            console.error(err);
            return res.status(500)
                .json({ internal: 'Internal server error' });
        });
});

router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
    return List.find()
        .then(lists => res.json(lists));
});

module.exports = router;
