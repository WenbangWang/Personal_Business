define (['angular'], function (angular) {
    'use strict';

    return angular.module ('ui.userAuthentication.userAuthenticationService', [])
        .factory ('userAuthentication', function () {
            return {
                get: 'test'
            };
        });
});