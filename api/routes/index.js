'use strict';

var express    = require('express');
var handlers = require('../handlers');
var router = express.Router();

module.exports = function() {
    require('./login')(router, handlers.login);
    return router;
};