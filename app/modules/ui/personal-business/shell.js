define(['angular', 'angularRoute', './controllers/personal-business-controller'], function (angular) {
    'use strict';

    return angular.module('ui.personalBusiness', ['ngRoute', 'ui.personalBusiness.personalBusinessController'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/personal-business', { templateUrl: 'modules/ui/personal-business/views/personal-business.html', controller: 'PersonalBusinessController'})
                .otherwise({ redirectTo: '/personal-business' });
        }]);
});
