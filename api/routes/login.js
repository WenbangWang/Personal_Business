'use strict';

module.exports = function(router, handler) {

    router.route('/login')
        .post(handler.main.postRoute);
};