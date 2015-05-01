/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = function (context, payload, done) {
    context.dispatch('CREATE_POST_START', payload);
    context.service.create('blog', payload, {}, function (err, result) {
        if (err) {
            context.dispatch('CREATE_POST_FAILURE', err);
            done();
            return;
        }
        context.dispatch('CREATE_POST_SUCCESS', result);
        done();
    });
};

