/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var Application = require('./Application.jsx');
var Blog = require('../../components/Blog.jsx');
var Post = require('../../components/Post.jsx');
var routes = (
    <Route name="app" path="/" handler={Application}>
        <Route name="Post" handler={Post}/>
        <DefaultRoute name="Blog" handler={Blog}/>
    </Route>
);

module.exports = routes;

