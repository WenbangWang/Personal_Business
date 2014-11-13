define([
    'angular',
    'ui/user-login/controllers/user-login-controller',
    'ui/user-login/services/user-login-service'], function (angular) {
    'use strict';
    return angular.module('ui.userLogin', ['ui.userLogin.userLoginController', 'ui.userLogin.userLoginService']);
});
