/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = function (context, payload, done) {
    context.dispatch('RECEIVE_POST_START', payload);
    context.service.read('blog', {md: payload.md}, {}, function (err, post) {
        if (err) {
            console.log('showPost err');
            console.log(err);
            context.dispatch('RECEIVE_POST_FAILURE', payload);
            done();
            return;
        }
        context.dispatch('RECEIVE_POST_SUCCESS', post[payload.md]);
        done();
    });
};

