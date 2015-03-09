/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var debug = require('debug');
var bootstrapDebug = debug('Example');
var app = require('./app');
var dehydratedState = window.App;
var Router = require('react-router');
var HistoryLocation = Router.HistoryLocation;
var navigateAction = require('./actions/navigate');

window.React = React;
debug.enable('*');

bootstrapDebug('rehydrating app');

function RenderApp(context, Handler) {
    bootstrapDebug('React Rendering');
    var mountNode = document.getElementById('app');
    var Component = React.createFactory(Handler);
    React.render(Component({context:context.getComponentContext()}), mountNode, function () {
        bootstrapDebug('React Rendered');
    });
}

app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;

    var firstRender = true;
    Router.run(app.getComponent(), HistoryLocation, function (Handler, state) {
        if (firstRender) {
            RenderApp(context, Handler);
            firstRender = false;
        } else {
            context.executeAction(navigateAction, state, function () {
                RenderApp(context, Handler);
            });
        }
    });
});

