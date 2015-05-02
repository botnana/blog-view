/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
var FluxibleMixin = require('fluxible').Mixin;
var RouterMixin = require('flux-router-component').RouterMixin;
var Nav = require('./Nav');
var Blog = require('../../components/Blog');
var Post = require('../../components/Post');
var Console = require('./Console');

var Application = React.createClass({
    mixins: [RouterMixin, FluxibleMixin],
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
        var output = '';
        //choose the right page based on the route
        switch (this.state.currentPageName) {
            case 'home':
                output = <div>
                    <Console context={this.props.context}/>
                    <Blog context={this.props.context} blogPath={this.props.context.blogPath}/>
                </div>;
                break;
            case 'post':
                output = <Post context={this.props.context}/>;
                break;
        }
        //render content
        return (
            <div>
                <Nav selected={this.state.currentPageName} links={this.state.pages} />
                {output}
            </div>
        );
    },
    componentDidUpdate: function(prevProps, prevState) {
        var newState = this.state;
        if (newState.pageTitle === prevState.pageTitle) {
            return;
        }
        document.title = newState.pageTitle;
    }
});

module.exports = Application;

