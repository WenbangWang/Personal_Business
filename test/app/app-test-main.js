'use strict';

// generate list of tests
// TODO more specific file name pattern to match ONLY our app's tests
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty (file)) {
        if (/base\/test.+-spec\.js$/.test (file)) {
            tests.push (file);
        }
    }
}

var baseUrl = '/base/app';
requirejs.config ({
    // Karma serves files from '/base'
    // DON'T TOUCH THIS, IT'S MAGIC
    baseUrl: baseUrl,

    // REVIEW: replace this with the require-paths.js AMD
    // TODO how do i prevent copy-paste from app require config???
    paths: {
        angular: 'components/angular/angular',
        angularCookies: 'components/angular-cookies/angular-cookies',
        angularMocks: 'components/angular-mocks/angular-mocks',
        angularRoute: 'components/angular-route/angular-route',
        bootstrap: 'components/bootstrap/dist/js/bootstrap',
        domReady: 'components/requirejs-domready/domReady',
        jquery: 'components/jquery/dist/jquery',
        postal: 'components/postal.js/lib/postal',
        requirejs: 'components/requirejs/require',
        stacktracejs: 'components/stacktrace-js/stacktrace',
        underscore: 'components/underscore/underscore',
        core: 'modules/core',
        ui: 'modules/ui',
        util: 'modules/util'
    },
    shim: {
        'angular': {'exports': 'angular'},
        'angularRoute': ['angular'],
        underscore: { exports: '_' },
        'angularMocks': {
            deps: ['angular'],
            'exports': 'angular.mock'
        },
        'angularCookies': {
            deps: ['angular']
        },
        stacktracejs: {exports: 'stracktracejs'}
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});