define(['angular', 'angularMocks', 'ui/custom-directives/directives/ngFocus-directive'], function(angular, mocks) {
    'use strict';

    describe('ngFocus directive', function() {

        var $scope, $compile;
        var compileFunction;
        var element;
        var CLASS;

        beforeEach(function() {
            CLASS = {
                ngFocused: 'ngFocused'
            };

            module('ui.directives.ngFocus', function($provide) {
                $provide.value('CLASS', CLASS);
            });

            inject(function($injector) {
                $scope = $injector.get('$rootScope').$new();
                $compile = $injector.get('$compile');
            });

            compileFunction = function(template) {
                element = $compile(template)($scope);
                $scope.$digest();
            };
        });

        it('should throw an error when ng-model is not provided', function() {

            expect($compile('<input ng-focue />')).toThrow();
        });

        it('should set $focused to false when initialized', function() {
            compileFunction('<form name="form"><input name="name" ng-model="focused" ng-focus /></form>');

            expect($scope.form.name.$focused).toBe(false);
        });

        it('should add class "ng-focused" and set $focused to true when user focus the input', function() {
            compileFunction('<form name="form"><input name="name" ng-model="focused" ng-focus /></form>');
            var inputElement = element.find('input');

            inputElement.triggerHandler('focus');

            expect(inputElement.hasClass(CLASS.ngFocused)).toBe(true);
            expect($scope.form.name.$focused).toBe(true);
        });

        it('should remove class "ng-focused" and set #focused to false when user blur the input', function() {
            compileFunction('<form name="form"><input name="name" ng-model="focused" ng-focus /></form>');
            var inputElement = element.find('input');

            inputElement.triggerHandler('focus');

            expect(inputElement.hasClass(CLASS.ngFocused)).toBe(true);
            expect($scope.form.name.$focused).toBe(true);

            inputElement.triggerHandler('blur');

            expect(inputElement.hasClass(CLASS.ngFocused)).toBe(false);
            expect($scope.form.name.$focused).toBe(false);
        });
    });
});