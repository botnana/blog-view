/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = function (context, payload, done) {
    context.dispatch('RECEIVE_POSTS_START', payload);
    context.service.read('blog', payload, {}, function (err, posts) {
        if (err) {
            console.log('showPosts err');
            console.log(err);
            context.dispatch('RECEIVE_POSTS_FAILURE', payload);
            done();
            return;
        }
        context.dispatch('RECEIVE_POSTS_SUCCESS', {md: payload.md, posts: posts});
        done();
    });
};

