const passport = require('passport'),
    express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    keys = require('../config/keys');

const validateRegister = require('../validation/register'),
    validateLogin = require('../validation/login'),
    validateSave = require('../validation/user'),
    User = require('../models/User').model;

const SALT_ROUNDS = 10,
    TOKEN_EXPIRY = 31556926;

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegister(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;

    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' });
            }

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password1
            });

            return bcrypt.hash(newUser.password, SALT_ROUNDS)
                .then(hash => {
                    newUser.password = hash;

                    return newUser.save();
                })
                .then(user => {
                    return res.json(user);
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500)
                        .json({ internal: 'Internal server error' });
                });
        });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email,
        password = req.body.password;
    
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400)
                    .json({ email: 'Email not found' });
            }

            return bcrypt.compare(password, user.password)
                .then(result => {
                    if (result) {
                        const payload = {
                                id: user.id,
                                name: user.name
                            };

                        try {
                            let token = jwt.sign(payload, keys.secretOrKey, { expiresIn: TOKEN_EXPIRY });

                            return res.json({
                                success: true,
                                token: `Bearer ${token}`
                            });

                        } catch (ex) {
                            console.error(ex);
                            return res.status(500)
                                .json({ internal: 'Internal server error' });
                        }

                    } else {
                        return res.status(400)
                            .json({ password: 'Password incorrect' });
                    }
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500)
                        .json({ internal: 'Internal server error' });
                });
        });
});

router.post('/save', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateSave(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const userId = req.body.userId,
        products = req.body.products;

    User.findOne({ _id: userId })
        .then(user => {
            if (!user) {
                return res.status(404)
                    .json({ message: `${userId} not found` });
            }

            user.products = products;

            return user.save()
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
