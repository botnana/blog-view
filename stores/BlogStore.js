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
        this.post = {
            title: 'Invalid Post', 
            published: '2000/01/01',
            content: 'Post not available.'
        };
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
    getPost: function () {
        return this.post;
    },
    dehydrate: function () {
        return {
            blogTitle: this.blogTitle,
            list: this.list,
            post: this.post
        };
    },
    rehydrate: function (state) {
        this.blogTitle = state.blogTitle;
        this.list = state.list;
        this.post = state.post;
    }
});

module.exports = BlogStore;

