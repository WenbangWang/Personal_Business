define(
    [
        'angular',
        'angularRoute',
        'ui/personal-business/controllers/personal-business-controller',
        'ui/personal-business/services/personal-business-constant',
        'ui/custom-directives/module',
        'ui/user-login/module',
        'ui/user-authentication/module',
        'ui/session-storage/module'
    ],
    function (angular) {
        'use strict';

        return angular.module(
            'ui.personalBusiness',
            [
                'ngRoute',
                'ui.personalBusiness.personalBusinessController',
                'ui.personalBusiness.personalBusinessConstant',
                'ui.directives',
                'ui.userLogin',
                'ui.sessionStorage'
            ])
            .config(['$routeProvider', function ($routeProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: 'modules/ui/personal-business/views/personal-business.html',
                        controller: 'personalBusinessController'/*,
                        resolve: {
                            auth: function(userLoginService) {
                                return userLoginService.authenticate();
                            }
                        }*/
                    })
                    .when('/login', {
                        templateUrl: 'modules/ui/user-login/views/login.html',
                        controller: 'userLoginController'
                    });
            }])
            .run(['$rootScope', '$location', function($rootScope, $location) {
                $rootScope.$on('$routeChangeError', function(event, current, previous, eventObj) {
                    if(eventObj.authenticated === false) {
                        $location.path('/login');
                    }
                });
            }]);
    });
