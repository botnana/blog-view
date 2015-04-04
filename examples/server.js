/**
 * Copyright 2015, Mapacode Inc.
 * Copyrights licensed under the ISC License. See the accompanying LICENSE file for terms.
 */
'use strict';
require('node-jsx').install({ extension: '.jsx' });
var debug = require('debug')('Example');
var express = require('express');
//var favicon = require('serve-favicon');
var serialize = require('serialize-javascript');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var navigateAction = require('flux-router-component').navigateAction;
var React = require('react');
var app = require('./app');
var HtmlComponent = React.createFactory(require('./components/Html.jsx'));
var docPath = __dirname + '/posts/';

var server = express();
//server.use(favicon(__dirname + '/../favicon.ico'));
server.use('/public', express.static(__dirname + '/build'));
server.use('/assets', express.static(__dirname + '/assets'));

server.use(cookieParser());
server.use(bodyParser.json());
server.use(csrf({cookie: true}));

var fetchrPlugin = app.getPlugin('FetchrPlugin');
if (process.argv.length > 2) {
    docPath = process.argv[2];
}
fetchrPlugin.registerService(require('botnana-blog-service')(docPath));
server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use(function (req, res, next) {
    var context = app.createContext({
        blogPath: '/post',
        req: req, // The fetchr plugin depends on this
        xhrContext: {
            _csrf: req.csrfToken() // Make sure all XHR requests have the CSRF token
        }
    });

    debug('Executing navigate action');
    context.executeAction(navigateAction, {
        url: req.url
    }, function (err) {
        if (err) {
            if (err.status && err.status === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        debug('Exposing context state');
        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        debug('Rendering Application component into html');
        var Component = app.getComponent();

        var html = React.renderToStaticMarkup(HtmlComponent({
            state: exposed,
            markup: React.renderToString(Component({context:context.getComponentContext()})),
            context: context.getComponentContext()
        }));

        debug('Sending markup');
        res.send(html);
    });
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on port ' + port);
