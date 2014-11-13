define(['angular',
    'ui/custom-directives/directives/ngFocus-directive',
    'ui/custom-directives/directives/ngPopover-directive',
    'ui/custom-directives/directives/ngRating-directive'], function(angular) {
    'use strict';
    return angular.module('ui.directives', ['ui.directives.ngFocus', 'ui.directives.ngPopover', 'ui.directives.ngRating']);
});