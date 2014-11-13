define(['angular', 'angularMocks', 'ui/custom-directives/directives/ngPopover-directive', 'jquery'], function (angular, mocks) {
    'use strict';

    describe('ngPopover directive', function () {

        var $scope, $compile, $templateCache, $http;
        var compileFunction, compiledElement, isolateScope;
        var template;

        beforeEach(function() {
            module('ui.directives.ngPopover');

            inject(function($injector) {
                $scope = $injector.get('$rootScope').$new();
                $compile = $injector.get('$compile');
                $templateCache = $injector.get('$templateCache');
                $http = $injector.get('$http');
            });

            compileFunction = function() {
                compiledElement = $compile(template)($scope);
                $scope.$digest();
                isolateScope = compiledElement.isolateScope();
            };

            template = null;
        });

        it('should throw error when the trigger is not valid', function() {
            template = '<div ng-popover data-trigger="test"></div>';

            expect(compileFunction).toThrow();
        });

        it('shoud throw error when the placement is not valid', function() {
            template = '<div ng-popover data-placement="test"></div>';

            expect(compileFunction).toThrow();
        });

        it('should get the html template when valid html file path is assigned to contentTemplate', function() {
            $templateCache.put('template.html', '<div>Mock</div>');
            template = '<div ng-popover data-contentTemplate="template.html"></div>';

            expect(compileFunction).not.toThrow();

            compileFunction();

            expect(compiledElement.data()['bs.popover']).toBeDefined();
        });
    });
});