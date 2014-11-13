module.exports = function (grunt) {
    'use strict';

    return {
        test: [
            'clean:report',
            'jshint:gruntfile',
            'jshint:test',
            'test:api',
            'test:app'
        ],

        'test:app': [
            'karma:app'
        ],

        'test:api': [
            'clean:instrument',
            'instrument',
            'mochaTest',
            'storeCoverage',
            'makeReport'
        ]
    };

};