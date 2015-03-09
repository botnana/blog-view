/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = function (actionContext, payload, done) {
    actionContext.dispatch('CHANGE_ROUTE', payload);
    done();
};
