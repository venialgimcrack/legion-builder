const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    mongoose = require('mongoose'),
    User = mongoose.model('users'),
    keys = require('./keys');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (payload, done) => {
            User.findById(payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }

                    return done(null, false);
                })
                .catch(err => {
                    console.error(err);
                    return done(err, false);
                });
        })
    );
};
