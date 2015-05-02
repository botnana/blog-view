/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = function (context, payload, done) {
    context.dispatch('UPDATE_POST_START', payload);
    context.service.update('blog', payload, {}, function (err, result) {
        if (err) {
            context.dispatch('UPDATE_POST_FAILURE', err);
            done();
            return;
        }
        context.dispatch('UPDATE_POST_SUCCESS', result);
        done();
    });
};

