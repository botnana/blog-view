/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = function (context, payload, done) {
    context.dispatch('RECEIVE_POST_START', payload);
    context.service.read('blog', payload, {}, function (err, post) {
        if (err) {
            context.dispatch('RECEIVE_POST_FAILURE', err);
            done();
            return;
        }
        context.dispatch('RECEIVE_POST_SUCCESS', {id: payload.id, post: post});
        done();
    });
};

