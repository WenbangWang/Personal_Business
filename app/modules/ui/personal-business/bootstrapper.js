define (['./require-paths'], function (config) {
    'use strict';

    require.config ({
        baseUrl: '/',
        paths: config,
        shim: {
            angular: {
                deps: ['jquery'],
                exports: 'angular'
            },
            angularRoute: ['angular'],
            angularBootstrap: ['angular'],
            underscore: { exports: '_' },
            stacktracejs: {exports: 'stracktracejs'}
        }
    });

    require (['angular', 'ui/personal-business/shell', 'domReady'], function (angular, app, domReady) {
        domReady (function () {
            angular.bootstrap (document, [app.name]);
        });
    });
});
