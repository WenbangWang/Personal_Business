define(['angular', 'bootstrap', 'jquery'], function(angular) {
    'use strict';

    /**
     * This is a custom popover directive. To activate this directive, just use "ircc-popover" as an attribute in any tag.
     * It consumes following attributs:
     * data-container
     * data-trigger (should be one of click|hover|focus|manual)
     * data-placement (should be one of top|bottom|left|right or begin with auto trailing with a space)
     * data-title
     * data-content
     * data-contentTemplate (a path pointing to the template html file)
     * data-class (classes you would like to add to the popover element)
     *
     */
    return angular.module('ui.directives.ngPopover', [])
        .directive('ngPopover', function($templateCache, $http) {

            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    var options = {};
                    var promise;
                    var popover;

                    if(attrs.container) {
                        options.container = attrs.container;
                    }
                    if(attrs.trigger) {
                        if(!/^(click|hover|focus|manual)$/.test(attrs.trigger)) {
                            throw new Error('"' + attrs.trigger + '" is not a valid trigger or has a invalid combination of triggers');
                        } else {
                            options.trigger = attrs.trigger;
                        }
                    } else {
                        options.trigger = 'hover';
                    }

                    if(attrs.placement) {
                        if(!/^(top|bottom|left|right)$|(auto)\s{1}(top|bottom|left|right)$/.test(attrs.placement)) {
                            throw new Error('"' + attrs.placement + '" is not a valid placement or has a invalid combination of placements');
                        } else {
                            options.placement = attrs.placement;
                        }
                    }
                    if(attrs.title) {
                        options.title = attrs.title;
                    }
                    if(attrs.content) {
                        options.content = attrs.content;
                    } else if(attrs.contentTemplate) {
                        promise = $http.get(attrs.contentTemplate, {cache: $templateCache});

                        promise.then(function() {
                            options.html = true;
                            options.content = $templateCache.get(attrs.contentTemplate)[1];
                        });
                    }

                    if(promise) {
                        promise.then(function() {
                            popover = element.popover(options);
                            if(attrs.class) {
                                popover.data('bs.popover').tip().addClass(attrs.class);
                            }
                        });
                    } else {
                        popover = element.popover(options);
                        if(attrs.class) {
                            popover.data('bs.popover').tip().addClass(attrs.class);
                        }
                    }

                }
            };
        });
});