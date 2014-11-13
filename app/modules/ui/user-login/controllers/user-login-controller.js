define(['angular', 'angularCookies'], function (angular) {
    'use strict';

    return angular.module('ui.userLogin.userLoginController', [])
        .controller('userLoginController',
        [
            '$scope', '$location', /*'sessionStorage', */'userLoginService', 'LOGIN',
            function ($scope, $location, /*sessionStorage, */userLoginService, LOGIN) {

                $scope.loginConstant = LOGIN;

                $scope.loginSubmit = function () {
                    if ($scope.userLogin.$valid) {
                        userLoginService.login($scope.username, $scope.password)
                            .then(function (data) {
//                                sessionStorage.set('secret', data);
                                $location.path('/');
                            })
                            .catch(function (error) {
                                $scope.userLogin.password.$invalid = true;
                                $scope.userLogin.password.$focused = false;
                                $scope.errorMessage = error;
                            });
                    } else {
                        $scope.userLogin.username.$focused = false;
                        $scope.userLogin.password.$focused = false;
                    }
                };

                $scope.loginReset = function () {
                    $scope.userLogin.username.$invalid = false;
                    $scope.userLogin.password.$invalid = false;
                };
            }
        ]);
});