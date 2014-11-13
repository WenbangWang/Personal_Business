define(['angular'], function(angular) {
    'use strict';

    return angular.module('ui.directives.ngFocus', [])
        .directive('ngFocus', ['CLASS', function(CLASS) {
            return {
                restrict: 'A',
                /**
                 * Since ng-model is registring the control with its parent "form"
                 * This directive has to be used as a child of "form"
                 */
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {
                    ctrl.$focused = false;

                    element
                        .on('focus', function(event) {
                            element.addClass(CLASS.ngFocused);
                            scope.$apply(function() {
                                ctrl.$focused = true;
                            });
                        })
                        .on('blur', function(event) {
                            element.removeClass(CLASS.ngFocused);
                            scope.$apply(function() {
                                ctrl.$focused = false;
                            });
                        });
                }
            };
        }]);
});