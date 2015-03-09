/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

var React = require('react');
var Nav = require('./Nav.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var FluxibleMixin = require('fluxible').Mixin;
var RouteHandler = require('react-router').RouteHandler;
var Application = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [ApplicationStore]
    },
    getInitialState: function () {
        return this.getStore(ApplicationStore).getState();
    },
    onChange: function () {
        var state = this.getStore(ApplicationStore).getState();
        this.setState(state);
    },
    render: function () {
        return (
            <div>
                <Nav />
                <RouteHandler />
            </div>
        );
    }
});

module.exports = Application;

