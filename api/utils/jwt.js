'use strict';

var jwt = require('json-web-token');

var encode = function(secret, payload, callback) {
    jwt.encode(secret, payload, function(err, token) {
        if(err) {
            var errorMessage = 'Error happened during encode phase: ' + err;
            callback(errorMessage);
        } else {
            callback(null, token);
        }
    });
};

module.exports = {
    encode: encode
};