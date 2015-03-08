/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

var React = require('react');
var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');

var app = new Fluxible({
    component: React.createFactory(require('../components/Blog.jsx'))
});

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

app.plug({
    name: "blogPlugin",
    plugContext: function(options) {
        var blogPath = options.blogPath;
        return {
            plugComponentContext: function(componentContext) {
                componentContext.blogPath = blogPath;
            },
            dehydrate: function () {
                return {
                    blogPath: blogPath
                };
            },
            rehydrate: function (state) {
                blogPath = state.blogPath;
            }
        };
    }
});

app.registerStore(require('../stores/BlogStore'));

module.exports = app;

