define(['angular', 'angularMocks', 'ui/user-login/services/user-login-service'], function (angular, mocks) {
    'use strict';

    describe('user-login service', function () {

        var userLoginService;
        var $httpBackend;
        var responseHandler;
        var requestBody, username, password;
        var promise;
        beforeEach(function() {
            module('ui.userLogin.userLoginService');

            inject(function($injector) {
                $httpBackend = $injector.get('$httpBackend');
                userLoginService = $injector.get('userLoginService');
            });

            responseHandler = null;
            promise = null;
            username = 'username';
            password = 'password';
            requestBody = {
                username: username,
                password: password
            };
        });

        describe('login()', function() {

            beforeEach(function() {
                responseHandler = $httpBackend.whenPOST('api/login', requestBody);
            });
            it('should return the error message when got 404 responded', function() {
                responseHandler.respond(404);

                promise = userLoginService.login(username, password);

                promise.catch(function(err) {
                    expect(err).toEqual('Username and Password are not consistence');
                });

                $httpBackend.flush();
            });

            it('should return the error message when got 401 responded', function() {
                responseHandler.respond(401);

                promise = userLoginService.login(username, password);

                promise.catch(function(err) {
                    expect(err).toEqual('Username and Password are not consistence');
                });

                $httpBackend.flush();
            });

            it('should return the error message when got 500 responded', function() {
                responseHandler.respond(500);

                promise = userLoginService.login(username, password);

                promise.catch(function(err) {
                    expect(err).toEqual('Something happened on server side. Please try again later.');
                });

                $httpBackend.flush();
            });

            it('should return data when got 200 responded', function() {
                var data = 'data';
                responseHandler.respond(200, data);

                promise = userLoginService.login(username, password);

                promise.then(function(d) {
                    expect(d).toEqual(data);
                });

                $httpBackend.flush();
            });
        });

        describe('authenticate()', function() {


        });
    });
});