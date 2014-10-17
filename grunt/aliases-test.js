module.exports = function (grunt) {
    'use strict';

    return {
        test: [
            'jshint:gruntfile',
            'jshint:test',
            'karma:unit'
        ]
    };

};