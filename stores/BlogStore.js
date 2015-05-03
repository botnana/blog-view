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
        'CHECK_POST': 'checkPost',
        'UNCHECK_POST': 'uncheckPost',
        'CREATE_POST_SUCCESS': 'createPostSuccess',
        'DELETE_POST_SUCCESS': 'deletePostSuccess'
    },
    initialize: function () {
        this.blogTitle = 'Blog';
        this.list = {};
        this.checked = [],
        this.post = {};
        this.consistentToServer = false;
    },
    updateBlogTitle: function (title) {
        this.blogTitle = title;
        this.emitChange();
    },
    receiveBlog: function(blog) {
        this.list = blog;
        this.consistentToServer = true;
        this.emitChange();
    },
    receiveBlogFailure: function(err) {
        this.list = err;
        this.emitChange();
    },
    createPostSuccess: function(result) {
        this.consistentToServer = false;
        this.emitChange();
    },
    checkPost: function(payload) {
        if(this.checked.indexOf(payload.md)<0) {
            this.checked.push(payload.md);
        }
        this.emitChange();
    },
    uncheckPost: function(payload) {
        var idx = this.checked.indexOf(payload.md);
        if(idx>=0) {
            this.checked.splice(idx, 1);
        }
        this.emitChange();
    },
    deletePostSuccess: function(result) {
        var idx = this.checked.indexOf(result.md);
        if(idx >= 0) {
            this.checked.splice(idx, 1);
        }
        this.consistentToServer = false;
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
            checked: this.checked,
            post: this.post,
            consistentToServer: this.consistentToServer
        };
    },
    rehydrate: function (state) {
        this.blogTitle = state.blogTitle;
        this.list = state.list;
        this.checked = state.checked;
        this.post = state.post;
        this.consistentToServer = state.consistentToServer;
    }
});

module.exports = BlogStore;

