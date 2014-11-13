define(['angular', 'angularMocks', 'ui/custom-directives/directives/ngRating-directive'], function (angular, mocks) {
    'use strict';

    describe('ngRating directive', function () {

        var $scope, $compile, $templateCache, $http;
        var compileFunction, compiledElement, isolateScope;
        var defaultMaxIcons;
        var defaultFullIcon, defaultEmptyIcon;
        var mockTemplate, mockTemplateText;

        beforeEach(function() {
            module('ui.directives.ngRating');

            inject(function($injector) {
                $scope = $injector.get('$rootScope').$new();
                $compile = $injector.get('$compile');
                $templateCache = $injector.get('$templateCache');
                $http = $injector.get('$http');
            });

            compileFunction = function(template) {
                compiledElement = $compile(template)($scope);
                $scope.$digest();
                isolateScope = compiledElement.isolateScope();
            };

            mockTemplateText = 'Mock Template';
            mockTemplate = '<div>' + mockTemplateText + '</div>';

            $templateCache.put('/modules/ui/custom-directives/views/rating-template.html', mockTemplate);

            defaultMaxIcons = 5;
            defaultFullIcon = 'glyphicon-star';
            defaultEmptyIcon = 'glyphicon-star-empty';
        });

        it('should compile both as an attribute in an html element or an html element', function() {
            var template = '<ng-rating></ng-rating>';
            compileFunction(template);

            expect(compiledElement.html()).toEqual(mockTemplateText);

            template = '<div ng-rating></div>';
            compileFunction(template);

            expect(compiledElement.html()).toEqual(mockTemplateText);
        });

        it('should set the number of rating icons to 5 when no max is assigned', function() {
            var template = '<ng-rating></ng-rating>';
            compileFunction(template);

            expect(isolateScope.maxIcons).toEqual(defaultMaxIcons);
        });

        it('should take the value of attribute: max and set that to maxIcons in the scope', function() {
            var template = '<ng-rating max="10"></ng-rating>';
            compileFunction(template);

            expect(isolateScope.maxIcons).toEqual(10);
        });

        it('should set scope.range to an array and the length of it should equal to scope.maxIcons', function() {
            var template = '<ng-rating></ng-rating>';
            compileFunction(template);

            expect(Array.isArray(isolateScope.range)).toBe(true);
            expect(isolateScope.range.length).toEqual(isolateScope.maxIcons);
        });

        it('should bind scope.currentIndex to ratingIndex', function() {
            var template = '<ng-rating current-index="ratingIndex"></ng-rating>';
            $scope.ratingIndex = 1;
            compileFunction(template);

            expect(isolateScope.currentIndex).toEqual($scope.ratingIndex);
        });

        describe('generateIcons', function() {

            var currentIndex, tempIndex;

            describe('no custom functions are passed in', function() {

                it('should return the defaultFullIcon when currentIndex is less than or equal to the tempIndex', function() {
                    var template = '<ng-rating></ng-rating>';
                    currentIndex = 1;
                    tempIndex = 2;
                    compileFunction(template);

                    expect(isolateScope.generateIcons(currentIndex, tempIndex)).toEqual(defaultFullIcon);

                    currentIndex = 2;
                    tempIndex = 2;

                    expect(isolateScope.generateIcons(currentIndex, tempIndex)).toEqual(defaultFullIcon);
                });

                it('should return the defaultEmptyIcon when currentIndex is larger than the tempIndex', function() {
                    var template = '<ng-rating></ng-rating>';
                    currentIndex = 3;
                    tempIndex = 2;
                    compileFunction(template);

                    expect(isolateScope.generateIcons(currentIndex, tempIndex)).toEqual(defaultEmptyIcon);
                });
            });

            describe('custom function is passed in', function() {

                var customFunction;
                var receivedCurrentIndex, receivedTempIndex;

                beforeEach(function() {
                    customFunction = function(currentIndex, tempIndex) {
                        receivedCurrentIndex = currentIndex;
                        receivedTempIndex = tempIndex;
                    };
                });

                it('should throw an error when the customFunction is not a valid function', function() {
                    var template = '<ng-rating custom-classes="customFunction"></ng-rating>';
                    $scope.customFunction = {};
                    compileFunction(template);

                    expect(isolateScope.generateIcons).toThrow();
                });

                it('should set scope.customClasses to the customFunction', function() {
                    var template = '<ng-rating custom-classes="customFunction"></ng-rating>';
                    $scope.customFunction = customFunction;
                    compileFunction(template);

                    expect(isolateScope.customClasses).toEqual(customFunction);
                });

                it('should pass currentIndex and tempIndex to the customClasses function', function() {
                    var template = '<ng-rating custom-classes="customFunction"></ng-rating>';
                    $scope.customFunction = customFunction;
                    compileFunction(template);
                    currentIndex = 1;
                    tempIndex = 2;

                    isolateScope.generateIcons(currentIndex, tempIndex);

                    expect(receivedCurrentIndex).toEqual(currentIndex);
                    expect(receivedTempIndex).toEqual(tempIndex);
                });
            });
        });

        describe('setCurrentIndex', function() {

            var index;

            describe('no customClick function passed in', function() {

                it('should do nothing when scope.currentIndex is equal to index passed in', function() {
                    var template = '<ng-rating></ng-rating>';
                    compileFunction(template);
                    isolateScope.currentIndex = index = 1;

                    isolateScope.setCurrentIndex(index);

                    expect(isolateScope.currentIndex).toEqual(index);
                });

                it('should do nothing when the index passed in is less than 0', function() {
                    var template = '<ng-rating></ng-rating>';
                    compileFunction(template);
                    index = -1;

                    isolateScope.setCurrentIndex(index);

                    expect(isolateScope.currentIndex).toBe(undefined);
                });

                it('should do nothing when the index passed in is larger than or equal to the scope.maxIcons', function() {
                    var template = '<ng-rating></ng-rating>';
                    compileFunction(template);
                    index = defaultMaxIcons;

                    isolateScope.setCurrentIndex(index);

                    expect(isolateScope.currentIndex).toBe(undefined);
                });

                it('should set the scope.currentIndex to be the index passed in when scope.currentIndex is not equal to ' +
                    'index and index is larger than or equal to 0 and index is less than scope.maxIcons', function() {
                    var template = '<ng-rating></ng-rating>';
                    compileFunction(template);
                    index = 1;
                    isolateScope.currentIndex = 2;

                    isolateScope.setCurrentIndex(index);

                    expect(isolateScope.currentIndex).toEqual(index);
                });
            });

            describe('customClick function passed in', function() {

                var click;

                beforeEach(function() {
                    click = function(index) {};
                });
                it('should trigger the click function with currentIndex', function() {
                    var template = '<ng-rating custom-click="click(currentIndex);"></ng-rating>';
                    $scope.click = click;
                    compileFunction(template);
                    spyOn($scope, 'click');
                    index = 1;

                    isolateScope.setCurrentIndex(index);

                    expect($scope.click).toHaveBeenCalledWith(index);
                });
            });
        });

        describe('enter', function() {

            var index;

            it('should set scope.tempIndex to be the index passed in', function() {
                var template = '<ng-rating></ng-rating>';
                compileFunction(template);
                index = 1;

                isolateScope.enter(index);

                expect(isolateScope.tempIndex).toEqual(index);
            });
        });

        describe('reset', function() {

            it('should copy the scope.currentIndex to the scope.tempIndex', function() {
                var template = '<ng-rating></ng-rating>';
                compileFunction(template);
                isolateScope.currentIndex = 2;

                isolateScope.reset();

                expect(isolateScope.tempIndex).toEqual(isolateScope.currentIndex);
            });
        });
    });
});