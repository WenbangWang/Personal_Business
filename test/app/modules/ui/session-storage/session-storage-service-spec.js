define(['angular', 'angularMocks', 'ui/session-storage/services/session-storage-service'], function(angular, mocks) {
    'use strict';

    describe('session-storage service', function() {

        var sessionStorage;
        var cookieStoreMock;
        var key, value;

        beforeEach(function() {
            module('ui.sessionStorage.sessionStorageService', function($provide) {

                cookieStoreMock = {
                    put: function() {
                    },
                    get: function() {
                    },
                    remove: function() {
                    }
                };

                $provide.value('$cookieStore', cookieStoreMock);

                key = 'key';
                value = 'value';

            });

            inject(function(_sessionStorage_) {
                sessionStorage = _sessionStorage_;
            });
        });

        describe('set()', function() {

            beforeEach(function() {
                spyOn(cookieStoreMock, 'put');
            });

            afterEach(function() {
                cookieStoreMock.put.reset();
            });

            it('should call cookieStoreMock.put with key and value', function() {
                sessionStorage.set(key, value);

                expect(cookieStoreMock.put).toHaveBeenCalledWith(key, value);
            });
        });

        describe('get()', function() {

            beforeEach(function() {
                spyOn(cookieStoreMock, 'get').andReturn(value);
            });

            afterEach(function() {
                cookieStoreMock.get.reset();
            });

            it('should call cookieStoreMock.get with key and return value', function() {
                expect(sessionStorage.get(key)).toEqual(value);
                expect(cookieStoreMock.get).toHaveBeenCalledWith(key);
            });
        });

        describe('remove()', function() {

            beforeEach(function() {
                spyOn(cookieStoreMock, 'remove').andCallFake(function() {
                    key = null;
                    value = null;
                });
            });

            afterEach(function() {
                cookieStoreMock.remove.reset();
            });

            it('should call cookieStoreMock.remove with key and set key and value to null', function() {
                var anotherKey = key;

                sessionStorage.remove(key);

                expect(cookieStoreMock.remove).toHaveBeenCalledWith(anotherKey);
                expect(key).toEqual(null);
                expect(value).toEqual(null);
            });
        });
    });
});