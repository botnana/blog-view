/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

var blogPlugin = {
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
}

module.exports = blogPlugin;

