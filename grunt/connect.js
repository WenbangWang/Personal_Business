module.exports = function (grunt) {
    'use strict';

    return {
        options: {
            hostname: '<%= app.integration.connect.host %>',
            directory: null // disable last directory browsing
        },

        local: {
            options: {
                port: '<%= app.integration.connect.port %>',
                protocol: 'http',
                livereload: true, // TODO should this be set to a port number?
                base: [
                    '<%= app.temp %>',
                    '<%= app.path %>',
                    '<%= app.path %>/components'
                ],
                open: true,
                debug: grunt.option ('debug')
            }
        }
    };
};
