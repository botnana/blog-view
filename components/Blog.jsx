var React = require('react');
var Moment  = require('./Moment.jsx');
var FluxibleMixin = require('fluxible').Mixin;
var BlogStore = require('../stores/BlogStore');
var _ = require('lodash');
var NavLink = require('flux-router-component').NavLink;
    
var Blog = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [BlogStore]
    },
    getInitialState: function () {
        return this.getState();
    },
    getState: function () {
        var store = this.getStore(BlogStore);
        return {
            nowShowing: this.state && this.state.nowShowing || 'ALL_TODOS',
            blogTitle: store.blogTitle, 
            list: store.getList()
        };
    },
    onChange: function() {
        this.setState(this.getState());
    },
    render: function() {
        var self = this;
        var momentStyle = {fontSize: '0.5em'};
        var quoteStyle = {
            margin: '0 1em 1em 1em',
            fontStyle: 'italic'
        };
        var titleStyle = {fontSize: '1.5em'};
        var ulStyle = {
            listStyle: 'none',
            paddingLeft: 0
        };
        return (
            <div>
                <h1>{this.state.blogTitle}</h1>
                <ul style={ulStyle}>
                { 
                    _.map(this.state.list, function(post, key) {
                        return <li key={key}>
                            <div style={titleStyle}>
                                <NavLink href={self.props.blogPath + "/" + post.md}>{post.title}</NavLink>
                                <br/>
                                <Moment datetime={post.published} style={momentStyle} />
                            </div>
                            <div>
                                <blockquote style={quoteStyle}>{post.preview}</blockquote>
                            </div>
                        </li>
                    })

                }
                </ul>
                <div id="post">
                </div>
          </div>
        );
    }
});

module.exports = Blog;
