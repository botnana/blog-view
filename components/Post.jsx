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
        return this.getStore(BlogStore).getPosts();
    },
    onChange: function () {
    },
    render: function() {
        var md = this.state.md[0];
        var post = this.state.posts[md];
        return (
            <div>
                <header>
                    <h1>{post.title}</h1>
                    <Moment datetime={post.published} />
                </header>
                <span dangerouslySetInnerHTML={{__html: post.content}} />
            </div>
        );
    }
});

module.exports = Post;
