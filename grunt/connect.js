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
                debug: grunt.option ('debug'),
                middleware: function (connect, options) {
                    var _ = require('lodash-node');

                    var middlewares = [];

                    // proxy middleware should be first
                    middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

                    // followed by static files served from connect
                    if (options.base) {
                        if (_.isArray(options.base)) {
                            _.forEach(options.base, function (base) {
                                middlewares.push(connect.static(base));
                            });
                        } else {
                            middlewares.push(options.base);
                        }
                    }

                    return middlewares;
                }
            },

            proxies: (function () { // TODO can I do this without an IIFE?
                var p = [];
                p.push({
                    context: '<%= api.context %>',
                    host: '<%= api.host %>',
                    port: '<%= api.port %>'
                });
                return p;
            })()
        }
    };
};
