module.exports = function (grunt) {
    'use strict';

    var _ = require('lodash-node');

    return {

        local: function () {
            grunt.log.ok('Starting Local Developer Workflow...');
            grunt.task.run([
                'concurrent:local'
            ]);
        },

        'local:start': [
            'local:initialize',
            'local:connect'
        ],

        'local:initialize': [
            'jshint:gruntfile',
            'clean:local',
            'local:styles',
            'local:javascript',
            'local:html'
        ],

        'local:styles': ['less', 'copy:fonts'],

        'local:javascript': ['jshint:modules', 'jshint:api'],

        'local:javascript:newer': ['newer:jshint:modules'],

        'local:html': ['targethtml:local'],

        'local:connect': [
            'configureProxies:local',
            'connect:local',
            'watch'
        ],

        'nodemon:local': [
            'nodemon:api'
        ]
    };
};