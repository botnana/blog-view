'use strict';

var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
var FluxibleMixin = require('fluxible').Mixin;

var Html = React.createClass({
    mixins: [FluxibleMixin],
    render: function() {
        return (
            <html>
            <head>
                <meta charSet="utf-8" />
                <title>{this.getStore(ApplicationStore).getPageTitle()}</title>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css" />
                <link rel="stylesheet" href="/assets/editor.css" />
                <link rel="stylesheet" href="/assets/blog.css" />
            </head>
            <script src="/public/js/ace-builds/src/ace.js"></script>
            <body>
                <section id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></section>
            </body>
            <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
            <script src="/public/js/client.js" defer></script>
            </html>
        );
    }
});

module.exports = Html;
