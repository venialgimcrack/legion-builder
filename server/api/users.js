const passport = require('passport'),
    express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    keys = require('../config/keys');

const validateRegister = require('../validation/register'),
    validateLogin = require('../validation/login'),
    User = require('../models/User').model;

const SALT_ROUNDS = 10,
    TOKEN_EXPIRY = 31556926;

const EMAIL_EXISTS = 'Email already registered',
    CREDS_INVALID = 'Incorrect email and/or password',
    INTERNAL = 'Internal server error';

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegister(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;

    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: EMAIL_EXISTS });
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
                        .json({ server: INTERNAL });
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
                    .json({ form: CREDS_INVALID });
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
                                .json({ server: INTERNAL });
                        }

                    } else {
                        return res.status(400)
                            .json({ form: CREDS_INVALID });
                    }
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500)
                        .json({ server: INTERNAL });
                });
        });
});

module.exports = router;
