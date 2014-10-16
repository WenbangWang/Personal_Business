module.exports = function (grunt) {
    'use strict';

    var _ = require('lodash-node');

    return {

        local: function () {
            grunt.log.ok('Starting Local Developer Workflow...');
            grunt.task.run([
                'local:initialize',
                'local:connect'
            ]);
        },

        'local:initialize': [
            'jshint:gruntfile',
            'clean:local',
            'local:styles',
            'local:javascript',
            'local:html'
        ],

        'local:styles': ['less'],

        'local:javascript': ['jshint:modules'],

        'local:javascript:newer': ['newer:jshint:modules'],

        'local:html': ['targethtml:local'],

        'local:connect': [
            'connect:local',
            'watch'
        ]
    };
};