/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

var showBlog = require('../../actions/showBlog');
var showPost = require('../../actions/showPost');

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
        path: '/posts/:id',
        method: 'get',
        page: 'post',
        action: function (context, payload, done) {
            context.executeAction(showPost, {id: payload.params.id}, function (err) {
                context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: 'Post | Blog | Botnana' });
                done();
            });
        }
    }
};

