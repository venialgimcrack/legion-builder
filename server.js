const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

const backend = express();

backend.use(bodyParser.urlencoded({ extended: false }));
backend.use(bodyParser.json());

const db = require('./server/config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connection successful'))
    .catch(err => console.error(err));

backend.listen(3001, () => console.log('lb-server listening on port 3001'));
