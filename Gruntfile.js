module.exports = function (grunt) {
  'use strict';

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load each task from its own file
  require('load-grunt-config')(grunt, {
    config: {
      app: {
        path: require('./bower.json').appPath || 'app',
        modules: '<%= app.path %>/modules/**/*.js',
        styles: '<%= app.path %>/modules/**/styles/*.less',
        temp: '.tmp',
        test: {
          path: 'test/app',
          modules: '<%= app.test.path %>/**/*-spec.js'
        },
        components: {
          path: '<%= app.path %>/components'
        },
        integration: {
          connect: {
            host: 'localhost',
            port: 9000
          }
        }
      }
    }
  });
};