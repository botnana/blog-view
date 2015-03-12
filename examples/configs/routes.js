/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

var showBlog = require('../../actions/showBlog');
var showPosts = require('../../actions/showPosts');

module.exports = {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        label: 'Home',
        action: function (context, payload, done) {
            context.executeAction(showBlog, {}, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: 'Home | Blog | Botnana' });
                    done();
                }
            });
        }
    },
    post: {
        path: '/post/:md',
        method: 'get',
        page: 'post',
        action: function (context, payload, done) {
            context.executeAction(showPosts, {md: [payload.params.md]}, function (err) {
                context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: 'Post | Blog | Botnana' });
                done();
            });
        }
    }
};

