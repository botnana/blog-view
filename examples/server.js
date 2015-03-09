/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';

require('node-jsx').install({ extension: '.jsx' });
var debug = require('debug')('Example');
var express = require('express');
var serialize = require('serialize-javascript');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var React = require('react');
var app = require('./app');
var navigateAction = require('./actions/navigate');
var showBlog = require('../actions/showBlog');
var HtmlComponent = React.createFactory(require('./components/Html.jsx'));
var Router = require('react-router');

var server = express();
server.set('state namespace', 'App');
server.use('/public', express.static(__dirname + '/build'));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));

var fetchrPlugin = app.getPlugin('FetchrPlugin');
fetchrPlugin.registerService(require('botnana-blog-service')(__dirname + '/../node_modules/botnana-blog-service/examples/posts/'));
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use(function (req, res, next) {
    var context = app.createContext({
        blogPath: 'botnana-blog',
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });
    debug('Executing navigate action');
    Router.run(app.getComponent(), req.path, function(Handler, state) {
        context.executeAction(showBlog, {}, function (err) {
            if (err) {
                if (err.status && err.status === 404) {
                    return next();
                }
                else {
                    return next(err);
                }
            }
            context.executeAction(navigateAction, state, function () {
                var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
                var Component = React.createFactory(Handler);

                var html = React.renderToStaticMarkup(HtmlComponent({
                    state: exposed,
                    markup: React.renderToString(Component({
                        context:context.getComponentContext()
                    }))
                }));
                res.send(html);
            });
        });
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);

