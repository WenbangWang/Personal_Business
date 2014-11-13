'use strict';

var config = require('../config');
var async = require('async');
var crypt = require('../utils/crypt');
var jwt = require('../utils/jwt');
var toolsbelt = require('../utils/toolsbelt');
var user = require('../models/user')();

module.exports = {
    login: {
        main: require('./login/main-handler')(user, jwt, config.secret.jwt, toolsbelt, crypt, async)
    }
};