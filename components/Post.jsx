var Moment = require('./Moment.jsx');
var FluxibleMixin = require('fluxible').Mixin;
var BlogStore = require('../stores/BlogStore');
var React = require('react');
    
var Post = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [BlogStore]
    },
    getInitialState: function () {
        return this.getStore(BlogStore).getPost();
    },
    onChange: function () {
    },
    render: function() {
        return (
            <div>
                <header>
                    <h1>{this.state.title}</h1>
                    <Moment datetime={this.state.published} />
                </header>
                <span dangerouslySetInnerHTML={{__html: this.state.content}} />
            </div>
        );
    }
});

module.exports = Post;
