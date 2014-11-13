/**
 * This controller module is only defining the array of angular injectables
 * plus the controller function. The actual registration of the controller
 * happens in module.js.
 */
define(['angular'], function (angular) {
    'use strict';

    return angular.module('ui.personalBusiness.personalBusinessController', [])
        .controller('personalBusinessController', ['$scope', '$http', function ($scope, $http) {
            $scope.test = 'test';

            $http.post('api/login', {username: 'wangwb', password: '123456'})
                .success(function(data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                });
        }]);
});
