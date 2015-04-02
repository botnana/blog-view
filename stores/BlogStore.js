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
        'RECEIVE_POSTS_SUCCESS': 'receivePosts'
    },
    initialize: function () {
        this.blogTitle = 'Blog';
        this.list = [];
        this.posts = {
            md: ['invalid.md'],
            posts: {
                "invalid.md": {
                    title: 'Invalid Post', 
                    published: '2000-01-01',
                    author: '',
                    content: 'Post not available.'
                }
            }
        };
    },
    updateBlogTitle: function (title) {
        this.blogTitle = title;
        this.emitChange();
    },
    receiveBlog: function(blog) {
        this.list = blog;
        this.emitChange();
    },
    receivePosts: function(posts) {
        this.posts = posts;
        this.emitChange();
    },
    getBlogTitle: function () {
        return this.blogTitle;
    },
    getList: function () {
        return this.list;
    },
    getPosts: function () {
        return this.posts;
    },
    dehydrate: function () {
        return {
            blogTitle: this.blogTitle,
            list: this.list,
            posts: this.posts
        };
    },
    rehydrate: function (state) {
        this.blogTitle = state.blogTitle;
        this.list = state.list;
        this.posts = state.posts;
    }
});

module.exports = BlogStore;

