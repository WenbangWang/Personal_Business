define(['angular'], function(angular) {
    'use strict';

    /**
     * The directive can either used as an attribute of html element or an html element.
     *
     * It can consume 4 attributes in the directive.
     *
     * "max" is the number of the upper limit of the icons.
     * @example <ng-rating max="10"></ng-rating>
     * This will set the number to 10. The default value is 5.
     *
     * "currentIndex" is the current index which the user clicked.
     * This is a two-way binding between the parent scope and the directive scope.
     * This will pass the currentIndex value to the parent scope.
     * @example <ng-rating current-index="ratingIndex"></ng-rating>
     * The ratingIndex is a variable in the parent scope which you can keep track on the currentIndex.
     *
     * "customClasses" is used in ng-class to generate classes for the rating icons.
     * If no customClasses is provided then the icons should use the default class which is "star".
     * customClasses should be passed in as an object of function.
     * It takes two arguments: currentIndex and tempIndex.
     * currentIndex is the current state the rating is at.
     * tempIndex is the hover over index.
     * @example <ng-rating customClasses="generateIcons"></ng-rating>
     * $scope.generateIcons = function(currentIndex, tempIndex) { };
     * You can manipulate the return classes with the currentIndex and tempIndex in the function.
     *
     * "customClick" is the user action which will be binding to the click.
     * @example <ng-rating customClick="provideFeedback(currentIndex);"></ng-rating>
     * The argument "currentIndex" is mandatory to be as same as "currentIndex".
     *
     */
    return angular.module('ui.directives.ngRating', [])
        .directive('ngRating', function() {

            return {
                restrict: 'AE',
                scope: {
                    customClasses: '=',
                    currentIndex: '=',
                    customClick: '&'
                },
                templateUrl: '/modules/ui/custom-directives/views/rating-template.html',
                replace: true,
                link: function(scope, element, attrs) {
                    var defaultMaxIcons = 5;

                    scope.maxIcons = isNaN(parseInt(attrs.max)) ? defaultMaxIcons : parseInt(attrs.max);
                    scope.range = [];

                    for(var i=0; i<scope.maxIcons; i++) {
                        scope.range.push(i);
                    }

                    scope.generateIcons = function(currentIndex, tempIndex) {
                        if(scope.customClasses) {
                            return scope.customClasses(currentIndex, tempIndex);
                        } else {
                            return currentIndex <= tempIndex && 'glyphicon-star' ||  'glyphicon-star-empty';
                        }
                    };

                    scope.setCurrentIndex = function(index) {
                        if(scope.currentIndex !== index && index > 0 && index < scope.maxIcons) {
                            scope.currentIndex = index;
                        }
                        scope.customClick({currentIndex: index});
                    };

                    scope.enter = function(tempIndex) {
                        scope.tempIndex = tempIndex;
                    };

                    scope.reset = function() {
                        scope.tempIndex = angular.copy(scope.currentIndex);
                    };

                    scope.$watch('currentIndex', function(currentIndex) {
                        scope.tempIndex = currentIndex;
                    });

                }
            };
        });
});