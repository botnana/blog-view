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
        'RECEIVE_BLOG_SUCCESS': 'receiveBlog',
        'RECEIVE_BLOG_FAILURE': 'receiveBlogFailure',
        'RECEIVE_POST_SUCCESS': 'receivePost',
        'RECEIVE_POST_FAILURE': 'receivePostFailure',
    },
    initialize: function () {
        this.blogTitle = 'Blog';
        this.list = {};
        this.post = {};
    },
    updateBlogTitle: function (title) {
        this.blogTitle = title;
        this.emitChange();
    },
    receiveBlog: function(blog) {
        this.list = blog;
        this.emitChange();
    },
    receiveBlogFailure: function(err) {
        this.list = err;
        this.emitChange();
    },
    receivePost: function(post) {
        this.post = post;
        this.emitChange();
    },
    receivePostFailure: function(err) {
        this.post = err;
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

