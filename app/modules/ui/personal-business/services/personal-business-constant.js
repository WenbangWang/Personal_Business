define(['angular'], function(angular) {
    'use strict';

    return angular.module('ui.personalBusiness.personalBusinessConstant', [])
        .constant('USER_EVENTS', {
            CLICK: 'click',
            FOCUS: 'focus',
            BLUR: 'blur'
        })
        .constant('CLASS' ,{
            ngFocused: 'ng-focused'
        })
        .constant('LOGIN', {
            USERNAME_MIN: 5,
            USERNAME_MAX: 16,
            PASSWORD_MIN: 5,
            PASSWORD_MAX: 20
        });
});