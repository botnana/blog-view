/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

var React = require('react');
var app = require('./app');
var dehydratedState = window.App; // sent from the server
window.React = React; // for chrome dev tool support
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;
    var mountNode = document.getElementById('blogapp');
    React.render(
        app.getComponent()({
            context:context.getComponentContext()
        }),
        mountNode
    );
});

