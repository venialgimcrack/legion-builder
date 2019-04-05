const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    keys = require('../config/keys');

const validateRegister = require('../validation/register'),
    validateLogin = require('../validation/login');

const User = require('../models/User');

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

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }

                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(ex => console.error(ex));
                });
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
                return res.status(404).json({ emailnotfound: 'Email not found' });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name
                    };

                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 31556926
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        }
                    );
                
                } else {
                    return res.status(400).json({ passwordincorrect: 'Password incorrect' });
                }
            });
        });
});

module.exports = router;
