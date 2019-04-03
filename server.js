var express = require('express');

var backend = express();

backend.listen(3001, () => console.log('lb-server listening on port 3001'));
