/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

var createStore = require('fluxible/utils/createStore');

var BlogStore = createStore({
    storeName: 'BlogStore',
    handlers: {
        'UPDATE_BLOG_TITLE': 'updateBlogTitle',
        'RECEIVE_BLOG_SUCCESS': '_receiveBlog'
    },
    initialize: function () {
        this.blogTitle = 'Blog';
        this.list = [];
    },
    updateBlogTitle: function (title) {
        this.blogTitle = title;
        this.emitChange();
    },
    _receiveBlog: function(blog) {
        this.list = blog;
        this.emitChange();
    },
    getBlogTitle: function () {
        return this.blogTitle;
    },
    getList: function () {
        return this.list;
    },
    dehydrate: function () {
        return {
            blogTitle: this.blogTitle,
            list: this.list
        };
    },
    rehydrate: function (state) {
        this.blogTitle = state.blogTitle;
        this.list = state.list;
    }
});

module.exports = BlogStore;

