define(['angular', 'angularMocks', 'ui/user-login/controllers/user-login-controller'], function (angular, mocks) {
    'use strict';

    describe('user-login controller', function () {

        var $scope, $q, $controller;
        var mockLocation, mockUserLoginService, mockLOGIN;
        var deferred;

        beforeEach(function() {
            module('ui.userLogin.userLoginController');

            inject(function($injector) {
                $scope = $injector.get('$rootScope').$new();
                $q = $injector.get('$q');
                $controller = $injector.get('$controller');
            });

            mockLocation = {
                path: function(){}
            };

            mockUserLoginService = {
                login: function(){
                    deferred = $q.defer();
                    return deferred.promise;
                }
            };
            mockLOGIN = 'login constants';

            $controller('userLoginController', {
                $scope: $scope,
                $location: mockLocation,
                userLoginService: mockUserLoginService,
                LOGIN: mockLOGIN
            });

            $scope.userLogin = {
                username: {},
                password:{}
            };
        });

        it('should set $scope.loginConstant to mockLOGIN', function() {
            expect($scope.loginConstant).toEqual(mockLOGIN);
        });

        describe('loginSubmit()', function() {

            var error;

            beforeEach(function() {
                error = 'error';
                spyOn(mockUserLoginService, 'login').andCallThrough();
            });

            afterEach(function() {
                mockUserLoginService.login.reset();
            });

            describe('login form is valid', function() {

                beforeEach(function() {
                    $scope.userLogin.$valid = true;
                });

                it('should call mockUserLoginService with $scope.username and $scope.password when the form is valid', function() {
                    $scope.username = 'username';
                    $scope.password = 'password';

                    $scope.loginSubmit();

                    expect(mockUserLoginService.login).toHaveBeenCalledWith($scope.username, $scope.password);
                });

                it('should set the password in the form to be invalid and focus on it when username and password are not consistence', function() {
                    $scope.loginSubmit();

                    deferred.reject(error);
                    $scope.$root.$digest();

                    expect($scope.userLogin.password.$invalid).toEqual(true);
                    expect($scope.userLogin.password.$focused).toEqual(false);
                });

                it('should set the $scope.errorMessage to be error when username and password are not consistence', function() {
                    $scope.loginSubmit();

                    deferred.reject(error);
                    $scope.$root.$digest();

                    expect($scope.errorMessage).toEqual(error);
                });

                it('should call mockLocation.path with \'/\' when authorized', function() {
                    var data = {
                        username: 'username',
                        token: 'token'
                    };
                    spyOn(mockLocation, 'path');

                    $scope.loginSubmit();

                    deferred.resolve(data);
                    $scope.$root.$digest();

                    expect(mockLocation.path).toHaveBeenCalledWith('/');
                });
            });

            it('should set the form to be unfocused when the form is not valid', function() {
                $scope.userLogin.$valid = false;

                $scope.loginSubmit();

                expect($scope.userLogin.username.$focused).toEqual(false);
                expect($scope.userLogin.password.$focused).toEqual(false);
            });
        });

        describe('loginReset()', function() {

            it('should reset the form value\'s validity', function() {
                $scope.userLogin.username.$invalid = true;
                $scope.userLogin.password.$invalid = true;

                $scope.loginReset();

                expect($scope.userLogin.username.$invalid).toEqual(false);
                expect($scope.userLogin.password.$invalid).toEqual(false);
            });
        });
    });
});