const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    collection = require('./server/api/collection'),
    list = require('./server/api/list'),
    users = require('./server/api/users'),
    products = require('./server/api/products'),
    content = require('./server/api/content');

const backend = express();

backend.use(bodyParser.urlencoded({ extended: false }));
backend.use(bodyParser.json());

const db = require('./server/config/keys').mongoURI;

mongoose.set('useCreateIndex', true);

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.error(err));

backend.use(passport.initialize());

require('./server/config/passport')(passport);

backend.use('/api/collection', collection);
backend.use('/api/list', list);
backend.use('/api/users', users);
backend.use('/api/products', products);
backend.use('/api/content', content);

backend.listen(3001, () => console.log('lb-server listening on port 3001'));
