define(['angular'], function (angular) {
    'use strict';

    return angular.module('ui.userLogin.userLoginService', [])
        .factory('userLoginService', ['$http', '$q', /*'sessionStorage', */function ($http, $q/*, sessionStorage*/) {

            var login = function(username, password) {
                var deferred = $q.defer();
                $http.post('api/login', {username: username, password: password})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data, status) {
                        if(status === 401 || status === 404) {
                            deferred.reject('Username and Password are not consistence');
                        } else if(status === 500) {
                            deferred.reject('Something happened on server side. Please try again later.');
                        }
                    });

                return deferred.promise;
            };

            var authenticate = function() {
//                var secret = sessionStorage.get('secret');
//                console.log(secret);
//                var deferred = $q.defer();
//                if(!secret) {
//                    deferred.reject({authenticated: false});
//                } else {
//                    deferred.resolve();
//                }
//
//                return deferred.promise;
            };

            return {
                login: login,
                authenticate: authenticate
            };
        }]);
});