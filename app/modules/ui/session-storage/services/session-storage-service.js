define (['angular', 'angularCookies'], function (angular) {
    'use strict';

    return angular.module ('ui.sessionStorage.sessionStorageService', ['ngCookies'])
        .service ('sessionStorage', ['$cookieStore', function ($cookieStore) {

        /**
         * Set the session with the key/value pair
         * @param key
         * @param value
         * @returns {*|HttpPromise}
         */
        this.set = function(key, value) {
            return $cookieStore.put(key, value);
        };

        /**
         * Get value with key from session
         * @param key
         * @returns {*}
         */
        this.get = function(key) {
            return $cookieStore.get(key);
        };

        /**
         * Remove key/value pair from session
         * @param key
         * @returns {*}
         */
        this.remove = function(key) {
            return $cookieStore.remove(key);
        };
    }]);
});