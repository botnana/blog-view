/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var routrPlugin = require('fluxible-plugin-routr');
var blogPlugin = require('../index');

var app = new Fluxible({
    component: React.createFactory(require('./components/Application.jsx'))
});

app.plug(routrPlugin({
    routes: require('./configs/routes')
}));

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

app.plug(blogPlugin);

app.registerStore(require('../stores/BlogStore'));
app.registerStore(require('./stores/ApplicationStore'));

module.exports = app;
