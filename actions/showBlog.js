/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = function (context, payload, done) {
    context.dispatch('RECEIVE_BLOG_START', payload);
    context.service.read('blog', {}, {}, function (err, blog) {
        if (err) {
            context.dispatch('RECEIVE_BLOG_FAILURE', payload);
            done();
            return;
        }
        context.dispatch('RECEIVE_BLOG_SUCCESS', blog);
        done();
    });
};

