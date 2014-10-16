module.exports = function (grunt) {
    'use strict';

    return {
        // runs static analysis tools
        analysis: [
            'jshint:all',
            'jshint:gruntfile',
            'plato'
        ]
    };

};