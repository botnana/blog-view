/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = function (context, payload, done) {
    context.dispatch('DELETE_POST_START', payload);
    context.service.delete('blog', payload, {}, function (err, result) {
        if (err) {
            context.dispatch('DELETE_POST_FAILURE', err);
            done();
            return;
        }
        context.dispatch('DELETE_POST_SUCCESS', result);
        done();
    });
};

