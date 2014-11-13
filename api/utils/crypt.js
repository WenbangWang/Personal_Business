'use strict';

var salt = require('../config').secret.password;
var crypto = require('crypto');

var encrypt = function(password) {
    var cipher = crypto.createCipher('aes-256-cbc', salt);
    var cryptedBuffers = [cipher.update(new Buffer(password))];
    cryptedBuffers.push(cipher.final());
    var crypted = Buffer.concat(cryptedBuffers);
    return crypted.toString('hex');
};

var decrypt = function(crypted) {
    var dcipher = crypto.createDecipher('aes-256-cbc', salt);

    var dcryptedBuffers = [dcipher.update(new Buffer(crypted, 'hex'))];
    dcryptedBuffers.push(dcipher.final());
    var dcrypted = Buffer.concat(dcryptedBuffers)
        .toString('utf8');
    return dcrypted;
};

var match = function(password, crypted) {
    return crypted.toString('hex') === encrypt(password).toString('hex');
};


module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    match: match
};