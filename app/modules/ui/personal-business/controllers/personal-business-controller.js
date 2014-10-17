/**
 * This controller module is only defining the array of angular injectables
 * plus the controller function. The actual registration of the controller
 * happens in module.js.
 */
define (['angular'], function (angular) {
    'use strict';

    return angular.module ('ui.personalBusiness.personalBusinessController', [])
        .controller ('PersonalBusinessController', ['$scope', function ($scope) {
            $scope.test = 'test';
        }]);
});
