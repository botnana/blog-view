var Moment = require('./Moment.jsx');
var FluxibleMixin = require('fluxible').Mixin;
var React = require('react');
    
var Post = React.createClass({
    mixins: [FluxibleMixin],
    render: function() {
        var content = this.getPost(),
            published = this.getPathMeta('published'),
            title = this.getPathMeta('title');
        return (
            <div>
                <header>
                    <h1>{title}</h1>
                    <Moment datetime={published} />
                </header>
                <span dangerouslySetInnerHTML={{__html: content}} />
            </div>
        );
    }
});

module.exports = Post;
