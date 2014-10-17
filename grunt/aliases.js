var _ = require('lodash-node/modern/objects');

module.exports = function (grunt) {
    'use strict';

    var aliases = {};

    _.extend(aliases, require('./aliases-analysis')(grunt));
    _.extend(aliases, require('./aliases-local')(grunt));
    _.extend(aliases, require('./aliases-test')(grunt));

    return aliases;
};